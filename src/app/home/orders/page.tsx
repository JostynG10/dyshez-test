import React, { Suspense } from "react";
import OrdersFilters from "@components/orders/OrdersFilters";
import FiltersLoader from "@components/orders/FiltersLoader";
import OrdersList from "@components/orders/OrdersList";
import styles from "@styles/orders/OrdersPage.module.css";

/**
 * Orders component renders the orders page.
 * It uses React's Suspense to handle loading states.
 */
export default function Orders() {
  return (
    <section className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Órdenes</h1>
      </header>

      <section className={styles.content}>
        <header className={styles.contentHeader}>
          <h2 className={styles.subTitle}>Número de ordenes</h2>
          {/**
           * the Suspense is necessary because OrdersFilters uses searchParams,
           * which can cause issues if not handled asynchronously. Suspense
           * ensures that FiltersLoader is shown while OrdersFilters is loading.
           */}
          <Suspense fallback={<FiltersLoader />}>
            <OrdersFilters />
          </Suspense>
        </header>

        <OrdersList />
      </section>
    </section>
  );
}
