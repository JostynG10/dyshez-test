import React from "react";
import Image from "next/image";
import styles from "@styles/auth/AuthLayout.module.css";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className={styles.container}>
      <section className={styles.wrapper}>
        <div className={styles.welcome}>
          <Image
            width={194}
            height={47.15}
            src="/images/logo.svg"
            alt="Logo."
          />
          <h1 className={styles.title}>¡Bienvenido de vuelta!</h1>
        </div>

        <div className={styles.content}>{children}</div>
      </section>
    </main>
  );
}
