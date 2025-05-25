"use server";

import { createClient } from "@utils/supabase/server";
import type GetOrdersProps from "@interfaces/GetOrdersProps";
import type Orders from "@interfaces/Orders";

/**
 * Fetches a paginated list of orders from the database.
 * @param data - The data object containing pagination and filter options.
 * @returns - An object containing the list of orders and any error message.
 * @description - Fetches a paginated list of orders from the database.
 */
export async function getOrders(data: GetOrdersProps) {
  const { page = 1, pageSize = 10, filter = "all", order } = data;
  const supabase = await createClient();

  let query = supabase
    .from("orders")
    .select(
      `id,
      total_price,
      created_at,
      customer: customer_id (first_name, last_name),
      delivery_method: delivery_method_id (name),
      payment_method: payment_method_id (name),
      order_status: order_status_id (name)`
    )
    .range((page - 1) * pageSize, page * pageSize - 1);
  if (order) {
    query = query.order(order.orderBy, { ascending: order.order === "asc" });
  }
  if (filter && filter !== "all") {
    query = query.eq("order_status_id", filter === "accepted" ? 1 : 2);
  }
  const { data: orders, error } = await query;

  if (error) {
    return { orders: [], error: error.message };
  }

  /**
   * Normalize the orders to ensure that the customer, delivery_method,
   * payment_method, and order_status are not arrays and are the first element
   * of the array if they are arrays
   */
  const normalizedOrders = (orders ?? []).map((order) => ({
    ...order,
    customer: Array.isArray(order.customer)
      ? order.customer[0]
      : order.customer,
    delivery_method: Array.isArray(order.delivery_method)
      ? order.delivery_method[0]
      : order.delivery_method,
    payment_method: Array.isArray(order.payment_method)
      ? order.payment_method[0]
      : order.payment_method,
    order_status: Array.isArray(order.order_status)
      ? order.order_status[0]
      : order.order_status,
  }));
  return { orders: normalizedOrders as Orders[], error: null };
}

/**
 * Fetches the count of orders based on the provided filter.
 * @param filter - The filter to apply to the orders count
 * @returns - An object containing the count of orders and any error message
 * @description - Fetches the count of orders based on the provided filter.
 */
export async function getOrdersCount(
  filter: "all" | "accepted" | "rejected" = "all"
) {
  const supabase = await createClient();

  let query = supabase
    .from("orders")
    .select("*", { count: "exact", head: true });
  if (filter && filter !== "all") {
    query = query.eq("order_status_id", filter === "accepted" ? 1 : 2);
  }
  const { count, error } = await query;

  if (error) {
    return { count: 0, error: error.message };
  }
  return { count, error: null };
}
