"use client";

import React from "react";
import { FaArrowRight } from "react-icons/fa6";
import { useForgotPassword } from "@hooks/useForgotPassword";
import InputField from "@components/common/InputField";
import styles from "@styles/auth/ForgotPassword.module.css";

export default function ForgotPasswordPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForgotPassword();

  return (
    <form onSubmit={handleSubmit()} className={styles.form} noValidate>
      <div className={styles.text}>
        <h2 className={styles.title}>Contraseña olvidada</h2>
        <p className={styles.description}>
          Introduzca el correo electrónico asociado a su cuenta y le enviaremos
          un mensaje con instrucciones para cambiar su contraseña.
        </p>
      </div>

      <InputField
        required
        type="text"
        icon="email"
        placeholder="Email"
        {...register("email", {
          required: "Por favor ingrese su correo electrónico.",
          // Validate that email is in the correct format
          pattern: {
            value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
            message: "El correo es inválido.",
          },
        })}
        hasError={!!errors.email}
      />

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
