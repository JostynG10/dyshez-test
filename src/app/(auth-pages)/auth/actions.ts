"use server";

import { createClient } from "@utils/supabase/server";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import SignUpFormData from "@interfaces/SignUpFormData";
import SignInFormData from "@interfaces/SignInFormData";

export const signUp = async (formData: SignUpFormData) => {
  const { password, email, name, lastName, mobile, phone, website } = formData;
  const supabase = await createClient();

  if (!email || !password) {
    return {
      success: false,
      error: "Por favor completa todos los campos requeridos.",
    };
  }

  const { data, error: signUpError } = await supabase.auth.signUp({
    email: email,
    password: password,
  });

  if (signUpError) {
    const errorMessages = {
      weak_password: "La contraseña es muy débil.",
    };

    const code = signUpError.code as keyof typeof errorMessages | undefined;
    const message =
      code && errorMessages[code]
        ? errorMessages[code]
        : "Ocurrió un error al registrarte.";

    return { success: false, error: message };
  }

  const { error: insertError } = await supabase
    .from("profiles")
    .insert([
      {
        user_id: data.user!.id,
        name: name,
        last_names: lastName,
        primary_phone: mobile,
        secondary_phone: phone ?? null,
        website: website ?? null,
      },
    ])
    .select();

  if (insertError) {
    console.log(insertError);
    const errorMessages = {
      invalid_email: "El correo electrónico es inválido.",
      invalid_phone: "El número de teléfono es inválido.",
    };

    const code = insertError.code as keyof typeof errorMessages | undefined;
    const message =
      code && errorMessages[code]
        ? errorMessages[code]
        : "Ocurrió un error al registrarte.";

    return { success: false, error: message };
  }

  return { success: true };
};

export const signIn = async (formData: SignInFormData) => {
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

export const signInWithOAuth = async (provider: "google" | "github") => {
  const supabase = await createClient();
  const origin = (await headers()).get("origin");

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${origin}/auth/callback`,
    },
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

  return redirect(data.url);
};
