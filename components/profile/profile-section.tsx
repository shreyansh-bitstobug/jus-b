"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserType } from "@/lib/types";
import { PhoneIcon, MailIcon, UserIcon, CalendarDaysIcon, PencilIcon, PencilLineIcon, DeleteIcon } from "lucide-react";
import { format } from "date-fns";
import { RiDeleteBin2Line, RiDeleteBin3Line, RiLockPasswordFill, RiLockPasswordLine } from "react-icons/ri";
import { Button } from "../ui/button";
import Link from "next/link";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function ProfileSection({ userInfo }: { userInfo: UserType }) {
  return (
    <section className="space-y-4">
      <Card>
        <CardContent className="p-6">
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
              <PhoneIcon className="h-5 w-5 text-muted-foreground" />
              <span className="font-semibold">Primary Phone:</span>
              <span>{userInfo.phoneNumber}</span>
            </div>
            <div className="flex items-center space-x-2">
              <CalendarDaysIcon className="h-5 w-5 text-muted-foreground" />
              <span className="font-semibold">Date of Birth:</span>
              <span>{format(userInfo.dob, "PP")}</span>
            </div>

            <div className="flex items-center space-x-2">
              <CalendarDaysIcon className="h-5 w-5 text-muted-foreground" />
              <span className="font-semibold">Registered on:</span>
              <span>{format(userInfo.createdAt, "PP")}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex sm:flex-row flex-col justify-between gap-6">
        <Link href="/password-reset">
          <Button className="flex items-center space-x-2 w-fit" variant="outline">
            <RiLockPasswordLine className="h-5 w-5 text-muted-foreground" />
            <span className="font-semibold">Reset Password</span>
          </Button>
        </Link>

        <AlertDialog>
          <AlertDialogTrigger className="text-white bg-destructive hover:bg-destructive/90  p-2 px-4 rounded-sm hover:text-white font-semibold flex items-center gap-2">
            <RiDeleteBin3Line className="h-5 w-5 " />
            <span className="font-semibold">Delete Account Permanently</span>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your account and remove your data from our
                servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <Link href="/delete">
                <AlertDialogAction>Continue</AlertDialogAction>
              </Link>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </section>
  );
}
