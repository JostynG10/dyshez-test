"use client";

import React from "react";
import type { FieldErrors } from "react-hook-form";
import { useForm } from "react-hook-form";
import { FaArrowRight } from "react-icons/fa6";
import { toast } from "react-toastify";
import Image from "next/image";
import InputField from "./InputField";
import SignInFormData from "@interfaces/SignInFormData";
import styles from "@styles/SignIn.module.css";

export default function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormData>();

  const onSubmit = (data: SignInFormData) => {
    console.log(data);
  };

  const onError = (errors: FieldErrors<SignInFormData>) => {
    const firstError = Object.values(errors)[0];
    if (firstError) {
      toast.error(firstError.message);
    }
  };

  return (
    <form
      className={styles.container}
      onSubmit={handleSubmit(onSubmit, onError)}
      noValidate
    >
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
            {...register("user", {
              required: "Por favor completa todos los campos requeridos.",
            })}
            hasError={!!errors.user}
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

          <a className={styles.changePassword} tabIndex={0}>
            ¿Olvidaste tu contraseña?
          </a>
        </div>
      </div>

      <div className={styles.socialLogin}>
        <button className={styles.socialButton} type="button">
          <Image
            width={24}
            height={24}
            src="/images/google-logo.svg"
            alt="Logo de red social."
          />
        </button>
        <button className={styles.socialButton} type="button">
          <Image
            width={24}
            height={24}
            src="/images/facebook-logo.svg"
            alt="Logo de red social."
          />
        </button>
      </div>
    </form>
  );
}
