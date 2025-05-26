import React from "react";
import styles from "@styles/PicturesPage.module.css";
import UserPictures from "@components/UserPictures";
import PicturesPreview from "@components/PicturesPreview";

export default function PicturesPage() {
  return (
    <section className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Imágenes</h1>
      </header>

      <div className={styles.content}>
        <UserPictures />
        <PicturesPreview />
      </div>
    </section>
  );
}
