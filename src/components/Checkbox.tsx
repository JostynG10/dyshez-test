import React, { forwardRef } from "react";
import { FaRegSquare, FaSquareCheck } from "react-icons/fa6";
import CheckboxProps from "@interfaces/CheckboxProps";
import styles from "@styles/Checkbox.module.css";

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, checked, ...props }, ref) => {
    const [isChecked, setIsChecked] = React.useState(!!checked);

    const handleCheckboxChange = () => {
      setIsChecked(!isChecked);
    };

    return (
      <div className={styles.container}>
        <button
          onClick={handleCheckboxChange}
          className={styles.button}
          type="button"
          tabIndex={-1}
        >
          {isChecked ? (
            <FaSquareCheck className={`${styles.icon} ${styles.iconChecked}`} />
          ) : (
            <FaRegSquare className={styles.icon} />
          )}
        </button>
        <label className={styles.label}>
          {label}
          <input
            type="checkbox"
            ref={ref}
            className={styles.input}
            checked={isChecked}
            onChange={handleCheckboxChange}
            {...props}
          />
        </label>
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";

export default Checkbox;
