import type SortBy from "@interfaces/SortBy";

export default interface GetOrdersProps {
  sortBy: SortBy | null;
  pageSize: number;
  page: number | null;
  status: "all" | "accepted" | "rejected";
}
