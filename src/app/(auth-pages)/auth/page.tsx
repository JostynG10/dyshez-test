"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import SignIn from "@/components/SignIn";
import SignUp from "@/components/SignUp";
import styles from "@styles/Auth.module.css";

export default function Auth() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);

  useEffect(() => {
    const modeParam = searchParams.get("mode");
    if (modeParam === "signup") {
      setIsLogin(false);
    } else {
      setIsLogin(true);
      if (modeParam === null) {
        router.replace("?mode=signin");
      }
    }
    // eslint-disable-next-line
  }, [searchParams]);

  const handleRoute = (isLogin: boolean) => {
    setIsLogin(isLogin);
    router.replace(`?mode=${isLogin ? "signin" : "signup"}`);
  };

  return (
    <section className={styles.container}>
      <div className={styles.imageBox}>
        <Image
          className={styles.image}
          src="/images/login-background.svg"
          alt="Imagen de fondo."
          fill
        />
      </div>

      <div
        className={`${styles.content} ${
          isLogin ? styles.contentLogin : styles.contentRegister
        }`}
      >
        <header className={styles.header}>
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
          <SignIn key={isLogin ? "signin-active" : "signin-inactive"} />
          <SignUp key={isLogin ? "signup-inactive" : "signup-active"} />
        </div>
      </div>
    </section>
  );
}
