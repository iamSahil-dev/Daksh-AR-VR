import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Trophy, 
  Medal, 
  Crown, 
  Flame, 
  Star,
  TrendingUp,
  Users,
  Zap
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import ParticleBackground from '@/components/ParticleBackground';
import Footer from '@/components/Footer';

const Leaderboard = () => {
  const [timeframe, setTimeframe] = useState<'weekly' | 'monthly' | 'alltime'>('weekly');

  const leaderboardData = [
    { rank: 1, name: 'Alex Chen', points: 12500, modules: 25, streak: 45, avatar: '👨‍💻' },
    { rank: 2, name: 'Sarah Johnson', points: 11200, modules: 23, streak: 38, avatar: '👩‍🔬' },
    { rank: 3, name: 'Mike Williams', points: 10800, modules: 22, streak: 32, avatar: '👨‍🎓' },
    { rank: 4, name: 'Emily Davis', points: 9500, modules: 20, streak: 28, avatar: '👩‍💼' },
    { rank: 5, name: 'John Smith', points: 8900, modules: 18, streak: 25, avatar: '🧑‍🔧' },
    { rank: 6, name: 'Lisa Anderson', points: 8200, modules: 17, streak: 22, avatar: '👩‍🎨' },
    { rank: 7, name: 'David Brown', points: 7800, modules: 16, streak: 20, avatar: '👨‍🔧' },
    { rank: 8, name: 'Emma Wilson', points: 7200, modules: 15, streak: 18, avatar: '👩‍🚀' },
    { rank: 9, name: 'James Taylor', points: 6800, modules: 14, streak: 15, avatar: '🧑‍💻' },
    { rank: 10, name: 'You', points: 6500, modules: 13, streak: 12, avatar: '🎯', isCurrentUser: true },
  ];

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
        return 'bg-gradient-to-r from-yellow-500/20 to-amber-500/20 border-yellow-500/30';
      case 2:
        return 'bg-gradient-to-r from-gray-300/20 to-gray-400/20 border-gray-400/30';
      case 3:
        return 'bg-gradient-to-r from-amber-600/20 to-orange-600/20 border-amber-600/30';
      default:
        return 'bg-card/50 border-border/50';
    }
  };

  return (
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
            <span className="inline-block px-4 py-1 glass-panel rounded-full text-sm text-primary mb-4">
              <Trophy className="w-4 h-4 inline mr-2" />
              Leaderboard
            </span>
            <h1 className="font-display text-5xl md:text-6xl font-bold mb-4">
              Top <span className="text-primary">Performers</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              See how you stack up against other learners. Climb the ranks and earn recognition!
            </p>
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
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex justify-center items-end gap-4 mb-16"
          >
            {/* 2nd Place */}
            <div className="text-center">
              <div className="glass-panel rounded-2xl p-6 mb-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-gray-300/10 to-transparent" />
                <Medal className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <div className="text-4xl mb-2">{leaderboardData[1].avatar}</div>
                <h3 className="font-display font-semibold">{leaderboardData[1].name}</h3>
                <p className="text-2xl font-bold text-gray-300">{leaderboardData[1].points.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">points</p>
              </div>
              <div className="h-24 bg-gradient-to-t from-gray-300/20 to-transparent rounded-t-xl" />
            </div>

            {/* 1st Place */}
            <div className="text-center -mt-8">
              <div className="glass-panel rounded-2xl p-8 mb-4 relative overflow-hidden border-2 border-yellow-500/30">
                <div className="absolute inset-0 bg-gradient-to-b from-yellow-500/20 to-transparent" />
                <Crown className="w-16 h-16 text-yellow-400 mx-auto mb-3 animate-pulse" />
                <div className="text-5xl mb-2">{leaderboardData[0].avatar}</div>
                <h3 className="font-display font-bold text-xl">{leaderboardData[0].name}</h3>
                <p className="text-3xl font-bold text-yellow-400">{leaderboardData[0].points.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">points</p>
              </div>
              <div className="h-32 bg-gradient-to-t from-yellow-500/20 to-transparent rounded-t-xl" />
            </div>

            {/* 3rd Place */}
            <div className="text-center">
              <div className="glass-panel rounded-2xl p-6 mb-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-amber-600/10 to-transparent" />
                <Medal className="w-12 h-12 text-amber-600 mx-auto mb-3" />
                <div className="text-4xl mb-2">{leaderboardData[2].avatar}</div>
                <h3 className="font-display font-semibold">{leaderboardData[2].name}</h3>
                <p className="text-2xl font-bold text-amber-600">{leaderboardData[2].points.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">points</p>
              </div>
              <div className="h-16 bg-gradient-to-t from-amber-600/20 to-transparent rounded-t-xl" />
            </div>
          </motion.div>

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
                <div className="col-span-5">User</div>
                <div className="col-span-2 text-center">Points</div>
                <div className="col-span-2 text-center">Modules</div>
                <div className="col-span-2 text-center">Streak</div>
              </div>

              {/* Rows */}
              {leaderboardData.map((user, index) => (
                <motion.div
                  key={user.rank}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className={`grid grid-cols-12 gap-4 p-4 items-center border-t border-border/50 ${
                    getRankBg(user.rank)
                  } ${user.isCurrentUser ? 'ring-2 ring-primary' : ''}`}
                >
                  <div className="col-span-1 flex items-center justify-center">
                    {getRankIcon(user.rank)}
                  </div>
                  <div className="col-span-5 flex items-center gap-3">
                    <span className="text-2xl">{user.avatar}</span>
                    <span className={`font-medium ${user.isCurrentUser ? 'text-primary' : ''}`}>
                      {user.name}
                      {user.isCurrentUser && (
                        <span className="ml-2 text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full">
                          You
                        </span>
                      )}
                    </span>
                  </div>
                  <div className="col-span-2 text-center">
                    <span className="font-display font-bold text-lg">{user.points.toLocaleString()}</span>
                  </div>
                  <div className="col-span-2 text-center flex items-center justify-center gap-1">
                    <Star className="w-4 h-4 text-primary" />
                    {user.modules}
                  </div>
                  <div className="col-span-2 text-center flex items-center justify-center gap-1">
                    <Flame className="w-4 h-4 text-accent" />
                    {user.streak} days
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="grid md:grid-cols-3 gap-6 mt-12 max-w-4xl mx-auto"
          >
            <div className="glass-panel rounded-2xl p-6 text-center">
              <Users className="w-8 h-8 text-primary mx-auto mb-3" />
              <p className="text-3xl font-display font-bold mb-1">10,482</p>
              <p className="text-muted-foreground">Active Learners</p>
            </div>
            <div className="glass-panel rounded-2xl p-6 text-center">
              <TrendingUp className="w-8 h-8 text-secondary mx-auto mb-3" />
              <p className="text-3xl font-display font-bold mb-1">2.5M</p>
              <p className="text-muted-foreground">Modules Completed</p>
            </div>
            <div className="glass-panel rounded-2xl p-6 text-center">
              <Zap className="w-8 h-8 text-accent mx-auto mb-3" />
              <p className="text-3xl font-display font-bold mb-1">98%</p>
              <p className="text-muted-foreground">Success Rate</p>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Leaderboard;
