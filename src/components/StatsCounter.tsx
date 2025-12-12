import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface StatsCounterProps {
  value: number;
  suffix?: string;
  label: string;
  delay?: number;
}

const StatsCounter = ({ value, suffix = '', label, delay = 0 }: StatsCounterProps) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    const duration = 2000;
    const startTime = Date.now();
    const endValue = value;

    const updateCount = () => {
      const now = Date.now();
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentCount = Math.floor(easeOut * endValue);
      
      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      }
    };

    const timeout = setTimeout(() => {
      requestAnimationFrame(updateCount);
    }, delay * 1000);

    return () => clearTimeout(timeout);
  }, [value, delay, isInView]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className="text-center"
    >
      <div className="font-display text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent mb-2">
        {count.toLocaleString()}
        {suffix}
      </div>
      <div className="text-muted-foreground font-medium">{label}</div>
    </motion.div>
  );
};

export default StatsCounter;
