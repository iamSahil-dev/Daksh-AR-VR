import { useState, useRef, useEffect, Suspense } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Float, Text3D, Center } from '@react-three/drei';
import { 
  ArrowLeft, 
  Play, 
  Pause, 
  RotateCcw, 
  Volume2, 
  VolumeX,
  Glasses,
  Mic,
  MicOff,
  ChevronRight,
  ChevronLeft,
  Lightbulb,
  Check,
  Zap
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';

// 3D Motor Component
const MotorPart = ({ position, color, isActive, onClick }: {
  position: [number, number, number];
  color: string;
  isActive: boolean;
  onClick: () => void;
}) => {
  return (
    <Float speed={isActive ? 2 : 0.5} floatIntensity={isActive ? 0.5 : 0.1}>
      <mesh position={position} onClick={onClick} castShadow>
        <cylinderGeometry args={[0.5, 0.5, 1, 32]} />
        <meshStandardMaterial 
          color={color} 
          emissive={isActive ? color : '#000000'}
          emissiveIntensity={isActive ? 0.5 : 0}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
    </Float>
  );
};

const Scene = ({ currentStep, onPartClick }: { currentStep: number; onPartClick: (part: string) => void }) => {
  const parts = [
    { id: 'stator', position: [0, 0, 0] as [number, number, number], color: '#00f0ff' },
    { id: 'rotor', position: [0, 1.2, 0] as [number, number, number], color: '#a855f7' },
    { id: 'shaft', position: [0, 2.4, 0] as [number, number, number], color: '#ec4899' },
  ];

  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#00f0ff" />
      
      {parts.map((part, index) => (
        <MotorPart
          key={part.id}
          position={part.position}
          color={part.color}
          isActive={currentStep === index}
          onClick={() => onPartClick(part.id)}
        />
      ))}

      <OrbitControls 
        enablePan={false}
        minDistance={3}
        maxDistance={10}
        autoRotate
        autoRotateSpeed={0.5}
      />
      <Environment preset="city" />
    </>
  );
};

const ModulePlayer = () => {
  const { id } = useParams();
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const { toast } = useToast();

  const steps = [
    {
      title: 'Identify the Stator',
      description: 'The stator is the stationary part of the motor. Locate the cylindrical outer casing with copper windings.',
      instruction: 'Click on the cyan-colored component to select the stator.',
      completed: false,
    },
    {
      title: 'Position the Rotor',
      description: 'The rotor is the rotating component. It sits inside the stator and contains permanent magnets.',
      instruction: 'Click on the purple component and drag it into position.',
      completed: false,
    },
    {
      title: 'Attach the Shaft',
      description: 'The shaft transmits mechanical power from the motor. Align it with the rotor center.',
      instruction: 'Click on the pink shaft and connect it to the rotor.',
      completed: false,
    },
  ];

  const handlePartClick = (part: string) => {
    const partIndex = ['stator', 'rotor', 'shaft'].indexOf(part);
    if (partIndex === currentStep) {
      toast({
        title: 'Correct!',
        description: `You've successfully identified the ${part}.`,
      });
      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        toast({
          title: 'Module Complete!',
          description: 'Congratulations! You\'ve completed the motor assembly module.',
        });
      }
    }
  };

  const handleVoiceCommand = () => {
    if (!isVoiceActive) {
      setIsVoiceActive(true);
      toast({
        title: 'Voice Commands Active',
        description: 'Say "next step", "show hint", or "repeat"',
      });
      
      // Simulate voice recognition
      if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = false;
        
        recognition.onresult = (event: any) => {
          const command = event.results[event.results.length - 1][0].transcript.toLowerCase();
          
          if (command.includes('next') || command.includes('step')) {
            if (currentStep < steps.length - 1) setCurrentStep(currentStep + 1);
          } else if (command.includes('hint')) {
            setShowHint(true);
          } else if (command.includes('back') || command.includes('previous')) {
            if (currentStep > 0) setCurrentStep(currentStep - 1);
          } else if (command.includes('repeat')) {
            // Trigger TTS to repeat instruction
            speakInstruction(steps[currentStep].instruction);
          }
        };
        
        recognition.start();
      }
    } else {
      setIsVoiceActive(false);
    }
  };

  const speakInstruction = (text: string) => {
    if ('speechSynthesis' in window && !isMuted) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      speechSynthesis.speak(utterance);
    }
  };

  useEffect(() => {
    if (!isMuted) {
      speakInstruction(steps[currentStep].instruction);
    }
  }, [currentStep, isMuted]);

  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="min-h-screen bg-background flex flex-col lg:flex-row">
      {/* 3D Viewer */}
      <div className="flex-1 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-card to-background">
          <Canvas camera={{ position: [5, 5, 5], fov: 50 }}>
            <Suspense fallback={null}>
              <Scene currentStep={currentStep} onPartClick={handlePartClick} />
            </Suspense>
          </Canvas>
        </div>

        {/* Top Controls */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
          <Link to="/dashboard">
            <Button variant="glass" size="sm" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
          </Link>

          <div className="flex gap-2">
            <Button
              variant="glass"
              size="icon"
              onClick={() => setIsMuted(!isMuted)}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </Button>
            <Button
              variant={isVoiceActive ? 'default' : 'glass'}
              size="icon"
              onClick={handleVoiceCommand}
              className={isVoiceActive ? 'animate-pulse' : ''}
            >
              {isVoiceActive ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
            </Button>
            <Button variant="glass" size="icon">
              <Glasses className="w-4 h-4" />
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
                <p className="text-sm text-muted-foreground">{steps[currentStep].instruction}</p>
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
        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-center gap-4 z-10">
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
            {isPlaying ? 'Pause' : 'Play'}
          </Button>

          <Button
            variant="glass"
            size="icon"
            onClick={() => setShowHint(true)}
          >
            <Lightbulb className="w-5 h-5" />
          </Button>

          <Button
            variant="glass"
            size="icon"
            onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
            disabled={currentStep === steps.length - 1}
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
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
          <h2 className="font-display text-2xl font-bold mb-2">Motor Assembly</h2>
          <p className="text-muted-foreground">Learn to assemble a basic DC motor step by step.</p>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-muted-foreground">Progress</span>
            <span className="text-primary font-medium">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2 mb-2" />
          <p className="text-xs text-muted-foreground">
            Step {currentStep + 1} of {steps.length}
          </p>
        </div>

        {/* Steps List */}
        <div className="space-y-4">
          <h3 className="font-display font-semibold text-lg">Steps</h3>
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
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
                    {step.title}
                  </h4>
                  {index === currentStep && (
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Voice Commands */}
        <div className="mt-8 glass-panel rounded-xl p-4">
          <h4 className="font-medium mb-3 flex items-center gap-2">
            <Mic className="w-4 h-4 text-primary" />
            Voice Commands
          </h4>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>"Next step" - Go to next step</p>
            <p>"Go back" - Previous step</p>
            <p>"Show hint" - Display hint</p>
            <p>"Repeat" - Repeat instruction</p>
          </div>
        </div>
      </motion.aside>
    </div>
  );
};

export default ModulePlayer;
