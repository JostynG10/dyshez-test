"use client";

import React from "react";
import { FaPlus } from "react-icons/fa6";
import styles from "@styles/UploadPictures.module.css";
import { useUploadPicture } from "@hooks/useUploadPicture";

/**
 * UploadPictures component allows users to upload multiple images.
 * It provides a button to trigger the file input and handles the file selection.
 */
export default function UploadPictures({
  onUploadComplete,
}: {
  onUploadComplete?: () => void;
}) {
  const { inputRef, uploading, handleButtonClick, handleFileChange } =
    useUploadPicture();

  return (
    <div className={styles.container}>
      <input
        ref={inputRef}
        onChange={(event) => handleFileChange(event, onUploadComplete)}
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
