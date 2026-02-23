import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Package, Clock, CheckCircle, XCircle, ShoppingBag } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { orderAPI } from '../services/api';
import type { Order } from '../types/order';
import { Link } from 'react-router-dom';

export default function MyOrders() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) loadOrders();
  }, [user]);

  const loadOrders = async () => {
    try {
      const { data } = await orderAPI.getUserOrders(user!.id);
      setOrders(data);
    } catch (error) {
      console.error('Failed to load orders', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Delivered': return <CheckCircle className="text-green-600" size={24} />;
      case 'Shipped': return <Package className="text-blue-600" size={24} />;
      case 'Cancelled': return <XCircle className="text-red-600" size={24} />;
      default: return <Clock className="text-yellow-600" size={24} />;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="text-6xl mb-4 animate-bounce">📦</div>
          <p className="text-gray-600 dark:text-gray-400">Loading your orders...</p>
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="max-w-2xl mx-auto text-center py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl p-12 shadow-2xl"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-8xl mb-6"
          >
            🛍️
          </motion.div>
          <h2 className="text-3xl font-bold mb-4">No Orders Yet</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8 text-lg">
            Start shopping and your orders will appear here!
          </p>
          <Link to="/products">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-full font-bold text-lg shadow-2xl hover:shadow-primary-500/50 transition-all duration-300 inline-flex items-center space-x-2 glow-effect"
            >
              <ShoppingBag size={24} />
              <span>Start Shopping</span>
            </motion.button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold mb-2">
          <span className="animate-gradient-text">
            My Orders
          </span>
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          Track your orders and view order history
        </p>
      </motion.div>

      <div className="space-y-4">
        {orders.map((order, index) => (
          <motion.div
            key={order.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 border border-primary-100 dark:border-primary-900"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-4">
                {getStatusIcon(order.order_status)}
                <div>
                  <p className="font-bold text-lg">Order #{order.id.slice(0, 8)}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {new Date(order.created_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-accent-600">
                  ₹{order.total_amount}
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Order Status</p>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${
                  order.order_status === 'Delivered'
                    ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                    : order.order_status === 'Shipped'
                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                    : order.order_status === 'Cancelled'
                    ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                    : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                }`}>
                  {order.order_status}
                </span>
              </div>

              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Payment Status</p>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${
                  order.payment_status === 'Payment Verified'
                    ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                    : order.payment_status === 'Failed'
                    ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                    : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                }`}>
                  {order.payment_status}
                </span>
              </div>
            </div>

            {order.shipping_address && (
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Shipping Address</p>
                <p className="text-sm">{order.shipping_address}</p>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
