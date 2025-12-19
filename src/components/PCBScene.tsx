import { useState, useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Text, useCursor, Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

// --- Assets ---

// --- Assets ---

const Board = ({ position, onClick, opacity = 1 }: any) => {
  return (
    <group position={position} onClick={(e) => { e.stopPropagation(); onClick && onClick(); }}>
      {/* PCB Base - FR4 Material */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <boxGeometry args={[4, 3, 0.1]} />
        <meshPhysicalMaterial 
            color="#065f46" 
            roughness={0.2} 
            metalness={0.1} 
            clearcoat={1}
            clearcoatRoughness={0.1}
            transparent opacity={opacity} 
        />
      </mesh>
      {/* Pads - Gold Plated */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-1, 0, 0.06]}>
        <ringGeometry args={[0.15, 0.25, 32]} />
        <meshStandardMaterial color="#fbbf24" metalness={1} roughness={0.1} transparent opacity={opacity} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[1, 0, 0.06]}>
        <ringGeometry args={[0.15, 0.25, 32]} />
        <meshStandardMaterial color="#fbbf24" metalness={1} roughness={0.1} transparent opacity={opacity} />
      </mesh>
      {/* Traces */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0.051]}>
         <planeGeometry args={[2, 0.05]} />
         <meshStandardMaterial color="#34d399" transparent opacity={opacity} />
      </mesh>
    </group>
  );
};

const Resistor = ({ position, onClick, isPlaced, opacity = 1 }: any) => {
  const [hovered, setHover] = useState(false);
  useCursor(hovered);

  return (
    <group position={position} onClick={(e) => { e.stopPropagation(); onClick && onClick(); }}
      onPointerOver={() => setHover(true)} onPointerOut={() => setHover(false)}>
      
      <group rotation={[0, 0, Math.PI / 2]}>
          {/* Body */}
          <mesh>
            <cylinderGeometry args={[0.15, 0.15, 0.8, 16]} />
            <meshPhysicalMaterial color="#fcd34d" clearcoat={0.5} transparent opacity={opacity} />
          </mesh>
          {/* Bands */}
          <mesh position={[0, 0.2, 0]} scale={[1.05, 0.1, 1.05]}>
            <cylinderGeometry args={[0.15, 0.15, 1, 16]} />
            <meshBasicMaterial color="red" transparent opacity={opacity} />
          </mesh>
          <mesh position={[0, 0, 0]} scale={[1.05, 0.1, 1.05]}>
            <cylinderGeometry args={[0.15, 0.15, 1, 16]} />
            <meshBasicMaterial color="brown" transparent opacity={opacity} />
          </mesh>
           <mesh position={[0, -0.2, 0]} scale={[1.05, 0.1, 1.05]}>
            <cylinderGeometry args={[0.15, 0.15, 1, 16]} />
            <meshBasicMaterial color="gold" transparent opacity={opacity} />
          </mesh>
      </group>

      {/* Leads */}
      <mesh position={[-0.8, -0.2, 0]} rotation={[0, 0, Math.PI / 2]}>
         <cylinderGeometry args={[0.02, 0.02, 0.8]} />
         <meshStandardMaterial color="#cbd5e1" metalness={0.9} transparent opacity={opacity} />
      </mesh>
       <mesh position={[0.8, -0.2, 0]} rotation={[0, 0, Math.PI / 2]}>
         <cylinderGeometry args={[0.02, 0.02, 0.8]} />
         <meshStandardMaterial color="#cbd5e1" metalness={0.9} transparent opacity={opacity} />
      </mesh>
      
      {/* Legs (Vertical) if placed */}
      {isPlaced && (
        <>
            <mesh position={[-1.2, -0.4, 0]}>
                <cylinderGeometry args={[0.02, 0.02, 0.4]} />
                <meshStandardMaterial color="#cbd5e1" metalness={0.9} transparent opacity={opacity} />
            </mesh>
            <mesh position={[1.2, -0.4, 0]}>
                <cylinderGeometry args={[0.02, 0.02, 0.4]} />
                <meshStandardMaterial color="#cbd5e1" metalness={0.9} transparent opacity={opacity} />
            </mesh>
        </>
      )}

      <Text position={[0, 0.5, 0]} fontSize={0.2} color="white" anchorX="center" fillOpacity={hovered ? 1 : 0}>
        Resistor
      </Text>
    </group>
  );
};

const SolderingIron = ({ position, onClick, isActive, opacity = 1 }: any) => {
   const [hovered, setHover] = useState(false);
   useCursor(hovered);
   
   useFrame((state) => {
     if (isActive) {
        // Subtle shake/use
     }
   });

   return (
    <group position={position} onClick={(e) => { e.stopPropagation(); onClick && onClick(); }}
        rotation={[0, 0, -Math.PI / 4]}
        onPointerOver={() => setHover(true)} onPointerOut={() => setHover(false)}>
        {/* Handle */}
        <mesh position={[0, 0.5, 0]}>
            <cylinderGeometry args={[0.15, 0.2, 1.5, 16]} />
            <meshStandardMaterial color="#374151" transparent opacity={opacity} />
        </mesh>
        {/* Shaft */}
        <mesh position={[0, -0.5, 0]}>
             <cylinderGeometry args={[0.08, 0.08, 1, 16]} />
             <meshStandardMaterial color="#94a3b8" metalness={0.8} transparent opacity={opacity} />
        </mesh>
        {/* Tip */}
         <mesh position={[0, -1.1, 0]}>
             <coneGeometry args={[0.08, 0.3, 16]} />
             <meshStandardMaterial 
                color={isActive ? "#ef4444" : "#64748b"} 
                emissive={isActive ? "#ef4444" : "#000"} 
                emissiveIntensity={isActive ? 3 : 0} 
                transparent opacity={opacity} 
             />
        </mesh>
    </group>
   );
};

const Smoke = ({ position }: any) => {
    const particles = useMemo(() => {
        return new Array(5).fill(0).map(() => ({
            offset: [Math.random() * 0.2, Math.random() * 0.5, Math.random() * 0.2],
            speed: 0.2 + Math.random() * 0.5
        }));
    }, []);

    const ref = useRef<THREE.Group>(null);

    useFrame((state, delta) => {
        if (ref.current) {
            ref.current.children.forEach((child, i) => {
                child.position.y += delta * particles[i].speed;
                child.scale.setScalar(Math.sin(state.clock.elapsedTime * 2 + i) * 0.5 + 0.5);
                if (child.position.y > 1) child.position.y = 0;
            });
        }
    });

    return (
        <group position={position} ref={ref}>
            {particles.map((_, i) => (
                <mesh key={i} position={_.offset as any}>
                    <sphereGeometry args={[0.05, 8, 8]} />
                    <meshBasicMaterial color="#a1a1aa" transparent opacity={0.4} />
                </mesh>
            ))}
        </group>
    );
};

const SolderBlob = ({ position, scale = 1 }: any) => {
    return (
        <mesh position={position} scale={scale}>
            <sphereGeometry args={[0.15, 16, 16]} />
            <meshStandardMaterial color="#cbd5e1" metalness={1} roughness={0.1} />
        </mesh>
    );
};

// --- Scene ---

const PCBScene = ({ currentStep, onPartClick, step }: { currentStep: number; onPartClick: (part: string) => void; step: any }) => {
  
  // Note: Added 4 intro steps (PCB, Resistor, Iron, Safety)
  // Step 4: Inspect PCB (click board)
  // Step 5: Place Resistor (click resistor)
  // Step 6: Solder (click iron)

  const assemblyStartIndex = 4;

  const isResistorPlaced = currentStep > assemblyStartIndex + 1; // > 5
  // Step 6 is Solder step, so isSoldered when > 6?
  // Actually steps array:
  // 0: intro_pcb
  // 1: intro_resistor
  // 2: intro_iron
  // 3: safe1
  // 4: pcb_step1 (Inspect)
  // 5: pcb_step2 (Place Resistor) -> on completion, step becomes 6
  // 6: pcb_step3 (Solder) -> on completion, step becomes 7 (Done)

  const isSoldered = currentStep > 6;
  const isSolderStep = currentStep === 6;

  // Focus Logic
  const focusId = useMemo(() => {
    return step?.targetPartId || 'all';
  }, [step]);

  const isDimmed = (partId: string) => {
    if (currentStep >= assemblyStartIndex) return false;
    if (focusId === 'all') return false;
    return focusId !== partId;
  };

  const getOpacity = (part: string) => isDimmed(part) ? 0.2 : 1;

  return (
    <group>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 10, 5]} intensity={1} castShadow />
      <Environment preset="warehouse" />

      {/* PCB Board */}
      <group rotation={[Math.PI / 4, 0, 0]}>
         <Board 
            position={[0, 0, 0]} 
            onClick={() => onPartClick('board')} 
            opacity={getOpacity('board')}
         />
         
         {/* Resistor */}
        <group position={isResistorPlaced ? [0, 0.2, 0] : [0, 2, 2]} rotation={isResistorPlaced ? [0,0,0] : [Math.PI/4, 0, 0]}>
            <Float speed={2} floatIntensity={isResistorPlaced ? 0 : 0.5}>
                <Resistor 
                    position={[0,0,0]} 
                    onClick={() => onPartClick('resistor')}
                    isPlaced={isResistorPlaced}
                    opacity={getOpacity('resistor')}
                />
            </Float>
        </group>

        {/* Solder Blobs */}
        {isSoldered && (
            <>
                <SolderBlob position={[-1, 0.1, 0.06]} />
                <SolderBlob position={[1, 0.1, 0.06]} />
            </>
        )}

        {/* Smoke Effect during soldering */}
        {isSolderStep && (
            <group position={[0, 0.5, 0]}>
                <Smoke position={[-1, 0, 0.06]} />
                <Smoke position={[1, 0, 0.06]} />
            </group>
        )}
      </group>

      {/* Tools */}
      <group position={[3, 0, 0]}>
        <Float speed={1} floatIntensity={0.2}>
            <SolderingIron 
                position={[0,0,0]} 
                onClick={() => onPartClick('iron')}
                isActive={isSolderStep}
                opacity={getOpacity('iron')}
            />
        </Float>
      </group>

      <ContactShadows position={[0, -2, 0]} opacity={0.4} scale={30} blur={2.5} far={10} />
    </group>
  );
};

export default PCBScene;
