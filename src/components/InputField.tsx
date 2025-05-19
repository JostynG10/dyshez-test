import React from "react";
import InputFieldProps from "@/interfaces/InputFieldProps";
import styles from "@styles/InputField.module.css";

export default function InputField({
  icon,
  type,
  placeholder,
  errorMessage,
  required,
}: InputFieldProps) {
  return <section className={styles.container}></section>;
}
