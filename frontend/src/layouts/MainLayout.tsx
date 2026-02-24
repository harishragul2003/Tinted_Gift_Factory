import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCart, User, Moon, Sun, Menu, X, Home, Package, LogOut, ShoppingBag } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';
import { useState } from 'react';

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const { isAuthenticated, isAdmin, logout } = useAuth();
  const { cartCount } = useCart();
  const { isDark, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { to: '/', label: 'Home', icon: Home },
    { to: '/products', label: 'Products', icon: Package },
  ];

  return (
    <div className="min-h-screen bg-transparent dark:bg-gradient-to-br dark:from-gray-900 dark:via-rose-900 dark:to-gray-900 transition-colors relative overflow-hidden">
      {/* Animated Background Elements - Only in Dark Mode */}
      <div className="fixed inset-0 pointer-events-none dark:block hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-accent-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute -bottom-32 left-1/2 w-72 h-72 bg-primary-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>
      </div>
      {/* Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="sticky top-0 z-50 glass-effect shadow-xl shadow-primary-500/10"
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
                className="text-3xl"
              >
                🎁
              </motion.div>
              <span className="text-2xl font-bold text-gray-900 dark:text-white">
                Artify Aura
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-all duration-300 ${
                    location.pathname === link.to
                      ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow-lg shadow-primary-500/50 scale-105'
                      : 'text-gray-700 dark:text-gray-200 hover:bg-primary-200 dark:hover:bg-gray-700 hover:scale-105'
                  }`}
                >
                  <link.icon size={18} />
                  <span>{link.label}</span>
                </Link>
              ))}
              {isAuthenticated && !isAdmin && (
                <Link
                  to="/orders"
                  className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-all duration-300 ${
                    location.pathname === '/orders'
                      ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow-lg shadow-primary-500/50 scale-105'
                      : 'text-gray-700 dark:text-gray-200 hover:bg-primary-200 dark:hover:bg-gray-700 hover:scale-105'
                  }`}
                >
                  <ShoppingBag size={18} />
                  <span>My Orders</span>
                </Link>
              )}
              {isAuthenticated && isAdmin && (
                <Link
                  to="/admin"
                  className="flex items-center space-x-1 px-3 py-2 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-primary-200 dark:hover:bg-gray-700 transition-all duration-300 hover:scale-105"
                >
                  <User size={18} />
                  <span>Admin Panel</span>
                </Link>
              )}
            </nav>

            {/* Actions */}
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-primary-200 dark:hover:bg-gray-700 transition-all duration-300 hover:scale-110"
              >
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
              </button>

              <Link to="/cart" className="relative p-2 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-primary-200 dark:hover:bg-gray-700 transition-all duration-300 hover:scale-110 glow-effect">
                <ShoppingCart size={20} />
                {cartCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    whileHover={{ scale: 1.2 }}
                    className="absolute -top-1 -right-1 bg-gradient-to-r from-primary-500 to-accent-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center shadow-lg animate-pulse-slow"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </Link>

              {isAuthenticated ? (
                <button
                  onClick={logout}
                  className="hidden md:flex items-center space-x-1 px-4 py-2 bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-lg hover:shadow-xl hover:scale-105 transition-all duration-300 glow-effect"
                >
                  <LogOut size={18} />
                  <span>Logout</span>
                </button>
              ) : (
                <Link
                  to="/login"
                  className="hidden md:block px-4 py-2 bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-lg hover:shadow-xl hover:scale-105 transition-all duration-300 glow-effect animate-shimmer"
                >
                  Login
                </Link>
              )}

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-primary-200 dark:hover:bg-gray-700 transition-all duration-300"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-primary-200 dark:border-gray-700 animate-slide-down"
          >
            <div className="container mx-auto px-4 py-4 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center space-x-2 px-4 py-3 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-pink-100 dark:hover:bg-gray-800"
                >
                  <link.icon size={18} />
                  <span>{link.label}</span>
                </Link>
              ))}
              {isAuthenticated ? (
                <>
                  {!isAdmin && (
                    <Link
                      to="/orders"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center space-x-2 px-4 py-3 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-primary-200 dark:hover:bg-gray-700 transition-all duration-300"
                    >
                      <ShoppingBag size={18} />
                      <span>My Orders</span>
                    </Link>
                  )}
                  {isAdmin && (
                    <Link
                      to="/admin"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center space-x-2 px-4 py-3 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-primary-200 dark:hover:bg-gray-700 transition-all duration-300"
                    >
                      <User size={18} />
                      <span>Admin Panel</span>
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center space-x-2 px-4 py-3 bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <LogOut size={18} />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-3 bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-lg text-center shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Login
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </motion.header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 relative z-10">{children}</main>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 glass-effect border-t border-primary-200 dark:border-gray-700 z-50 shadow-2xl shadow-primary-500/20">
        <div className="flex justify-around items-center py-3">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`flex flex-col items-center space-y-1 px-4 py-2 rounded-lg transition-all duration-300 ${
                location.pathname === link.to
                  ? 'text-primary-600 dark:text-primary-400 scale-110'
                  : 'text-gray-600 dark:text-gray-300 hover:scale-105'
              }`}
            >
              <link.icon size={20} />
              <span className="text-xs">{link.label}</span>
            </Link>
          ))}
          <Link
            to="/cart"
            className="flex flex-col items-center space-y-1 px-4 py-2 rounded-lg relative transition-all duration-300 hover:scale-105 text-gray-600 dark:text-gray-300"
          >
            <ShoppingCart size={20} />
            <span className="text-xs">Cart</span>
            {cartCount > 0 && (
              <span className="absolute top-0 right-2 bg-gradient-to-r from-primary-500 to-accent-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center animate-pulse-slow shadow-lg">
                {cartCount}
              </span>
            )}
          </Link>
          {isAuthenticated ? (
            <Link
              to={isAdmin ? '/admin' : '/orders'}
              className={`flex flex-col items-center space-y-1 px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105 ${
                location.pathname === (isAdmin ? '/admin' : '/orders')
                  ? 'text-primary-600 dark:text-primary-400 scale-110'
                  : 'text-gray-600 dark:text-gray-300'
              }`}
            >
              {isAdmin ? <User size={20} /> : <ShoppingBag size={20} />}
              <span className="text-xs">{isAdmin ? 'Admin' : 'Orders'}</span>
            </Link>
          ) : (
            <Link
              to="/login"
              className="flex flex-col items-center space-y-1 px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105 text-gray-600 dark:text-gray-300"
            >
              <User size={20} />
              <span className="text-xs">Login</span>
            </Link>
          )}
        </div>
      </div>

      {/* Bottom Padding for Mobile Nav */}
      <div className="md:hidden h-20"></div>
    </div>
  );
}
