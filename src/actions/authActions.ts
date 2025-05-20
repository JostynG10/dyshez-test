"use server";

import SignUpFormData from "@interfaces/SignUpFormData";
import { createClient } from "@utils/supabase/server";
import { headers } from "next/headers";

export const signUpAction = async (formData: SignUpFormData) => {
  const { email, password, mobile } = formData;
  const supabase = await createClient();
  const origin = (await headers()).get("origin");

  if (!email || !password) {
    return {
      success: false,
      error: "Por favor completa todos los campos requeridos.",
    };
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
      data: { phone: mobile },
    },
  });

  if (error) {
    return { success: false, error: error.message };
  }
  return { success: true };
};
