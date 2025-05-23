import React from "react";
import styles from "@styles/OrdersPage.module.css";

export default function Orders() {
  return (
    <section className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Órdenes</h1>
      </header>

      <div className={styles.content}></div>
    </section>
  );
}
