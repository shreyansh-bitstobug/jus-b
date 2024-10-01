// ImageUpload.js
import React, { useState } from "react";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { storage } from "@/firebase/config"; // Import your Firebase setup

interface ImageUploadProps {
  onUploadComplete: (url: string) => void;
}

export const handleDelete = async (uploadedUrl: string) => {
  if (!uploadedUrl) return;

  const fileName = uploadedUrl.split("/").pop()?.split("?")[0]; // Extract file name from URL
  const storageRef = ref(storage, `images/${fileName}`);

  try {
    await deleteObject(storageRef);
    console.log("File deleted successfully");
  } catch (error) {
    console.error("Error deleting file:", error);
  }
};

const ImageUpload: React.FC<ImageUploadProps> = ({ onUploadComplete }) => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    const storageRef = ref(storage, `images/${file.name}`);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);

    // Call the parent function with the URL
    onUploadComplete(url);
    setFile(null); // Clear the file input
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default ImageUpload;
