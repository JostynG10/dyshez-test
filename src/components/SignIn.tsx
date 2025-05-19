import React from "react";
import { FaArrowRight } from "react-icons/fa6";
import Image from "next/image";
import InputField from "./InputField";
import styles from "@styles/SignIn.module.css";

export default function SignIn() {
  return (
    <form className={styles.container}>
      <p className={styles.text}>
        Ingresa con tu correo electrónico o tu número de teléfono
      </p>

      <div className={styles.content}>
        <div className={styles.inputsBox}>
          <InputField
            icon="at"
            required={true}
            type="text"
            placeholder="Correo o teléfono"
          />
          <InputField
            required={true}
            type="password"
            placeholder="Contraseña"
          />
        </div>

        <div className={styles.buttonsBox}>
          <button className={styles.submitButton} type="submit">
            <span className={styles.submitText}>Continuar</span>
            <FaArrowRight className={styles.submitIcon} />
          </button>

          <a className={styles.changePassword} type="button">
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
