import React from "react";
import { PicturesProvider } from "@context/PicturesContext";
import UserPictures from "@components/pictures/UserPictures";
import PicturesPreview from "@components/pictures/PicturesPreview";
import styles from "@styles/pictures/PicturesPage.module.css";

/**
 * PicturesPage represents the page for managing user pictures.
 */
export default function PicturesPage() {
  return (
    <section className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Imágenes</h1>
      </header>

      <div className={styles.content}>
        <PicturesProvider>
          <UserPictures />
          <PicturesPreview />
        </PicturesProvider>
      </div>
    </section>
  );
}
