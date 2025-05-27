"use server";

import { createClient } from "@utils/supabase/server";
import { headers } from "next/headers";
import { getSupabaseErrorMessage } from "@utils/utils";
import type SignUpFormData from "@interfaces/SignUpFormData";
import type SignInFormData from "@interfaces/SignInFormData";

/**
 * Sign up a new user
 * @param formData - The form data containing user information
 * @returns - An object containing success status and error message if any
 * @description - Signs up a new user using email and password. If successful,
 * returns a success message.
 */
export const signUp = async (formData: SignUpFormData) => {
  try {
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
    const origin = (await headers()).get("origin") || undefined;

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
        emailRedirectTo: origin,
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
  } catch (error) {
    console.error("Error during sign up:", error);
    return { success: false, error: "Ocurrió un error al registrarse." };
  }
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
  try {
    const { email, password } = formData;
    const supabase = await createClient();

    if (!email || !password) {
      return {
        success: false,
        error: "Por favor completa todos los campos requeridos.",
      };
    }

    const { error } = await supabase.auth.signInWithPassword({
      email: email,
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

    return { success: true, error: null };
  } catch (error) {
    console.error("Error during sign in:", error);
    return { success: false, error: "Ocurrió un error al iniciar sesión." };
  }
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
  try {
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

    // return redirect(data.url);
    return { success: true, redirectUrl: data.url, error: null };
  } catch (error) {
    console.error("Error during OAuth sign in:", error);
    return { success: false, error: "Ocurrió un error al iniciar sesión." };
  }
};

/**
 * Reset password for a user
 * @param email - The email address of the user
 * @returns - An object containing success status and error message if any
 * @description - Sends a password reset email to the user. If successful,
 * returns a success message.
 */
export const resetPassword = async (email: string) => {
  try {
    const supabase = await createClient();
    const origin = (await headers()).get("origin");

    if (!email) {
      return {
        success: false,
        error: "Por favor ingrese su correo electrónico.",
      };
    }

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${origin}/password/reset`,
    });

    if (error) {
      // Define error messages for specific error codes
      // Note: The error codes should be replaced with actual Supabase errors
      const errorCodeMessages = {
        invalid_email: "El correo electrónico es inválido.",
      } as const;

      const message =
        getSupabaseErrorMessage(error, errorCodeMessages) ||
        "Ocurrió un error al enviar el correo electrónico.";
      return { success: false, error: message };
    }

    return { success: true };
  } catch (error) {
    console.error("Error during password reset:", error);
    return {
      success: false,
      error: "Ocurrió un error al enviar el correo electrónico.",
    };
  }
};

/**
 * Update user password
 * @param password - The new password for the user
 * @param confirmPassword - The confirmation of the new password
 * @returns - An object containing success status and error message if any
 * @description - Updates the user's password. If successful, returns a success
 * message.
 */
export const updatePassword = async (
  password: string,
  confirmPassword: string
) => {
  try {
    const supabase = await createClient();

    if (!password && !confirmPassword) {
      return {
        success: false,
        error: "Por favor completa todos los campos requeridos.",
      };
    }
    if (password !== confirmPassword) {
      return {
        success: false,
        error: "Las contraseñas no coinciden.",
      };
    }

    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      // Define error messages for specific error codes
      // Note: The error codes should be replaced with actual Supabase errors
      const errorCodeMessages = {
        weak_password: "La contraseña es muy débil.",
      } as const;

      const message =
        getSupabaseErrorMessage(error, errorCodeMessages) ||
        "Ocurrió un error al actualizar la contraseña.";
      return { success: false, error: message };
    }

    return { success: true };
  } catch (error) {
    console.error("Error during password update:", error);
    return {
      success: false,
      error: "Ocurrió un error al actualizar la contraseña.",
    };
  }
};
