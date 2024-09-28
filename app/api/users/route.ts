import { db } from "@/firebase/firebaseAdmin";
import { NextResponse } from "next/server";
import { getRepository, initialize } from "fireorm";
import { User } from "@/lib/schema"; // Adjust your import path

// Get all users (GET /api/users)
export async function GET() {
  await initialize(db);
  try {
    const userRepository = getRepository(User);

    // Retrieve all users
    const users = await userRepository.find();

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

    const userRepository = getRepository(User);
    const newUser = new User();
    newUser.userId = userId;
    newUser.firstName = firstName;
    newUser.lastName = lastName;
    newUser.displayName = displayName || "";
    newUser.phoneNumber = phoneNumber || "";
    newUser.dob = dob ? new Date(dob) : null; // Ensure date is in correct format
    newUser.email = email;
    newUser.addresses = addresses || [];
    newUser.createdAt = new Date();
    newUser.updatedAt = new Date();

    await userRepository.create(newUser);

    return NextResponse.json({ message: "User created successfully", user: newUser }, { status: 201 });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json({ message: "Failed to create user", error }, { status: 500 });
  }
}
