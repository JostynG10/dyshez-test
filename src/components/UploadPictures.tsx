"use client";

import React from "react";
import { FaPlus } from "react-icons/fa6";
import styles from "@styles/UploadPictures.module.css";
import { useUploadPicture } from "@hooks/useUploadPicture";

export default function UploadPictures() {
  const { inputRef, uploading, handleButtonClick, handleFileChange } =
    useUploadPicture();

  return (
    <div className={styles.container}>
      <input
        ref={inputRef}
        onChange={handleFileChange}
        className={styles.input}
        type="file"
        multiple
        accept="image/*"
      />
      <button
        onClick={handleButtonClick}
        className={styles.button}
        disabled={uploading}
      >
        <FaPlus className={styles.icon} />
      </button>
    </div>
  );
}
