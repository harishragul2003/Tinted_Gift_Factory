import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Phone } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const navigate = useNavigate();
  const { login, register, isAuthenticated } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
  });

  if (isAuthenticated) {
    navigate('/');
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isLogin) {
        await login({ email: formData.email, password: formData.password });
      } else {
        await register(formData);
      }
      navigate('/');
    } catch (error) {
      console.error('Auth error', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center relative">
      {/* Background Decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-64 h-64 bg-primary-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"></div>
        <div className="absolute bottom-20 right-10 w-64 h-64 bg-accent-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style={{ animationDelay: '1s' }}></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl p-10 shadow-2xl border border-primary-100 dark:border-primary-900 card-shine">
          <div className="text-center mb-8">
            <motion.div
              animate={{ rotate: 360, scale: [1, 1.2, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="text-7xl mb-4 inline-block drop-shadow-2xl"
            >
              🎁
            </motion.div>
            <h1 className="text-4xl font-bold mb-3">
              <span className="animate-gradient-text">
                {isLogin ? 'Welcome Back!' : 'Create Account'}
              </span>
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              {isLogin ? 'Login to continue shopping' : 'Join Surprise Basket today!'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  required
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full pl-12 pr-4 py-3 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all duration-300"
                />
              </div>
            )}

            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="email"
                required
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full pl-12 pr-4 py-3 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all duration-300"
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="password"
                required
                placeholder="Password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full pl-12 pr-4 py-3 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all duration-300"
              />
            </div>

            {!isLogin && (
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="tel"
                  placeholder="Phone (Optional)"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full pl-12 pr-4 py-3 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all duration-300"
                />
              </div>
            )}

            <motion.button
              whileHover={{ scale: 1.02, boxShadow: "0 20px 40px rgba(244, 63, 94, 0.4)" }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-xl font-bold text-lg shadow-2xl hover:shadow-primary-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed glow-effect"
            >
              {loading ? (
                <span className="flex items-center justify-center space-x-2">
                  <span className="animate-spin">⏳</span>
                  <span>Please wait...</span>
                </span>
              ) : isLogin ? (
                <span className="flex items-center justify-center space-x-2">
                  <span>🔓</span>
                  <span>Login Now</span>
                </span>
              ) : (
                <span className="flex items-center justify-center space-x-2">
                  <span>🎉</span>
                  <span>Create Account</span>
                </span>
              )}
            </motion.button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-600 dark:text-gray-400 mb-3">
              {isLogin ? "Don't have an account?" : 'Already have an account?'}
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsLogin(!isLogin)}
              className="px-6 py-3 bg-gradient-to-r from-primary-100 to-accent-100 dark:from-primary-900 dark:to-accent-900 text-primary-700 dark:text-primary-300 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
            >
              {isLogin ? '✨ Create New Account' : '🔑 Login to Existing Account'}
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
