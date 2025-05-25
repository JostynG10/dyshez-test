export default interface GetOrdersProps {
  page?: number;
  pageSize?: number;
  filter?: "all" | "accepted" | "rejected";
  order?: {
    orderBy: string;
    order: "asc" | "desc";
  };
}
