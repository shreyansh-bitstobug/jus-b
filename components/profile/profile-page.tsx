"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, MapPinIcon, PackageIcon, PhoneIcon, MailIcon, UserIcon, CalendarDaysIcon } from "lucide-react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/config";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ProfilePage() {
  const [userInfo, setUserInfo] = useState({
    firstName: "Emma",
    lastName: "Johnson",
    displayName: "FashionistaEmma",
    email: "emma.johnson@example.com",
    dob: "1990-05-15",
    phone: "+1 234-567-8901",
  });

  // Hooks
  const [user] = useAuthState(auth);
  const router = useRouter();

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
      }));
    }
  }, [user]);

  const addresses = [
    { id: 1, address: "123 Fashion St, Style City, 12345", phone: "+1 234-567-8901", isDefault: true },
    { id: 2, address: "456 Trendy Ave, Chic Town, 67890", phone: "+1 987-654-3210", isDefault: false },
  ];

  const orders = [
    { id: 1, status: "In Progress", date: "2023-05-15", total: "$129.99" },
    { id: 2, status: "Delivered", date: "2023-05-01", total: "$79.99" },
    { id: 3, status: "Delivered", date: "2023-04-20", total: "$149.99" },
  ];

  return (
    <div className="container mx-auto p-6 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">My Profile</h1>
      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="address">Address</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
        </TabsList>
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <UserIcon className="h-5 w-5 text-muted-foreground" />
                  <span className="font-semibold">Name:</span>
                  <span>
                    {userInfo.firstName} {userInfo.lastName}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <UserIcon className="h-5 w-5 text-muted-foreground" />
                  <span className="font-semibold">Display Name:</span>
                  <span>{userInfo.displayName}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MailIcon className="h-5 w-5 text-muted-foreground" />
                  <span className="font-semibold">Email:</span>
                  <span>{userInfo.email}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CalendarDaysIcon className="h-5 w-5 text-muted-foreground" />
                  <span className="font-semibold">Date of Birth:</span>
                  <span>{userInfo.dob}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <PhoneIcon className="h-5 w-5 text-muted-foreground" />
                  <span className="font-semibold">Phone:</span>
                  <span>{userInfo.phone}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="address">
          <div className="space-y-4">
            {addresses.map((address) => (
              <Card key={address.id}>
                <CardContent className="flex flex-col md:flex-row items-start justify-between p-6">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <MapPinIcon className="h-5 w-5 text-muted-foreground" />
                      <span>{address.address}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <PhoneIcon className="h-5 w-5 text-muted-foreground" />
                      <span>{address.phone}</span>
                    </div>
                  </div>
                  <div className="mt-2 md:mt-0">{address.isDefault && <Badge>Default</Badge>}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="orders">
          <div className="space-y-4 flex justify-between items-center gap-10 flex-wrap">
            {orders.map((order) => (
              <Card key={order.id} className="w-2/5 min-w-96 h-full">
                <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                    <span>Order #{order.id}</span>
                    <Badge variant={order.status === "In Progress" ? "default" : "secondary"}>{order.status}</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <CalendarIcon className="h-5 w-5 text-muted-foreground" />
                      <span>{order.date}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <PackageIcon className="h-5 w-5 text-muted-foreground" />
                      <span>{order.total}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
