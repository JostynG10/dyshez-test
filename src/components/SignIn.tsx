import React from "react";
import styles from "@styles/SignIn.module.css";

export default function SignIn() {
  return (
    <div className={styles.container}>
      <p className={styles.text}>
        Ingresa con tu correo electrónico o tu número de teléfono
      </p>
    </div>
  );
}
