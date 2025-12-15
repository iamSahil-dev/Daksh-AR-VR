import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import { 
  Play, 
  Zap, 
  Brain, 
  Mic, 
  Gamepad2, 
  Award, 
  ChevronRight,
  Glasses,
  Cpu,
  Users,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import ParticleBackground from '@/components/ParticleBackground';
import FeatureCard from '@/components/FeatureCard';
import StatsCounter from '@/components/StatsCounter';
import Footer from '@/components/Footer';
import ScrollProgress from '@/components/ScrollProgress';
import PageTransition from '@/components/PageTransition';
import { useRef } from 'react';

const Index = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);

  const [statsRef, statsInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [featuresRef, featuresInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const features: Array<{
    icon: typeof Glasses;
    title: string;
    description: string;
    color: 'primary' | 'secondary' | 'accent';
  }> = [
    {
      icon: Glasses,
      title: 'Immersive AR/VR Training',
      description: 'Experience hands-on learning with cutting-edge augmented and virtual reality simulations.',
      color: 'primary',
    },
    {
      icon: Brain,
      title: 'Adaptive AI Learning',
      description: 'Our AI adjusts difficulty based on your performance, ensuring optimal learning pace.',
      color: 'secondary',
    },
    {
      icon: Mic,
      title: 'Voice-Guided Navigation',
      description: 'Navigate through modules hands-free with intelligent voice commands.',
      color: 'accent',
    },
    {
      icon: Gamepad2,
      title: 'Gamified Experience',
      description: 'Earn badges, climb leaderboards, and unlock achievements as you learn.',
      color: 'primary',
    },
    {
      icon: Cpu,
      title: '3D Interactive Modules',
      description: 'Manipulate, assemble, and explore 3D objects in real-time simulations.',
      color: 'secondary',
    },
    {
      icon: Award,
      title: 'Certified Learning',
      description: 'Receive industry-recognized certificates upon module completion.',
      color: 'accent',
    },
  ];

  const stats = [
    { value: 50, suffix: '+', label: 'Skill Modules' },
    { value: 10000, suffix: '+', label: 'Active Learners' },
    { value: 98, suffix: '%', label: 'Success Rate' },
    { value: 24, suffix: '/7', label: 'Support' },
  ];

  return (
    <PageTransition>
      <div className="min-h-screen bg-background overflow-x-hidden">
        <ScrollProgress />
        <ParticleBackground />
        <Navbar />

      {/* Hero Section with Parallax */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        <motion.div 
          style={{ opacity, scale, y }}
          className="container mx-auto px-6 py-20 relative z-10"
        >
          <div className="max-w-5xl mx-auto text-center">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 glass-panel px-5 py-2.5 rounded-full mb-8 border border-primary/20"
            >
              <Sparkles className="w-4 h-4 text-primary animate-pulse" />
              <span className="text-sm font-medium bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                The Future of Skill Training
              </span>
            </motion.div>

            {/* Main Heading with improved gradient */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-display text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight"
            >
              <span className="text-foreground">Master Skills in</span>
              <br />
              <motion.span 
                className="bg-gradient-to-r from-blue-500 via-purple-500 to-violet-400 bg-clip-text text-transparent relative inline-block cursor-pointer pb-2"
                initial="rest"
                whileHover="hover"
                animate="rest"
                variants={{
                  rest: { scale: 1 },
                  hover: { scale: 1.02 }
                }}
                transition={{ duration: 0.3 }}
              >
                Virtual Reality
                <motion.span 
                  className="absolute -bottom-1 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-violet-400 rounded-full"
                  style={{ transformOrigin: "left", boxShadow: "0 0 20px rgba(139, 92, 246, 0.6)" }}
                  variants={{
                    rest: { scaleX: 0, opacity: 0 },
                    hover: { scaleX: 1, opacity: 1 }
                  }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                />
              </motion.span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg md:text-xl text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed"
            >
              Immersive AR/VR training platform with AI-powered adaptive learning, 
              voice navigation, and gamified skill development for Industry 4.0.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Link to="/signup">
                <Button size="lg" className="btn-glow group px-8 py-6 text-base">
                  <Play className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  Start Learning Free
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/modules">
                <Button variant="outline" size="lg" className="px-8 py-6 text-base border-primary/30 hover:border-primary/50 hover:bg-primary/5">
                  <Glasses className="w-5 h-5" />
                  Explore Modules
                </Button>
              </Link>
            </motion.div>

            {/* Hero Visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="mt-16 relative"
            >
              <div className="relative w-full max-w-4xl mx-auto aspect-video rounded-3xl overflow-hidden glass-panel border border-primary/20">
                {/* Background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-violet-600/20" />
                
                {/* Animated grid */}
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute inset-0" style={{
                    backgroundImage: `linear-gradient(rgba(96, 165, 250, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(96, 165, 250, 0.3) 1px, transparent 1px)`,
                    backgroundSize: '50px 50px'
                  }} />
                </div>

                {/* Center content */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div 
                    className="text-center"
                    animate={{ y: [-10, 10, -10] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <div className="relative mb-6">
                      <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-violet-400 flex items-center justify-center mx-auto shadow-2xl">
                        <Glasses className="w-16 h-16 text-white" />
                      </div>
                      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-violet-400 blur-2xl opacity-50" />
                    </div>
                    <p className="text-lg text-muted-foreground font-medium">AR/VR Experience Preview</p>
                  </motion.div>
                </div>

                {/* Glow effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-violet-600 opacity-20 blur-3xl -z-10" />
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
        >
          <div className="w-6 h-10 rounded-full border-2 border-primary/40 flex items-start justify-center p-2">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-1.5 h-1.5 rounded-full bg-primary"
            />
          </div>
        </motion.div>

        {/* Decorative elements */}
        <div className="absolute top-1/4 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="py-20 relative z-10">
        <div className="container mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={statsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="glass-panel rounded-3xl p-8 md:p-12 border border-primary/10 relative overflow-hidden"
          >
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl" />
            
            <div className="relative grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <StatsCounter key={index} {...stat} delay={index * 0.2} />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} className="py-20 relative z-10">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={featuresInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <motion.span 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={featuresInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 glass-panel px-5 py-2 rounded-full text-sm font-medium mb-6 border border-primary/20"
            >
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Features
              </span>
            </motion.span>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <motion.span 
                className="relative inline-block cursor-pointer pb-2"
                initial="rest"
                whileHover="hover"
                animate="rest"
                variants={{
                  rest: { scale: 1 },
                  hover: { scale: 1.02 }
                }}
                transition={{ duration: 0.3 }}
              >
                Why Choose <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">EduARtisan</span>?
                <motion.span 
                  className="absolute -bottom-1 left-0 w-full h-2 bg-gradient-to-r from-white via-blue-500 to-purple-500 rounded-full"
                  style={{ transformOrigin: "left", boxShadow: "0 0 20px rgba(139, 92, 246, 0.6)" }}
                  variants={{
                    rest: { scaleX: 0, opacity: 0 },
                    hover: { scaleX: 1, opacity: 1 }
                  }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                />
              </motion.span>
            </h2>
            <p className="text-muted-foreground text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
              Experience the most advanced offline-first skill training platform built for India's vocational education revolution
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative z-10">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="glass-panel rounded-3xl p-12 md:p-20 text-center relative overflow-hidden border border-primary/20"
          >
            {/* Animated background */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/10 to-violet-600/10" />
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
            
            <div className="relative z-10">
              {/* User avatars */}
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="flex justify-center mb-8"
              >
                <div className="flex -space-x-4">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ x: -20 * i, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1, duration: 0.5 }}
                      className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-violet-400 border-4 border-background flex items-center justify-center shadow-lg"
                    >
                      <Users className="w-6 h-6 text-white" />
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                <span className="inline-block px-4 py-1.5 glass-panel rounded-full text-sm font-medium mb-6 border border-primary/20">
                  <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                    Join 10,000+ Active Learners
                  </span>
                </span>
              </motion.div>

              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
              >
                <motion.span 
                  className="relative inline-block cursor-pointer pb-2"
                  initial="rest"
                  whileHover="hover"
                  animate="rest"
                  variants={{
                    rest: { scale: 1 },
                    hover: { scale: 1.02 }
                  }}
                  transition={{ duration: 0.3 }}
                >
                  Ready to Transform Your{' '}
                  <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-violet-400 bg-clip-text text-transparent">
                    Skills?
                  </span>
                  <motion.span 
                    className="absolute -bottom-1 left-0 w-full h-2 bg-gradient-to-r from-white via-purple-500 to-violet-400 rounded-full"
                    style={{ transformOrigin: "left", boxShadow: "0 0 20px rgba(139, 92, 246, 0.6)" }}
                    variants={{
                      rest: { scaleX: 0, opacity: 0 },
                      hover: { scaleX: 1, opacity: 1 }
                    }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  />
                </motion.span>
              </motion.h2>

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="text-muted-foreground text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed"
              >
                Start your journey with India's first offline-capable AR/VR vocational training platform. No internet required.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                <Link to="/signup">
                  <Button size="lg" className="btn-glow group px-8 py-6 text-lg">
                    <Zap className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                    Get Started Now
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
    </PageTransition>
  );
};

export default Index;
