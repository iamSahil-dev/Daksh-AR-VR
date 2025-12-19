import { useState, Suspense, useMemo, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Float } from '@react-three/drei';
import { createXRStore, XR } from '@react-three/xr';
import { 
  ArrowLeft, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX,
  Glasses,
  Mic,
  MicOff,
  ChevronRight,
  ChevronLeft,
  Lightbulb,
  Check,
  Zap,
  Languages,
  RotateCcw
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { saveProgress, getProgress } from '@/utils/progress';
import { modulesData } from '@/data/modules';
import WiringScene from '@/components/WiringScene';
import MotorScene from '@/components/MotorScene';
import PCBScene from '@/components/PCBScene';
import AITutor from '@/components/AITutor';
import ScrollProgress from '@/components/ScrollProgress';
import PageTransition from '@/components/PageTransition';

// WebXR Store
const store = createXRStore();

const ModulePlayer = () => {
  const { id } = useParams();
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [lang, setLang] = useState<'en' | 'hi'>('en');
  const { toast } = useToast();

  const moduleData = modulesData[id || '1'];

  // Initialize from saved progress (only on mount)
  useEffect(() => {
    if (id) {
      const saved = getProgress(id);
      if (saved > 0 && saved <= (moduleData?.steps?.length || 0)) {
        setCurrentStep(saved);
      }
    }
  }, [id]);

  // Handle case where module ID is not found
  if (!moduleData) {
    return <div className="p-10 text-center">Module not found</div>;
  }

  const steps = moduleData.steps;

  const handlePartClick = (part: string) => {
    // Check if the clicked part matches the target of the current step
    // OR if we received a "CORRECT_CONNECTION_MADE" event only if the step requires a connection
    const isWiringSuccess = part === 'CORRECT_CONNECTION_MADE' && steps[currentStep].requiredConnection;
    
    if (steps[currentStep].targetPartId === part || isWiringSuccess) {
      toast({
        title: lang === 'en' ? 'Correct!' : 'सही!',
        description: lang === 'en' ? `Step completed.` : `चरण पूरा हुआ।`,
      });
      if (currentStep < steps.length) {
        const nextStep = currentStep + 1;
        setCurrentStep(nextStep);
        saveProgress(id || '1', nextStep);
        
        if (nextStep === steps.length) {
             toast({
              title: lang === 'en' ? 'Module Complete!' : 'मॉड्यूल पूरा हुआ!',
              description: lang === 'en' ? 'Congratulations! You have wired the circuit.' : 'बधाई हो! आपने सर्किट को वायर किया है।',
            });
        }
      }
    } else {
        // Optional: Feedback for wrong part
    }
  };

  const speakInstruction = (text: string) => {
    if ('speechSynthesis' in window && !isMuted) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      // utterance.lang = lang === 'hi' ? 'hi-IN' : 'en-US'; // Basic support
      window.speechSynthesis.speak(utterance);
    }
  };

  // Effect to speak when step changes
  useEffect(() => {
    if (!isMuted && steps[currentStep]) {
       speakInstruction(steps[currentStep].instruction[lang]);
    }
  }, [currentStep, lang, isMuted, steps]);



  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <PageTransition>
      <div className="min-h-screen bg-background flex flex-col lg:flex-row">
        <ScrollProgress />
      {/* 3D Viewer */}
      <div className="flex-1 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-card to-background">
          <Canvas>
             <XR store={store}>
                <Suspense fallback={null}>
                  {moduleData.type === 'wiring' && (
                    <WiringScene 
                      currentStep={currentStep} 
                      onPartClick={handlePartClick} 
                      step={steps[currentStep] || { id: 'complete', requiredConnection: null, title: { en: 'Complete', hi: 'पूर्ण' }, description: { en: '', hi: '' }, instruction: { en: '', hi: '' } }}
                    />
                  )}
                  {moduleData.type === 'motor' && (
                    <MotorScene 
                        currentStep={currentStep} 
                        onPartClick={handlePartClick} 
                    />
                  )}
                  {moduleData.type === 'pcb' && (
                    <PCBScene 
                        currentStep={currentStep} 
                        onPartClick={handlePartClick} 
                    />
                  )}
                  <OrbitControls />
                </Suspense>
             </XR>
          </Canvas>
        </div>

        {/* Top Controls */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10 pointer-events-none">
            {/* Left */}
          <div className="pointer-events-auto flex items-center gap-2">
            <Link to="/dashboard">
                <Button variant="glass" size="sm" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                {lang === 'en' ? 'Back' : 'वापस'}
                </Button>
            </Link>
             <Button 
                variant={lang === 'hi' ? 'default' : 'glass'}
                size="sm" 
                onClick={() => {
                  const newLang = lang === 'en' ? 'hi' : 'en';
                  setLang(newLang);
                  toast({
                    title: newLang === 'en' ? 'Switched to English' : 'हिंदी में बदला गया',
                    duration: 1500,
                  });
                }}
                className="gap-2 transition-all"
             >
                <Languages className="w-4 h-4" />
                {lang === 'en' ? 'हिंदी' : 'English'}
             </Button>
          </div>

            {/* Right */}
          <div className="flex gap-2 pointer-events-auto">
            <Button
              variant="glass"
              size="icon"
              onClick={() => setIsMuted(!isMuted)}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </Button>
            {/* AR/VR Buttons */}
            <Button variant="glass" size="sm" onClick={() => store.enterAR()}>
              AR
            </Button>
            <Button variant="glass" size="sm" onClick={() => store.enterVR()}>
              VR
            </Button>
          </div>
        </div>

        {/* Hint Overlay */}
        {showHint && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute bottom-24 left-4 right-4 glass-panel rounded-xl p-4 z-10"
          >
            <div className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold mb-1">Hint</h4>
                <p className="text-sm text-muted-foreground">{steps[currentStep].instruction[lang]}</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowHint(false)}
              >
                Close
              </Button>
            </div>
          </motion.div>
        )}

        {/* Bottom Controls */}
        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-center gap-4 z-10 pointer-events-none">
          <div className="pointer-events-auto flex gap-4">
              <Button
                variant="glass"
                size="icon"
                onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                disabled={currentStep === 0}
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
              
              <Button
                variant={isPlaying ? 'default' : 'glass'}
                size="lg"
                onClick={() => setIsPlaying(!isPlaying)}
                className="gap-2"
              >
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                {isPlaying ? (lang === 'en' ? 'Pause' : 'रोके') : (lang === 'en' ? 'Play' : 'शुरू')}
              </Button>

              <Button
                variant="glass"
                size="icon"
                onClick={() => setShowHint(true)}
              >
                <Lightbulb className="w-5 h-5" />
              </Button>

          <div className="flex gap-2 pointer-events-auto">
              {currentStep === steps.length ? (
                <Button
                  variant="default"
                  size="lg"
                  onClick={() => {
                    setCurrentStep(0);
                    saveProgress(id || '1', 0, true); // Force reset
                    toast({
                      title: lang === 'en' ? 'Restarting Module' : 'मॉड्यूल পুনরায় शुरू हो रहा है',
                      description: lang === 'en' ? 'Good luck!' : 'शुभकामनाएं!',
                    });
                  }}
                  className="gap-2 bg-green-500 hover:bg-green-600"
                >
                  <RotateCcw className="w-4 h-4" />
                  {lang === 'en' ? 'Restart Module' : 'मॉड्यूल को पुनरारंभ करें'}
                </Button>
              ) : (
                <Button
                    variant={steps[currentStep]?.type === 'info' ? 'default' : 'glass'}
                    size={steps[currentStep]?.type === 'info' ? 'lg' : 'icon'}
                    onClick={() => {
                    if (currentStep < steps.length) {
                        const nextStep = currentStep + 1;
                        setCurrentStep(nextStep);
                        saveProgress(id || '1', nextStep);
                        
                        if (nextStep === steps.length) {
                            toast({
                            title: lang === 'en' ? 'Module Complete!' : 'मॉड्यूल पूरा हुआ!',
                            description: lang === 'en' ? 'Congratulations!' : 'बधाई हो!',
                            });
                        }
                    }
                    }}
                >
                    {steps[currentStep]?.type === 'info' ? (
                    <span className="flex items-center gap-2">
                        Next <ChevronRight className="w-4 h-4" />
                    </span>
                    ) : (
                    <ChevronRight className="w-5 h-5" />
                    )}
                </Button>
              )}
          </div>
          </div>
        </div>
      </div>

      {/* Sidebar Panel */}
      <motion.aside
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full lg:w-96 glass-panel border-l border-glass-border p-6 overflow-y-auto"
      >
        {/* Module Info */}
        <div className="mb-6">
          <div className="flex items-center gap-2 text-primary mb-2">
            <Zap className="w-4 h-4" />
            <span className="text-sm font-medium">Module {id}</span>
          </div>
          <h2 className="font-display text-2xl font-bold mb-2">{moduleData.title[lang]}</h2>
          <p className="text-muted-foreground">{moduleData.description[lang]}</p>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-muted-foreground">{lang === 'en' ? 'Progress' : 'प्रगति'}</span>
            <span className="text-primary font-medium">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2 mb-2" />
          <p className="text-xs text-muted-foreground">
            {currentStep < steps.length 
              ? (lang === 'en' ? `Step ${currentStep + 1} of ${steps.length}` : `चरण ${currentStep + 1} / ${steps.length}`)
              : (lang === 'en' ? 'Completed' : 'पूर्ण')
            }
          </p>
        </div>

        {/* Steps List */}
        <div className="space-y-4">
          <h3 className="font-display font-semibold text-lg">{lang === 'en' ? 'Steps' : 'चरण'}</h3>
          {steps.map((step, index) => (
            <motion.div
              key={index}
              onClick={() => setCurrentStep(index)}
              className={`p-4 rounded-xl cursor-pointer transition-all duration-300 ${
                index === currentStep
                  ? 'glass-panel border border-primary/50 shadow-neon-cyan'
                  : index < currentStep
                  ? 'bg-primary/10 border border-primary/20'
                  : 'bg-muted/30 border border-transparent'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                  index < currentStep
                    ? 'bg-primary text-primary-foreground'
                    : index === currentStep
                    ? 'bg-primary/20 text-primary border-2 border-primary'
                    : 'bg-muted text-muted-foreground'
                }`}>
                  {index < currentStep ? <Check className="w-4 h-4" /> : index + 1}
                </div>
                <div>
                  <h4 className={`font-medium mb-1 ${
                    index === currentStep ? 'text-primary' : 'text-foreground'
                  }`}>
                    {step.title[lang]}
                  </h4>
                  {index === currentStep && (
                    <p className="text-sm text-muted-foreground">{step.description[lang]}</p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.aside>
      
      {/* AI Tutor */}
      {/* AI Tutor */}
      <AITutor context={
        currentStep < steps.length 
          ? `${steps[currentStep].title[lang]}: ${steps[currentStep].description[lang]}`
          : "The module is complete. The user can restart the lesson."
      } />
    </div>
    </PageTransition>
  );
};

export default ModulePlayer;

