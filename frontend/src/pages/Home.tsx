import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Gift, Truck, Shield, Star, ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { productAPI } from '../services/api';
import type { Product } from '../types/product';
import ProductCard from '../components/ProductCard';
import { ProductGridSkeleton } from '../components/LoadingSkeleton';

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFeaturedProducts();
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

  const features = [
    { icon: Gift, title: 'Curated Gifts', desc: 'Handpicked premium gifts' },
    { icon: Truck, title: 'Fast Delivery', desc: 'Quick & secure shipping' },
    { icon: Shield, title: 'Secure Payment', desc: 'Safe transactions' },
    { icon: Star, title: 'Quality Assured', desc: '100% authentic products' },
  ];

  const testimonials = [
    { name: 'Sarah Johnson', text: 'Amazing quality and fast delivery!', rating: 5 },
    { name: 'Mike Chen', text: 'Perfect gifts for every occasion.', rating: 5 },
    { name: 'Emma Wilson', text: 'Highly recommend Surprise Basket!', rating: 5 },
  ];

  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <motion.h1
              className="text-5xl md:text-7xl font-bold leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <span className="animate-gradient-text text-6xl md:text-8xl">
                Surprise
              </span>
              <br />
              <span className="text-gray-800 dark:text-white">Your Loved Ones</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-gray-600 dark:text-gray-300"
            >
              Discover premium, curated gift collections for every special moment. 
              Make memories that last forever.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              <Link to="/products">
                <motion.button
                  whileHover={{ scale: 1.08, boxShadow: "0 20px 40px rgba(244, 63, 94, 0.4)" }}
                  whileTap={{ scale: 0.95 }}
                  className="px-10 py-5 bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-full font-bold text-lg shadow-2xl hover:shadow-primary-500/50 transition-all duration-300 flex items-center space-x-3 glow-effect animate-pulse-slow"
                >
                  <span>Shop Now</span>
                  <ArrowRight size={24} />
                </motion.button>
              </Link>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-5 bg-white dark:bg-gray-800 text-gray-800 dark:text-white rounded-full font-bold text-lg shadow-2xl hover:shadow-xl transition-all duration-300 border-2 border-primary-300 dark:border-primary-700 hover:border-primary-500"
              >
                Learn More
              </motion.button>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <motion.div
              animate={{ y: [0, -30, 0], rotate: [0, 5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="relative z-10"
            >
              <div className="aspect-square rounded-3xl bg-gradient-to-br from-primary-400 via-accent-400 to-primary-500 p-2 shadow-2xl animate-gradient bg-200%">
                <div className="w-full h-full rounded-3xl bg-white dark:bg-gray-800 flex items-center justify-center text-9xl shadow-inner">
                  🎁
                </div>
              </div>
            </motion.div>
            
            {/* Floating Elements */}
            <motion.div
              animate={{ y: [0, -40, 0], rotate: [0, 15, 0], scale: [1, 1.2, 1] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-10 -right-10 text-7xl drop-shadow-2xl"
            >
              ✨
            </motion.div>
            <motion.div
              animate={{ y: [0, 40, 0], rotate: [0, -15, 0], scale: [1, 1.2, 1] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-10 -left-10 text-7xl drop-shadow-2xl"
            >
              🎀
            </motion.div>
            <motion.div
              animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -top-5 -left-5 text-6xl"
            >
              💝
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
              <h3 className="font-bold text-xl mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-primary-600 group-hover:to-accent-600 transition-all duration-300">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{feature.desc}</p>
              
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
          <p className="text-gray-600 dark:text-gray-400 text-lg">
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
          <Link to="/products">
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

      {/* Testimonials */}
      <section>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="animate-gradient-text">
              What Our Customers Say
            </span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -15, scale: 1.03 }}
              className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-3xl p-8 shadow-2xl hover:shadow-primary-500/30 transition-all duration-500 card-shine"
            >
              <div className="flex mb-5">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Star className="text-accent-400 fill-accent-400" size={24} />
                  </motion.div>
                ))}
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-6 italic text-lg leading-relaxed">
                "{testimonial.text}"
              </p>
              <p className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-accent-600 text-lg">
                - {testimonial.name}
              </p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
