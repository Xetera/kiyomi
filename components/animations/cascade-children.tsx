import React from "react";
import { motion } from "framer-motion";

export function CascadeChildren({
  children,
  className,
}: React.PropsWithChildren<{ className?: string }>) {
  return (
    <motion.section
      className={className}
      initial="hidden"
      animate="show"
      variants={{
        hidden: { opacity: 0 },
        show: {
          opacity: 1,
          transition: {
            staggerChildren: 0.04,
          },
        },
      }}
    >
      {React.Children.map(children, (child) => (
        <motion.div
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1 },
          }}
        >
          {child}
        </motion.div>
      ))}
    </motion.section>
  );
}
