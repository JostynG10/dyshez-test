import React from "react";
import styles from "@styles/FiltersLoader.module.css";

/**
 * FiltersLoader component is a skeleton loader for the OrdersFilters.
 * It shows a loading state while the component is charging.
 */
export default function FiltersLoader() {
  return (
    <section className={styles.container}>
      <div
        className={`${styles.loader} ${styles.skeleton} ${styles.loaderAll}`}
      ></div>
      <div
        className={`${styles.loader} ${styles.skeleton} ${styles.loaderAccepted}`}
      ></div>
      <div
        className={`${styles.loader} ${styles.skeleton} ${styles.loaderRejected}`}
      ></div>
    </section>
  );
}
