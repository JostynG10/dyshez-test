import React, { forwardRef } from "react";
import { FaRegSquare, FaSquareCheck } from "react-icons/fa6";
import type CheckboxProps from "@interfaces/CheckboxProps";
import styles from "@styles/Checkbox.module.css";

// Custom Checkbox component using forwardRef to support React Hook Form
const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, checked, ...props }, ref) => {
    return (
      <label className={styles.container}>
        {/* Native checkbox input, hidden by CSS */}
        <input type="checkbox" ref={ref} className={styles.input} {...props} />

        {checked ? (
          <FaSquareCheck className={`${styles.icon} ${styles.iconChecked}`} />
        ) : (
          <FaRegSquare className={styles.icon} />
        )}
        <span className={styles.label}>{label}</span>
      </label>
    );
  }
);

Checkbox.displayName = "Checkbox";

export default Checkbox;
