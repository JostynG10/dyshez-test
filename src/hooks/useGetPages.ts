import { useCallback, useState } from "react";
import { getOrdersCount } from "@actions/orders";

/**
 * Custom hook to fetch the number of pages based on the number of orders
 * and the selected filter.
 * It provides a function to fetch the pages and returns the pages, loading state,
 * and any error encountered.
 */
export function useGetPages() {
  const [pages, setPages] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  /**
   * useCallback is used to memorize the function so that it does not change
   * on every render, which is useful for performance optimization.
   */
  const fetchPages = useCallback(
    async (
      filters: "all" | "accepted" | "rejected",
      numberOfOrders: number
    ) => {
      setLoading(true);
      setError(false);
      const { count, error } = await getOrdersCount(filters);

      setLoading(false);
      if (error) {
        setError(true);
        return;
      }
      setPages(Math.ceil(count! / numberOfOrders));
    },
    []
  );

  return { pages, loading, error, fetchPages };
}
