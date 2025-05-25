import { useCallback, useState } from "react";
import { getOrders } from "@actions/orders";
import type GetOrdersProps from "@interfaces/GetOrdersProps";
import type Orders from "@interfaces/Orders";

/**
 * useGetOrders is a custom hook that fetches orders from the database.
 * It provides a function to fetch the orders and returns the orders,
 * loading state, and any error encountered.
 */
export function useGetOrders() {
  const [orders, setOrders] = useState<Orders[] | []>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  /**
   * useCallback is used to memorize the function so that it does not change
   * on every render, which is useful for performance optimization.
   */
  const fetchOrders = useCallback(async (data: GetOrdersProps) => {
    setLoading(true);
    setError(false);
    const { orders, error } = await getOrders(data);

    setLoading(false);
    if (error) {
      setError(true);
      return;
    }
    setOrders(orders);
    return;
  }, []);

  return { orders, loading, error, fetchOrders };
}
