"use server";

import { createClient } from "@utils/supabase/server";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import type SignUpFormData from "@interfaces/SignUpFormData";
import type SignInFormData from "@interfaces/SignInFormData";
import { getSupabaseErrorMessage } from "@utils/utils";

/**
 * Sign up a new user
 * @param formData - The form data containing user information
 * @returns - An object containing success status and error message if any
 * @description - Signs up a new user using email and password. If successful,
 * returns a success message.
 */
export const signUp = async (formData: SignUpFormData) => {
  const {
    password,
    email,
    firstName,
    lastName,
    phone,
    secondaryPhone,
    website,
  } = formData;
  const supabase = await createClient();

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
      data: {
        first_name: firstName,
        last_name: lastName,
        phone: phone,
        secondary_phone: secondaryPhone ?? null,
        website: website ?? null,
      },
    },
  });

  if (error) {
    // Define error messages for specific error codes
    // Note: The error codes should be replaced with actual Supabase errors
    const errorCodeMessages = {
      weak_password: "La contraseña es muy débil.",
    } as const;

    const message =
      getSupabaseErrorMessage(error, errorCodeMessages) ||
      "Ocurrió un error al registrarse.";
    return { success: false, error: message };
  }

  return { success: true };
};

/**
 * Sign in a user
 * @param formData - The form data containing user credentials
 * @returns - An object containing success status and error message if any or a
 * redirect
 * @description - Signs in a user using email and password. If successful,
 * redirects to the home page.
 */
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
    // Define error messages for specific error codes
    // Note: The error codes should be replaced with actual Supabase errors
    const errorCodeMessages = {
      invalid_credentials: "Las credenciales son inválidas.",
      email_not_confirmed: "El correo electrónico no ha sido confirmado.",
    } as const;

    const message =
      getSupabaseErrorMessage(error, errorCodeMessages) ||
      "Ocurrió un error al iniciar sesión.";
    return { success: false, error: message };
  }

  return redirect("home");
};

/**
 * Sign in a user using OAuth
 * @param provider - The OAuth provider to use for authentication
 * @returns - An object containing success status and error message if any or a
 * redirect
 * @description - Signs in a user using OAuth. If successful, redirects to the
 * callback URL.
 */
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
    // Define error messages for specific error codes
    // Note: The error codes should be replaced with actual Supabase errors
    const errorCodeMessages = {
      invalid_credentials: "Las credenciales son inválidas.",
      email_not_confirmed: "El correo electrónico no ha sido confirmado.",
    } as const;

    const message =
      getSupabaseErrorMessage(error, errorCodeMessages) ||
      "Ocurrió un error al iniciar sesión.";
    return { success: false, error: message };
  }

  return redirect(data.url);
};
