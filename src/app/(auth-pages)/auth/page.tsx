"use client";

import React, { useState } from "react";
import Image from "next/image";
import SignIn from "@/components/SignIn";
import SignUp from "@/components/SignUp";
import styles from "@styles/Auth.module.css";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);

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
              onClick={() => setIsLogin(true)}
              className={`${styles.authButton} ${
                isLogin ? styles.authButtonActive : ""
              }`}
              type="button"
            >
              Login
            </button>
            <button
              onClick={() => setIsLogin(false)}
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
          <SignIn />
          <SignUp />
        </div>
      </div>
    </section>
  );
}
