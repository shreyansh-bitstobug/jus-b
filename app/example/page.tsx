"use client";
import ImageUpload from "@/components/image-upload";

export default function Page() {
  return (
    <div>
      <ImageUpload onUploadComplete={(url) => console.log(url)} />
    </div>
  );
}
