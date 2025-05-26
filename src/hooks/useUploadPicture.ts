import { createClient } from "@utils/supabase/client";
import { useRef, useState } from "react";
import { toast } from "react-toastify";

export function useUploadPicture() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const handleButtonClick = () => {
    if (inputRef.current) inputRef.current.click();
  };

  const handleFileChange = async ({
    target: { files },
  }: React.ChangeEvent<HTMLInputElement>) => {
    if (!files || files.length === 0) return;
    const toastId = toast.loading(
      files.length > 1 ? "Subiendo imágenes..." : "Subiendo imagen..."
    );
    try {
      setUploading(true);

      const supabase = await createClient();
      const { data } = await supabase.auth.getUser();

      let picturesWithError = 0;
      for (const file of Array.from(files)) {
        const fileName = crypto.randomUUID();
        const filePath = `${data.user!.id}/${fileName}`;
        const { error: uploadError } = await supabase.storage
          .from("pictures")
          .upload(filePath, file, {
            cacheControl: "3600",
            upsert: true,
          });

        if (uploadError) {
          picturesWithError++;
          continue;
        }
      }

      let message = "Imágenes subidas correctamente";
      let type: "success" | "error" | "warning" = "success";
      if (picturesWithError > 0) {
        if (picturesWithError === files.length) {
          message = "Error subiendo todas las imágenes";
          type = "error";
        } else {
          message = `${
            files.length - picturesWithError
          } imágenes subidas, ${picturesWithError} con error`;
          type = "warning";
        }
      }
      toast.update(toastId, {
        render: message,
        type: type,
        isLoading: false,
        autoClose: 2000,
      });
      setUploading(false);
    } catch (error) {
      console.error("Error uploading pictures:", error);
      toast.update(toastId, {
        render:
          files.length > 1
            ? "Error subiendo imágenes"
            : "Error subiendo imagen",
        type: "error",
        isLoading: false,
        autoClose: 2000,
      });
      setUploading(false);
    }
  };

  return {
    inputRef,
    uploading,
    handleButtonClick,
    handleFileChange,
  };
}
