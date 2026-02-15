"use client";

import { ReactNode } from "react";
import { motion, MotionProps } from "framer-motion";

interface CardProps extends MotionProps {
  children: ReactNode;
  className?: string;
  hoverable?: boolean;
  onClick?: () => void;
}

export function Card({
  children,
  className = "",
  hoverable = false,
  onClick,
  ...motionProps
}: CardProps) {
  return (
    <motion.div
      className={`glass-card ${hoverable ? "glass-card-elevated cursor-pointer" : ""} ${className}`}
      onClick={onClick}
      whileHover={hoverable ? { y: -4 } : undefined}
      transition={{ type: "spring", bounce: 0.2, duration: 0.3 }}
      {...motionProps}
    >
      {children}
    </motion.div>
  );
}
