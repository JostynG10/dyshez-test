"use client";

import React from "react";
import { signInWithOAuth } from "@actions/auth";
import { toast } from "react-toastify";
import type SocialProvider from "@interfaces/SocialProvider";
import Image from "next/image";
import styles from "@styles/SocialLogin.module.css";

// List of supported social providers with their logos
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

/**
 * SocialLogin component renders buttons for social authentication.
 * Handles OAuth sign-in and displays toast notifications for errors.
 */
export default function SocialLogin() {
  /**
   * Handles OAuth sign-in for the selected provider.
   * Shows a loading toast and updates it if an error occurs.
   */
  const handleSignInWidthGoogle = async (provider: "google" | "github") => {
    const toastId = toast.loading("Loading...");
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
      {/* Render a button for each social provider */}
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
            alt="Social provider logo."
          />
        </button>
      ))}
    </div>
  );
}
