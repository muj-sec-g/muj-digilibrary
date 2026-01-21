"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue, useAnimationFrame } from "framer-motion";
import { cn } from "@/lib/utils";

// The individual floating text bubble
const FloatingText = ({ 
  text, 
  className, 
  depth = 1 
}: { 
  text: string; 
  className?: string; 
  depth?: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  
  // Mouse tracking logic would go here, but for simplicity/performance in a
  // login page, we'll use a continuous floating animation + simple hover offset
  
  return (
    <motion.div
      ref={ref}
      className={cn(
        "absolute text-sm font-medium text-orange-900/40 bg-white/40 backdrop-blur-sm border border-white/50 px-4 py-2 rounded-full shadow-sm pointer-events-none select-none z-0",
        className
      )}
      animate={{
        y: [0, -10 * depth, 0],
        x: [0, 5 * depth, 0],
      }}
      transition={{
        duration: 5 + depth, // Randomize speed based on depth
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {text}
    </motion.div>
  );
};

export const ParallaxBackground = () => {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
      {/* Positioning Strategy:
         We place them in "Safe Zones" (corners/edges) so they don't block the Login Card.
         top/bottom/left/right values are % based.
      */}

      {/* Top Left Cluster */}
      <FloatingText text="Is the library open today?" className="top-[15%] left-[10%]" depth={1} />
      <FloatingText text="Can I renew online?" className="top-[25%] left-[5%]" depth={2} />

      {/* Top Right Cluster */}
      <FloatingText text="Do you have 'Clean Code'?" className="top-[12%] right-[10%]" depth={1.5} />
      <FloatingText text="Check availability" className="top-[30%] right-[5%]" depth={1.2} />

      {/* Bottom Left Cluster */}
      <FloatingText text="When is my book due?" className="bottom-[20%] left-[10%]" depth={1.3} />
      <FloatingText text="Reference section?" className="bottom-[10%] left-[20%]" depth={1.8} />

      {/* Bottom Right Cluster */}
      <FloatingText text="Quiet study zones" className="bottom-[25%] right-[10%]" depth={1.6} />
      <FloatingText text="Penalty calculator" className="bottom-[12%] right-[15%]" depth={2} />
    </div>
  );
};