"use server";

import { createClient } from "@utils/supabase/server";
import { headers } from "next/headers";
import SignUpFormData from "@interfaces/SignUpFormData";
import SignInFormData from "@interfaces/SignInFormData";
import { redirect } from "next/navigation";

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
    const errorMessages = {
      weak_password: "La contraseña es muy débil.",
    };

    const code = error.code as keyof typeof errorMessages | undefined;
    const message =
      code && errorMessages[code]
        ? errorMessages[code]
        : "Ocurrió un error al registrarte.";

    return { success: false, error: message };
  }
  return { success: true };
};

export const signInAction = async (formData: SignInFormData) => {
  const { user, password } = formData;
  const supabase = await createClient();

  if (!user || !password) {
    return {
      success: false,
      error: "Por favor completa todos los campos requeridos.",
    };
  }

  const { error } = await supabase.auth.signInWithPassword({
    email: user,
    password,
  });

  if (error) {
    const errorMessages = {
      invalid_credentials: "Las credenciales son inválidas.",
      email_not_confirmed: "El correo electrónico no ha sido confirmado.",
    } as const;

    const code = error.code as keyof typeof errorMessages | undefined;
    const message =
      code && errorMessages[code]
        ? errorMessages[code]
        : "Ocurrió un error al iniciar sesión.";

    return { success: false, error: message };
  }

  return redirect("home");
};
