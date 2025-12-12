import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Target, 
  Brain, 
  Glasses, 
  Mic, 
  Award, 
  Users, 
  Globe,
  Rocket,
  Shield,
  Zap
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import ParticleBackground from '@/components/ParticleBackground';
import Footer from '@/components/Footer';

const About = () => {
  const values = [
    {
      icon: Target,
      title: 'Mission-Driven',
      description: 'Democratizing skill education through immersive technology.',
    },
    {
      icon: Brain,
      title: 'Innovation First',
      description: 'Pushing boundaries with AI, VR, and adaptive learning.',
    },
    {
      icon: Users,
      title: 'Community Focused',
      description: 'Building a global network of skilled professionals.',
    },
    {
      icon: Shield,
      title: 'Quality Assured',
      description: 'Industry-recognized certifications and standards.',
    },
  ];

  const features = [
    {
      icon: Glasses,
      title: 'AR/VR Technology',
      description: 'Experience hands-on training in immersive virtual environments using cutting-edge WebXR technology.',
    },
    {
      icon: Brain,
      title: 'Adaptive AI',
      description: 'Our AI analyzes your learning patterns and adjusts difficulty in real-time for optimal progress.',
    },
    {
      icon: Mic,
      title: 'Voice Navigation',
      description: 'Navigate through modules hands-free with intelligent voice commands and audio feedback.',
    },
    {
      icon: Award,
      title: 'Gamification',
      description: 'Earn badges, climb leaderboards, and unlock achievements as you master new skills.',
    },
  ];

  const team = [
    { name: 'Dr. Aisha Patel', role: 'CEO & Founder', avatar: '👩‍💼' },
    { name: 'Raj Sharma', role: 'CTO', avatar: '👨‍💻' },
    { name: 'Maria Chen', role: 'Head of AI', avatar: '👩‍🔬' },
    { name: 'Alex Johnson', role: 'XR Lead', avatar: '🧑‍🎨' },
  ];

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <ParticleBackground />
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 relative z-10">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <span className="inline-block px-4 py-1 glass-panel rounded-full text-sm text-primary mb-6">
              About DAKSH
            </span>
            <h1 className="font-display text-5xl md:text-6xl font-bold mb-6">
              Revolutionizing{' '}
              <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                Skill Education
              </span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              DAKSH is a next-generation skill training platform that combines AR/VR technology, 
              AI-powered adaptive learning, and gamification to create the most effective 
              learning experience ever built.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 relative z-10">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block px-4 py-1 glass-panel rounded-full text-sm text-accent mb-4">
                Our Mission
              </span>
              <h2 className="font-display text-4xl font-bold mb-6">
                Making Quality Training{' '}
                <span className="text-primary">Accessible</span> to Everyone
              </h2>
              <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                We believe that practical skills shouldn't be limited by geography, 
                resources, or traditional learning constraints. By leveraging immersive 
                technology, we bring world-class training to anyone, anywhere.
              </p>
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                Our platform simulates real-world environments, allowing learners to 
                practice complex procedures safely and repeatedly until they achieve mastery.
              </p>
              <div className="flex gap-4">
                <Link to="/signup">
                  <Button className="btn-glow gap-2">
                    <Rocket className="w-4 h-4" />
                    Start Learning
                  </Button>
                </Link>
                <Link to="/modules">
                  <Button variant="outline" className="gap-2">
                    <Glasses className="w-4 h-4" />
                    Explore Modules
                  </Button>
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="grid grid-cols-2 gap-6"
            >
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-panel rounded-2xl p-6 hover-lift"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-4">
                    <value.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <h3 className="font-display font-semibold text-lg mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </motion.div>
              ))}
            </motion.div>
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
            <span className="inline-block px-4 py-1 glass-panel rounded-full text-sm text-secondary mb-4">
              Technology
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
              Powered by <span className="text-secondary">Innovation</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Our platform combines multiple cutting-edge technologies to deliver 
              an unparalleled learning experience.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-panel rounded-2xl p-8 hover-lift group"
              >
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-secondary to-neon-purple flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <feature.icon className="w-8 h-8 text-secondary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-semibold mb-2 text-secondary">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 relative z-10">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1 glass-panel rounded-full text-sm text-accent mb-4">
              Our Team
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
              Meet the <span className="text-accent">Visionaries</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              A diverse team of experts in education, technology, and design.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-panel rounded-2xl p-6 text-center hover-lift"
              >
                <div className="text-6xl mb-4">{member.avatar}</div>
                <h3 className="font-display font-semibold text-lg">{member.name}</h3>
                <p className="text-sm text-muted-foreground">{member.role}</p>
              </motion.div>
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
            className="glass-panel rounded-3xl p-12 text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/20 rounded-full blur-3xl" />

            <div className="relative z-10">
              <Globe className="w-16 h-16 text-primary mx-auto mb-6" />
              <h2 className="font-display text-4xl font-bold mb-4">
                Join the Future of Learning
              </h2>
              <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
                Be part of a global community that's redefining how skills are learned and mastered.
              </p>
              <Link to="/signup">
                <Button size="xl" className="btn-glow">
                  <Zap className="w-5 h-5" />
                  Get Started Today
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

export default About;
