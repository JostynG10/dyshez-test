import React from "react";
import { LuArrowUpDown } from "react-icons/lu";
import { IoIosArrowRoundDown, IoIosArrowRoundUp } from "react-icons/io";
import type SortBy from "@interfaces/SortBy";
import styles from "@styles/orders/OrdersTable.module.css";

/**
 * OrdersTable component is responsible for rendering the table header and
 * sorting buttons for the orders list. It receives the sorting function and
 * the current sorting state as props.
 */
export default function OrdersTable({
  handleSort = null,
  sortBy = null,
  children = null,
}: {
  handleSort?: ((orderBy: string) => void) | null;
  sortBy?: SortBy | null;
  children?: React.ReactNode | null;
}) {
  const handleSortClick = (orderBy: string) => {
    if (handleSort) handleSort(orderBy);
  };

  function SortButton({ column }: { column: string }) {
    return (
      <button
        onClick={() => handleSortClick(column)}
        className={`${styles.sortButton} ${
          sortBy && sortBy.orderBy === column ? styles.sortButtonActive : ""
        }`}
      >
        {!!sortBy && sortBy.orderBy === column ? (
          sortBy.order === "asc" ? (
            <IoIosArrowRoundDown className={styles.sortIcon} />
          ) : (
            <IoIosArrowRoundUp className={styles.sortIcon} />
          )
        ) : (
          <LuArrowUpDown className={styles.sortIcon} />
        )}
      </button>
    );
  }

  return (
    <table className={styles.table}>
      <thead>
        <tr className={styles.tableHeadRow}>
          <th className={styles.tableHead}>
            <span className={styles.tableTitle}>
              ID de orden <SortButton column="id" />
            </span>
          </th>
          <th className={`${styles.tableHead} ${styles.tableHeadExpanded} ${styles.tableHeadName}`}>
            <span className={styles.tableTitle}>
              Cliente <SortButton column="customer" />
            </span>
          </th>
          <th className={`${styles.tableHead} ${styles.tableHeadCompact}`}>
            <span className={styles.tableTitle}>
              Fecha <SortButton column="date" />
            </span>
          </th>
          <th className={`${styles.tableHead} ${styles.tableHeadCompact}`}>
            <span className={styles.tableTitle}>
              Hora <SortButton column="hour" />
            </span>
          </th>
          <th className={`${styles.tableHead} ${styles.tableHeadCompact}`}>
            <span className={styles.tableTitle}>
              Modo <SortButton column="delivery_method" />
            </span>
          </th>
          <th className={`${styles.tableHead} ${styles.tableHeadCompact}`}>
            <span className={styles.tableTitle}>
              Total <SortButton column="total_price" />
            </span>
          </th>
          <th className={`${styles.tableHead} ${styles.tableHeadExpanded}`}>
            <span className={styles.tableTitle}>
              Método de pago <SortButton column="payment_method" />
            </span>
          </th>
          <th className={styles.tableHead}>
            <span className={styles.tableTitle}>
              Estado <SortButton column="order_status" />
            </span>
          </th>
        </tr>
      </thead>
      {!children ? <tbody></tbody> : children}
    </table>
  );
}
