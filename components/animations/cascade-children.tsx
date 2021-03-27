import React from "react";
import { motion } from "framer-motion";

export function CascadeChildren({
  children,
  className,
  style,
}: React.PropsWithChildren<{
  className?: string;
  style?: React.CSSProperties;
}>) {
  return (
    <motion.section
      className={className}
      style={style}
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
      {React.Children.map(
        children,
        (child) =>
          child && (
            <motion.div
              key={child.toString()}
              variants={{
                hidden: { opacity: 0 },
                show: { opacity: 1 },
              }}
            >
              {child}
            </motion.div>
          )
      )}
    </motion.section>
  );
}
