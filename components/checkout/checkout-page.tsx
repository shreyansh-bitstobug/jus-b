"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import AddressSection from "../checkout/address-section";
import { addressesSample } from "../profile/profile-page";
import { AddressType } from "@/lib/types";
import { useToast } from "@/components/ui/use-toast";
import ReviewSection from "./review-section";

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
  const [address, setAddress] = useState<AddressType | null>(null); // Address
  let [step, setStep] = useState(1); // Step for the progress

  // Hooks
  const { toast } = useToast(); // Toast hook

  // ---- Handlers ----
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
  };

  // Back button action
  const previousAction = () => {
    setStep(step < 2 ? step : step - 1);
  };

  return (
    <main className="container flex min-h-screen items-start  pt-10">
      <div className=" mx-auto w-full rounded-2xl bg-white border-2 border-neutral-100 shadow-sm">
        <div className="flex justify-between rounded py-8 max-w-[700px] mx-auto">
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

        <motion.section animate={{ display: "hidden" }} transition={{ duration: 0.3 }} className="px-8">
          {step === 1 && (
            <AddressSection selectedAddress={address} selectAddress={setAddress} addresses={addressesSample} />
          )}
        </motion.section>

        <motion.section animate={{ display: "hidden" }} transition={{ duration: 0.3 }} className="px-8">
          {step === 2 && <ReviewSection address={address as AddressType} />}
        </motion.section>

        <div className="px-8 pb-8">
          <div className="mt-10 flex justify-between">
            <motion.button
              animate={step < 2 ? { opacity: 0 } : { opacity: 1 }}
              onClick={() => previousAction()}
              className="rounded px-2 py-1 text-slate-400 hover:text-slate-700"
            >
              Back
            </motion.button>
            <button
              onClick={() => nextAction()}
              className={`${
                step > 3 ? "pointer-events-none opacity-50" : ""
              } bg flex items-center justify-center rounded-full bg-blue-500 py-1.5 px-3.5 font-medium tracking-tight text-white hover:bg-blue-600 active:bg-blue-700`}
            >
              {step === 1 ? "Review" : step === 2 ? "Confirm" : "Continue Shopping"}
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
