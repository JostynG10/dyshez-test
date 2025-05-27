"use client";

import React from "react";
import { FaArrowRight } from "react-icons/fa6";
import { useSignUp } from "@hooks/useSignUp";
import InputField from "@components/common/InputField";
import Checkbox from "@components/common/Checkbox";
import styles from "@styles/auth/SignUp.module.css";

/**
 * SignUp component renders the registration form for new users.
 * Handles form validation and submission using useSignUp hook.
 */
export default function SignUp() {
  const {
    register,
    handleSubmit,
    Controller,
    control,
    watches: { passwordValue, confirmPasswordValue },
    formState: { errors, isSubmitting },
  } = useSignUp();

  return (
    <form className={styles.container} onSubmit={handleSubmit()} noValidate>
      <p className={styles.text}>
        Únete a la revolución, para comenzar a utilizar la plataforma ingresa
        los siguientes datos y se parte del movimiento de Dyshez.
      </p>

      <div className={styles.inputsBox}>
        <div className={styles.row}>
          <InputField
            required
            type="text"
            icon="user"
            placeholder="Nombre(s)"
            {...register("firstName", {
              required: "Por favor completa todos los campos requeridos.",
            })}
            hasError={!!errors.firstName}
          />
          <InputField
            required
            type="text"
            icon="user"
            placeholder="Apellidos"
            {...register("lastName", {
              required: "Por favor completa todos los campos requeridos.",
            })}
            hasError={!!errors.lastName}
          />
        </div>

        <div className={styles.row}>
          <InputField
            required
            type="phone"
            icon="mobile"
            placeholder="123 456 7890"
            {...register("phone", {
              required: "Por favor completa todos los campos requeridos.",
            })}
            hasError={!!errors.phone}
          />
          <InputField
            type="phone"
            icon="phone"
            placeholder="123 456 7890"
            {...register("secondaryPhone")}
          />
        </div>

        <div className={styles.row}>
          <InputField
            type="text"
            icon="website"
            placeholder="Sitio web"
            {...register("website")}
          />
          <InputField
            required
            type="text"
            icon="email"
            placeholder="Email"
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
        </div>

        <div className={styles.row}>
          <InputField
            required
            type="password"
            placeholder="Contraseña"
            {...register("password", {
              required: "Por favor completa todos los campos requeridos.",
              // Validate that password matches confirmPassword
              validate: (value) =>
                value === confirmPasswordValue ||
                "Las contraseñas no coinciden.",
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
      </div>

      {/* The Checkbox component needs the Controller component to be able to handle
      the status, validation and events of this type, since it does so directly
      with register. */}
      <Controller
        name="terms"
        control={control}
        rules={{
          required: "Por favor acepta los términos y condiciones.",
        }}
        render={({ field }) => (
          <Checkbox
            label="Acepto los términos y condiciones"
            checked={!!field.value}
            onChange={field.onChange}
            onBlur={field.onBlur}
            name={field.name}
            ref={field.ref}
          />
        )}
      />

      <footer className={styles.footer}>
        <button
          className={styles.submitButton}
          type="submit"
          disabled={isSubmitting}
        >
          <span className={styles.submitText}>Crear cuenta</span>
          <FaArrowRight className={styles.submitIcon} />
        </button>

        <span className={styles.span}>
          Si ya tienes un restaurante en Dyshez y quieres agregar una nueva
          sucursal, conoce cómo hacerlo
        </span>
      </footer>
    </form>
  );
}
