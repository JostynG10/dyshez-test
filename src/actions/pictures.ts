"use client";

// import { createClient } from "@utils/supabase/server";
import { createClient } from "@utils/supabase/client";

export async function getPictures() {
  try {
    const supabase = await createClient();
    const { data: userData } = await supabase.auth.getUser();

    // Listar archivos en la carpeta del usuario
    const { data, error: listError } = await supabase.storage
      .from("pictures")
      .list(userData.user!.id, { limit: 100 });

    if (listError) return { success: [], error: listError.message };

    const urls: { url: string; name: string }[] = [];
    for (const file of data || []) {
      const { data: signedUrlData, error } = await supabase.storage
        .from("pictures")
        .createSignedUrl(`${userData.user!.id}/${file.name}`, 60 * 60);

      if (error) {
        console.error("Error al obtener URL firmada:", error);
        continue;
      }
      urls.push({ url: signedUrlData.signedUrl, name: file.name });
    }

    return { success: urls, error: null };
  } catch (error) {
    return { success: [], error: (error as Error).message };
  }
}

export async function deletePicture(fileName: string) {
  try {
    const supabase = await createClient();
    const { data: userData } = await supabase.auth.getUser();

    // Eliminar archivo del almacenamiento
    const { error } = await supabase.storage
      .from("pictures")
      .remove([`${userData.user!.id}/${fileName}`]);

    if (error) {
      console.error("Error al eliminar la imagen:", error);
      return { success: false, error: error.message };
    }

    return { success: true, error: null };
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
}
