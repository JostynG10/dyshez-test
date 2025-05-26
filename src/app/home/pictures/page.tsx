import React from "react";
import styles from "@styles/PicturesPage.module.css";
import UserPictures from "@components/UserPictures";
import PicturesPreview from "@components/PicturesPreview";
import { PicturesProvider } from "@/context/PicturesContext";

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
