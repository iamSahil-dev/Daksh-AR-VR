import { useState, useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Text, useCursor, Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

// --- Assets ---

// --- Assets ---

const Stator = ({ position, onClick, isSelected, isAssembled, opacity = 1, isFocused = false }: any) => {
  const [hovered, setHover] = useState(false);
  const groupRef = useRef<THREE.Group>(null);
  useCursor(hovered && !isAssembled);

  useFrame((state, delta) => {
    if (isFocused && groupRef.current) {
      groupRef.current.rotation.y += delta * 0.5;
    } else if (groupRef.current) {
       // Reset rotation gently or just leave it? Resetting is cleaner for assembly.
       groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, 0, delta * 2);
    }
  });

  return (
    <group ref={groupRef} position={position} onClick={(e) => { e.stopPropagation(); onClick && onClick(); }}
      onPointerOver={() => setHover(true)} onPointerOut={() => setHover(false)}>
      {/* Outer Casing - Industrial Grey Steel */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[1.5, 1.5, 2, 32, 1, true]} />
        <meshPhysicalMaterial 
            color="#334155" 
            metalness={0.7} 
            roughness={0.4} 
            clearcoat={0.5}
            visible={opacity > 0}
            transparent={opacity < 1} 
            opacity={opacity} 
        />
      </mesh>
       {/* Coils - Copper */}
       <mesh rotation={[Math.PI / 2, 0, 0]} scale={[0.95, 0.95, 0.9]}>
        <cylinderGeometry args={[1.4, 1.4, 2, 32, 1, true]} />
        <meshPhysicalMaterial 
            color="#b87333" 
            metalness={0.5} 
            roughness={0.3} 
            clearcoat={1}
            visible={opacity > 0}
            transparent={opacity < 1} 
            opacity={opacity} 
        />
      </mesh>
      
      {!isAssembled && (
        <Text position={[0, 1.5, 0]} fontSize={0.2} color="#333" anchorX="center" fillOpacity={opacity}>
            Stator
        </Text>
      )}
    </group>
  );
};

const Rotor = ({ position, onClick, isSelected, isAssembled, opacity = 1, isFocused = false }: any) => {
  const [hovered, setHover] = useState(false);
  const groupRef = useRef<THREE.Group>(null);
  useCursor(hovered && !isAssembled);

  useFrame((state, delta) => {
    if (isFocused && groupRef.current) {
        // Rotates around X axis because of the cylinder orientation? 
        // Actually the group is stationary relative to world, but meshes are rotated.
        // Let's rotate the Group Y for show-off.
        groupRef.current.rotation.y += delta * 1.5; // Faster spin for rotor
    } else if (groupRef.current) {
        groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, 0, delta * 2);
    }
  });

  return (
    <group ref={groupRef} position={position} onClick={(e) => { e.stopPropagation(); onClick && onClick(); }}
      onPointerOver={() => setHover(true)} onPointerOut={() => setHover(false)}>
      {/* Core - Laminated Steel */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[1, 1, 1.8, 32]} />
        <meshPhysicalMaterial 
            color="#94a3b8" 
            metalness={0.8} 
            roughness={0.2} 
            visible={opacity > 0}
            transparent={opacity < 1} 
            opacity={opacity} 
        />
      </mesh>
      {/* Windings - Detailed Copper */}
      <mesh rotation={[Math.PI / 2, 0, 0]} scale={[1.01, 1.01, 0.8]}>
         <cylinderGeometry args={[1, 1, 1.5, 16]} />
        <meshPhysicalMaterial 
            color="#c25e00" 
            metalness={0.4} 
            roughness={0.3} 
            wireframe 
            emissive="#b87333"
            emissiveIntensity={0.2}
            visible={opacity > 0}
            transparent={opacity < 1} 
            opacity={opacity} 
        />
      </mesh>
      
      {!isAssembled && (
        <Text position={[0, 1.2, 0]} fontSize={0.2} color="#333" anchorX="center" fillOpacity={opacity}>
            Rotor
        </Text>
      )}
    </group>
  );
};

const Shaft = ({ position, onClick, isSelected, isAssembled, opacity = 1, isFocused = false }: any) => {
  const [hovered, setHover] = useState(false);
  const groupRef = useRef<THREE.Group>(null);
  useCursor(hovered && !isAssembled);

  useFrame((state, delta) => {
     if (isFocused && groupRef.current) {
        groupRef.current.rotation.z += delta * 0.5; // Rotate lengthwise or around? Group Y is best for presentation
        // groupRef.current.rotation.y += delta * 0.5;
     }
  });

  return (
    <group ref={groupRef} position={position} onClick={(e) => { e.stopPropagation(); onClick && onClick(); }}
      onPointerOver={() => setHover(true)} onPointerOut={() => setHover(false)}>
      
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 4, 16]} />
        <meshPhysicalMaterial 
            color="#e2e8f0" 
            metalness={1.0} 
            roughness={0.1} 
            clearcoat={1}
            visible={opacity > 0}
            transparent={opacity < 1} 
            opacity={opacity} 
        />
      </mesh>

       {!isAssembled && (
        <Text position={[0, 0.5, 0]} fontSize={0.2} color="#333" anchorX="center" fillOpacity={opacity}>
            Shaft
        </Text>
      )}
    </group>
  );
};

// --- Scene ---

const MotorScene = ({ currentStep, onPartClick, step }: { currentStep: number; onPartClick: (part: string) => void; step: any }) => {
  
  // Note: currentStep now includes 3 intro steps at the start (0, 1, 2)
  // Assembly steps are now 3, 4, 5.
  const assemblyStartIndex = 3;

  // Assembly logic:
  // Step 3: Identify Stator -> Base is always there.
  // Step 4: Position Rotor -> Rotor moves to 0,0,0
  // Step 5: Attach Shaft -> Shaft moves to 0,0,0

  // Focus Logic
  const focusId = useMemo(() => {
    // Rely on targetPartId from the step data for simplicity
    return step?.targetPartId || 'all';
  }, [step]);

  const isDimmed = (partId: string) => {
    // If we are in assembly phase (step >= 3), show everything clearly to build
    // UNLESS we want to focus on the part being added? 
    // Let's keep specific focus for Intros (0-2) and full view for Assembly (3+)
    if (currentStep >= assemblyStartIndex) return false;
    
    // In intro phase, dim everything except target
    if (focusId === 'all') return false;
    return focusId !== partId;
  };

  const getOpacity = (part: string) => isDimmed(part) ? 0.2 : 1;
  const isFocused = (part: string) => !isDimmed(part) && currentStep < assemblyStartIndex;

  return (
    <group>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <Environment preset="city" />

      {/* Stator (Base) */}
      <Float speed={1} rotationIntensity={0.1} floatIntensity={0.2} enabled={currentStep === assemblyStartIndex}>
        <Stator 
            position={[0, 0, 0]} 
            onClick={() => onPartClick('stator')}
            isAssembled={true} 
            opacity={getOpacity('stator')}
            isFocused={isFocused('stator')}
        />
      </Float>

      {/* Rotor */}
      {/* Moves to center when step 4 is DONE (so currentStep > 4) OR if we want to show it assembled during intro? */}
      {/* Actually for intro we want them separated to see them clearly. */}
      <group position={currentStep > assemblyStartIndex + 0 ? [0, 0, 0] : [3, 0.5, 0]}>
         <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5} enabled={currentStep <= assemblyStartIndex + 0}>
            <Rotor 
                position={[0,0,0]}
                onClick={() => onPartClick('rotor')}
                isAssembled={currentStep > assemblyStartIndex + 0}
                opacity={getOpacity('rotor')}
                isFocused={isFocused('rotor')}
            />
         </Float>
      </group>

      {/* Shaft */}
      <group position={currentStep > assemblyStartIndex + 1 ? [0, 0, 0] : [-3, 0.5, 0]}>
        <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5} enabled={currentStep <= assemblyStartIndex + 1}>
            <Shaft 
                position={[0,0,0]}
                onClick={() => onPartClick('shaft')}
                isAssembled={currentStep > assemblyStartIndex + 1}
                opacity={getOpacity('shaft')}
                isFocused={isFocused('shaft')}
            />
        </Float>
      </group>

      <ContactShadows position={[0, -2, 0]} opacity={0.4} scale={30} blur={2.5} far={10} />
    </group>
  );
};

export default MotorScene;
