"use client";

import { createClient } from "@utils/supabase/client";
import type PictureObject from "@interfaces/PictureObject";

/**
 * Fetches a list of picture URLs for the authenticated user.
 * @returns - An object containing the list of picture URLs and any error message.
 * @description - This function retrieves the list of pictures uploaded by the user
 */
export async function getPictures() {
  try {
    const supabase = await createClient();
    const { data: userData } = await supabase.auth.getUser();

    // List files in the user's folder
    const { data: files, error: filesError } = await supabase.storage
      .from("pictures")
      .list(userData.user!.id, { limit: 100 });
    if (filesError) return { success: [], error: filesError.message };

    const urls: PictureObject[] = [];
    for (const file of files || []) {
      // Get signed URL for each file
      const { data: signedUrl, error: urlError } = await supabase.storage
        .from("pictures")
        .createSignedUrl(`${userData.user!.id}/${file.name}`, 60 * 60);
      if (urlError) {
        console.error("Error al obtener URL firmada:", urlError);
        continue;
      }
      urls.push({ url: signedUrl.signedUrl, name: file.name });
    }

    return { success: urls, error: null };
  } catch (error) {
    console.error("Error fetching pictures:", error);
    return { success: [], error: "Ocurrió un error al obtener las imágenes." };
  }
}

/**
 * Deletes a picture from the user's storage.
 * @param fileName - The name of the file to delete.
 * @returns - An object indicating success or failure and any error message.
 * @description - Deletes a picture from the user's storage.
 */
export async function deletePicture(fileName: string) {
  try {
    const supabase = await createClient();
    const { data: userData } = await supabase.auth.getUser();

    // Delete file from storage
    const { error } = await supabase.storage
      .from("pictures")
      .remove([`${userData.user!.id}/${fileName}`]);

    if (error) {
      console.error("Error al eliminar la imagen:", error);
      return { success: false, error: error.message };
    }

    return { success: true, error: null };
  } catch (error) {
    console.error("Error deleting picture:", error);
    return { success: false, error: "Ocurrió un error al eliminar la imagen." };
  }
}
