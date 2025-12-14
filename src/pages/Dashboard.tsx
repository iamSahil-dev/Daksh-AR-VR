import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  Glasses, 
  Trophy, 
  Settings, 
  LogOut,
  Play,
  Clock,
  Target,
  Award,
  TrendingUp,
  Mic,
  ChevronRight,
  BarChart3,
  Zap
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import ParticleBackground from '@/components/ParticleBackground';

const Dashboard = () => {
  const [activeNav, setActiveNav] = useState('dashboard');

  const navItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'modules', icon: Glasses, label: 'Modules' },
    { id: 'analytics', icon: BarChart3, label: 'Analytics' },
    { id: 'leaderboard', icon: Trophy, label: 'Leaderboard' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ];

  // Read progress from localStorage
  const getModuleProgress = (id: string, total: number) => {
    const completed = parseInt(localStorage.getItem(`module_progress_${id}`) || '0');
    return {
      completed,
      percentage: Math.min(100, Math.round((completed / total) * 100))
    };
  };

  const modules = [
    {
      id: 1,
      title: 'Motor Assembly Basics',
      progress: getModuleProgress('1', 3).percentage, // 3 Total steps currently
      totalSteps: 3,
      completedSteps: getModuleProgress('1', 3).completed,
      difficulty: 'Beginner',
      time: '15 min',
      image: '🔧',
    },
    {
      id: 2,
      title: 'Electrical Wiring',
      progress: getModuleProgress('2', 6).percentage, // Will have 6 steps (3 Intro + 3 Wiring)
      totalSteps: 6,
      completedSteps: getModuleProgress('2', 6).completed,
      difficulty: 'Intermediate',
      time: '20 min',
      image: '⚡',
    },
    {
      id: 3,
      title: 'PCB Soldering',
      progress: 0,
      totalSteps: 12,
      completedSteps: 0,
      difficulty: 'Advanced',
      time: '90 min',
      image: '🔬',
    },
  ];

  const achievements = [
    { icon: '🏆', title: 'First Module', unlocked: true },
    { icon: '🎯', title: 'Perfect Score', unlocked: true },
    { icon: '⚡', title: 'Speed Learner', unlocked: true },
    { icon: '🔥', title: '7-Day Streak', unlocked: false },
    { icon: '🌟', title: 'Master Assembler', unlocked: false },
  ];

  const stats = [
    { icon: Target, label: 'Modules Completed', value: '5', color: 'primary' },
    { icon: Clock, label: 'Total Time', value: '12h 30m', color: 'secondary' },
    { icon: TrendingUp, label: 'Accuracy', value: '94%', color: 'accent' },
    { icon: Award, label: 'Badges Earned', value: '12', color: 'primary' },
  ];

  return (
    <div className="min-h-screen bg-background flex">
      <ParticleBackground />

      {/* Sidebar */}
      <motion.aside
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-72 glass-panel border-r border-glass-border p-6 flex flex-col relative z-10"
      >
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 mb-10">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center">
            <Zap className="w-6 h-6 text-primary-foreground" />
          </div>
          <span className="font-display text-2xl font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
            DAKSH
          </span>
        </Link>

        {/* Navigation */}
        <nav className="flex-1 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveNav(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                activeNav === item.id
                  ? 'bg-primary/20 text-primary shadow-neon-cyan'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        {/* User */}
        <div className="pt-6 border-t border-border">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <span className="font-display font-bold text-primary-foreground">JD</span>
            </div>
            <div>
              <p className="font-medium text-foreground">John Doe</p>
              <p className="text-sm text-muted-foreground">Premium User</p>
            </div>
          </div>
          <Button variant="ghost" className="w-full justify-start gap-2 text-muted-foreground">
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="font-display text-4xl font-bold mb-2">
            Welcome back, <span className="text-primary">John</span>!
          </h1>
          <p className="text-muted-foreground text-lg">
            Ready to continue your learning journey?
          </p>
        </motion.div>

        {/* Voice Command */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="glass-panel rounded-2xl p-6 mb-8 flex items-center gap-4"
        >
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent to-neon-magenta flex items-center justify-center animate-pulse">
            <Mic className="w-6 h-6 text-accent-foreground" />
          </div>
          <div className="flex-1">
            <h3 className="font-display font-semibold text-lg mb-1">Voice Commands Active</h3>
            <p className="text-muted-foreground text-sm">
              Say "Start module", "Show progress", or "Open leaderboard"
            </p>
          </div>
          <Button variant="outline">Configure</Button>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {stats.map((stat, index) => (
            <div key={index} className="glass-panel rounded-2xl p-6 hover-lift">
              <div className={`w-12 h-12 rounded-xl bg-${stat.color}/20 flex items-center justify-center mb-4`}>
                <stat.icon className={`w-6 h-6 text-${stat.color}`} />
              </div>
              <p className="text-muted-foreground text-sm mb-1">{stat.label}</p>
              <p className="font-display text-3xl font-bold text-foreground">{stat.value}</p>
            </div>
          ))}
        </motion.div>

        {/* Current Modules */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-2xl font-bold">Your Modules</h2>
            <Link to="/modules">
              <Button variant="ghost" className="gap-2">
                View All <ChevronRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modules.map((module, index) => (
              <motion.div
                key={module.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                className="glass-panel rounded-2xl p-6 hover-lift group cursor-pointer"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="text-4xl">{module.image}</div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    module.difficulty === 'Beginner' ? 'bg-neon-green/20 text-neon-green' :
                    module.difficulty === 'Intermediate' ? 'bg-primary/20 text-primary' :
                    'bg-accent/20 text-accent'
                  }`}>
                    {module.difficulty}
                  </span>
                </div>

                <h3 className="font-display font-semibold text-lg mb-2">{module.title}</h3>
                
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                  <Clock className="w-4 h-4" />
                  {module.time}
                  <span className="mx-2">•</span>
                  <Target className="w-4 h-4" />
                  {module.completedSteps}/{module.totalSteps} steps
                </div>

                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="text-primary font-medium">{module.progress}%</span>
                  </div>
                  <Progress value={module.progress} className="h-2" />
                </div>

                <Link to={`/module/${module.id}`}>
                  <Button className="w-full btn-glow gap-2 group-hover:scale-105 transition-transform">
                    <Play className="w-4 h-4" />
                    {module.progress > 0 ? 'Continue' : 'Start'} Module
                  </Button>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-2xl font-bold">Achievements</h2>
            <Button variant="ghost" className="gap-2">
              View All <ChevronRight className="w-4 h-4" />
            </Button>
          </div>

          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.7 + index * 0.1 }}
                className={`glass-panel rounded-2xl p-6 min-w-[160px] text-center ${
                  achievement.unlocked ? 'opacity-100' : 'opacity-50'
                }`}
              >
                <div className="text-4xl mb-3">{achievement.icon}</div>
                <p className="font-medium text-sm">{achievement.title}</p>
                {achievement.unlocked && (
                  <span className="text-xs text-primary">Unlocked</span>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default Dashboard;
