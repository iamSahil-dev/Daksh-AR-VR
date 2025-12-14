import { useState, useRef, useEffect, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Float, Text, useCursor, Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

interface WiringSceneProps {
  currentStep: number;
  onPartClick: (part: string) => void;
  requiredConnection?: { from: string; to: string };
  moduleSteps?: any[];
}

// --- High Fidelity Component Assets ---

const BulbPart = ({ position, label, onClick, isLit, opacity = 1 }: any) => {
  const [hovered, setHover] = useState(false);
  useCursor(hovered);

  return (
    <group position={position} onClick={(e) => { e.stopPropagation(); onClick && onClick(); }}
      onPointerOver={() => setHover(true)} onPointerOut={() => setHover(false)}>
      {/* Base */}
      <mesh position={[0, 0.2, 0]}>
        <cylinderGeometry args={[0.3, 0.3, 0.4, 32]} />
        <meshStandardMaterial color="#b0b0b0" metalness={0.8} roughness={0.2} transparent opacity={opacity} />
      </mesh>
      {/* Glass Bulb */}
      <mesh position={[0, 0.8, 0]}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshPhysicalMaterial 
          color={isLit ? "#fffdb0" : "white"} 
          transmission={0.9} 
          thickness={0.1} 
          roughness={0.1}
          emissive={isLit ? "#ffaa00" : "#000000"}
          emissiveIntensity={isLit ? 2 : 0}
          transparent
          opacity={opacity}
        />
      </mesh>
      {/* Filament (Glow) */}
      {isLit && <pointLight position={[0, 0.8, 0]} intensity={3} color="#ffaa00" distance={5} />}
      
      {/* Label */}
      <Text position={[0, -0.5, 0.5]} fontSize={0.15} color="#333" anchorX="center" fillOpacity={opacity}>{label}</Text>
    </group>
  );
};

const SwitchPart = ({ position, label, isOn, onClick, opacity = 1 }: any) => {
  const [hovered, setHover] = useState(false);
  useCursor(hovered);

  return (
    <group position={position} onClick={(e) => { e.stopPropagation(); onClick && onClick(); }}
      onPointerOver={() => setHover(true)} onPointerOut={() => setHover(false)}>
      {/* Faceplate */}
      <mesh position={[0, 0, -0.1]}>
        <boxGeometry args={[1.2, 1.8, 0.2]} />
        <meshStandardMaterial color="#f5f5f5" roughness={0.5} transparent opacity={opacity} />
      </mesh>
      {/* Switch Housing */}
      <mesh position={[0, 0, 0.1]}>
        <boxGeometry args={[0.4, 0.8, 0.1]} />
        <meshStandardMaterial color="#333" transparent opacity={opacity} />
      </mesh>
      {/* Rocker */}
      <group position={[0, 0, 0.15]} rotation={[isOn ? -0.2 : 0.2, 0, 0]}>
         <mesh>
            <boxGeometry args={[0.3, 0.6, 0.1]} />
            <meshStandardMaterial color="#ececec" transparent opacity={opacity} />
         </mesh>
      </group>
      <Text position={[0, -1.1, 0.1]} fontSize={0.15} color="#333" anchorX="center" fillOpacity={opacity}>{label}</Text>
    </group>
  );
};

const PowerSupply = ({ position, label, opacity = 1 }: any) => {
  return (
    <group position={position}>
       {/* Main Unit */}
       <mesh position={[0, 0.5, 0]}>
         <boxGeometry args={[2, 1, 1]} />
         <meshStandardMaterial color="#2d3748" metalness={0.6} roughness={0.4} transparent opacity={opacity} />
       </mesh>
       {/* Display */}
       <mesh position={[0, 0.6, 0.51]}>
          <planeGeometry args={[0.8, 0.4]} />
          <meshBasicMaterial color="#000" transparent opacity={opacity} />
       </mesh>
       <Text position={[0, 0.6, 0.52]} fontSize={0.15} color="#00ff00" fillOpacity={opacity}>220V AC</Text>
       <Text position={[0, 1.2, 0]} fontSize={0.2} color="#333" anchorX="center" fillOpacity={opacity}>{label}</Text>
    </group>
  );
};

// --- Interactive Elements ---

const ConnectionPoint = ({ id, position, isSelected, onClick, color = "lime", visible = true }: any) => {
    const [hovered, setHover] = useState(false);
    useCursor(hovered && visible);

    if (!visible) return null;

    return (
      <group position={position}>
        <mesh 
            onClick={(e) => { e.stopPropagation(); onClick(id); }}
            onPointerOver={() => setHover(true)} 
            onPointerOut={() => setHover(false)}
        >
          {/* Increased hit area significantly */}
          <sphereGeometry args={[0.25, 16, 16]} /> 
          <meshStandardMaterial 
            color={isSelected ? "#ffffff" : color} 
            emissive={isSelected || hovered ? "#ffffff" : color}
            emissiveIntensity={isSelected || hovered ? 1 : 0.5}
            toneMapped={false}
          />
        </mesh>
        {/* Glow halo */}
        {(isSelected || hovered) && (
             <sprite scale={[0.8, 0.8, 0.8]}>
                <spriteMaterial color={color} transparent opacity={0.6} blending={THREE.AdditiveBlending} />
             </sprite>
        )}
      </group>
    );
  };

const WireCurve = ({ start, end, color = "red", isAnimated = false }: any) => {
    const curve = useMemo(() => {
        const p1 = new THREE.Vector3(...start);
        const p2 = new THREE.Vector3(...end);
        
        // Calculate nice control points for a hanging wire effect
        const dist = p1.distanceTo(p2);
        const mid = p1.clone().lerp(p2, 0.5);
        mid.y -= dist * 0.2; // Sag
        mid.z += dist * 0.1; // Random variation

        return new THREE.QuadraticBezierCurve3(p1, mid, p2);
    }, [start, end]);

    return (
        <mesh>
            <tubeGeometry args={[curve, 20, 0.04, 8, false]} />
            <meshStandardMaterial color={color} roughness={0.4} />
        </mesh>
    );
};

// --- Scene ---

const WiringScene = ({ currentStep, onPartClick, step }: { currentStep: number; onPartClick: (p: string) => void; step: any }) => {
  const [selectedPoint, setSelectedPoint] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState<[number, number, number] | null>(null);
  const { raycaster } = useThree();
  const planeRef = useRef<THREE.Mesh>(null);
  const requiredConnection = step?.requiredConnection;

  // Determine focus based on current step ID
  const focusId = useMemo(() => {
    if (step.id === 'intro1') return 'switch'; // Focus Switch
    if (step.id === 'info_switch') return 'switch'; // Fallback check
    if (step.id === 'intro2') return 'bulb';   // Focus Bulb
    if (step.id === 'info_bulb') return 'bulb'; 
    if (step.id === 'intro3') return 'source'; // Focus Power
    return 'all'; // Default (including wiring steps)
  }, [step.id]);

  const isDimmed = (partId: string) => {
    if (focusId === 'all') return false;
    return focusId !== partId;
  };

  // Component Positions
  const pos = {
    source: [0, -1.5, 0],
    switch: [-2.5, 0, 0],
    bulb: [2.5, 0, 0]
  };

  // Terminal Points - Adjusted for better accessibility
  const points: Record<string, [number, number, number]> = {
    'source_phase': [-0.5, -0.9, 0.6], 
    'source_neutral': [0.5, -0.9, 0.6],
    'switch_in': [-2.5, -0.5, 0.3], // Moved forward Z
    'switch_out': [-2.5, 0.5, 0.3], // Moved forward Z
    'bulb_in': [2.2, -0.1, 0.2], // Adjusted
    'bulb_out': [2.8, -0.1, 0.2], // Adjusted
  };

  // Reset when step changes
  useEffect(() => {
    setSelectedPoint(null);
    setMousePos(null);
  }, [currentStep]);

  const handlePointClick = (id: string) => {
    if (!requiredConnection) {
        console.log("No required connection for this step");
        return;
    }

    if (selectedPoint === null) {
      if (id === requiredConnection.from || id === requiredConnection.to) {
        setSelectedPoint(id);
      } else {
        // Feedback for wrong starting point?
      }
    } else {
      if (id === selectedPoint) {
        setSelectedPoint(null);
      } else if (
        (selectedPoint === requiredConnection.from && id === requiredConnection.to) ||
        (selectedPoint === requiredConnection.to && id === requiredConnection.from)
      ) {
        onPartClick('CORRECT_CONNECTION_MADE');
        setSelectedPoint(null);
      } else {
        setSelectedPoint(null);
      }
    }
  };

  // Raycast to invisible plane to track mouse for wire dragging
  useFrame((state) => {
    if (selectedPoint && planeRef.current) {
        const intersects = raycaster.intersectObject(planeRef.current);
        if (intersects.length > 0) {
            setMousePos([intersects[0].point.x, intersects[0].point.y, intersects[0].point.z]);
        }
    }
  });

  // Calculate Dimming Opacity
  const getOpacity = (part: string) => isDimmed(part) ? 0.3 : 1;

  return (
    <group>
      {/* Lighting Setup */}
      <ambientLight intensity={0.4} />
      <spotLight position={[5, 10, 5]} angle={0.5} penumbra={1} intensity={2} castShadow 
         shadow-mapSize={[1024, 1024]} />
      <Environment preset="city" />

      {/* Invisible Plane for Raycasting */}
      <mesh ref={planeRef} visible={false} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[100, 100]} />
      </mesh>

      {/* Components with Dimming Logic */}
      <PowerSupply position={pos.source} label="Main Power" opacity={getOpacity('source')} />
      <SwitchPart position={pos.switch} label="Light Switch" isOn={currentStep >= 5} opacity={getOpacity('switch')} />
      <BulbPart position={pos.bulb} label="Bulb Holder" isLit={currentStep >= 6} opacity={getOpacity('bulb')} />

      {/* Connection Points (Only show in wiring mode or all? All is fine if interaction is blocked by logic) */}
      {/* Ensure click works even if dimmed, but better to hide points if dimmed to focus visual attention */}
      {Object.entries(points).map(([id, p]) => (
        <ConnectionPoint 
            key={id} 
            id={id} 
            position={p} 
            isSelected={selectedPoint === id} 
            onClick={handlePointClick}
            color={id.includes('neutral') ? '#3b82f6' : '#ef4444'}
            visible={focusId === 'all'} 
        />
      ))}

      {/* Active Dragging Wire (Rubber Band) */}
      {selectedPoint && mousePos && (
          <WireCurve 
             start={points[selectedPoint]} 
             end={mousePos} 
             color="#fbbf24" 
          />
      )}

      {/* Completed Wires - Logic Updated for new Indices (3, 4, 5 are wiring steps) */}
      {/* Step 3 (index 3) is done at index 4 start */}
      {currentStep > 3 && <WireCurve start={points['source_phase']} end={points['switch_in']} color="#ef4444" />}
      {currentStep > 4 && <WireCurve start={points['switch_out']} end={points['bulb_in']} color="#f97316" />}
      {currentStep > 5 && <WireCurve start={points['source_neutral']} end={points['bulb_out']} color="#3b82f6" />}

      <ContactShadows position={[0, -2, 0]} opacity={0.4} scale={30} blur={2.5} far={10} />
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.2}>
      </Float>
    </group>
  );
};

export default WiringScene;
