import { db } from "@/firebase/config";
import { NextResponse } from "next/server";
import { User } from "@/lib/schema";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";

// Get all users (GET /api/users)
export async function GET() {
  try {
    const usersCollection = collection(db, "users");

    const usersSnapshot = await getDocs(usersCollection);

    const users: User[] = usersSnapshot.docs.map((doc) => doc.data() as User);

    if (users.length === 0) {
      return NextResponse.json({ message: "No users found" }, { status: 404 });
    }

    return NextResponse.json(
      {
        message: "Users retrieved successfully",
        users,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      {
        message: "Failed to fetch users",
        error,
      },
      { status: 500 }
    );
  }
}

// Create a new user (POST /api/users)
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userId, displayName, phoneNumber, dob, email, addresses } = body;

    const firstName = body.displayName.split(" ")[0];
    const lastName = body.displayName.split(" ").slice(1).join(" ");

    // Validate request body
    if (!userId || !displayName || !email) {
      return NextResponse.json(
        { message: "Missing required fields: userId, firstName, lastName, email" },
        { status: 400 }
      );
    }

    const newUser: User = {
      id: userId,
      userId: userId,
      firstName: firstName,
      lastName: lastName,
      displayName: displayName || "",
      phoneNumber: phoneNumber || "",
      dob: dob ? new Date(dob) : null,
      email: email,
      addresses: addresses || [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await setDoc(doc(db, "users", newUser.id), newUser);

    return NextResponse.json({ message: "User created successfully", user: newUser }, { status: 201 });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json({ message: "Failed to create user", error }, { status: 500 });
  }
}
