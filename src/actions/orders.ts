"use server";

import { createClient } from "@utils/supabase/server";
import { getSupabaseErrorMessage } from "@utils/utils";
import type GetOrdersProps from "@interfaces/GetOrdersProps";
import type Orders from "@interfaces/Orders";

/**
 * Fetches a paginated list of orders from the database.
 * @param data - The data object containing pagination and filter options.
 * @returns - An object containing the list of orders and any error message.
 * @description - Fetches a paginated list of orders from the database.
 */
export async function getOrders(data: GetOrdersProps) {
  try {
    const parameters = {
      p_order_by: data?.sortBy?.orderBy || null,
      p_order_direction: data?.sortBy?.order || null,
      p_status_filter:
        data.status !== "all" ? (data.status === "accepted" ? 1 : 2) : null,
      p_offset: data.page ? (data.page - 1) * data.pageSize : 0,
      p_limit: data.pageSize * (data.page || 1),
    };
    const supabase = await createClient();
    const { data: orders, error } = await supabase.rpc(
      "get_orders",
      parameters
    );

    if (error) {
      // Define error messages for specific error codes
      // Note: The error codes should be replaced with actual Supabase errors
      const errorCodeMessages = {} as const;

      const message =
        getSupabaseErrorMessage(error, errorCodeMessages) ||
        "Ocurrió un error al obtener las ordenes.";
      return { orders: [], error: message };
    }
    return { orders: orders as Orders[], error: null };
  } catch (error) {
    console.error("Error fetching orders:", error);
    return { orders: [], error: "Ocurrió un error al obtener las ordenes." };
  }
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
  try {
    const supabase = await createClient();

    let query = supabase
      .from("orders")
      .select("*", { count: "exact", head: true });
    if (filter && filter !== "all") {
      query = query.eq("order_status_id", filter === "accepted" ? 1 : 2);
    }
    const { count, error } = await query;

    if (error) {
      // Define error messages for specific error codes
      // Note: The error codes should be replaced with actual Supabase errors
      const errorCodeMessages = {} as const;

      const message =
        getSupabaseErrorMessage(error, errorCodeMessages) ||
        "Ocurrió un error al obtener el total de ordenes.";
      return { count: 0, error: message };
    }
    return { count, error: null };
  } catch (error) {
    console.error("Error fetching orders count:", error);
    return {
      count: 0,
      error: "Ocurrió un error al obtener el total de ordenes.",
    };
  }
}
