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
    primary: 'from-primary to-neon-cyan shadow-neon-cyan',
    secondary: 'from-secondary to-neon-purple shadow-neon-purple',
    accent: 'from-accent to-neon-magenta shadow-neon-magenta',
  };

  const textColors = {
    primary: 'text-primary',
    secondary: 'text-secondary',
    accent: 'text-accent',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="glass-panel p-6 rounded-2xl group cursor-pointer relative overflow-hidden"
    >
      {/* Background glow on hover */}
      <div className={`absolute inset-0 bg-gradient-to-br ${colorClasses[color]} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
      
      {/* Icon */}
      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${colorClasses[color]} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
        <Icon className="w-7 h-7 text-primary-foreground" />
      </div>

      {/* Content */}
      <h3 className={`font-display text-xl font-semibold mb-2 ${textColors[color]} group-hover:text-glow-${color === 'primary' ? 'cyan' : color === 'secondary' ? 'purple' : 'magenta'} transition-all`}>
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
