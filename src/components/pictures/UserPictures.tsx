"use client";

import React, { useEffect, useMemo, useState } from "react";
import { usePictures } from "@hooks/usePictures";
import { FiTrash2 } from "react-icons/fi";
import { usePicturesContext } from "@context/PicturesContext";
import Image from "next/image";
import UploadPictures from "@components/pictures/UploadPictures";
import styles from "@styles/pictures/UserPictures.module.css";

/**
 * UserPictures component displays the user's uploaded pictures,
 * allows uploading new pictures, and provides functionality
 * to remove existing pictures.
 */
export default function UserPictures() {
  const { fetchPictures, removePicture, pictures, loading } = usePictures();
  const { selectedUrl, setSelectedUrl } = usePicturesContext();

  useEffect(() => {
    fetchPictures();
    // eslint-disable-next-line
  }, []);

  const onRemoveClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    pictureName: string,
    pictureUrl: string
  ) => {
    // Prevents the click event on the image from being triggered
    event.stopPropagation();

    if (selectedUrl === pictureUrl) setSelectedUrl(null);
    removePicture(pictureName);
  };

  /**
   * Pictures component renders each picture with a skeleton loader
   * while the image is loading. It also provides a delete button
   * to remove the picture.
   */
  const Pictures = ({ url, name }: { url: string; name: string }) => {
    const [loading, setLoading] = useState(true);

    return (
      <div
        onClick={() => setSelectedUrl(url)}
        className={`${styles.pictureBox} ${
          selectedUrl === url ? styles.pictureBoxSelected : ""
        }`}
      >
        {loading ? (
          <div className={`${styles.pictureBox} ${styles.skeleton}`} />
        ) : (
          <button
            onClick={(event) => onRemoveClick(event, name, url)}
            className={styles.deleteButton}
          >
            <FiTrash2 className={styles.deleteIcon} />
          </button>
        )}
        <Image
          src={url}
          fill
          alt="Imagen del usuario"
          sizes="124px"
          className={styles.picture}
          priority={true}
          onLoad={() => setLoading(false)}
        />
      </div>
    );
  };

  /**
   * memorizedPictures uses useMemo to optimize rendering of pictures.
   * It maps over the pictures array and creates a Pictures component for each picture.
   */
  const memorizedPictures = useMemo(() => {
    return pictures.map((picture, index) => (
      <Pictures key={index} url={picture.url} name={picture.name} />
    ));

    // eslint-disable-next-line
  }, [pictures, selectedUrl]);

  return (
    <section
      className={`${styles.container} ${loading ? styles.withoutScroll : ""}`}
    >
      <UploadPictures onUploadComplete={fetchPictures} />

      {loading ? <PicturesLoader /> : memorizedPictures}
    </section>
  );
}

/**
 * PicturesLoader component displays a skeleton loader
 * while the pictures are being fetched.
 */
function PicturesLoader() {
  return (
    <>
      {Array.from({ length: 20 }).map((_, idx) => (
        <div key={idx} className={`${styles.pictureBox} ${styles.skeleton}`} />
      ))}
    </>
  );
}
