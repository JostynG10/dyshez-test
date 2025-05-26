"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useGetOrders } from "@hooks/useGetOrders";
import { TbPlaylistX } from "react-icons/tb";
import ResultLoader from "@components/orders/ResultLoader";
import OrdersTable from "@components/orders/OrdersTable";
import type GetOrdersProps from "@interfaces/GetOrdersProps";
import type SortBy from "@interfaces/SortBy";
import styles from "@styles/orders/OrdersResult.module.css";

/**
 * This function is used to get the parameters for the fetch request.
 * @param searchParams - Is an object that contains the URL search parameters.
 * @param sortBy - Is an object that contains the orderBy and order properties.
 * @param pageSize - The number of items to be displayed per page.
 * @returns - An object with the parameters to be used in the fetch request.
 * @description - This function takes the search parameters and the sortBy object
 * and returns an object with the parameters to be used in the fetch request.
 */
const getParams = (
  searchParams: URLSearchParams,
  sortBy: SortBy | null,
  pageSize: number = 10
): GetOrdersProps => {
  const page = searchParams.get("page");
  const status = searchParams.get("status");

  const validStatuses = ["all", "accepted", "rejected"] as const;
  type StatusType = (typeof validStatuses)[number];

  const statusValue: StatusType =
    status && validStatuses.includes(status as StatusType)
      ? (status as StatusType)
      : "all";

  const parameters = {
    sortBy,
    pageSize,
    page: Number(page) || 1,
    status: statusValue,
  };

  return parameters;
};

/**
 * OrdersResult component is responsible for rendering the list of orders.
 * It fetches the orders from the database and displays them in a table.
 * It also handles sorting and loading states.
 */
export default function OrdersResult({
  numberOfOrders = null,
}: {
  numberOfOrders: number | null;
}) {
  const [sortBy, setSortBy] = useState<SortBy | null>(null);
  const { orders, loading, fetchOrders } = useGetOrders();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (
      searchParams.get("status") &&
      searchParams.get("page") &&
      numberOfOrders
    ) {
      const params = getParams(searchParams, sortBy, numberOfOrders);
      fetchOrders(params);
    }
    // eslint-disable-next-line
  }, [searchParams, sortBy, numberOfOrders]);

  const handleSort = (orderBy: string) => {
    if (sortBy?.orderBy === orderBy) {
      setSortBy({ orderBy, order: sortBy.order === "asc" ? "desc" : "asc" });
    } else {
      setSortBy({ orderBy, order: "desc" });
    }
  };

  if (loading) {
    return (
      <OrdersTable>
        <ResultLoader />
      </OrdersTable>
    );
  }

  if (orders.length === 0) {
    return (
      <>
        <OrdersTable></OrdersTable>

        <section className={styles.noOrders}>
          <div className={styles.noOrdersContent}>
            <TbPlaylistX className={styles.noOrdersIcon} />
            <span className={styles.noOrdersText}>
              No hay órdenes disponibles.
            </span>
          </div>
        </section>
      </>
    );
  }

  return (
    <OrdersTable handleSort={handleSort} sortBy={sortBy}>
      <tbody>
        {orders.map((order, index) => (
          <tr key={index} className={styles.tableBodyRow}>
            <td className={styles.tableData}>#{order.id}</td>
            <td className={`${styles.tableData} ${styles.tableDataExpanded}`}>
              {order.customer}
            </td>
            <td className={styles.tableData}>
              {new Date(order.date).toLocaleDateString("es-ES")}
            </td>
            <td className={styles.tableData}>
              {new Date(`1970-01-01T${order.hour}Z`).toLocaleTimeString(
                "es-ES",
                {
                  hour: "numeric",
                  minute: "2-digit",
                  hour12: true,
                }
              )}
            </td>
            <td className={styles.tableData}>
              {order.delivery_method === "delivery" ? "Entrega" : "Recogida"}
            </td>
            <td className={styles.tableData}>{order.total_price}</td>
            <td className={`${styles.tableData} ${styles.tableDataExpanded}`}>
              {order.payment_method}
            </td>
            <td className={styles.tableData}>
              <span
                className={`${styles.status} ${
                  order.order_status === "accepted"
                    ? styles.accepted
                    : styles.rejected
                }`}
              >
                {order.order_status === "accepted" ? "Aceptada" : "Rechazada"}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </OrdersTable>
  );
}
