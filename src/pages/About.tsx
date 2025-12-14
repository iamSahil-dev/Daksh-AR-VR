import { motion, useScroll, useTransform } from 'framer-motion';
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
  Zap,
  TrendingUp,
  BookOpen,
  Sparkles,
  Heart,
  CheckCircle2,
  ArrowRight,
  Lightbulb,
  GraduationCap,
  Code,
  Smartphone
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import ParticleBackground from '@/components/ParticleBackground';
import Footer from '@/components/Footer';
import ScrollProgress from '@/components/ScrollProgress';
import PageTransition from '@/components/PageTransition';
import { useRef } from 'react';

const About = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  const coreValues = [
    {
      icon: Target,
      title: 'Mission-Driven',
      description: 'Democratizing vocational education through immersive AR/VR technology for rural India.',
      color: 'from-blue-500 to-cyan-500',
      stat: '10K+',
      statLabel: 'Lives Impacted'
    },
    {
      icon: Brain,
      title: 'Innovation First',
      description: 'AI-powered adaptive learning that works offline with smartphone AR capabilities.',
      color: 'from-purple-500 to-pink-500',
      stat: '95%',
      statLabel: 'Retention Rate'
    },
    {
      icon: Heart,
      title: 'Community Focused',
      description: 'Building a network of skilled artisans and technicians across India.',
      color: 'from-orange-500 to-red-500',
      stat: '500+',
      statLabel: 'Villages Reached'
    },
    {
      icon: Shield,
      title: 'Quality Assured',
      description: 'Industry-recognized certifications that open doors to employment.',
      color: 'from-green-500 to-emerald-500',
      stat: '98%',
      statLabel: 'Success Rate'
    },
  ];

  const technologies = [
    {
      icon: Glasses,
      title: 'AR/VR Learning',
      description: 'Turn any smartphone into a virtual workshop with WebXR technology. Practice plumbing, electrical work, and more in immersive 3D.',
      features: ['Smartphone Compatible', 'No Special Hardware', 'Offline Capable'],
      color: 'blue'
    },
    {
      icon: Brain,
      title: 'Adaptive AI Coach',
      description: 'AI analyzes your learning pace and adjusts difficulty. Get personalized guidance that adapts to your skill level in real-time.',
      features: ['Smart Difficulty', 'Progress Tracking', 'Instant Feedback'],
      color: 'purple'
    },
    {
      icon: Mic,
      title: 'Voice Commands',
      description: 'Navigate hands-free in Hindi, English, and regional languages. Perfect for when your hands are busy with practical work.',
      features: ['Multi-Language', 'Hands-Free', 'Audio Guidance'],
      color: 'orange'
    },
    {
      icon: Smartphone,
      title: 'Offline-First',
      description: 'Download modules and learn without internet. All features work perfectly in areas with limited connectivity.',
      features: ['Zero Internet Needed', 'Cloud Sync', 'Low Data Usage'],
      color: 'green'
    },
  ];

  const impactStats = [
    { value: '12,847', label: 'Active Learners', icon: Users },
    { value: '3.2M', label: 'Modules Completed', icon: BookOpen },
    { value: '98.5%', label: 'Success Rate', icon: TrendingUp },
    { value: '25+', label: 'Skill Tracks', icon: Award },
  ];

  const teamMembers = [
    { name: 'Sahil Kumar', avatar: '👨‍💻' },
    { name: 'Jay Ratna', avatar: '👨‍🎓' },
    { name: 'Abhinav', avatar: '👨‍💼' },
    { name: 'Riya', avatar: '👩‍🎨' },
  ];

  const problemPoints = [
    {
      icon: Target,
      title: 'Limited Access',
      problem: 'Only 2.3% of India\'s workforce receives formal skill training',
      color: 'from-red-500 to-orange-500'
    },
    {
      icon: Users,
      title: 'Geography Barrier',
      problem: 'Quality training centers concentrated in cities, leaving 65% rural population behind',
      color: 'from-orange-500 to-yellow-500'
    },
    {
      icon: Award,
      title: 'High Costs',
      problem: 'Traditional vocational training costs ₹15,000-50,000, unaffordable for many',
      color: 'from-yellow-500 to-green-500'
    },
    {
      icon: Zap,
      title: 'Outdated Methods',
      problem: 'Theory-heavy approach with limited hands-on practice opportunities',
      color: 'from-green-500 to-cyan-500'
    },
  ];

  const solutionPoints = [
    {
      icon: Smartphone,
      title: 'Smartphone-Powered',
      solution: 'Works on any Android phone with AR, no expensive VR headsets needed',
      impact: '10x cost reduction'
    },
    {
      icon: Globe,
      title: 'Offline-First',
      solution: 'Download modules once, learn anytime without internet connectivity',
      impact: 'Zero data costs'
    },
    {
      icon: Brain,
      title: 'AI Adaptation',
      solution: 'Personalized learning paths that adapt to individual pace and style',
      impact: '3x faster mastery'
    },
    {
      icon: Glasses,
      title: 'Virtual Practice',
      solution: 'Unlimited practice in AR without material costs or safety risks',
      impact: 'Infinite repetition'
    },
  ];

  const journey = [
    {
      year: '2023',
      title: 'The Beginning',
      description: 'Founded with a mission to bridge the vocational skills gap in rural India through technology.',
      icon: Lightbulb
    },
    {
      year: '2024',
      title: 'Prototype Launch',
      description: 'Developed AR-based skill training modules for plumbing and electrical work in 5 villages.',
      icon: Rocket
    },
    {
      year: '2024',
      title: 'Community Growth',
      description: 'Reached 10,000+ learners across 500+ villages with offline-first AR learning platform.',
      icon: Users
    },
    {
      year: '2025',
      title: 'National Expansion',
      description: 'Partnered with government initiatives and industry to scale across India.',
      icon: Globe
    },
  ];

  return (
    <PageTransition>
      <div className="min-h-screen bg-background overflow-x-hidden" ref={containerRef}>
        <ScrollProgress />
        <ParticleBackground />
        <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-24 relative z-10">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-5xl mx-auto text-center"
          >
            <motion.span 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
              className="inline-block px-6 py-2 glass-panel rounded-full text-sm text-primary mb-6"
            >
              <Sparkles className="w-4 h-4 inline mr-2" />
              About EduARtisan
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="font-display font-bold mb-6 leading-tight"
            >
              <div className="text-6xl md:text-8xl mb-3">
                Empowering India's{' '}
                <motion.span 
                  className="bg-gradient-to-r from-blue-500 via-purple-500 to-violet-500 bg-clip-text text-transparent relative inline-block cursor-pointer pb-2"
                  initial="rest"
                  whileHover="hover"
                  animate="rest"
                  variants={{
                    rest: { scale: 1 },
                    hover: { scale: 1.02 }
                  }}
                  transition={{ duration: 0.3 }}
                >
                  Next Generation
                  <motion.span
                    className="absolute -bottom-1 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-violet-500 rounded-full"
                    style={{ 
                      transformOrigin: "left",
                      boxShadow: "0 0 20px rgba(139, 92, 246, 0.6)"
                    }}
                    variants={{
                      rest: { scaleX: 0, opacity: 0 },
                      hover: { scaleX: 1, opacity: 1 }
                    }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  />
                </motion.span>
              </div>
              <motion.div 
                className="text-4xl md:text-5xl font-semibold text-muted-foreground"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                To Build the Skills of Tomorrow
              </motion.div>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-4xl mx-auto mb-10"
            >
              An AI + AR-powered, offline-first skill development ecosystem that transforms 
              any smartphone into a virtual skill laboratory for vocational education in India.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <Link to="/signup">
                <Button size="lg" className="btn-glow gap-2 text-lg px-8">
                  <Rocket className="w-5 h-5" />
                  Start Your Journey
                </Button>
              </Link>
              <Link to="/dashboard">
                <Button size="lg" variant="outline" className="gap-2 text-lg px-8">
                  <GraduationCap className="w-5 h-5" />
                  Explore Modules
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* The Problem Section */}
      <section className="py-24 relative z-10">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1 glass-panel rounded-full text-sm text-red-500 mb-4">
              The Challenge
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
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
                India's <span className="text-red-500">Vocational Skills Crisis</span>
                <motion.span 
                  className="absolute -bottom-1 left-0 w-full h-2 bg-gradient-to-r from-white to-red-500 rounded-full"
                  style={{ transformOrigin: "left", boxShadow: "0 0 20px rgba(239, 68, 68, 0.6)" }}
                  variants={{
                    rest: { scaleX: 0, opacity: 0 },
                    hover: { scaleX: 1, opacity: 1 }
                  }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                />
              </motion.span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto leading-relaxed">
              Despite being the world's youngest nation, India faces a massive skill gap. 
              While manufacturing and service sectors are booming, traditional vocational training 
              remains inaccessible, expensive, and outdated for millions.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {problemPoints.map((point, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.03, y: -5 }}
                className="glass-panel rounded-2xl p-6 relative overflow-hidden group"
              >
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${point.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                />
                <div className="flex items-start gap-4 relative z-10">
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className={`w-14 h-14 rounded-xl bg-gradient-to-br ${point.color} flex items-center justify-center shrink-0`}
                  >
                    <point.icon className="w-7 h-7 text-white" />
                  </motion.div>
                  <div>
                    <h3 className="font-display text-xl font-bold mb-2">{point.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{point.problem}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Impact Statement */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-12 text-center max-w-4xl mx-auto"
          >
            <div className="glass-panel rounded-2xl p-8 border-2 border-red-500/20">
              <p className="text-2xl md:text-3xl font-display font-bold text-red-500 mb-3">
                400 Million Youth Need Skills
              </p>
              <p className="text-muted-foreground text-lg">
                But less than 10 million get formal training each year. 
                This is not just a gap—it's a crisis that demands innovation.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Our Solution Section */}
      <section className="py-24 relative z-10">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1 glass-panel rounded-full text-sm text-green-500 mb-4">
              <Lightbulb className="w-4 h-4 inline mr-2" />
              Our Solution
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
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
                The <span className="text-green-500">EduARtisan</span> Approach
                <motion.span 
                  className="absolute -bottom-1 left-0 w-full h-2 bg-gradient-to-r from-white to-green-500 rounded-full"
                  style={{ transformOrigin: "left", boxShadow: "0 0 20px rgba(34, 197, 94, 0.6)" }}
                  variants={{
                    rest: { scaleX: 0, opacity: 0 },
                    hover: { scaleX: 1, opacity: 1 }
                  }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                />
              </motion.span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto leading-relaxed">
              We're democratizing vocational education by turning every smartphone into a virtual skill laboratory. 
              No expensive equipment, no internet required, no geographical barriers.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-16">
            {solutionPoints.map((point, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, type: "spring", stiffness: 80 }}
                whileHover={{ scale: 1.03, y: -5 }}
                className="glass-panel rounded-2xl p-6 relative overflow-hidden group"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                />
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <motion.div
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                      className="w-14 h-14 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center"
                    >
                      <point.icon className="w-7 h-7 text-white" />
                    </motion.div>
                    <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-600 text-sm font-semibold">
                      {point.impact}
                    </span>
                  </div>
                  <h3 className="font-display text-xl font-bold mb-2 text-green-500">{point.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{point.solution}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* How It Works */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="glass-panel rounded-3xl p-8 md:p-12 relative overflow-hidden">
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-green-500/5"
                animate={{ 
                  backgroundPosition: ['0% 0%', '100% 100%'],
                }}
                transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
              />
              <div className="relative z-10">
                <h3 className="font-display text-3xl font-bold mb-8 text-center">
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
                    From Concept to <span className="text-primary">Career</span>
                    <motion.span 
                      className="absolute -bottom-1 left-0 w-full h-2 bg-gradient-to-r from-white to-blue-500 rounded-full"
                      style={{ transformOrigin: "left", boxShadow: "0 0 20px rgba(59, 130, 246, 0.6)" }}
                      variants={{
                        rest: { scaleX: 0, opacity: 0 },
                        hover: { scaleX: 1, opacity: 1 }
                      }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                    />
                  </motion.span>
                </h3>
                <div className="space-y-6">
                  <div className="flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shrink-0 text-white font-bold">
                      1
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-lg mb-1">Download & Learn Offline</h4>
                      <p className="text-muted-foreground">Install the app, download your chosen skill module once. No internet needed after that.</p>
                    </div>
                  </div>
                  <div className="flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shrink-0 text-white font-bold">
                      2
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-lg mb-1">Practice in AR</h4>
                      <p className="text-muted-foreground">Point your phone camera to see virtual tools and equipment. Practice plumbing, electrical, carpentry in 3D.</p>
                    </div>
                  </div>
                  <div className="flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center shrink-0 text-white font-bold">
                      3
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-lg mb-1">AI Guides You</h4>
                      <p className="text-muted-foreground">Voice assistant provides real-time feedback in your language. AI adjusts difficulty based on your progress.</p>
                    </div>
                  </div>
                  <div className="flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center shrink-0 text-white font-bold">
                      4
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-lg mb-1">Earn & Work</h4>
                      <p className="text-muted-foreground">Complete modules, pass assessments, get certified. Connect with employers looking for skilled workers.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Impact Vision */}
      <section className="py-24 relative z-10">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 100 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="glass-panel rounded-3xl p-12 md:p-16 relative overflow-hidden">
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10"
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, 0]
                }}
                transition={{ duration: 8, repeat: Infinity }}
              />
              <div className="relative z-10">
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <Heart className="w-16 h-16 text-primary mx-auto mb-6" />
                </motion.div>
                <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
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
                    Our <span className="text-primary">Vision</span>
                    <motion.span 
                      className="absolute -bottom-1 left-0 w-full h-2 bg-gradient-to-r from-white to-blue-500 rounded-full"
                      style={{ transformOrigin: "left", boxShadow: "0 0 20px rgba(59, 130, 246, 0.6)" }}
                      variants={{
                        rest: { scaleX: 0, opacity: 0 },
                        hover: { scaleX: 1, opacity: 1 }
                      }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                    />
                  </motion.span>
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                  We envision an India where every young person, regardless of their location or economic background, 
                  has access to world-class vocational training. Where a farmer's son in rural Bihar can become a certified 
                  electrician without leaving his village. Where a girl in Rajasthan can master plumbing skills using just her smartphone.
                </p>
                <p className="text-xl font-display font-semibold text-primary">
                  "Skills Before Degrees, Practice Before Theory, Access Before Privilege"
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 relative z-10">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1 glass-panel rounded-full text-sm text-accent mb-4">
              <Users className="w-4 h-4 inline mr-2" />
              Our Team
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
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
                Meet the <span className="text-accent">Builders</span>
                <motion.span 
                  className="absolute -bottom-1 left-0 w-full h-2 bg-gradient-to-r from-white to-violet-400 rounded-full"
                  style={{ transformOrigin: "left", boxShadow: "0 0 20px rgba(196, 181, 253, 0.6)" }}
                  variants={{
                    rest: { scaleX: 0, opacity: 0 },
                    hover: { scaleX: 1, opacity: 1 }
                  }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                />
              </motion.span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              A passionate team committed to transforming vocational education in India.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }}
                whileHover={{ scale: 1.05, y: -10 }}
                className="glass-panel rounded-2xl p-8 text-center relative overflow-hidden group"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                />
                <div className="relative z-10">
                  <motion.div 
                    className="text-7xl mb-4"
                    whileHover={{ scale: 1.2, rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    {member.avatar}
                  </motion.div>
                  <h3 className="font-display font-bold text-xl">{member.name}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="py-24 relative z-10">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1 glass-panel rounded-full text-sm text-secondary mb-4">
              <Code className="w-4 h-4 inline mr-2" />
              Technology Stack
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
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
                Powered by <span className="text-secondary">Cutting-Edge Tech</span>
                <motion.span 
                  className="absolute -bottom-1 left-0 w-full h-2 bg-gradient-to-r from-white to-purple-500 rounded-full"
                  style={{ transformOrigin: "left", boxShadow: "0 0 20px rgba(168, 85, 247, 0.6)" }}
                  variants={{
                    rest: { scaleX: 0, opacity: 0 },
                    hover: { scaleX: 1, opacity: 1 }
                  }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                />
              </motion.span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              A perfect blend of AI, AR/VR, and mobile-first design to deliver seamless offline learning.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {technologies.map((tech, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, type: "spring", stiffness: 80 }}
                className="glass-panel rounded-3xl p-8 hover-lift relative overflow-hidden group"
              >
                <motion.div
                  className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary/5 to-accent/5 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"
                />
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-6">
                    <motion.div 
                      whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-br from-${tech.color}-500 to-${tech.color}-600 flex items-center justify-center shadow-lg`}
                    >
                      <tech.icon className="w-8 h-8 text-white" />
                    </motion.div>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      className={`w-12 h-12 rounded-full bg-${tech.color}-500/10 flex items-center justify-center`}
                    >
                      <Sparkles className={`w-6 h-6 text-${tech.color}-500`} />
                    </motion.div>
                  </div>
                  <h3 className={`font-display text-2xl font-bold mb-3 text-${tech.color}-500`}>
                    {tech.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {tech.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {tech.features.map((feature, i) => (
                      <span
                        key={i}
                        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full bg-${tech.color}-500/10 text-${tech.color}-600 text-sm`}
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Journey Timeline */}
      <section className="py-24 relative z-10">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1 glass-panel rounded-full text-sm text-primary mb-4">
              <TrendingUp className="w-4 h-4 inline mr-2" />
              Our Journey
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
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
                The <span className="text-primary">Story</span> So Far
                <motion.span 
                  className="absolute -bottom-1 left-0 w-full h-2 bg-gradient-to-r from-white to-blue-500 rounded-full"
                  style={{ transformOrigin: "left", boxShadow: "0 0 20px rgba(59, 130, 246, 0.6)" }}
                  variants={{
                    rest: { scaleX: 0, opacity: 0 },
                    hover: { scaleX: 1, opacity: 1 }
                  }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                />
              </motion.span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              From a simple idea to impacting thousands of lives across rural India.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            {journey.map((milestone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, type: "spring", stiffness: 80 }}
                className="relative"
              >
                {/* Timeline line */}
                {index !== journey.length - 1 && (
                  <div className="absolute left-8 top-20 bottom-0 w-0.5 bg-gradient-to-b from-primary to-transparent" />
                )}

                <div className="flex gap-6 mb-12">
                  <motion.div 
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center shrink-0 shadow-lg relative z-10"
                  >
                    <milestone.icon className="w-8 h-8 text-white" />
                  </motion.div>
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    className="glass-panel rounded-2xl p-6 flex-1 hover-lift"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <span className="px-3 py-1 rounded-full bg-primary/20 text-primary text-sm font-semibold">
                        {milestone.year}
                      </span>
                      <h3 className="font-display text-2xl font-bold">{milestone.title}</h3>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">{milestone.description}</p>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative z-10">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 100 }}
            className="glass-panel rounded-3xl p-12 md:p-16 text-center relative overflow-hidden"
          >
            {/* Animated Background */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-violet-500/10"
              animate={{ 
                backgroundPosition: ['0% 0%', '100% 100%'],
              }}
              transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
            />
            <motion.div 
              className="absolute -top-40 -right-40 w-96 h-96 bg-primary/20 rounded-full blur-3xl"
              animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
              transition={{ duration: 8, repeat: Infinity }}
            />
            <motion.div 
              className="absolute -bottom-40 -left-40 w-96 h-96 bg-accent/20 rounded-full blur-3xl"
              animate={{ scale: [1.2, 1, 1.2], rotate: [90, 0, 90] }}
              transition={{ duration: 8, repeat: Infinity }}
            />

            <div className="relative z-10">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <Globe className="w-20 h-20 text-primary mx-auto mb-6" />
              </motion.div>
              <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
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
                  <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-violet-500 bg-clip-text text-transparent">
                    Future?
                  </span>
                  <motion.span 
                    className="absolute -bottom-1 left-0 w-full h-2 bg-gradient-to-r from-white via-purple-500 to-violet-500 rounded-full"
                    style={{ transformOrigin: "left", boxShadow: "0 0 20px rgba(139, 92, 246, 0.6)" }}
                    variants={{
                      rest: { scaleX: 0, opacity: 0 },
                      hover: { scaleX: 1, opacity: 1 }
                    }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  />
                </motion.span>
              </h2>
              <p className="text-muted-foreground text-lg md:text-xl mb-10 max-w-3xl mx-auto leading-relaxed">
                Join thousands of learners who are building successful careers through 
                practical, hands-on AR/VR training. Start your journey today!
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/signup">
                  <Button size="xl" className="btn-glow gap-2 text-lg px-10">
                    <Zap className="w-5 h-5" />
                    Get Started Free
                  </Button>
                </Link>
                <Link to="/dashboard">
                  <Button size="xl" variant="outline" className="gap-2 text-lg px-10">
                    <BookOpen className="w-5 h-5" />
                    Browse Courses
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
    </PageTransition>
  );
};

export default About;
