"use client";

import React from "react";
import { signInWithOAuth } from "@app/(auth-pages)/auth/actions";
import { toast } from "react-toastify";
import Image from "next/image";
import styles from "@styles/SocialLogin.module.css";

export default function SocialLogin() {
  const handleSignInWidthGoogle = async (provider: "google" | "facebook") => {
    const toastId = toast.loading("Cargando...");
    const { error } = await signInWithOAuth(provider);

    if (error) {
      toast.update(toastId, {
        render: error,
        type: "error",
        isLoading: false,
        autoClose: 5000,
      });
    }
  };

  return (
    <div className={styles.socialLogin}>
      <button
        onClick={() => handleSignInWidthGoogle("google")}
        className={styles.socialButton}
        type="button"
      >
        <Image
          width={24}
          height={24}
          src="/images/google-logo.svg"
          alt="Logo de red social."
        />
      </button>
      <button
        onClick={() => handleSignInWidthGoogle("facebook")}
        className={styles.socialButton}
        type="button"
      >
        <Image
          width={24}
          height={24}
          src="/images/facebook-logo.svg"
          alt="Logo de red social."
        />
      </button>
    </div>
  );
}
