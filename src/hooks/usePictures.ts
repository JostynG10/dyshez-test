import { useCallback, useState } from "react";
import { deletePicture, getPictures } from "@actions/pictures";
import { toast } from "react-toastify";

/**
 * Custom hook to handle picture fetching and deletion.
 * Encapsulates state, loading, error handling, and toast notifications.
 */
export function usePictures() {
  const [pictures, setPictures] = useState<{ url: string; name: string }[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  /**
   * Fetches the list of pictures from the server.
   * Handles loading and error states.
   */
  const fetchPictures = useCallback(async () => {
    try {
      setLoading(true);
      setError(false);
      const { success, error } = await getPictures();
      setLoading(false);

      if (error) {
        setError(true);
        return;
      }
      setPictures(success);
    } catch (error) {
      console.error("Error fetching pictures:", error);
      setLoading(false);
      setError(true);
    }
  }, []);

  /**
   * Removes a picture by its file name.
   * Updates the state and shows toast notifications.
   */
  const removePicture = useCallback(async (fileName: string) => {
    const toastId = toast.loading("Eliminando imagen...");
    try {
      const { error } = await deletePicture(fileName);
      setPictures((prevPictures) =>
        prevPictures.filter((picture) => picture.name !== fileName)
      );

      if (error) {
        toast.update(toastId, {
          render: `Error al eliminar la imagen`,
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
        return;
      }
      toast.update(toastId, {
        render: `Imagen eliminada correctamente`,
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
    } catch (error) {
      console.error("Error removing picture:", error);
      toast.update(toastId, {
        render: `Error al eliminar la imagen`,
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  }, []);

  // Returns the state and handler functions for picture management
  return {
    pictures,
    loading,
    error,
    fetchPictures,
    removePicture,
  };
}
