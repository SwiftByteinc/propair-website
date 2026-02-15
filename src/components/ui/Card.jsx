import React from 'react';
import { motion } from 'framer-motion';

export default function Card({ children, className = '', hoverEffect = false, ...props }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={hoverEffect ? { y: -5, boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)" } : {}}
      className={`bg-white rounded-2xl shadow-lg shadow-slate-200/50 p-6 ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
}
