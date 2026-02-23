import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Package, Clock, CheckCircle, XCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { orderAPI } from '../services/api';
import type { Order } from '../types/order';

export default function Dashboard() {
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
      case 'Delivered': return <CheckCircle className="text-green-600" />;
      case 'Shipped': return <Package className="text-blue-600" />;
      case 'Cancelled': return <XCircle className="text-red-600" />;
      default: return <Clock className="text-yellow-600" />;
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold mb-2">
          <span className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
            My Dashboard
          </span>
        </h1>
        <p className="text-gray-600 dark:text-gray-400">Welcome back, {user?.name}!</p>
      </motion.div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        {[
          { label: 'Total Orders', value: orders.length, icon: Package },
          { label: 'Pending', value: orders.filter(o => o.order_status === 'Pending').length, icon: Clock },
          { label: 'Delivered', value: orders.filter(o => o.order_status === 'Delivered').length, icon: CheckCircle },
          { label: 'Cancelled', value: orders.filter(o => o.order_status === 'Cancelled').length, icon: XCircle },
        ].map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg"
          >
            <div className="flex items-center justify-between mb-2">
              <stat.icon size={24} className="text-pink-600" />
              <span className="text-3xl font-bold">{stat.value}</span>
            </div>
            <p className="text-gray-600 dark:text-gray-400">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Orders List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg"
      >
        <h2 className="text-2xl font-bold mb-6">My Orders</h2>

        {loading ? (
          <p className="text-center py-8 text-gray-600 dark:text-gray-400">Loading orders...</p>
        ) : orders.length === 0 ? (
          <p className="text-center py-8 text-gray-600 dark:text-gray-400">No orders yet</p>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="border border-gray-200 dark:border-gray-700 rounded-xl p-4 hover:shadow-md transition"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(order.order_status)}
                    <div>
                      <p className="font-semibold">Order #{order.id.slice(0, 8)}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {new Date(order.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-pink-600">₹{order.total_amount}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{order.order_status}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className={`px-3 py-1 rounded-full ${
                    order.payment_status === 'Payment Verified'
                      ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                      : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                  }`}>
                    {order.payment_status}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}
