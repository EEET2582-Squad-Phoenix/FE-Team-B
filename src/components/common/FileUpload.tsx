import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";
import Image from "next/image";

interface FileUploadProps {
  onImagesChange: (base64Files: string[]) => void;
  onVideosChange: (base64Files: string[]) => void;
  maxImages?: number;
  maxVideos?: number;
}

interface FileWithPreview extends File {
  base64?: string;
}

const FileUpload: React.FC<FileUploadProps> = ({
  onImagesChange,
  onVideosChange,
  maxImages = 15,
  maxVideos = 4,
}) => {
  const [imageFiles, setImageFiles] = useState<FileWithPreview[]>([]);
  const [videoFiles, setVideoFiles] = useState<FileWithPreview[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [videoPreviews, setVideoPreviews] = useState<string[]>([]);

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, type: "image" | "video") => {
      const files = Array.from(e.target.files || []);

      if (type === "image") {
        if (imageFiles.length + files.length > maxImages) {
          alert(`You can only upload up to ${maxImages} images`);
          return;
        }

        const newImageFiles = [...imageFiles, ...files] as FileWithPreview[];
        setImageFiles(newImageFiles);

        const newPreviews = files.map((file) => URL.createObjectURL(file));
        setImagePreviews((prev) => [...prev, ...newPreviews]);

        Promise.all<string>(
          files.map(
            (file) =>
              new Promise((resolve) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result as string);
                reader.readAsDataURL(file);
              })
          )
        ).then((base64Files) => {
          onImagesChange([
            ...imageFiles.map((f) => f.base64 || ""),
            ...base64Files,
          ]);
        });
      } else {
        if (videoFiles.length + files.length > maxVideos) {
          alert(`You can only upload up to ${maxVideos} videos`);
          return;
        }

        const newVideoFiles = [...videoFiles, ...files] as FileWithPreview[];
        setVideoFiles(newVideoFiles);

        const newPreviews = files.map((file) => URL.createObjectURL(file));
        setVideoPreviews((prev) => [...prev, ...newPreviews]);

        Promise.all<string>(
          files.map(
            (file) =>
              new Promise((resolve) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result as string);
                reader.readAsDataURL(file);
              })
          )
        ).then((base64Files) => {
          onVideosChange([
            ...videoFiles.map((f) => f.base64 || ""),
            ...base64Files,
          ]);
        });
      }
    },
    [
      imageFiles,
      videoFiles,
      maxImages,
      maxVideos,
      onImagesChange,
      onVideosChange,
    ]
  );

  const removeFile = (index: number, type: "image" | "video") => {
    if (type === "image") {
      const newImageFiles = imageFiles.filter((_, i) => i !== index);
      const newPreviews = imagePreviews.filter((_, i) => i !== index);
      setImageFiles(newImageFiles);
      setImagePreviews(newPreviews);
      onImagesChange(newImageFiles.map((f) => f.base64 || ""));
    } else {
      const newVideoFiles = videoFiles.filter((_, i) => i !== index);
      const newPreviews = videoPreviews.filter((_, i) => i !== index);
      setVideoFiles(newVideoFiles);
      setVideoPreviews(newPreviews);
      onVideosChange(newVideoFiles.map((f) => f.base64 || ""));
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <Label className="mb-2 block">
          Images ({imageFiles.length}/{maxImages})
        </Label>
        <div className="flex flex-wrap gap-2 mb-2">
          {imagePreviews.map((preview, index) => (
            <div key={preview} className="relative">
              <Image
                src={preview}
                alt={`Preview ${index}`}
                className="h-20 w-20 object-cover rounded"
                width={80}
                height={80}
              ></Image>
              <button
                onClick={() => removeFile(index, "image")}
                className="absolute -top-2 -right-2 p-1 bg-red-500 rounded-full text-white"
                type="button"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
        <input
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          id="image-upload"
          onChange={(e) => handleFileChange(e, "image")}
        />
        <Button
          onClick={() => document.getElementById("image-upload")?.click()}
          variant="outline"
          className="w-full"
          type="button"
        >
          Upload Images
        </Button>
      </div>

      <div>
        <Label className="mb-2 block">
          Videos ({videoFiles.length}/{maxVideos})
        </Label>
        <div className="flex flex-wrap gap-2 mb-2">
          {videoPreviews.map((preview, index) => (
            <div key={preview} className="relative">
              <video src={preview} className="h-20 w-20 object-cover rounded" />
              <button
                onClick={() => removeFile(index, "video")}
                className="absolute -top-2 -right-2 p-1 bg-red-500 rounded-full text-white"
                type="button"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
        <input
          type="file"
          accept="video/*"
          multiple
          className="hidden"
          id="video-upload"
          onChange={(e) => handleFileChange(e, "video")}
        />
        <Button
          onClick={() => document.getElementById("video-upload")?.click()}
          variant="outline"
          className="w-full"
          type="button"
        >
          Upload Videos
        </Button>
      </div>
    </div>
  );
};

export default FileUpload;
