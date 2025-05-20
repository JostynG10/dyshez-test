import React from "react";
import { useForm } from "react-hook-form";
import { FaArrowRight } from "react-icons/fa6";
import InputField from "./InputField";
import Checkbox from "./Checkbox";
import SignUpFormData from "@interfaces/SignUpFormData";
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
          {...register("name", { required: true })}
          hasError={!!errors.name}
        />
        <InputField
          required
          type="text"
          icon="user"
          placeholder="Apellidos"
          {...register("lastName", { required: true })}
          hasError={!!errors.lastName}
        />
      </div>

      <div className={styles.row}>
        <InputField
          required
          type="phone"
          icon="mobile"
          placeholder="123 456 7890"
          {...register("mobile", { required: true })}
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
            required: true,
            pattern: {
              value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
              message: "Email inválido",
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
            required: true,
            validate: (value) => value === confirmPasswordValue,
          })}
          hasError={!!errors.password}
        />
        <InputField
          required
          type="password"
          placeholder="Verifica contraseña"
          {...register("confirmPassword", {
            required: true,
            validate: (value) => value === passwordValue,
          })}
          hasError={!!errors.confirmPassword}
        />
      </div>

      <Checkbox
        label="Acepto los términos y condiciones"
        {...register("terms", { required: true })}
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
