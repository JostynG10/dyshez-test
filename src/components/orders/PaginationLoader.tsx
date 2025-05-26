import React from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import styles from "@styles/orders/PaginationLoader.module.css";

/**
 * PaginationLoader component is a skeleton loader for the OrdersPagination.
 * It shows a loading state while the component is charging.
 */
export default function PaginationLoader() {
  return (
    <section className={styles.container}>
      <FaAngleLeft className={styles.arrowIcon} />
      <div className={styles.pagesBox}>
        <div className={`${styles.buttonLoading} ${styles.skeleton}`}></div>
        {Array.from({ length: 5 }).map((_, idx) => (
          <div key={idx} className={styles.buttonLoading}>
            <div className={`${styles.numberLoading} ${styles.skeleton}`}></div>
          </div>
        ))}
      </div>
      <FaAngleRight className={styles.arrowIcon} />
    </section>
  );
}
