import React from "react";
import BackgroundImage from "@components/BackgroundImage";
import styles from "@styles/PasswordLayout.module.css";

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
