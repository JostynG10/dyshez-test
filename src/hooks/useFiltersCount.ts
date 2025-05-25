import { getOrdersCount } from "@actions/orders";
import { useCallback, useState } from "react";

/**
 * Custom hook to fetch the count of accepted and rejected orders.
 * It provides a function to fetch the counts and returns the counts and any
 * error encountered.
 */
export function useFiltersCount() {
  const [counts, setCounts] = useState({ accepted: 0, rejected: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  /**
   * useCallback is used to memorize the function so that it does not change
   * on every render, which is useful for performance optimization.
   */
  const fetchCounts = useCallback(async () => {
    setLoading(true);
    setError(false);
    const { count: acceptedCount, error: acceptedError } = await getOrdersCount(
      "accepted"
    );
    const { count: rejectedCount, error: rejectedError } = await getOrdersCount(
      "rejected"
    );

    setLoading(false);
    if (acceptedError || rejectedError) {
      setError(true);
      return;
    }
    setCounts({ accepted: acceptedCount || 0, rejected: rejectedCount || 0 });
    return;
  }, []);

  return { fetchCounts, counts, loading, error };
}
