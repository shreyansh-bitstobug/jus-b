import { useState, useEffect } from "react";
import { storage } from "@/firebase/config";
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";

interface MediaPreview {
  id: string;
  file: File;
  url: string | null;
  progress: number;
  uploading: boolean;
  type: "image" | "video"; // To differentiate between image and video
}

interface ImageUploadProps {
  field: {
    value: string[]; // The URLs of the uploaded media
    onChange: (value: string[]) => void; // Updates the form state
  };
}

export default function ImageUpload({ field }: ImageUploadProps) {
  const [mediaFiles, setMediaFiles] = useState<MediaPreview[]>([]);

  const handleMediaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);

    selectedFiles.forEach((file) => {
      const mediaId = uuidv4();
      const fileType = file.type.startsWith("image/") ? "image" : "video";
      const newMedia = {
        id: mediaId,
        file,
        url: null,
        progress: 0,
        uploading: true,
        type: fileType as "image" | "video",
      };

      setMediaFiles((prev) => [...prev, newMedia]);

      // Upload to Firebase Storage
      const storageRef = ref(storage, `media/${mediaId}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setMediaFiles((prev) => prev.map((media) => (media.id === mediaId ? { ...media, progress } : media)));
        },
        (error) => {
          console.error("Upload failed:", error);
          setMediaFiles((prev) => prev.filter((media) => media.id !== mediaId));
        },
        async () => {
          const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
          setMediaFiles((prev) =>
            prev.map((media) => (media.id === mediaId ? { ...media, url: downloadUrl, uploading: false } : media))
          );
        }
      );
    });
  };

  const handleDelete = (mediaId: string) => {
    const mediaToDelete = mediaFiles.find((media) => media.id === mediaId);
    if (mediaToDelete && mediaToDelete.url) {
      const storageRef = ref(storage, `media/${mediaId}`);
      deleteObject(storageRef)
        .then(() => {
          setMediaFiles((prev) => prev.filter((media) => media.id !== mediaId));
        })
        .catch((error) => console.error("Error deleting file:", error));
    }
  };

  const handleCancelUpload = (mediaId: string) => {
    setMediaFiles((prev) => prev.filter((media) => media.id !== mediaId));
  };

  // Update the form state whenever the mediaFiles array changes
  useEffect(() => {
    const uploadedUrls = mediaFiles.filter((media) => media.url !== null).map((media) => media.url!);
    field.onChange(uploadedUrls);
  }, [mediaFiles]); // eslint-disable-line

  return (
    <div>
      <input type="file" multiple accept="image/*, video/*" onChange={handleMediaChange} />
      <div className="flex flex-wrap gap-4 mt-4">
        {mediaFiles.map((media) => (
          <div key={media.id} className="relative w-32 h-32">
            {media.uploading ? (
              <div className="absolute inset-0 bg-gray-200 bg-opacity-50 flex items-center justify-center">
                <p>{Math.round(media.progress)}%</p>
                <button onClick={() => handleCancelUpload(media.id)} className="ml-2">
                  Cancel
                </button>
              </div>
            ) : media.type === "image" ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={media.url || URL.createObjectURL(media.file)}
                alt="Preview"
                className="w-32 h-32 object-cover"
              />
            ) : (
              <video className="w-32 h-32 object-cover" controls>
                <source src={media.url || URL.createObjectURL(media.file)} type={media.file.type} />
                Your browser does not support the video tag.
              </video>
            )}
            <button
              type="button"
              onClick={() => handleDelete(media.id)}
              className="absolute top-0 right-0 bg-red-500 text-white"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
