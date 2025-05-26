import React, { forwardRef } from "react";
import { FaAt, FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { FiLock } from "react-icons/fi";
import { CiMobile1 } from "react-icons/ci";
import { HiOutlineMail } from "react-icons/hi";
import { AiOutlineUser } from "react-icons/ai";
import { LiaPhoneSolid } from "react-icons/lia";
import { TbWorld } from "react-icons/tb";
import type InputFieldProps from "@interfaces/InputFieldProps";
import styles from "@styles/common/InputField.module.css";

// Custom InputField component using forwardRef for React Hook Form support
const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  (
    { icon, type, placeholder = "Escribe aquí.", hasError, required, ...props },
    ref
  ) => {
    const [showPassword, setShowPassword] = React.useState(false);

    const handlePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    return (
      <section className={styles.container}>
        <div
          className={`${styles.wrapper} ${hasError ? styles.wrapperError : ""}`}
        >
          {/* Render icon based on icon prop or input type */}
          {icon
            ? (icon === "at" && <FaAt className={styles.icon} />) ||
              (icon === "lock" && <FiLock className={styles.icon} />) ||
              (icon === "mobile" && <CiMobile1 className={styles.icon} />) ||
              (icon === "email" && <HiOutlineMail className={styles.icon} />) ||
              (icon === "user" && <AiOutlineUser className={styles.icon} />) ||
              (icon === "website" && <TbWorld className={styles.icon} />) ||
              (icon === "phone" && <LiaPhoneSolid className={styles.icon} />)
            : (type === "email" && <HiOutlineMail className={styles.icon} />) ||
              (type === "password" && <FiLock className={styles.icon} />) ||
              (type === "phone" && <CiMobile1 className={styles.icon} />)}

          {/* Show country code for phone input */}
          {type === "phone" && <span className={styles.countryCode}>+52</span>}

          <input
            ref={ref}
            type={type === "password" && showPassword ? "text" : type}
            placeholder={required ? `${placeholder} *` : placeholder}
            className={styles.input}
            {...props}
          />

          {/* Show/hide password button for password fields */}
          {type === "password" && (
            <button
              onClick={handlePasswordVisibility}
              className={styles.eyeButton}
              type="button"
              tabIndex={-1} // Prevents tab focus on the eye button
            >
              {showPassword ? (
                <FaRegEyeSlash className={styles.eyeIcon} />
              ) : (
                <FaRegEye className={styles.eyeIcon} />
              )}
            </button>
          )}
        </div>
      </section>
    );
  }
);

InputField.displayName = "InputField";

export default InputField;
