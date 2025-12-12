import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
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
  Users
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import ParticleBackground from '@/components/ParticleBackground';
import FeatureCard from '@/components/FeatureCard';
import StatsCounter from '@/components/StatsCounter';
import Footer from '@/components/Footer';

const Index = () => {
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
    <div className="min-h-screen bg-background overflow-x-hidden">
      <ParticleBackground />
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20">
        <div className="container mx-auto px-6 py-20 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 glass-panel px-4 py-2 rounded-full mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-neon-green animate-pulse" />
              <span className="text-sm text-muted-foreground">The Future of Skill Training</span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-display text-5xl md:text-7xl lg:text-8xl font-bold mb-6"
            >
              <span className="text-foreground">Master Skills in</span>
              <br />
              <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent animate-gradient-shift bg-[length:200%_auto]">
                Virtual Reality
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed"
            >
              Immersive AR/VR training platform with AI-powered adaptive learning, 
              voice navigation, and gamified skill development.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Link to="/signup">
                <Button size="xl" className="btn-glow group">
                  <Play className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  Start Learning Free
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/modules">
                <Button variant="outline" size="xl">
                  <Glasses className="w-5 h-5" />
                  Explore Modules
                </Button>
              </Link>
            </motion.div>

            {/* Floating 3D Element */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="mt-16 relative"
            >
              <div className="relative w-full max-w-4xl mx-auto aspect-video rounded-2xl overflow-hidden glass-panel gradient-border">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto mb-4 animate-float shadow-neon-cyan">
                      <Glasses className="w-12 h-12 text-primary-foreground" />
                    </div>
                    <p className="text-lg text-muted-foreground">3D Preview Coming Soon</p>
                  </div>
                </div>
                <div className="absolute -inset-1 bg-gradient-to-r from-primary via-accent to-secondary opacity-20 blur-2xl -z-10" />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 rounded-full border-2 border-primary/50 flex items-start justify-center p-2">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 rounded-full bg-primary"
            />
          </div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-20 relative z-10">
        <div className="container mx-auto px-6">
          <div className="glass-panel rounded-2xl p-8 md:p-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <StatsCounter key={index} {...stat} delay={index * 0.2} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 relative z-10">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1 glass-panel rounded-full text-sm text-primary mb-4">
              Features
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
              Why Choose <span className="text-glow-cyan text-primary">DAKSH</span>?
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Experience the most advanced skill training platform with cutting-edge technology
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
            className="glass-panel rounded-3xl p-12 md:p-16 text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/20 rounded-full blur-3xl" />
            
            <div className="relative z-10">
              <div className="flex justify-center mb-6">
                <div className="flex -space-x-3">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary border-2 border-background flex items-center justify-center"
                    >
                      <Users className="w-5 h-5 text-primary-foreground" />
                    </div>
                  ))}
                </div>
              </div>
              <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
                Ready to Transform Your Skills?
              </h2>
              <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
                Join thousands of learners mastering new skills through immersive VR experiences.
              </p>
              <Link to="/signup">
                <Button size="xl" className="btn-glow">
                  <Zap className="w-5 h-5" />
                  Get Started Now
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
