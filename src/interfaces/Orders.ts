export default interface Orders {
  id: number;
  total_price: number;
  created_at: string;
  customer: {
    first_name: string;
    last_name: string;
  };
  delivery_method: {
    name: string;
  };
  payment_method: {
    name: string;
  };
  order_status: {
    name: string;
  };
}
