"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import AddressSection from "../checkout/address-section";
import { useToast } from "@/components/ui/use-toast";
import ReviewSection from "./review-section";
import { Address, Cart, Order } from "@/lib/schema";
import { createOrder } from "@/lib/functions";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/config";
import { useCartStore } from "@/hooks/use-cart-store";
import Confirmation from "./confirmation";
import { useRouter } from "next/navigation";
import AppInitializer from "@/hooks/cart";
import { useChangeStore } from "@/hooks/use-store";

let x = 1;
const t = (v: any) => x * v;

let backgroundTransition = { duration: t(0.2) };
let backgroundVariants = {
  inactive: {
    background: "#ffffff", // white
    borderColor: "#e2e8f0", // slate-200 equivalent
    color: "#94a3b8", // slate-400 equivalent
  },
  active: {
    background: "#ffffff", // white
    borderColor: "#3b82f6", // blue-500 equivalent
    color: "#3b82f6", // blue-500 equivalent
  },
  complete: {
    background: "#3b82f6", // blue-500 equivalent
    borderColor: "#3b82f6", // blue-500 equivalent
  },
};

let rippleTransition = {
  duration: t(0.6),
  delay: t(0.2),
  type: "tween",
  ease: "circOut",
};

let rippleVariants = {
  inactive: {
    background: "var(--blue-200)",
  },
  active: {
    background: "var(--blue-200)",
    scale: 1,
    transition: {
      duration: t(0.3),
      type: "tween",
      ease: "circOut",
    },
  },
  complete: {
    background: "var(--blue-200)",
    scale: 1.25,
  },
};

let checkIconTransition = {
  ease: "easeOut",
  type: "tween",
  delay: t(0.2),
  duration: t(0.3),
};
let checkIconVariants = {
  complete: {
    pathLength: [0, 1],
  },
};

export default function ProgressSection() {
  // States
  const [address, setAddress] = useState<Address | null>(null); // Address
  const [addresses, setAddresses] = useState<Address[]>([]); // Addresses
  let [step, setStep] = useState(1); // Step for the progress
  const [items, setItems] = useState<any[]>([]); // Items in the cart
  const [cartItems, setCartItems] = useState<any[]>([]); // Cart items
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [order, setOrder] = useState<Order>(); // Order
  const [coupon, setCoupon] = useState(""); // Coupon code
  const [couponStatus, setCouponStatus] = useState<"success" | "error" | "idle">("idle"); // Coupon status
  const [isCouponValidating, setIsCouponValidating] = useState(false); // Coupon validating state

  // Hooks
  const [user, loading] = useAuthState(auth); // User
  const { cart, clearCart } = useCartStore(); // Cart store
  const { toast } = useToast(); // Toast hook
  const router = useRouter();
  const { change } = useChangeStore();

  // ------ Effects ------
  // Set the cart items
  useEffect(() => {
    setCartItems(cart);
  }, [cart]);

  // Fetch addresses from the database
  useEffect(() => {
    const fetchAddresses = async () => {
      setIsLoading(true);
      const res = await fetch(`/api/users/${user?.uid}`);
      const data = await res.json();
      setAddresses(data.user.addresses);
      console.log("Addresses", data.user.addresses);
      setIsLoading(false);
    };

    if (user && !loading) fetchAddresses(); // Fetch addresses from the database on mount
  }, [user, loading, change]);

  // Fetch items from the database and create an order
  useEffect(() => {
    const fetchItems = async () => {
      const res = await fetch("/api/products");
      const data = await res.json();

      setCartItems(cart);

      const newOrder = createOrder(
        user?.uid as string,
        cartItems,
        address as Address,
        address as Address,
        data.products
      );
      console.log("New Order", newOrder);
      setItems(newOrder.items);
      setOrder(newOrder);
    };

    if (address && cartItems.length !== 0) fetchItems(); // Fetch items from the database on mount and create an order
  }, [address, cart]); // eslint-disable-line

  // ---- Handlers ----
  // Posting the order to the database
  const postOrder = async () => {
    setIsLoading(true);

    const message = `New order placed by ${user?.displayName}. Order ID: ${order?.id}.`;

    await fetch("/api/whatsapp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });

    console.log("Discount while posting the order", order?.fare.discount);

    if (order?.fare.discount) {
      console.log("Applying coupon", coupon, "Discount", order?.fare.discount);
      await fetch("/api/coupons/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user?.uid, orderId: order?.id, placedAt: order?.placedAt, code: coupon }),
      });
    }

    const res = await fetch("/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    });
    if (res.ok) {
      clearCart();
      toast({
        title: "Order placed",
        description: "Your order has been placed successfully.",
        duration: 2000,
      });
    }
    console.log(res.json());
    return res.ok;
  };

  // Applying the coupon code to the order
  const applyCoupon = async () => {
    try {
      setCouponStatus("idle");
      setIsCouponValidating(true);
      const res = await fetch(`/api/coupons/validate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code: coupon, subtotal: order?.fare.total, userId: user?.uid }),
      });

      if (res.ok) {
        const data = await res.json();
        toast({
          title: "Coupon applied",
          description: data.message,
          duration: 2000,
        });
        setCouponStatus("success");
        const newFare = {
          total: order?.fare.total as number,
          shipping: order?.fare.shipping as number,
          discount: data.discount as number,
          amountPaid: data.total as number,
        };
        const newOrder = { ...order, fare: newFare };
        setOrder(newOrder as Order);
      } else {
        res.json().then((data) => {
          toast({
            title: "Coupon not applied",
            description: data.message,
            variant: "destructive",
            duration: 2000,
          });
          setCouponStatus("error");
        });
      }
      setIsCouponValidating(false);
    } catch (error) {
      console.error(error);
    }
  };

  // ---- Actions ----
  // Next button action
  const nextAction = () => {
    if (address === null) {
      toast({
        title: "Address not selected",
        description: "Please select address to proceed for the next page.",
        variant: "destructive",
        duration: 2000,
      });
      return;
    }

    setStep(step > 3 ? step : step + 1);

    if (step === 2) {
      postOrder();
      setIsLoading(false);
    }
    if (step === 3) {
      setIsLoading(true);
      router.push("/shop");
    }
  };

  // Back button action
  const previousAction = () => {
    setStep(step < 2 ? step : step - 1);
  };

  return (
    <main className="lg:px-10 md:px-6 px-2 flex min-h-screen items-start pt-10">
      <AppInitializer />
      <div className=" mx-auto w-full rounded-2xl bg-white border-2 border-neutral-100 shadow-sm">
        <div className="flex justify-between rounded py-8 max-w-[700px] mx-auto px-4 md:px-0 sm:px-8">
          <div className="flex flex-col gap-1 items-center">
            <Step step={1} currentStep={step} />
            <h3 className="font-medium text-neutral-800">Address</h3>
          </div>
          <div className="flex flex-col gap-1 items-center">
            <Step step={2} currentStep={step} />
            <h3 className="font-medium text-neutral-800">Review</h3>
          </div>
          <div className="flex flex-col gap-1 items-center">
            <Step step={3} currentStep={step} />
            <h3 className="font-medium text-neutral-800">Confirm</h3>
          </div>
        </div>

        <motion.section animate={{ display: "hidden" }} transition={{ duration: 0.3 }} className="sm:px-8 px-2">
          {step === 1 && (
            <AddressSection
              selectedAddress={address}
              selectAddress={setAddress}
              addresses={addresses}
              isLoading={isLoading}
            />
          )}
        </motion.section>

        <motion.section animate={{ display: "hidden" }} transition={{ duration: 0.3 }} className="sm:px-8 px-2 ">
          {step === 2 && order?.fare && (
            <ReviewSection
              fare={order?.fare}
              address={address as Address}
              items={items ?? []}
              paymentMethod="COD"
              applyCoupon={applyCoupon}
              setCoupon={setCoupon}
              couponStatus={couponStatus}
              isCouponValidating={isCouponValidating}
              coupon={coupon}
            />
          )}
        </motion.section>

        <motion.section animate={{ display: "hidden" }} transition={{ duration: 0.3 }} className="sm:px-8 px-2 ">
          {step === 3 && order?.fare && <Confirmation order={order} />}
        </motion.section>

        <div className="sm:px-8 px-2 pb-8">
          <div className="mt-10 flex justify-between">
            <motion.button
              animate={step < 2 || step === 3 ? { opacity: 0 } : { opacity: 1 }}
              onClick={() => previousAction()}
              className="rounded px-2 py-1 text-slate-400 hover:text-slate-700"
            >
              Back
            </motion.button>
            <button
              onClick={() => nextAction()}
              disabled={isLoading}
              className={`${
                step > 3 ? "pointer-events-none opacity-50" : ""
              } bg flex items-center justify-center rounded-full bg-blue-500 py-1.5 px-3.5 font-medium tracking-tight text-white hover:bg-blue-600 active:bg-blue-700`}
            >
              {step >= 1 && step <= 2 ? "Next" : "Continue Shopping"}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

function Step({ step, currentStep }: { step: number; currentStep: number }) {
  let status = currentStep === step ? "active" : currentStep < step ? "inactive" : "complete";

  return (
    <motion.div animate={status} initial={status} className="relative">
      <motion.div transition={rippleTransition} variants={rippleVariants} className="absolute inset-0 rounded-full" />

      <motion.div
        variants={backgroundVariants}
        transition={backgroundTransition}
        className="relative flex h-10 w-10 items-center justify-center rounded-full border-2 border-slate-400 bg-white font-semibold text-slate-500"
      >
        <div className="relative flex items-center justify-center">
          <AnimatePresence>
            {status === "complete" ? (
              <CheckIcon className="h-6 w-6 text-white" />
            ) : (
              <motion.span key="step" animate={{ opacity: 1 }} exit={{ scale: 0.5, opacity: 0 }} className="absolute">
                {step}
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
}

function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
      <motion.path
        variants={checkIconVariants}
        transition={checkIconTransition}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5 13l4 4L19 7"
      />
    </svg>
  );
}
