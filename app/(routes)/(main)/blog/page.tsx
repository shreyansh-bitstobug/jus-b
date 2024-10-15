"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Blog } from "@/lib/schema";
import { format } from "date-fns";
import { useEffect, useState } from "react";

export default function BlogPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  const timestampToDate = (timestamp: any) => new Date(timestamp.seconds * 1000);

  useEffect(() => {
    const fetchBlogs = async () => {
      const response = await fetch("/api/blog");
      const data = await response.json();
      setBlogs(data.blogs);
    };
    fetchBlogs();
  }, []);

  return (
    <main className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">My Blog</h1>

      <div className="space-y-8">
        {blogs.map((blog, index: number) => {
          const createDate = format(new Date(timestampToDate(blog.createdAt)), "PP");
          const updateDate = format(new Date(timestampToDate(blog.updatedAt)), "PP");

          return (
            <Card key={blog.id} className="bg-neutral-100">
              <CardHeader>
                <CardTitle>{blog.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Published on {createDate}
                  {updateDate > createDate && ` (Updated on ${updateDate})`}
                </p>
                {blog.content.map((paragraph, i) => (
                  <p key={i} className="mb-2 last:mb-0">
                    {paragraph}
                  </p>
                ))}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </main>
  );
}
