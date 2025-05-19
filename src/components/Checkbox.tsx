import React from "react";
import { FaRegSquare, FaSquareCheck } from "react-icons/fa6";
import CheckBoxProps from "@/interfaces/checkBoxProps";
import styles from "@styles/Checkbox.module.css";

export default function Checkbox({ checked = false, label }: CheckBoxProps) {
  const [isChecked, setIsChecked] = React.useState(checked);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div className={styles.container}>
      <button
        onClick={handleCheckboxChange}
        className={styles.button}
        type="button"
      >
        {isChecked ? (
          <FaSquareCheck
            className={`${styles.icon} ${isChecked ? styles.iconChecked : ""}`}
          />
        ) : (
          <FaRegSquare className={styles.icon} />
        )}
      </button>
      <label className={styles.label}>{label}</label>
      <input checked={isChecked} className={styles.input} type="checkbox" />
    </div>
  );
}
