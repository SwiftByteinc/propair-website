import React from 'react';
import { motion } from 'framer-motion';

export default function Button({ children, className = '', variant = 'primary', ...props }) {
  const baseStyle = "rounded-full px-6 py-3 font-medium transition-all duration-300 transform hover:scale-105 active:scale-95 focus:outline-none";

  const variants = {
    primary: "bg-brand text-white hover:bg-teal-800 shadow-lg shadow-teal-700/30",
    secondary: "bg-slate-900 text-white hover:bg-slate-800 shadow-lg shadow-slate-900/30",
    outline: "border-2 border-slate-200 text-slate-700 hover:border-brand hover:text-brand bg-transparent",
    ghost: "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`${baseStyle} ${variants[variant] || variants.primary} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
}
