"use client";

import React from "react";
import { FaArrowRight } from "react-icons/fa6";
import { useResetPassword } from "@hooks/useResetPassword";
import InputField from "@components/common/InputField";
import styles from "@styles/auth/ResetPassword.module.css";

export default function ResetPassword() {
  const {
    register,
    handleSubmit,
    watches: { passwordValue, confirmPasswordValue },
    formState: { errors, isSubmitting },
  } = useResetPassword();

  return (
    <form onSubmit={handleSubmit()} className={styles.form}>
      <div className={styles.text}>
        <h2 className={styles.title}>Restablecer contraseña</h2>
        <p className={styles.description}>Introducir una nueva contraseña.</p>
      </div>

      <div className={styles.inputsBox}>
        <InputField
          required
          type="password"
          placeholder="Contraseña"
          {...register("password", {
            required: "Por favor completa todos los campos requeridos.",
            // Validate that password matches confirmPassword
            validate: (value) =>
              value === confirmPasswordValue || "Las contraseñas no coinciden.",
          })}
          hasError={!!errors.password}
        />
        <InputField
          required
          type="password"
          placeholder="Verifica contraseña"
          {...register("confirmPassword", {
            required: "Por favor completa todos los campos requeridos.",
            // Validate that confirmPassword matches password
            validate: (value) =>
              value === passwordValue || "Las contraseñas no coinciden.",
          })}
          hasError={!!errors.confirmPassword}
        />
      </div>

      <div className={styles.buttonsBox}>
        <button
          className={styles.submitButton}
          type="submit"
          disabled={isSubmitting}
        >
          <span className={styles.submitText}>Continuar</span>
          <FaArrowRight className={styles.submitIcon} />
        </button>

        <span className={styles.signIn} tabIndex={0}>
          ¿Recuerdas la contraseña?{" "}
          <a href="/auth?mode=signin" className={styles.redirect}>
            Login
          </a>
        </span>
      </div>
    </form>
  );
}
