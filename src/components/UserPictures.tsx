"use client";

import React, { useEffect, useMemo } from "react";
import { usePictures } from "@hooks/usePictures";
import { FiTrash2 } from "react-icons/fi";
import Image from "next/image";
import UploadPictures from "@components/UploadPictures";
import styles from "@styles/UserPictures.module.css";

export default function UserPictures() {
  const { fetchPictures, removePicture, pictures, loading /*, error*/ } =
    usePictures();

  useEffect(() => {
    fetchPictures();
    // eslint-disable-next-line
  }, []);

  const memorizedPictures = useMemo(() => {
    return pictures.map((picture, index) => (
      <div key={index} className={styles.pictureBox}>
        <button
          onClick={() => removePicture(picture.name)}
          className={styles.deleteButton}
        >
          <FiTrash2 className={styles.deleteIcon} />
        </button>

        <Image
          src={picture.url}
          fill
          alt="Imagen del usuario"
          className={styles.picture}
          sizes="124px"
          priority={true}
        />
      </div>
    ));
    
    // eslint-disable-next-line
  }, [pictures]);

  return (
    <section className={styles.container}>
      <UploadPictures />

      {loading ? <PicturesLoader /> : memorizedPictures}
    </section>
  );
}

function PicturesLoader() {
  return (
    <>
      {Array.from({ length: 20 }).map((_, idx) => (
        <div key={idx} className={`${styles.pictureBox} ${styles.skeleton}`} />
      ))}
    </>
  );
}
