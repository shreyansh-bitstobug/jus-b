import { db } from "@/firebase/config";
import { NextResponse } from "next/server";
import { Blog } from "@/lib/schema";
import { collection, doc, getDocs, setDoc, deleteDoc, addDoc, updateDoc } from "firebase/firestore";

// Get all blogs (GET /api/blog)
export async function GET() {
  try {
    const blogsCollection = collection(db, "blogs");

    const blogsSnapshot = await getDocs(blogsCollection);

    const blogs: Blog[] = blogsSnapshot.docs.map((doc) => doc.data() as Blog);

    if (blogs.length === 0) {
      return NextResponse.json({ message: "No blogs found" }, { status: 404 });
    }

    return NextResponse.json(
      {
        message: "Blogs retrieved successfully",
        blogs,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json(
      {
        message: "Failed to fetch blogs",
        error,
      },
      { status: 500 }
    );
  }
}

// Create a new blog (POST /api/blog)
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, content } = body;

    // Validate request body
    if (!title || !content || content.length === 0) {
      return NextResponse.json({ message: "Missing required fields: title, content" }, { status: 400 });
    }

    // Create a new blog object
    const newBlog: Blog = {
      id: "", // Firestore will generate the ID
      title: title,
      content: content,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Add the new blog to Firestore (Firestore generates the ID)
    const blogRef = await addDoc(collection(db, "blogs"), newBlog);

    // Update the 'id' field in the Firestore document with the generated ID
    await updateDoc(doc(db, "blogs", blogRef.id), {
      id: blogRef.id,
    });

    // Return the blog with the generated ID included
    newBlog.id = blogRef.id;

    return NextResponse.json({ message: "Blog created successfully", blog: newBlog }, { status: 201 });
  } catch (error) {
    console.error("Error creating blog:", error);
    return NextResponse.json({ message: "Failed to create blog", error }, { status: 500 });
  }
}

// Delete a blog by ID (in body) (DELETE /api/blog/)
export async function DELETE(req: Request) {
  try {
    const body = await req.json();
    const { id } = body;

    const blogRef = doc(db, "blogs", id);
    await deleteDoc(blogRef);

    return NextResponse.json({ message: "Blog deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting blog:", error);
    return NextResponse.json({ message: "Failed to delete blog", error }, { status: 500 });
  }
}
