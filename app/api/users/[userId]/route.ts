import { db } from "@/firebase/config";
import { NextResponse } from "next/server";
import { getRepository, initialize } from "fireorm";
import { User } from "@/lib/schema"; // Adjust your import path

// Get user by userId (GET /api/users/[userId])
export async function GET(req: Request, { params }: { params: { userId: string } }) {
  await initialize(db);

  try {
    const userRepository = getRepository(User);
    const { userId } = params;

    // Query user by userId
    const user = await userRepository.whereEqualTo("userId", userId).findOne();

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

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
