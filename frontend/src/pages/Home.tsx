import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Gift, Truck, Shield, Star, ArrowRight, Package } from 'lucide-react';
import { useEffect, useState } from 'react';
import { productAPI, categoryAPI } from '../services/api';
import type { Product, Category } from '../types/product';
import ProductCard from '../components/ProductCard';
import { ProductGridSkeleton } from '../components/LoadingSkeleton';

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoriesLoading, setCategoriesLoading] = useState(true);

  useEffect(() => {
    loadFeaturedProducts();
    loadCategories();
  }, []);

  const loadFeaturedProducts = async () => {
    try {
      const { data } = await productAPI.getAll({ featured: true, limit: 4 });
      setFeaturedProducts(data);
    } catch (error) {
      console.error('Failed to load featured products', error);
    } finally {
      setLoading(false);
    }
  };

  const loadCategories = async () => {
    try {
      const { data } = await categoryAPI.getAll();
      setCategories(data);
    } catch (error) {
      console.error('Failed to load categories', error);
    } finally {
      setCategoriesLoading(false);
    }
  };

  const features = [
    { icon: Gift, title: 'Curated Gifts', desc: 'Handpicked premium gifts' },
    { icon: Truck, title: 'Fast Delivery', desc: 'Quick & secure shipping' },
    { icon: Shield, title: 'Secure Payment', desc: 'Safe transactions' },
    { icon: Star, title: 'Quality Assured', desc: '100% authentic products' },
  ];

  const whyChooseUs = [
    { 
      icon: Gift, 
      title: 'Curated Selection', 
      description: 'Every product is handpicked by our experts to ensure premium quality and uniqueness.' 
    },
    { 
      icon: Shield, 
      title: 'Trusted Quality', 
      description: '100% authentic products with quality guarantee. Your satisfaction is our priority.' 
    },
    { 
      icon: Truck, 
      title: 'Reliable Delivery', 
      description: 'Fast and secure shipping with real-time tracking. Get your gifts on time, every time.' 
    },
  ];

  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-[80vh] flex items-center justify-center">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              rotate: [360, 180, 0],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1, 1.4, 1],
              x: [0, 100, 0],
              opacity: [0.2, 0.4, 0.2]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/2 left-1/2 w-80 h-80 bg-gradient-to-r from-orange-500 to-red-500 rounded-full blur-3xl"
          />
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <motion.h1
              className="text-5xl md:text-7xl font-bold leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <motion.span 
                className="inline-block text-6xl md:text-8xl font-extrabold"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                style={{
                  backgroundImage: "linear-gradient(90deg, #ec4899, #8b5cf6, #3b82f6, #ec4899)",
                  backgroundSize: "200% 200%",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Surprise
              </motion.span>
              <br />
              <motion.span 
                className="text-white drop-shadow-2xl"
                animate={{
                  textShadow: [
                    "0 0 20px rgba(236, 72, 153, 0.5)",
                    "0 0 40px rgba(139, 92, 246, 0.5)",
                    "0 0 20px rgba(236, 72, 153, 0.5)"
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                Your Loved Ones
              </motion.span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-gray-100 dark:text-gray-200 max-w-2xl mx-auto drop-shadow-lg font-medium"
            >
              Discover premium, curated gift collections for every special moment. 
              Make memories that last forever.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-4 justify-center"
            >
              <Link to="/products" onClick={() => window.scrollTo(0, 0)}>
                <motion.button
                  whileHover={{ scale: 1.08, boxShadow: "0 20px 40px rgba(244, 63, 94, 0.6)" }}
                  whileTap={{ scale: 0.95 }}
                  animate={{
                    boxShadow: [
                      "0 10px 30px rgba(236, 72, 153, 0.4)",
                      "0 10px 30px rgba(139, 92, 246, 0.4)",
                      "0 10px 30px rgba(236, 72, 153, 0.4)"
                    ]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="px-10 py-5 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white rounded-full font-bold text-lg shadow-2xl transition-all duration-300 flex items-center space-x-3 animate-gradient bg-200%"
                >
                  <span>Shop Now</span>
                  <ArrowRight size={24} />
                </motion.button>
              </Link>
              
              <Link to="/about" onClick={() => window.scrollTo(0, 0)}>
                <motion.button
                  whileHover={{ scale: 1.05, borderColor: "rgba(236, 72, 153, 1)" }}
                  whileTap={{ scale: 0.95 }}
                  className="px-10 py-5 bg-white/10 backdrop-blur-md text-white rounded-full font-bold text-lg shadow-2xl hover:shadow-xl transition-all duration-300 border-2 border-white/30 hover:bg-white/20"
                >
                  Learn More
                </motion.button>
              </Link>
            </motion.div>


          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -15, scale: 1.05 }}
              className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-3xl p-8 text-center shadow-2xl hover:shadow-primary-500/30 transition-all duration-500 card-shine relative overflow-hidden group"
            >
              <motion.div
                whileHover={{ rotate: 360, scale: 1.2 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary-500 to-accent-500 rounded-3xl mb-6 shadow-xl group-hover:shadow-2xl group-hover:shadow-primary-500/50"
              >
                <feature.icon className="text-white" size={40} />
              </motion.div>
              <h3 className="font-bold text-xl mb-3 text-gray-900 dark:text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-primary-600 group-hover:to-accent-600 transition-all duration-300">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{feature.desc}</p>
              
              {/* Hover Glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary-500/0 via-accent-500/0 to-primary-500/0 group-hover:from-primary-500/10 group-hover:via-accent-500/10 group-hover:to-primary-500/10 transition-all duration-500 rounded-3xl"></div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Featured Products */}
      <section>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="animate-gradient-text">
              Featured Gifts
            </span>
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Handpicked premium gifts just for you
          </p>
        </motion.div>

        {loading ? (
          <ProductGridSkeleton count={4} />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {featuredProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link to="/products" onClick={() => window.scrollTo(0, 0)}>
            <motion.button
              whileHover={{ scale: 1.08, boxShadow: "0 20px 40px rgba(244, 63, 94, 0.4)" }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-5 bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-full font-bold text-lg shadow-2xl hover:shadow-primary-500/50 transition-all duration-300 glow-effect"
            >
              View All Products
            </motion.button>
          </Link>
        </motion.div>
      </section>

      {/* Why Choose Artify Aura */}
      <section>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="animate-gradient-text">
              Why Choose Artify Aura
            </span>
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
            Experience the difference with our commitment to excellence
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {whyChooseUs.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -15, scale: 1.03 }}
              className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-3xl p-10 shadow-2xl hover:shadow-primary-500/30 transition-all duration-500 card-shine relative overflow-hidden group"
            >
              <motion.div
                whileHover={{ rotate: 360, scale: 1.2 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary-500 to-accent-500 rounded-3xl mb-6 shadow-xl group-hover:shadow-2xl group-hover:shadow-primary-500/50"
              >
                <item.icon className="text-white" size={36} />
              </motion.div>
              <h3 className="font-bold text-2xl mb-4 text-gray-900 dark:text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-primary-600 group-hover:to-accent-600 transition-all duration-300">
                {item.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-base leading-relaxed">
                {item.description}
              </p>
              
              {/* Hover Glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary-500/0 via-accent-500/0 to-primary-500/0 group-hover:from-primary-500/10 group-hover:via-accent-500/10 group-hover:to-primary-500/10 transition-all duration-500 rounded-3xl"></div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Shop by Category */}
      <section>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="animate-gradient-text">
              Shop by Category
            </span>
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Find the perfect gift for every occasion
          </p>
        </motion.div>

        {categoriesLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white/90 dark:bg-gray-800/90 rounded-3xl p-8 animate-pulse">
                <div className="w-20 h-20 bg-gray-300 dark:bg-gray-700 rounded-3xl mx-auto mb-4"></div>
                <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mx-auto"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <Link key={category.id} to={`/products?category=${category.id}`}>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -15, scale: 1.05 }}
                  className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-3xl p-8 text-center shadow-2xl hover:shadow-primary-500/30 transition-all duration-500 card-shine relative overflow-hidden group cursor-pointer"
                >
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.2 }}
                    transition={{ duration: 0.6 }}
                    className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary-500 to-accent-500 rounded-3xl mb-4 shadow-xl group-hover:shadow-2xl group-hover:shadow-primary-500/50"
                  >
                    <Package className="text-white" size={36} />
                  </motion.div>
                  <h3 className="font-bold text-lg text-gray-900 dark:text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-primary-600 group-hover:to-accent-600 transition-all duration-300">
                    {category.name}
                  </h3>
                  
                  {/* Hover Glow */}
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-500/0 via-accent-500/0 to-primary-500/0 group-hover:from-primary-500/10 group-hover:via-accent-500/10 group-hover:to-primary-500/10 transition-all duration-500 rounded-3xl"></div>
                </motion.div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Call to Action */}
      <section>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-pink-500 via-red-500 to-orange-500 p-16 text-center shadow-2xl"
        >
          {/* Animated Background */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3]
              }}
              transition={{ duration: 8, repeat: Infinity }}
              className="absolute -top-20 -right-20 w-96 h-96 bg-white/20 rounded-full blur-3xl"
            />
            <motion.div
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.2, 0.4, 0.2]
              }}
              transition={{ duration: 10, repeat: Infinity }}
              className="absolute -bottom-20 -left-20 w-96 h-96 bg-white/20 rounded-full blur-3xl"
            />
          </div>

          <div className="relative z-10">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold text-white mb-4"
            >
              Ready to Order?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-xl text-white/90 mb-8 max-w-2xl mx-auto"
            >
              Join thousands of satisfied customers and experience the Artify Aura difference today!
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Link to="/products" onClick={() => window.scrollTo(0, 0)}>
                <motion.button
                  whileHover={{ scale: 1.08, boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)" }}
                  whileTap={{ scale: 0.95 }}
                  className="px-10 py-5 bg-white text-red-500 rounded-full font-bold text-lg shadow-2xl hover:shadow-xl transition-all duration-300 flex items-center space-x-3 mx-auto"
                >
                  <span>Start Ordering</span>
                  <ArrowRight size={24} />
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
