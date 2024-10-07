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
import { useChangeStore, useModalStore, useProfileStore } from "@/hooks/use-store";
import OrderSection from "./order-section";
import { orders } from "@/lib/data";
import { Address, User } from "@/lib/schema";
import { Skeleton } from "../ui/skeleton";

export default function ProfilePage() {
  const [userInfo, setUserInfo] = useState<User>();
  const [addresses, setAddresses] = useState<Address[]>();
  const [isLoading, setIsLoading] = useState(true);

  // Convert timestamp to date
  const timestampToDate = (timestamp: any) => new Date(timestamp.seconds * 1000);

  // Hooks
  const [user, loading, error] = useAuthState(auth);
  const router = useRouter();
  const { openModal } = useModalStore();
  const { setProfile } = useProfileStore();
  const { change } = useChangeStore();

  // Redirect to sign-in page if user is not signed in
  if (!user) router.push("/sign-in?redirect=profile");

  // Fetch user data
  useEffect(() => {
    const fetchDbUser = async () => {
      const res = await fetch(`/api/users/${user?.uid}`);
      const data = await res.json();
      setUserInfo({
        ...data.user,
        dob: timestampToDate(data.user.dob),
        createdAt: timestampToDate(data.user.createdAt),
      });
      setAddresses(data.user.addresses);
      setIsLoading(false);
    };

    // If not loading and user, fetch user data from the database
    if (!loading && user) fetchDbUser();
  }, [user?.uid, change]);

  // Handlers
  const handleAddAddress = () => {
    openModal("addressForm");
  };

  const handleEditProfile = () => {
    setProfile({
      firstName: userInfo?.firstName || "",
      lastName: userInfo?.lastName,
      displayName: userInfo?.displayName || "",
      email: userInfo?.email || "",
      dob: userInfo?.dob || null,
      phoneNumber: userInfo?.phoneNumber,
    });
    openModal("profile");
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
            <Button className="flex items-center space-x-2 w-fit" variant="outline" onClick={handleEditProfile}>
              <PencilIcon className="h-5 w-5 text-muted-foreground" />
              <span className="font-semibold ">Edit Profile</span>
            </Button>
          </div>

          {isLoading ? <Skeleton className="w-full h-[50vh]" /> : <ProfileSection userInfo={userInfo as User} />}
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
          <AddressSection addresses={addresses as Address[]} />
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
