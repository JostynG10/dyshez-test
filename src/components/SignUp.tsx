"use client";

import React from "react";
import type { FieldErrors } from "react-hook-form";
import { useForm, Controller } from "react-hook-form";
import { FaArrowRight } from "react-icons/fa6";
import { toast } from "react-toastify";
import { signUpAction } from "@actions/authActions";
import { useRouter } from "next/navigation";
import InputField from "./InputField";
import Checkbox from "./Checkbox";
import SignUpFormData from "@interfaces/SignUpFormData";
import styles from "@styles/SignUp.module.css";

export default function SignUp() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormData>();

  const passwordValue = watch("password");
  const confirmPasswordValue = watch("confirmPassword");

  const onSubmit = async (data: SignUpFormData) => {
    const toastId = toast.loading("Cargando...");

    const { success, error } = await signUpAction(data);

    if (error) {
      toast.update(toastId, {
        render: error,
        type: "error",
        isLoading: false,
        autoClose: 5000,
      });
    }
    if (success) {
      toast.update(toastId, {
        render: "Registro exitoso, revisa tu correo para verificar tu cuenta.",
        type: "success",
        isLoading: false,
        autoClose: 5000,
      });
      router.replace("?mode=signin");
    }
  };

  const onError = (errors: FieldErrors<SignUpFormData>) => {
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
