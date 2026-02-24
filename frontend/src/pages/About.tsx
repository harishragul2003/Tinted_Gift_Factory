import { motion } from 'framer-motion';
import { Heart, Truck, Shield, Star, Gift, Package, Sparkles, Target, Award } from 'lucide-react';

export default function About() {
  const features = [
    { icon: Sparkles, title: 'Unique & Personalized Gifts', desc: 'Customized to make every moment special' },
    { icon: Truck, title: 'Fast & Reliable Delivery', desc: 'Quick and secure shipping to your doorstep' },
    { icon: Shield, title: 'Secure Payment Options', desc: 'Safe and encrypted transactions' },
    { icon: Package, title: 'Quality Assured Products', desc: '100% authentic and premium quality' },
    { icon: Star, title: 'Excellent Customer Support', desc: 'Always here to help you' },
  ];

  const offerings = [
    { icon: Gift, title: 'Customized Gifts', desc: 'Personalized items tailored to your needs' },
    { icon: Award, title: 'Handmade Artworks', desc: 'Unique pieces crafted with love' },
    { icon: Package, title: 'Premium Gift Hampers', desc: 'Curated collections for every occasion' },
    { icon: Sparkles, title: 'Surprise Boxes', desc: 'Delightful surprises for your loved ones' },
    { icon: Heart, title: 'Special Occasion Collections', desc: 'Perfect gifts for every celebration' },
  ];

  return (
    <div className="space-y-20 pb-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-[60vh] flex items-center justify-center">
        {/* Animated Background */}
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
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10 px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <motion.h1
              className="text-5xl md:text-6xl font-bold"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <span className="animate-gradient-text">About Artify Aura</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-gray-700 dark:text-gray-200 max-w-3xl mx-auto leading-relaxed"
            >
              Artify Aura is a premium online gift store designed to make every moment special. 
              We provide curated, personalized, and high-quality gifts for birthdays, anniversaries, 
              weddings, and special occasions.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
            >
              Our mission is to deliver happiness through thoughtful gifting experiences.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 rounded-3xl p-12 text-center text-white shadow-2xl relative overflow-hidden"
        >
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3]
              }}
              transition={{ duration: 8, repeat: Infinity }}
              className="absolute -top-20 -right-20 w-96 h-96 bg-white/20 rounded-full blur-3xl"
            />
          </div>
          
          <div className="relative z-10">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-6"
            >
              <Target className="text-white" size={40} />
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Our Mission</h2>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed">
              To spread joy and strengthen relationships by offering meaningful and 
              beautifully crafted gifts for every occasion.
            </p>
          </div>
        </motion.div>
      </section>

      {/* Why Choose Us */}
      <section className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="animate-gradient-text">Why Choose Us?</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Experience excellence in every aspect of gifting
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -15, scale: 1.03 }}
              className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-3xl p-8 shadow-2xl hover:shadow-primary-500/30 transition-all duration-500 card-shine relative overflow-hidden group"
            >
              <motion.div
                whileHover={{ rotate: 360, scale: 1.2 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary-500 to-accent-500 rounded-3xl mb-6 shadow-xl group-hover:shadow-2xl group-hover:shadow-primary-500/50"
              >
                <feature.icon className="text-white" size={32} />
              </motion.div>
              <h3 className="font-bold text-xl mb-3 text-gray-900 dark:text-white">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {feature.desc}
              </p>
              
              <div className="absolute inset-0 bg-gradient-to-r from-primary-500/0 via-accent-500/0 to-primary-500/0 group-hover:from-primary-500/10 group-hover:via-accent-500/10 group-hover:to-primary-500/10 transition-all duration-500 rounded-3xl"></div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* What We Offer */}
      <section className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="animate-gradient-text">What We Offer</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Discover our wide range of premium gifting options
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {offerings.map((offering, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -15, scale: 1.03 }}
              className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-3xl p-8 shadow-2xl hover:shadow-primary-500/30 transition-all duration-500 card-shine relative overflow-hidden group"
            >
              <motion.div
                whileHover={{ rotate: 360, scale: 1.2 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary-500 to-accent-500 rounded-3xl mb-6 shadow-xl group-hover:shadow-2xl group-hover:shadow-primary-500/50"
              >
                <offering.icon className="text-white" size={32} />
              </motion.div>
              <h3 className="font-bold text-xl mb-3 text-gray-900 dark:text-white">
                {offering.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {offering.desc}
              </p>
              
              <div className="absolute inset-0 bg-gradient-to-r from-primary-500/0 via-accent-500/0 to-primary-500/0 group-hover:from-primary-500/10 group-hover:via-accent-500/10 group-hover:to-primary-500/10 transition-all duration-500 rounded-3xl"></div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
