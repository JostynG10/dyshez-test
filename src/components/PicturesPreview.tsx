"use client";

import React, { useEffect } from "react";
import { usePicturesContext } from "@context/PicturesContext";
import Image from "next/image";
import styles from "@styles/PicturesPreview.module.css";

/**
 * PicturesPreview component displays previews of the selected picture
 * in different aspect ratios: 1:1, 16:9, and 9:16.
 */
export default function PicturesPreview() {
  const { selectedUrl } = usePicturesContext();

  return (
    <section className={styles.container}>
      {selectedUrl ? (
        <>
          {/* 1:1 Preview */}
          <article className={styles.previewBox}>
            <span className={styles.previewTitle}>VISTA 1:1</span>
            <div className={`${styles.pictureBox} ${styles.firstPreview}`}>
              <Picture url={selectedUrl} atl="Formato 1:1" sizes="163.5px" />
            </div>
          </article>

          {/* 16:9 Preview */}
          <article className={styles.previewBox}>
            <span className={styles.previewTitle}>VISTA 16:9</span>
            <div className={`${styles.pictureBox} ${styles.secondPreview}`}>
              <Picture url={selectedUrl} atl="Formato 16:9" sizes="256.5px" />
            </div>
          </article>

          {/* 9:16 Preview */}
          <article className={styles.previewBox}>
            <span className={styles.previewTitle}>VISTA 9:16</span>
            <div className={`${styles.pictureBox} ${styles.thirdPreview}`}>
              <Picture url={selectedUrl} atl="Formato 9:16" sizes="144px" />
            </div>
          </article>
        </>
      ) : (
        <></>
      )}
    </section>
  );
}

/**
 * Picture component is responsible for rendering an image with a skeleton loader
 * while the image is loading. It uses the Next.js Image component for optimized
 */
function Picture({
  url,
  atl,
  sizes,
}: {
  url: string;
  atl: string;
  sizes: string;
}) {
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    // Reset loading state when the URL changes
    setLoading(true);
  }, [url]);

  return (
    <>
      {loading ? (
        <div className={`${styles.pictureLoader} ${styles.skeleton}`} />
      ) : (
        <></>
      )}
      <Image
        key={url}
        src={url}
        fill
        alt={atl}
        sizes={sizes}
        className={styles.picture}
        priority={true}
        onLoad={() => setLoading(false)}
      />
    </>
  );
}
