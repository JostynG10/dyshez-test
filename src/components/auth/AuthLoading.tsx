import React from "react";
import { LiaSpinnerSolid } from "react-icons/lia";
import styles from "@styles/auth/AuthLoading.module.css";

export default function AuthLoading() {
  return (
    <div className={styles.container}>
      <LiaSpinnerSolid className={styles.spinner} />
    </div>
  );
}
