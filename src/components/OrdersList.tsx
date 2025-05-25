"use client";

import React, { Suspense, useEffect, useRef, useState } from "react";
import OrdersTable from "@components/OrdersTable";
import ResultLoader from "@components/ResultLoader";
import OrdersResult from "@components/OrdersResult";
import PaginationLoader from "@components/PaginationLoader";
import OrdersPagination from "@components/OrdersPagination";
import styles from "@styles/OrdersList.module.css";

/**
 * OrdersList component is responsible for rendering the list of orders
 * and the pagination. It uses a ResizeObserver to handle the resizing of the
 * list and calculate the number of orders to be displayed.
 */
export default function OrdersList() {
  const listRef = useRef<HTMLDivElement>(null);
  const [numberOfOrders, setNumberOfOrders] = useState<number | null>(null);

  useEffect(() => {
    let lastHeight = 0;

    // This function handles the resizing of the list and calculates
    // the number of orders to be displayed based on the height of the list.
    function handleResize(height: number) {
      if (height !== lastHeight) {
        lastHeight = height;
        // 44 is the height of the thead and 72 is the height of tbody each row
        const newNumberOfOrders = Math.floor((height - 44) / 72);
        setNumberOfOrders(newNumberOfOrders);
      }
    }

    const refCurrent = listRef.current;
    if (!refCurrent) return;

    // Create a ResizeObserver to observe the changes in the height of the list
    // and call the handleResize function when the height changes.
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const height = entry.contentRect.height;
        handleResize(height);
      }
    });
    observer.observe(refCurrent);

    handleResize(refCurrent.clientHeight);

    return () => {
      observer.disconnect();
    };
  }, []);

  /**
   * The Suspenses are used to handle the loading states of the components
   * because the OrdersResult and OrdersPagination components use searchParams,
   * which can cause issues if not handled asynchronously. Suspense
   */
  return (
    <>
      <div ref={listRef} className={styles.list}>
        <Suspense
          fallback={
            <OrdersTable>
              <ResultLoader numberOfRows={numberOfOrders} />
            </OrdersTable>
          }
        >
          <OrdersResult numberOfOrders={numberOfOrders} />
        </Suspense>
      </div>

      <Suspense fallback={<PaginationLoader />}>
        <OrdersPagination numberOfOrders={numberOfOrders} />
      </Suspense>
    </>
  );
}
