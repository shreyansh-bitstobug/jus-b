"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PencilIcon, Plus } from "lucide-react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/config";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AddressSection from "./address-section";
import ProfileSection from "./profile-section";
import { Button } from "../ui/button";
import { useModalStore } from "@/hooks/use-store";
import { OrderType } from "@/lib/types";
import OrderSection from "./order-section";
import { orders } from "@/lib/data";

export const addressesSample = [
  {
    id: "a1",
    name: "John Doe",
    address: ["123 Main St", "Apt 4B"],
    city: "New York",
    state: "NY",
    country: "USA",
    postalCode: "10001",
    phoneNumber: "+1 555-555-5555",
    default: true,
  },
  {
    id: "a2",
    name: "Will Doe",
    address: ["123 White House", "Room 40024"],
    city: "Indore",
    state: "NY",
    country: "USA",
    postalCode: "10001",
    phoneNumber: "+1 555-555-5555",
    default: false,
  },
];

export default function ProfilePage() {
  const [userInfo, setUserInfo] = useState({
    id: "u12345",
    userId: "user001",
    firstName: "John",
    lastName: "Doe",
    displayName: "johnny_doe",
    phoneNumber: "+1 555-555-5555",
    dob: new Date("1990-08-15"),
    email: "john.doe@example.com",
    addresses: addressesSample,
    createdAt: new Date("2023-01-01"),
    updatedAt: new Date("2023-09-13"),
  });

  // Hooks
  const [user] = useAuthState(auth);
  const router = useRouter();
  const { openModal } = useModalStore();

  // Redirect to sign-in page if user is not signed in
  if (!user) router.push("/sign-in?redirect=profile");

  // Fetch user data
  useEffect(() => {
    if (user) {
      const name = user.displayName?.split(" ");
      setUserInfo((prev) => ({
        ...prev,
        firstName: name ? name[0] : "",
        lastName: name ? name[1] : "",
        email: user.email || "",
        createdAt: new Date(user.metadata.creationTime || ""),
      }));
    }
  }, [user]);

  const addresses = userInfo.addresses;

  // Handlers
  const handleAddAddress = () => {
    openModal("addressForm");
  };

  return (
    <div className="container mx-auto p-6 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">My Profile</h1>
      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="address">Address</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile">
          <div className="flex justify-between items-center mb-4">
            <h1 className="font-semibold text-2xl">User Info</h1>
            <Button className="flex items-center space-x-2 w-fit" variant="outline">
              <PencilIcon className="h-5 w-5 text-muted-foreground" />
              <span className="font-semibold ">Edit Profile</span>
            </Button>
          </div>

          <ProfileSection userInfo={userInfo} />
        </TabsContent>

        {/* Address Tab */}
        <TabsContent value="address">
          <div className="flex justify-between items-center mb-4">
            <h1 className="font-semibold text-2xl ">Address</h1>
            <Button className="flex items-center space-x-2 w-fit" onClick={handleAddAddress} variant="outline">
              <Plus className="h-5 w-5 text-muted-foreground" />
              <span className="font-semibold">Add new</span>
            </Button>
          </div>
          <AddressSection addresses={addresses} />
        </TabsContent>

        {/* Orders Tab */}
        <TabsContent value="orders">
          <h1 className="font-semibold text-2xl mb-4">Order History</h1>
          <OrderSection />
        </TabsContent>
      </Tabs>
    </div>
  );
}
