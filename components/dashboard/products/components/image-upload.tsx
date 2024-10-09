import { useState, useEffect } from "react";
import { storage } from "@/firebase/config";
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";

interface MediaPreview {
  id: string;
  file?: File; // Optional for existing images
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

  // Initialize mediaFiles with existing images
  useEffect(() => {
    field.value.forEach((url) => {
      setMediaFiles((prevMediaFiles) => {
        // Check if the URL already exists in mediaFiles
        const exists = prevMediaFiles.some((media) => media.url === url);
        if (exists) return prevMediaFiles;

        // Determine the media type based on the URL
        const type = /\.(jpeg|jpg|gif|png|bmp|webp)(\?|$)/i.test(url) ? "image" : "video";

        // Create a new media object
        const newMedia: MediaPreview = {
          id: uuidv4(), // Generate a unique ID
          url,
          progress: 100,
          uploading: false,
          type: type as "image" | "video",
        };

        return [...prevMediaFiles, newMedia];
      });
    });
  }, [field.value]); // Only depend on field.value

  const handleMediaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);

    selectedFiles.forEach((file) => {
      const mediaId = uuidv4();
      const fileType = file.type.startsWith("image/") ? "image" : "video";
      const newMedia: MediaPreview = {
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

  const handleDelete = async (mediaId: string) => {
    const mediaToDelete = mediaFiles.find((media) => media.id === mediaId);
    if (!mediaToDelete) return;

    if (mediaToDelete.uploading) {
      // If it's a new upload, simply remove it from mediaFiles
      setMediaFiles((prev) => prev.filter((media) => media.id !== mediaId));
    } else {
      try {
        // Parse the storage path from the URL
        const url = new URL(mediaToDelete.url!);
        const pathStartIndex = url.pathname.indexOf("/o/") + 3;
        const pathEndIndex = url.pathname.indexOf("?");
        const filePath = decodeURIComponent(url.pathname.substring(pathStartIndex, pathEndIndex));

        // Create a reference to the file to delete
        const storageRef = ref(storage, filePath);

        // Delete the file from Firebase Storage
        await deleteObject(storageRef);

        // Remove the media from state
        setMediaFiles((prev) => prev.filter((media) => media.id !== mediaId));

        // Update the form state by removing the deleted URL
        field.onChange(field.value.filter((url) => url !== mediaToDelete.url));
      } catch (error) {
        console.error("Error deleting file:", error);
      }
    }
  };

  const handleCancelUpload = (mediaId: string) => {
    setMediaFiles((prev) => prev.filter((media) => media.id !== mediaId));
  };

  // Update the form state whenever the mediaFiles array changes
  useEffect(() => {
    const uploadedUrls = mediaFiles.filter((media) => media.url !== null).map((media) => media.url as string);
    field.onChange(uploadedUrls);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mediaFiles]);

  return (
    <div>
      <input type="file" multiple accept="image/*, video/*" onChange={handleMediaChange} />
      <div className="flex flex-wrap gap-4 mt-4">
        {mediaFiles.map((media) => (
          <div key={media.id} className="relative w-32 h-32">
            {media.uploading ? (
              <div className="absolute inset-0 bg-gray-200 bg-opacity-50 flex flex-col items-center justify-center">
                <p>{Math.round(media.progress)}%</p>
                <button
                  onClick={() => handleCancelUpload(media.id)}
                  className="mt-2 px-2 py-1 bg-red-500 text-white rounded"
                >
                  Cancel
                </button>
              </div>
            ) : media.type === "image" ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={media.url || URL.createObjectURL(media.file!)}
                alt="Preview"
                className="w-32 h-32 object-cover"
              />
            ) : (
              <video className="w-32 h-32 object-cover" controls>
                <source src={media.url || URL.createObjectURL(media.file!)} type={media.file?.type} />
                Your browser does not support the video tag.
              </video>
            )}
            <button
              type="button"
              onClick={() => handleDelete(media.id)}
              className="absolute top-0 right-0 bg-red-500 text-white px-2 py-1 rounded"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
