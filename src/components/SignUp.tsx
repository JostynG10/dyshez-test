import React from "react";
import { FaArrowRight } from "react-icons/fa6";
import InputField from "./InputField";
import Checkbox from "./Checkbox";
import styles from "@styles/SignUp.module.css";

export default function SignUp() {
  return (
    <form className={styles.container}>
      <p className={styles.text}>
        Únete a la revolución, para comenzar a utilizar la plataforma ingresa
        los siguientes datos y se parte del movimiento de Dyshez.
      </p>

      <div className={styles.row}>
        <InputField
          required={true}
          type="text"
          icon="user"
          placeholder="Nombre(s)"
        />
        <InputField
          required={true}
          type="text"
          icon="user"
          placeholder="Apellidos"
        />
      </div>

      <div className={styles.row}>
        <InputField
          required={true}
          type="phone"
          icon="mobile"
          placeholder="123 456 7890"
        />
        <InputField
          required={true}
          type="phone"
          icon="phone"
          placeholder="123 456 7890"
        />
      </div>

      <div className={styles.row}>
        <InputField
          required={false}
          type="text"
          icon="website"
          placeholder="Sitio web"
        />
        <InputField
          required={true}
          type="text"
          icon="email"
          placeholder="Email"
        />
      </div>

      <div className={styles.row}>
        <InputField required={true} type="password" placeholder="Contraseña" />
        <InputField
          required={true}
          type="password"
          placeholder="Verifica contraseña"
        />
      </div>

      <Checkbox label="Acepto los términos y condiciones" />

      <footer className={styles.footer}>
        <button className={styles.submitButton} type="submit">
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
