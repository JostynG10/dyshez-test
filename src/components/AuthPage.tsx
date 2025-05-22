"use client";

import React, { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import SignIn from "@components/SignIn";
import SignUp from "@components/SignUp";
import BackgroundImage from "@components/BackgroundImage";
import styles from "@styles/AuthPage.module.css";

/**
 * AuthPage component handles the authentication UI.
 * It toggles between login and registration forms based on the "mode" query
 * param. Also manages the route and UI state for switching between modes.
 */
export default function AuthPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  /**
   * Get the "mode" query parameter to determine which form to show.
   * This value changes every time the user clicks on the buttons.
   */
  const modeParam = searchParams.get("mode");
  const isLogin = modeParam !== "signup";

  // Redirect to "?mode=signin" if no mode is present in the URL
  useEffect(() => {
    if (modeParam === null) {
      router.replace("?mode=signin");
    }
    // eslint-disable-next-line
  }, [modeParam]);

  /**
   * Handles switching between login and registration modes.
   * Updates the URL query parameter accordingly.
   */
  const handleRoute = (isLogin: boolean) => {
    router.replace(`?mode=${isLogin ? "signin" : "signup"}`);
  };

  return (
    <section className={styles.container}>
      <BackgroundImage />

      <div
        className={`${styles.content} ${
          isLogin ? styles.contentLogin : styles.contentRegister
        }`}
      >
        <header className={styles.header}>
          {/* Buttons to toggle between Login and Register modes */}
          <div className={styles.buttonsBox}>
            <button
              onClick={() => handleRoute(true)}
              className={`${styles.authButton} ${
                isLogin ? styles.authButtonActive : ""
              }`}
              type="button"
            >
              Login
            </button>
            <button
              onClick={() => handleRoute(false)}
              className={`${styles.authButton} ${
                !isLogin ? styles.authButtonActive : ""
              }`}
              type="button"
            >
              Register
            </button>
          </div>

          {/* Animated line indicating the active mode */}
          <div
            className={`${styles.line} ${
              isLogin ? styles.lineLogin : styles.lineRegister
            }`}
          ></div>
        </header>

        <div
          className={`${styles.wrapper} ${
            isLogin ? styles.wrapperLogin : styles.wrapperRegister
          }`}
        >
          {/* The forms are rendered, but only one is visible based on mode */}
          <SignIn key={isLogin ? "signin-active" : "signin-inactive"} />
          <SignUp key={isLogin ? "signup-inactive" : "signup-active"} />
        </div>
      </div>
    </section>
  );
}
