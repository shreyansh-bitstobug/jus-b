import { db } from "@/firebase/config";
import { NextResponse } from "next/server";
import { User } from "@/lib/schema";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";

// Get user by userId (GET /api/users/[userId])
export async function GET(req: Request, { params }: { params: { userId: string } }) {
  try {
    const { userId } = params;

    const userRef = doc(db, "users", userId);
    const userSnap = await getDoc(userRef);
    if (!userSnap.exists()) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const user = userSnap.data() as User;

    return NextResponse.json(
      {
        message: "User retrieved successfully",
        user,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      {
        message: "Failed to fetch user",
        error,
      },
      { status: 500 }
    );
  }
}

export async function POST(req: Request, { params }: { params: { userId: string } }) {
  try {
    const { userId } = params;

    const body = await req.json();

    const userRef = doc(db, "users", userId);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const user = userSnap.data() as User;

    const { firstName, lastName, displayName, phoneNumber, dob, addresses } = user;

    // Validate request body
    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const newUser: User = {
      ...user,
      firstName: body.firstName || firstName,
      lastName: body.lastName || lastName,
      displayName: body.displayName || displayName || "",
      phoneNumber: body.phoneNumber || phoneNumber || "",
      dob: body.dob || dob ? new Date(body.dob || dob) : null,
      addresses: body.addresses || addresses || [],
      updatedAt: new Date(),
    };

    await setDoc(userRef, newUser);

    return NextResponse.json({ message: "User details updated successfully", user: newUser }, { status: 201 });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json({ message: "Failed to create user", error }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { userId: string } }) {
  try {
    const { userId } = params;

    const userRef = doc(db, "users", userId);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    await setDoc(userRef, { ...userSnap.data(), deletedAt: new Date() });

    return NextResponse.json({ message: "User deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json({ message: "Failed to delete user", error }, { status: 500 });
  }
}
