import React from "react";
import styles from "@styles/orders/ResultLoader.module.css";

/**
 * ResultLoader component is a skeleton loader for the OrdersResult's table.
 * It shows a loading state while the component is charging.
 */
export default function ResultLoader({
  numberOfRows = 20,
}: {
  numberOfRows?: number | null;
}) {
  return (
    <tbody>
      {Array.from({ length: numberOfRows ?? 20 }).map((_, idx) => (
        <tr key={idx} className={styles.loadingRow}>
          <td className={styles.loadingCell}>
            <div className={styles.skeleton}></div>
          </td>
          <td className={styles.loadingCell}>
            <div className={styles.skeleton}></div>
          </td>
          <td className={styles.loadingCell}>
            <div className={styles.skeleton}></div>
          </td>
          <td className={styles.loadingCell}>
            <div className={styles.skeleton}></div>
          </td>
          <td className={styles.loadingCell}>
            <div className={styles.skeleton}></div>
          </td>
          <td className={styles.loadingCell}>
            <div className={styles.skeleton}></div>
          </td>
          <td className={styles.loadingCell}>
            <div className={styles.skeleton}></div>
          </td>
          <td className={styles.loadingCell}>
            <div className={styles.skeleton}></div>
          </td>
        </tr>
      ))}
    </tbody>
  );
}
