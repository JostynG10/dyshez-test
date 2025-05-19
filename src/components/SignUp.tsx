import React from "react";
import { useForm } from "react-hook-form";
import { FaArrowRight } from "react-icons/fa6";
import InputField from "./InputField";
import Checkbox from "./Checkbox";
import SignUpFormData from "@/interfaces/SignUpFormData";
import styles from "@styles/SignUp.module.css";

export default function SignUp() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormData>();

  const passwordValue = watch("password");
  const confirmPasswordValue = watch("confirmPassword");

  const onSubmit = (data: SignUpFormData) => {
    // Aquí procesas el registro
    console.log(data);
  };

  return (
    <form
      className={styles.container}
      onSubmit={handleSubmit(onSubmit)}
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
          {...register("name", { required: "El nombre es obligatorio" })}
          errorMessage={errors.name?.message}
        />
        <InputField
          required
          type="text"
          icon="user"
          placeholder="Apellidos"
          {...register("lastName", { required: "El apellido es obligatorio" })}
          errorMessage={errors.lastName?.message}
        />
      </div>

      <div className={styles.row}>
        <InputField
          required
          type="phone"
          icon="mobile"
          placeholder="123 456 7890"
          {...register("mobile", { required: "El celular es obligatorio" })}
          errorMessage={errors.mobile?.message}
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
            required: "El email es obligatorio",
            pattern: {
              value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
              message: "Email inválido",
            },
          })}
          errorMessage={errors.email?.message}
        />
      </div>

      <div className={styles.row}>
        <InputField
          required
          type="password"
          placeholder="Contraseña"
          {...register("password", {
            required: "La contraseña es obligatoria",
            validate: (value) =>
              value === confirmPasswordValue || "Las contraseñas no coinciden",
          })}
          errorMessage={errors.password?.message}
        />
        <InputField
          required
          type="password"
          placeholder="Verifica contraseña"
          {...register("confirmPassword", {
            required: "Debes confirmar tu contraseña",
            validate: (value) =>
              value === passwordValue || "Las contraseñas no coinciden",
          })}
          errorMessage={errors.confirmPassword?.message}
        />
      </div>

      <Checkbox label="Acepto los términos y condiciones" />

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
