export default interface Orders {
  id: number;
  total_price: number;
  date: string;
  hour: string;
  customer: string;
  delivery_method: string;
  payment_method: string;
  order_status: string;
  created_at: string;
}
