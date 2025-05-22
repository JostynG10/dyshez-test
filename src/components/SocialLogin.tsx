"use client";

import React from "react";
import { signInWithOAuth } from "@app/(auth-pages)/auth/actions";
import { toast } from "react-toastify";
import SocialProvider from "@interfaces/SocialProvider";
import Image from "next/image";
import styles from "@styles/SocialLogin.module.css";

const socialProviders: SocialProvider[] = [
  {
    provider: "google",
    logo: "/images/google-logo.svg",
  },
  {
    provider: "github",
    logo: "/images/github-logo.svg",
  },
];

export default function SocialLogin() {
  const handleSignInWidthGoogle = async (provider: "google" | "github") => {
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
      {socialProviders.map((socialProvider, index) => (
        <button
          key={index}
          onClick={() => handleSignInWidthGoogle(socialProvider.provider)}
          className={styles.socialButton}
          type="button"
        >
          <Image
            width={24}
            height={24}
            src={socialProvider.logo}
            alt="Logo de red social."
          />
        </button>
      ))}
    </div>
  );
}
