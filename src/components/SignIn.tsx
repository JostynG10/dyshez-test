"use client";

import React from "react";
import { FaArrowRight } from "react-icons/fa6";
import { useSignIn } from "@hooks/useSignIn";
import InputField from "./InputField";
import SocialLogin from "@components/SocialLogin";
import styles from "@styles/SignIn.module.css";

/**
 * SignIn component renders the login form for existing users.
 * Handles form validation and submission using useSignIn hook.
 */
export default function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useSignIn();

  return (
    <form className={styles.container} onSubmit={handleSubmit()} noValidate>
      <p className={styles.text}>
        Ingresa con tu correo electrónico o tu número de teléfono
      </p>

      <div className={styles.content}>
        <div className={styles.inputsBox}>
          <InputField
            required
            icon="at"
            type="text"
            placeholder="Correo o teléfono"
            {...register("email", {
              required: "Por favor completa todos los campos requeridos.",
              // Validate that email is in the correct format
              pattern: {
                value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                message: "El correo es inválido.",
              },
            })}
            hasError={!!errors.email}
          />
          <InputField
            required
            type="password"
            placeholder="Contraseña"
            {...register("password", {
              required: "Por favor completa todos los campos requeridos.",
            })}
            hasError={!!errors.password}
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

          <a
            href="/password/forgot"
            className={styles.changePassword}
            tabIndex={0}
          >
            ¿Olvidaste tu contraseña?
          </a>
        </div>
      </div>

      <SocialLogin />
    </form>
  );
}
