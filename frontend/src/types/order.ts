export interface Order {
  id: string;
  user_id: string;
  total_amount: number;
  payment_status: 'Payment Verification Pending' | 'Payment Verified' | 'Failed';
  order_status: 'Pending' | 'Shipped' | 'Delivered' | 'Cancelled';
  transaction_id?: string;
  payment_screenshot_url?: string;
  shipping_address: string;
  phone: string;
  created_at: string;
  items?: OrderItem[];
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  product_name: string;
  quantity: number;
  price: number;
}

export interface CreateOrderData {
  items: {
    product_id: string;
    quantity: number;
    price: number;
  }[];
  total_amount: number;
  shipping_address: string;
  phone: string;
  transaction_id: string;
  payment_screenshot_url: string;
}

export interface OrderStats {
  totalOrders: number;
  pendingOrders: number;
  completedOrders: number;
  totalRevenue: number;
}
