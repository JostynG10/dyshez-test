import React from "react";
import BackgroundImage from "@components/auth/BackgroundImage";
import styles from "@styles/auth/PasswordLayout.module.css";

export default function PasswordLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className={styles.container}>
      <BackgroundImage />

      <div className={styles.content}>{children}</div>
    </section>
  );
}
