import React from "react";
import Image from "next/image";
import styles from "@styles/auth/BackgroundImage.module.css";

export default function BackgroundImage() {
  return (
    <div className={styles.imageBox}>
      <Image
        className={styles.image}
        src="/images/login-background.svg"
        alt="Imagen de fondo."
        fill
      />
    </div>
  );
}
