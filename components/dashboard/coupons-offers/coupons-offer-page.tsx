"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { useChangeStore, useDashCurrencyStore } from "@/hooks/use-store";
import { formatCurrency } from "@/lib/functions";
import { Coupons } from "@/lib/schema";
import { useCallback, useEffect, useState } from "react";
import EditCouponsForm from "./components/edit-coupons-form";
import { cn } from "@/lib/utils";
import { Pencil, Plus } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import AddCouponsForm from "./components/add-coupons-form";

export default function CouponsOfferPage() {
  const [offer, setOffer] = useState("");
  const [offerInDb, setOfferInDb] = useState("");
  const [coupons, setCoupons] = useState<Coupons[]>();
  const [currencyCoupons, setCurrencyCoupons] = useState<any[]>();
  const [isEditCouponFormOpen, setIsEditCouponFormOpen] = useState(false);
  const [isAddCouponFormOpen, setIsAddCouponFormOpen] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState<Coupons>();

  const { currency } = useDashCurrencyStore();

  useEffect(() => {
    const getOffer = async () => {
      const response = await fetch("/api/offer");
      const data = await response.json();
      if (response.ok) {
        setOfferInDb(data.offers[0].offer);
        setOffer(data.offers[0].offer);
      } else {
        console.error("Error fetching offer:", data.error);
      }
    };
    getOffer();
  }, []);

  const getCoupons = useCallback(async () => {
    try {
      const response = await fetch("/api/coupons");
      const data = await response.json();
      if (response.ok) {
        const fetchedCoupons = await Promise.all(
          data.coupons.map(async (coupon: Coupons) => ({
            ...coupon,
            value:
              coupon.discountType === "percentage"
                ? `${coupon.value}% off`
                : `Flat ${await formatCurrency(coupon.value, currency)}`,
            maxDiscount: await formatCurrency(coupon.maxDiscount, currency),
          }))
        );
        setCoupons(data.coupons);
        setCurrencyCoupons(fetchedCoupons);
      } else {
        console.error("Error fetching coupons:", data.error);
      }
    } catch (error) {
      console.error("Error fetching coupons:", error);
    }
  }, [currency]); // Only depend on currency

  // Fetch coupons only when currency changes or after adding/editing a coupon
  useEffect(() => {
    if (!isEditCouponFormOpen && !isAddCouponFormOpen) {
      getCoupons(); // Call getCoupons only when needed
    }
  }, [getCoupons, isEditCouponFormOpen, isAddCouponFormOpen]);

  const handleEdit = (id: string) => {
    const findCoupon = coupons?.find((coupon) => coupon.id === id);
    if (findCoupon) {
      setSelectedCoupon(findCoupon);
      setIsEditCouponFormOpen(true);
    }
  };

  const handleActive = (id: string) => {
    const activeCoupon = coupons?.find((coupon) => coupon.id === id);
    if (activeCoupon) {
      const updateCoupon = async () => {
        const response = await fetch(`/api/coupons/${id}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            maxDiscount: activeCoupon.maxDiscount,
            value: activeCoupon.value,
            code: activeCoupon.code,
            isActive: !activeCoupon.isActive,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          setCoupons((prev) =>
            prev?.map((coupon) => {
              if (coupon.id === id) {
                return { ...coupon, isActive: !coupon.isActive };
              }
              return coupon;
            })
          );
          toast({
            title: "Coupon updated successfully",
            description: `Coupon ${activeCoupon.isActive ? "deactivated" : "activated"} successfully`,
          });
        } else {
          toast({
            title: "Failed to update coupon",
            description: data.error,
            variant: "destructive",
          });
        }
      };
      updateCoupon();
    }
  };

  const handleOfferSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const postOffer = async () => {
      const response = await fetch("/api/offer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ offer }),
      });
      const data = await response.json();
      if (response.ok) {
        toast({
          title: "Offer created successfully",
          description: "Offer has been created successfully",
        });
      } else {
        toast({
          title: "Failed to create offer",
          description: data.error,
          variant: "destructive",
        });
      }
    };
    postOffer();
  };

  return (
    <main className="flex flex-col gap-8 container">
      <h1 className="text-3xl font-bold uppercase">Coupons & Offer</h1>

      {selectedCoupon && (
        <EditCouponsForm isOpen={isEditCouponFormOpen} coupon={selectedCoupon} setIsOpen={setIsEditCouponFormOpen} />
      )}

      <AddCouponsForm isOpen={isAddCouponFormOpen} setIsOpen={setIsAddCouponFormOpen} />

      <div className="flex flex-col gap-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold uppercase">Offer</h1>
          <form className="max-w-[500px] space-y-2">
            <Label htmlFor="offer" className="text-xl font-semibold">
              Top Bar Offer &#40;Max 50 characters&#41; : {offer.length} / 50
            </Label>
            <div className="flex gap-2">
              <Input
                id="offer"
                placeholder="Enter offer for top bar"
                onChange={(e) => {
                  e.target.value.length <= 50 && setOffer(e.target.value);
                }}
                value={offer}
                autoFocus
              />
              <Button type="submit" onClick={handleOfferSubmit}>
                Change Offer
              </Button>
            </div>
            {/* <p className="text-sm text-muted-foreground">{offer.length} / 50 characters allowed only</p> */}
          </form>
        </div>

        <h2 className="text-2xl font-medium bg-white rounded-lg p-4 border border-neutral-200">
          Current Offer on website: <span className="font-bold">&#34;{offerInDb}&#34;</span>
        </h2>
      </div>

      <Separator />

      <div className="">
        <div className="mb-4 flex justify-between">
          <h1 className="text-3xl font-bold uppercase">Coupons</h1>
          <Button onClick={() => setIsAddCouponFormOpen(true)}>
            <Plus className="w-4 mr-1" /> Add new coupon
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {currencyCoupons?.map((coupon) => {
            return (
              <Card key={coupon.id} className={cn(coupon.isActive ? "bg-green-200" : "bg-red-200")}>
                <CardHeader>
                  <CardTitle className="flex justify-between">
                    {coupon.code}
                    <Badge className="capitalize">{coupon.discountType}</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2">
                    <p>
                      <span className="font-semibold">Used by: </span>
                      <span>{coupon?.usedBy?.length ?? 0}</span>
                    </p>
                    <p>
                      <span className="font-semibold">Discount: </span>
                      <span>{coupon.value}</span>
                    </p>
                    <p>
                      <span className="font-semibold">Max. discount: </span>
                      <span>{coupon.maxDiscount}</span>
                    </p>
                  </div>
                </CardContent>
                <CardFooter className="gap-4">
                  <Button variant="outline" onClick={() => handleEdit(coupon.id)}>
                    <Pencil className="inline-flex w-4 mr-1" />
                    Edit
                  </Button>
                  <Button
                    className={cn(
                      coupon.isActive
                        ? "bg-red-600 text-white hover:bg-red-700"
                        : "bg-green-600 text-white hover:bg-green-700"
                    )}
                    onClick={() => handleActive(coupon.id)}
                  >
                    {coupon.isActive ? "Deactivate" : "Activate"}
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>
    </main>
  );
}
