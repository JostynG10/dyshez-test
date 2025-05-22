"use client";

import React from "react";
import { FaArrowRight } from "react-icons/fa6";
import { useSignUpForm } from "@hooks/useSignUpForm";
import InputField from "./InputField";
import Checkbox from "./Checkbox";
import styles from "@styles/SignUp.module.css";

export default function SignUp() {
  const {
    register,
    handleSubmit,
    Controller,
    control,
    watches: { passwordValue, confirmPasswordValue },
    formState: { errors, isSubmitting },
  } = useSignUpForm();

  return (
    <form className={styles.container} onSubmit={handleSubmit()} noValidate>
      <p className={styles.text}>
        Únete a la revolución, para comenzar a utilizar la plataforma ingresa
        los siguientes datos y se parte del movimiento de Dyshez.
      </p>

      <div className={styles.row}>
        <InputField
          required
          type="text"
          icon="user"
          placeholder="Nombre(s)"
          {...register("name", {
            required: "Por favor completa todos los campos requeridos.",
          })}
          hasError={!!errors.name}
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
          {...register("mobile", {
            required: "Por favor completa todos los campos requeridos.",
          })}
          hasError={!!errors.mobile}
        />
        <InputField
          type="phone"
          icon="phone"
          placeholder="123 456 7890"
          {...register("phone")}
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
            validate: (value) =>
              value === passwordValue || "Las contraseñas no coinciden.",
          })}
          hasError={!!errors.confirmPassword}
        />
      </div>

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
