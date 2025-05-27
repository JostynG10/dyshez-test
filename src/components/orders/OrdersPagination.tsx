"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { useGetPages } from "@hooks/useGetPages";
import PaginationLoader from "@components/orders/PaginationLoader";
import styles from "@styles/orders/OrdersPagination.module.css";

/**
 * OrdersPagination component is responsible for rendering the pagination
 * for the orders list. It uses the useGetPages hook to fetch the number
 * of pages and handles the pagination logic.
 */
export default function OrdersPagination({
  numberOfOrders = null,
}: {
  numberOfOrders: number | null;
}) {
  const { pages, loading, error, fetchPages } = useGetPages();
  const [previousStatus, setPreviousStatus] = useState<string | null>("");
  const searchParams = useSearchParams();

  /**
   * Get the "page" and "status" query parameters to determine the current page
   * and the status of the orders. This value changes every time the user clicks
   * on the buttons.
   */
  const currentPage = searchParams.get("page");
  const status = searchParams.get("status");

  useEffect(() => {
    if (
      status &&
      ["all", "accepted", "rejected"].includes(status) &&
      status !== previousStatus
    ) {
      setPreviousStatus(status);
    }
    // eslint-disable-next-line
  }, [searchParams]);

  // previousStatus !== "" is used to avoid fetching pages when the component is
  // mounted and the status is not set yet. This will prevent unnecessary API calls.
  useEffect(() => {
    if (previousStatus !== "" && numberOfOrders) {
      fetchPages(status as "all" | "accepted" | "rejected", numberOfOrders);
    }
    // eslint-disable-next-line
  }, [previousStatus, numberOfOrders]);

  if (loading) {
    return <PaginationLoader />;
  }

  return (
    <section className={styles.container}>
      {error || pages === 0 ? (
        <>
          <FaAngleLeft className={`${styles.arrowIcon}`} />
          <button
            className={`${styles.pageButton} ${styles.pageButtonActive}`}
            type="button"
          >
            1
          </button>
          <FaAngleRight className={`${styles.arrowIcon}`} />
        </>
      ) : (
        <ArrowButtons pages={pages}>
          <Pages
            pages={pages}
            currentPage={currentPage ? Number(currentPage) : 1}
          />
        </ArrowButtons>
      )}
    </section>
  );
}

/**
 * ArrowButtons component is responsible for rendering the left and right
 * arrow buttons for pagination. It handles the logic for changing the
 * current page when the buttons are clicked.
 */
function ArrowButtons({
  pages,
  children,
}: {
  pages: number;
  children: React.ReactNode;
}) {
  const searchParams = useSearchParams();
  const router = useRouter();

  /**
   * Get the "page" query parameter to determine the current page. This value
   * changes every time the user clicks on the buttons.
   */
  const currentPage = Number(searchParams.get("page") || "1");

  const handleArrowClick = (direction: "left" | "right") => {
    let newPage = currentPage;

    if (direction === "left") {
      newPage = Math.max(currentPage - 1, 1);
    } else if (direction === "right") {
      newPage = Math.min(currentPage + 1, pages);
    }

    const urlParams = Object.fromEntries(searchParams.entries());
    const newParams = new URLSearchParams({
      ...urlParams,
      page: String(newPage),
    });
    router.replace(`?${newParams.toString()}`);
  };

  return (
    <>
      <button
        onClick={() => handleArrowClick("left")}
        className={styles.arrowButton}
        type="button"
      >
        <FaAngleLeft
          className={`${styles.arrowIcon} ${
            currentPage !== 1 ? styles.arrowIconActive : ""
          }`}
        />
      </button>
      {children}
      <button
        onClick={() => handleArrowClick("right")}
        className={styles.arrowButton}
        type="button"
      >
        <FaAngleRight
          className={`${styles.arrowIcon} ${
            currentPage !== pages ? styles.arrowIconActive : ""
          }`}
        />
      </button>
    </>
  );
}

/**
 * Pages component is responsible for rendering the page numbers for pagination.
 * It handles the logic for displaying the correct page numbers based on the
 * current page and the total number of pages.
 */
function Pages({ pages, currentPage }: { pages: number; currentPage: number }) {
  const searchParams = useSearchParams();
  const router = useRouter();

  let start = 1;
  let end = pages;

  /**
   * If the number of pages is less than or equal to 6, show all pages.
   * If the number of pages is greater than 6, show the current page and
   * the next and previous 2 pages.
   */
  if (pages > 6) {
    if (currentPage <= 3) {
      start = 1;
      end = 6;
    } else if (currentPage >= pages - 2) {
      start = pages - 5;
      end = pages;
    } else {
      start = currentPage - 2;
      end = currentPage + 3;
    }
  }

  const pageNumbers = [];
  for (let i = start; i <= end; i++) {
    pageNumbers.push(i);
  }

  const handlePageClick = (page: number) => {
    const urlParams = Object.fromEntries(searchParams.entries());
    const newParams = new URLSearchParams({ ...urlParams, page: String(page) });
    router.replace(`?${newParams.toString()}`);
  };

  return (
    <div className={styles.pagesBox}>
      {pageNumbers.map((page) => (
        <button
          onClick={() => handlePageClick(page)}
          key={page}
          className={`${styles.pageButton} ${
            page === currentPage ? styles.pageButtonActive : ""
          }`}
          type="button"
        >
          {page}
        </button>
      ))}
    </div>
  );
}
