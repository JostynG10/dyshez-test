"use client";

import React, { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useFiltersCount } from "@hooks/useFiltersCount";
import styles from "@styles/orders/OrdersFilters.module.css";

/**
 * OrderFilters component renders the filters buttons for orders.
 * Handles filter changes updating the URL search parameters.
 * It also fetches the counts of accepted and rejected orders.
 */
export default function OrdersFilters() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { fetchCounts, counts, loading } = useFiltersCount();

  /**
   * Get the "status" query parameter to determine which filter is active.
   * This value changes every time the user clicks on the buttons.
   */
  const statusParam = searchParams.get("status");

  useEffect(() => {
    fetchCounts();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (
      statusParam === null ||
      !["all", "accepted", "rejected"].includes(statusParam)
    ) {
      const params = new URLSearchParams(searchParams.toString());
      params.set("status", "all");
      params.set("page", "1");
      router.replace(`?${params.toString()}`);
    }
    // eslint-disable-next-line
  }, [searchParams]);

  /**
   * Handles filter changes by updating the URL query parameter.
   * This will trigger a re-render of the component with the new filter.
   */
  const handleFilterChange = (filter: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("status", filter);
    params.set("page", "1");
    router.replace(`?${params.toString()}`);
  };

  return (
    <section className={styles.container}>
      <button
        onClick={() => handleFilterChange("all")}
        className={`${styles.button} ${
          statusParam === "all" ? styles.buttonSelected : ""
        }`}
      >
        Todos
      </button>
      <button
        onClick={() => handleFilterChange("accepted")}
        className={`${styles.button} ${
          statusParam === "accepted" ? styles.buttonSelected : ""
        }`}
      >
        {loading ? "Aceptados" : `Aceptados (${counts.accepted})`}
      </button>
      <button
        onClick={() => handleFilterChange("rejected")}
        className={`${styles.button} ${
          statusParam === "rejected" ? styles.buttonSelected : ""
        }`}
      >
        {loading ? "Rechazados" : `Rechazados (${counts.rejected})`}
      </button>
    </section>
  );
}
