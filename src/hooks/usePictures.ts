import { deletePicture, getPictures } from "@actions/pictures";
import { useState } from "react";

export function usePictures() {
  const [pictures, setPictures] = useState<{ url: string; name: string }[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  const fetchPictures = async () => {
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
  };

  const removePicture = async (fileName: string) => {
    await deletePicture(fileName);
    setPictures((prevPictures) =>
      prevPictures.filter((picture) => picture.name !== fileName)
    );
  };

  return {
    pictures,
    loading,
    error,
    fetchPictures,
    removePicture,
  };
}
