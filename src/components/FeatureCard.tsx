import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  color: 'primary' | 'secondary' | 'accent';
  index: number;
}

const FeatureCard = ({ icon: Icon, title, description, color, index }: FeatureCardProps) => {
  const colorClasses = {
    primary: 'from-blue-600 to-blue-500',
    secondary: 'from-purple-600 to-purple-500',
    accent: 'from-violet-600 to-violet-500',
  };

  const textColors = {
    primary: 'text-blue-400',
    secondary: 'text-purple-400',
    accent: 'text-violet-400',
  };

  const iconBgClasses = {
    primary: 'bg-blue-500/20 group-hover:bg-blue-500/30',
    secondary: 'bg-purple-500/20 group-hover:bg-purple-500/30',
    accent: 'bg-violet-500/20 group-hover:bg-violet-500/30',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="glass-panel p-6 rounded-2xl group cursor-pointer relative overflow-hidden border border-primary/10 hover:border-primary/20"
    >
      {/* Background glow on hover */}
      <div className={`absolute inset-0 bg-gradient-to-br ${colorClasses[color]} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
      
      {/* Icon */}
      <div className={`relative w-16 h-16 rounded-xl ${iconBgClasses[color]} flex items-center justify-center mb-5 group-hover:scale-110 transition-all duration-300 shadow-lg`}>
        <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${colorClasses[color]} opacity-50`} />
        <Icon className="w-8 h-8 text-white relative z-10" />
      </div>

      {/* Content */}
      <h3 className={`font-display text-xl font-bold mb-2 ${textColors[color]} transition-all`}>
        {title}
      </h3>
      <p className="text-muted-foreground leading-relaxed">
        {description}
      </p>

      {/* Decorative corner */}
      <div className={`absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br ${colorClasses[color]} opacity-10 rounded-full blur-2xl group-hover:opacity-20 transition-opacity`} />
    </motion.div>
  );
};

export default FeatureCard;
