import { db } from "@/firebase/config";
import { NextResponse } from "next/server";
import { Blog } from "@/lib/schema"; // Adjust your import path
import { doc, setDoc, getDocs, collection } from "firebase/firestore";

// Get all blogs (GET /api/blogs)
export async function GET() {
  try {
    const blogRef = collection(db, "blogs");

    const blogSnap = await getDocs(blogRef);

    const blogs: Blog[] = blogSnap.docs.map((doc) => doc.data() as Blog);

    if (blogs.length === 0) {
      return NextResponse.json({ message: "No users found" }, { status: 404 });
    }

    return NextResponse.json(
      {
        message: "Users retrieved successfully",
        blogs,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json({ message: "Failed to fetch blogs", error }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const blogData: Blog = {
      id: body.blogId,
      title: body.title,
      content: body.content,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await setDoc(doc(db, "blogs", blogData.id), blogData);
    return NextResponse.json({ message: "Blog created", blog: blogData }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Failed to create blog", error }, { status: 500 });
  }
}
