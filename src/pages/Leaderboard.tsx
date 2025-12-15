import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView, useMotionValue, useSpring } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Trophy, 
  Medal, 
  Crown, 
  Flame, 
  Star,
  TrendingUp,
  Users,
  Zap,
  Award,
  Target
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import ParticleBackground from '@/components/ParticleBackground';
import Footer from '@/components/Footer';
import ScrollProgress from '@/components/ScrollProgress';
import PageTransition from '@/components/PageTransition';

// Animated Counter Component
const AnimatedCounter = ({ value, duration = 2 }: { value: number; duration?: number }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { duration: duration * 1000 });
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    } else {
      motionValue.set(0);
    }
  }, [isInView, value, motionValue]);

  useEffect(() => {
    springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = Intl.NumberFormat("en-US").format(Math.floor(latest));
      }
    });
  }, [springValue]);

  return <span ref={ref}>0</span>;
};

// Decimal Animated Counter with Suffix
const DecimalCounter = ({ value, suffix = '', decimals = 1, duration = 2 }: { value: number; suffix?: string; decimals?: number; duration?: number }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { duration: duration * 1000 });
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    } else {
      motionValue.set(0);
    }
  }, [isInView, value, motionValue]);

  useEffect(() => {
    springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = latest.toFixed(decimals) + suffix;
      }
    });
  }, [springValue, suffix, decimals]);

  return <span ref={ref}>0{suffix}</span>;
};

const Leaderboard = () => {
  const [timeframe, setTimeframe] = useState<'weekly' | 'monthly' | 'alltime'>('weekly');

  const weeklyData = [
    { rank: 1, name: 'Sahil Kumar', points: 16200, modules: 33, streak: 60, avatar: '👨‍💻', badge: 'Master' },
    { rank: 2, name: 'Jai Ratna', points: 15100, modules: 31, streak: 56, avatar: '👨‍🎓', badge: 'Expert' },
    { rank: 3, name: 'Anvi Sharma', points: 14200, modules: 30, streak: 52, avatar: '👩‍🔬', badge: 'Expert' },
    { rank: 4, name: 'Anushka Singh', points: 12800, modules: 27, streak: 43, avatar: '👩‍💼', badge: 'Pro' },
    { rank: 5, name: 'Sandhya', points: 11900, modules: 25, streak: 39, avatar: '🧑‍🔧', badge: 'Pro' },
    { rank: 6, name: 'Priyanshu', points: 10500, modules: 23, streak: 35, avatar: '👩‍🎨', badge: 'Advanced' },
    { rank: 7, name: 'Divyansh Vijay', points: 9800, modules: 21, streak: 31, avatar: '👨‍🔧', badge: 'Advanced' },
    { rank: 8, name: 'Priya Desai', points: 9200, modules: 20, streak: 28, avatar: '👩‍🚀', badge: 'Intermediate' },
    { rank: 9, name: 'Rahul Verma', points: 8600, modules: 18, streak: 24, avatar: '🧑‍💻', badge: 'Intermediate' },
    { rank: 10, name: 'Kavya Nair', points: 8100, modules: 17, streak: 22, avatar: '👩‍🏫', badge: 'Intermediate' },
    { rank: 11, name: 'Aditya Joshi', points: 7500, modules: 16, streak: 19, avatar: '👨‍💼', badge: 'Intermediate' },
    { rank: 12, name: 'Neha Kapoor', points: 7200, modules: 15, streak: 18, avatar: '👩‍🔬', badge: 'Beginner' },
    { rank: 13, name: 'Rohan Mishra', points: 6800, modules: 14, streak: 16, avatar: '🧑‍🎓', badge: 'Beginner' },
    { rank: 14, name: 'Ishita Rao', points: 6300, modules: 13, streak: 14, avatar: '👩‍🎨', badge: 'Beginner' },
    { rank: 15, name: 'You', points: 5900, modules: 12, streak: 11, avatar: '🎯', isCurrentUser: true, badge: 'Beginner' },
  ];

  const monthlyData = [
    { rank: 1, name: 'Jai Ratna', points: 18500, modules: 35, streak: 65, avatar: '👨‍🎓', badge: 'Master' },
    { rank: 2, name: 'Anvi Sharma', points: 16800, modules: 33, streak: 58, avatar: '👩‍🔬', badge: 'Expert' },
    { rank: 3, name: 'Sahil Kumar', points: 15300, modules: 31, streak: 52, avatar: '👨‍💻', badge: 'Expert' },
    { rank: 4, name: 'Divyansh Vijay', points: 14100, modules: 29, streak: 47, avatar: '👩‍💼', badge: 'Pro' },
    { rank: 5, name: 'Sandhya', points: 13200, modules: 27, streak: 43, avatar: '🧑‍🔧', badge: 'Pro' },
    { rank: 6, name: 'Aayush Kumar', points: 11800, modules: 25, streak: 39, avatar: '👩‍🎨', badge: 'Advanced' },
    { rank: 7, name: 'Anushka Singh', points: 10900, modules: 23, streak: 35, avatar: '👨‍🔧', badge: 'Advanced' },
    { rank: 8, name: 'Priya Desai', points: 10200, modules: 22, streak: 32, avatar: '👩‍🚀', badge: 'Intermediate' },
    { rank: 9, name: 'Priyanshu', points: 9600, modules: 20, streak: 28, avatar: '🧑‍💻', badge: 'Intermediate' },
    { rank: 10, name: 'Kavya Nair', points: 9000, modules: 19, streak: 26, avatar: '👩‍🏫', badge: 'Intermediate' },
    { rank: 11, name: 'Aditya Joshi', points: 8400, modules: 18, streak: 23, avatar: '👨‍💼', badge: 'Intermediate' },
    { rank: 12, name: 'Neha Kapoor', points: 7900, modules: 17, streak: 21, avatar: '👩‍🔬', badge: 'Beginner' },
    { rank: 13, name: 'Rohan Mishra', points: 7300, modules: 16, streak: 19, avatar: '🧑‍🎓', badge: 'Beginner' },
    { rank: 14, name: 'Ishita Rao', points: 6700, modules: 15, streak: 17, avatar: '👩‍🎨', badge: 'Beginner' },
    { rank: 15, name: 'You', points: 6200, modules: 14, streak: 14, avatar: '🎯', isCurrentUser: true, badge: 'Beginner' },
  ];

  const alltimeData = [
    { rank: 1, name: 'Anvi Sharma', points: 28500, modules: 52, streak: 125, avatar: '👩‍🔬', badge: 'Master' },
    { rank: 2, name: 'Jay Ratna', points: 26800, modules: 48, streak: 118, avatar: '👨‍🎓', badge: 'Master' },
    { rank: 3, name: 'Sahil Kumar', points: 24200, modules: 45, streak: 105, avatar: '👨‍💻', badge: 'Expert' },
    { rank: 4, name: 'Sandhya', points: 22600, modules: 42, streak: 98, avatar: '👩‍💼', badge: 'Expert' },
    { rank: 5, name: 'Divyansh Vijay', points: 21300, modules: 39, streak: 92, avatar: '🧑‍🔧', badge: 'Pro' },
    { rank: 6, name: 'Anushka Singh', points: 19500, modules: 36, streak: 85, avatar: '👩‍🎨', badge: 'Pro' },
    { rank: 7, name: 'Priyanshu', points: 18100, modules: 34, streak: 78, avatar: '👨‍🔧', badge: 'Advanced' },
    { rank: 8, name: 'Priya Desai', points: 16800, modules: 31, streak: 72, avatar: '👩‍🚀', badge: 'Advanced' },
    { rank: 9, name: 'Rahul Verma', points: 15400, modules: 29, streak: 65, avatar: '🧑‍💻', badge: 'Intermediate' },
    { rank: 10, name: 'Kavya Nair', points: 14200, modules: 27, streak: 59, avatar: '👩‍🏫', badge: 'Intermediate' },
    { rank: 11, name: 'Aditya Joshi', points: 13100, modules: 25, streak: 54, avatar: '👨‍💼', badge: 'Intermediate' },
    { rank: 12, name: 'Neha Kapoor', points: 12000, modules: 23, streak: 48, avatar: '👩‍🔬', badge: 'Intermediate' },
    { rank: 13, name: 'Rohan Mishra', points: 10800, modules: 21, streak: 43, avatar: '🧑‍🎓', badge: 'Beginner' },
    { rank: 14, name: 'Ishita Rao', points: 9600, modules: 19, streak: 38, avatar: '👩‍🎨', badge: 'Beginner' },
    { rank: 15, name: 'You', points: 8500, modules: 17, streak: 32, avatar: '🎯', isCurrentUser: true, badge: 'Beginner' },
  ];

  const leaderboardData = timeframe === 'weekly' ? weeklyData : timeframe === 'monthly' ? monthlyData : alltimeData;

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-6 h-6 text-yellow-400" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-300" />;
      case 3:
        return <Medal className="w-6 h-6 text-amber-600" />;
      default:
        return <span className="font-display font-bold text-lg">#{rank}</span>;
    }
  };

  const getRankBg = (rank: number) => {
    switch (rank) {
      case 1:
        return 'bg-gradient-to-r from-yellow-500/20 to-amber-500/20 border-yellow-500/30 hover:from-yellow-500/30 hover:to-amber-500/30';
      case 2:
        return 'bg-gradient-to-r from-gray-300/20 to-gray-400/20 border-gray-400/30 hover:from-gray-300/30 hover:to-gray-400/30';
      case 3:
        return 'bg-gradient-to-r from-amber-600/20 to-orange-600/20 border-amber-600/30 hover:from-amber-600/30 hover:to-orange-600/30';
      default:
        return 'bg-card/50 border-border/50 hover:bg-card/70';
    }
  };

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case 'Master':
        return 'bg-gradient-to-r from-purple-500 to-pink-500 text-white';
      case 'Expert':
        return 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white';
      case 'Pro':
        return 'bg-gradient-to-r from-green-500 to-emerald-500 text-white';
      case 'Advanced':
        return 'bg-gradient-to-r from-orange-500 to-yellow-500 text-white';
      case 'Intermediate':
        return 'bg-gradient-to-r from-indigo-500 to-blue-500 text-white';
      default:
        return 'bg-gradient-to-r from-gray-500 to-slate-500 text-white';
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 12
      }
    }
  };

  return (
    <PageTransition>
      <ScrollProgress />
      <div className="min-h-screen bg-background overflow-x-hidden">
        <ParticleBackground />
        <Navbar />

        <div className="pt-32 pb-20 relative z-10">
        <div className="container mx-auto px-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <motion.span 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
              className="inline-block px-4 py-1 glass-panel rounded-full text-sm text-primary mb-4"
            >
              <Trophy className="w-4 h-4 inline mr-2" />
              Global Leaderboard
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="font-display text-5xl md:text-6xl font-bold mb-4"
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
                Top <span className="text-primary">Performers</span>
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
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-muted-foreground text-lg max-w-2xl mx-auto"
            >
              See how you stack up against other learners. Climb the ranks and earn recognition!
            </motion.p>
          </motion.div>

          {/* Timeframe Selector */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center gap-4 mb-12"
          >
            {(['weekly', 'monthly', 'alltime'] as const).map((tf) => (
              <Button
                key={tf}
                variant={timeframe === tf ? 'default' : 'glass'}
                onClick={() => setTimeframe(tf)}
                className="capitalize"
              >
                {tf === 'alltime' ? 'All Time' : tf}
              </Button>
            ))}
          </motion.div>

          {/* Top 3 Podium */}
          <AnimatePresence mode="wait">
            <motion.div
              key={timeframe}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -30, scale: 0.9 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex justify-center items-end gap-4 mb-16 flex-wrap md:flex-nowrap"
            >
            {/* 2nd Place */}
            <motion.div 
              className="text-center"
              whileHover={{ scale: 1.05, y: -10 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.div 
                initial={{ rotateY: 180, opacity: 0 }}
                animate={{ rotateY: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="glass-panel rounded-2xl p-6 mb-4 relative overflow-hidden"
              >
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-b from-gray-300/10 to-transparent"
                  animate={{ 
                    backgroundPosition: ['0% 0%', '100% 100%'],
                  }}
                  transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
                />
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                >
                  <Medal className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                </motion.div>
                <motion.div 
                  className="text-4xl mb-2"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 2 }}
                >
                  {leaderboardData[1].avatar}
                </motion.div>
                <h3 className="font-display font-semibold">{leaderboardData[1].name}</h3>
                <span className={`inline-block px-2 py-0.5 rounded-full text-xs mt-1 ${getBadgeColor(leaderboardData[1].badge)}`}>
                  {leaderboardData[1].badge}
                </span>
                <p className="text-2xl font-bold text-gray-300 mt-2">
                  <AnimatedCounter value={leaderboardData[1].points} duration={1.5} />
                </p>
                <p className="text-sm text-muted-foreground">points</p>
              </motion.div>
              <div className="h-24 bg-gradient-to-t from-gray-300/20 to-transparent rounded-t-xl" />
            </motion.div>

            {/* 1st Place */}
            <motion.div 
              className="text-center -mt-8"
              whileHover={{ scale: 1.05, y: -10 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.div 
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 100, delay: 0.6 }}
                className="glass-panel rounded-2xl p-8 mb-4 relative overflow-hidden border-2 border-yellow-500/30"
              >
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-b from-yellow-500/20 to-transparent"
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <motion.div
                  animate={{ 
                    rotate: [0, -15, 15, 0],
                    y: [0, -5, 0]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <Crown className="w-16 h-16 text-yellow-400 mx-auto mb-3" />
                </motion.div>
                <motion.div 
                  className="text-5xl mb-2"
                  animate={{ scale: [1, 1.15, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
                >
                  {leaderboardData[0].avatar}
                </motion.div>
                <h3 className="font-display font-bold text-xl">{leaderboardData[0].name}</h3>
                <span className={`inline-block px-3 py-1 rounded-full text-xs mt-2 ${getBadgeColor(leaderboardData[0].badge)}`}>
                  ⭐ {leaderboardData[0].badge}
                </span>
                <motion.p 
                  className="text-3xl font-bold text-yellow-400 mt-2"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
                >
                  <AnimatedCounter value={leaderboardData[0].points} duration={1.5} />
                </motion.p>
                <p className="text-sm text-muted-foreground">points</p>
              </motion.div>
              <div className="h-32 bg-gradient-to-t from-yellow-500/20 to-transparent rounded-t-xl" />
            </motion.div>

            {/* 3rd Place */}
            <motion.div 
              className="text-center"
              whileHover={{ scale: 1.05, y: -10 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.div 
                initial={{ rotateY: -180, opacity: 0 }}
                animate={{ rotateY: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="glass-panel rounded-2xl p-6 mb-4 relative overflow-hidden"
              >
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-b from-amber-600/10 to-transparent"
                  animate={{ 
                    backgroundPosition: ['0% 0%', '100% 100%'],
                  }}
                  transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
                />
                <motion.div
                  animate={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                >
                  <Medal className="w-12 h-12 text-amber-600 mx-auto mb-3" />
                </motion.div>
                <motion.div 
                  className="text-4xl mb-2"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 2 }}
                >
                  {leaderboardData[2].avatar}
                </motion.div>
                <h3 className="font-display font-semibold">{leaderboardData[2].name}</h3>
                <span className={`inline-block px-2 py-0.5 rounded-full text-xs mt-1 ${getBadgeColor(leaderboardData[2].badge)}`}>
                  {leaderboardData[2].badge}
                </span>
                <p className="text-2xl font-bold text-amber-600 mt-2">
                  <AnimatedCounter value={leaderboardData[2].points} duration={1.5} />
                </p>
                <p className="text-sm text-muted-foreground">points</p>
              </motion.div>
              <div className="h-16 bg-gradient-to-t from-amber-600/20 to-transparent rounded-t-xl" />
            </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* Full Leaderboard */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="max-w-4xl mx-auto"
          >
            <div className="glass-panel rounded-2xl overflow-hidden">
              {/* Header */}
              <div className="grid grid-cols-12 gap-4 p-4 bg-muted/50 font-medium text-sm text-muted-foreground">
                <div className="col-span-1">Rank</div>
                <div className="col-span-4">User</div>
                <div className="col-span-2 text-center">Badge</div>
                <div className="col-span-2 text-center">Points</div>
                <div className="col-span-2 text-center">Modules</div>
                <div className="col-span-1 text-center">Streak</div>
              </div>

              {/* Rows */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={timeframe}
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {leaderboardData.map((user, index) => (
                    <motion.div
                      key={user.rank}
                      variants={itemVariants}
                      whileHover={{ 
                        scale: 1.02, 
                        transition: { type: "spring", stiffness: 400 } 
                      }}
                      className={`grid grid-cols-12 gap-4 p-4 items-center border-t border-border/50 ${
                        getRankBg(user.rank)
                      } ${user.isCurrentUser ? 'ring-2 ring-primary shadow-lg shadow-primary/20' : ''} transition-all duration-300 cursor-pointer`}
                    >
                      <div className="col-span-1 flex items-center justify-center">
                        <motion.div
                          whileHover={{ scale: 1.2, rotate: 360 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          {getRankIcon(user.rank)}
                        </motion.div>
                      </div>
                      <div className="col-span-4 flex items-center gap-3">
                        <motion.span 
                          className="text-2xl"
                          whileHover={{ scale: 1.2, rotate: [0, -10, 10, 0] }}
                          transition={{ duration: 0.3 }}
                        >
                          {user.avatar}
                        </motion.span>
                        <div>
                          <span className={`font-medium ${user.isCurrentUser ? 'text-primary font-bold' : ''}`}>
                            {user.name}
                          </span>
                          {user.isCurrentUser && (
                            <motion.span 
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="ml-2 text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full"
                            >
                              You
                            </motion.span>
                          )}
                        </div>
                      </div>
                      <div className="col-span-2 flex justify-center">
                        <motion.span 
                          whileHover={{ scale: 1.1 }}
                          className={`inline-block px-2 py-1 rounded-full text-xs ${getBadgeColor(user.badge)}`}
                        >
                          {user.badge}
                        </motion.span>
                      </div>
                      <div className="col-span-2 text-center">
                        <motion.span 
                          className="font-display font-bold text-lg"
                          whileHover={{ scale: 1.1 }}
                        >
                          {user.points.toLocaleString()}
                        </motion.span>
                      </div>
                      <div className="col-span-2 text-center">
                        <motion.div 
                          className="flex items-center justify-center gap-1"
                          whileHover={{ scale: 1.1 }}
                        >
                          <Star className="w-4 h-4 text-primary" />
                          {user.modules}
                        </motion.div>
                      </div>
                      <div className="col-span-1 text-center">
                        <motion.div 
                          className="flex items-center justify-center gap-1"
                          whileHover={{ scale: 1.1 }}
                        >
                          <Flame className="w-4 h-4 text-orange-500" />
                          <span className="text-sm">{user.streak}</span>
                        </motion.div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="grid md:grid-cols-3 gap-6 mt-12 max-w-4xl mx-auto"
          >
            <motion.div 
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="glass-panel rounded-2xl p-6 text-center relative overflow-hidden group"
            >
              <motion.div 
                className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
                animate={{ 
                  backgroundPosition: ['0% 0%', '100% 100%'],
                }}
                transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
              />
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
              >
                <Users className="w-8 h-8 text-primary mx-auto mb-3" />
              </motion.div>
              <motion.p 
                className="text-3xl font-display font-bold mb-1"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <AnimatedCounter value={12847} duration={2} />
              </motion.p>
              <p className="text-muted-foreground">Active Learners</p>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="glass-panel rounded-2xl p-6 text-center relative overflow-hidden group"
            >
              <motion.div 
                className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
                animate={{ 
                  backgroundPosition: ['0% 0%', '100% 100%'],
                }}
                transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
              />
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <TrendingUp className="w-8 h-8 text-secondary mx-auto mb-3" />
              </motion.div>
              <motion.p 
                className="text-3xl font-display font-bold mb-1"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
              >
                <DecimalCounter value={3.2} suffix="M" decimals={1} duration={2} />
              </motion.p>
              <p className="text-muted-foreground">Modules Completed</p>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="glass-panel rounded-2xl p-6 text-center relative overflow-hidden group"
            >
              <motion.div 
                className="absolute inset-0 bg-gradient-to-br from-violet-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
                animate={{ 
                  backgroundPosition: ['0% 0%', '100% 100%'],
                }}
                transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
              />
              <motion.div
                animate={{ 
                  rotate: [0, -10, 10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
              >
                <Zap className="w-8 h-8 text-accent mx-auto mb-3" />
              </motion.div>
              <motion.p 
                className="text-3xl font-display font-bold mb-1"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0 }}
              >
                <DecimalCounter value={98.5} suffix="%" decimals={1} duration={2} />
              </motion.p>
              <p className="text-muted-foreground">Success Rate</p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
    </PageTransition>
  );
};

export default Leaderboard;
