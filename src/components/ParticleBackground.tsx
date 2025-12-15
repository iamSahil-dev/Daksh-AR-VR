import { useRef, useEffect } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  color: string;
  baseOpacity: number;
}

const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000, active: false });
  const lastMouseMoveRef = useRef<number>(0);
  const animationRef = useRef<number>();
  const clickBurstRef = useRef<{ x: number; y: number; time: number } | null>(null);
  const prefersReducedMotion = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Check for reduced motion preference
    const motionMediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    prefersReducedMotion.current = motionMediaQuery.matches;

    // Professional color palette - vibrant blues and purples
    const colors = [
      'rgba(96, 165, 250, ', // blue-400
      'rgba(139, 92, 246, ', // violet-500
      'rgba(167, 139, 250, ', // violet-400
      'rgba(59, 130, 246, ', // blue-500
      'rgba(147, 197, 253, ', // blue-300
      'rgba(196, 181, 253, ', // violet-300
    ];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticles = () => {
      // Reduce particle count for mobile and respect reduced motion
      const isMobile = window.innerWidth < 768;
      const baseCount = Math.floor((window.innerWidth * window.innerHeight) / (isMobile ? 20000 : 15000));
      const count = prefersReducedMotion.current ? Math.floor(baseCount * 0.3) : baseCount;
      particlesRef.current = [];

      for (let i = 0; i < count; i++) {
        const baseOpacity = Math.random() * 0.4 + 0.3;
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          size: Math.random() * 2 + 1,
          opacity: baseOpacity,
          baseOpacity: baseOpacity,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
    };

    const drawParticle = (particle: Particle) => {
      // Main particle with enhanced brightness
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fillStyle = particle.color + particle.opacity + ')';
      ctx.fill();

      // Enhanced glow effect
      const gradient = ctx.createRadialGradient(
        particle.x, particle.y, 0,
        particle.x, particle.y, particle.size * 6
      );
      gradient.addColorStop(0, particle.color + (particle.opacity * 0.8) + ')');
      gradient.addColorStop(0.4, particle.color + (particle.opacity * 0.4) + ')');
      gradient.addColorStop(1, particle.color + '0)');
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size * 6, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();
    };

    const drawConnections = () => {
      const particles = particlesRef.current;
      const maxDistance = 140;
      const isMouseActive = mouseRef.current.active;

      // Draw flowing pattern connections when mouse is not active
      if (!isMouseActive) {
        // Create wave-like patterns that move across the screen
        const time = Date.now() * 0.001;
        
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < maxDistance) {
              // Create flowing wave effect with enhanced opacity
              const waveOffset = Math.sin(time + (particles[i].x + particles[i].y) * 0.01) * 0.35;
              const opacity = (1 - distance / maxDistance) * (0.5 + waveOffset);
              
              ctx.beginPath();
              ctx.moveTo(particles[i].x, particles[i].y);
              ctx.lineTo(particles[j].x, particles[j].y);
              
              const gradient = ctx.createLinearGradient(
                particles[i].x, particles[i].y,
                particles[j].x, particles[j].y
              );
              gradient.addColorStop(0, `rgba(96, 165, 250, ${opacity})`);
              gradient.addColorStop(0.5, `rgba(139, 92, 246, ${opacity})`);
              gradient.addColorStop(1, `rgba(167, 139, 250, ${opacity})`);
              
              ctx.strokeStyle = gradient;
              ctx.lineWidth = 2;
              ctx.stroke();
            }
          }
        }
      } else {
        // Regular connections when mouse is active
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < maxDistance) {
              const opacity = (1 - distance / maxDistance) * 0.35;
              ctx.beginPath();
              ctx.moveTo(particles[i].x, particles[i].y);
              ctx.lineTo(particles[j].x, particles[j].y);
              
              const gradient = ctx.createLinearGradient(
                particles[i].x, particles[i].y,
                particles[j].x, particles[j].y
              );
              gradient.addColorStop(0, `rgba(96, 165, 250, ${opacity})`);
              gradient.addColorStop(1, `rgba(139, 92, 246, ${opacity})`);
              
              ctx.strokeStyle = gradient;
              ctx.lineWidth = 1.8;
              ctx.stroke();
            }
          }
        }
      }
    };

    const updateParticle = (particle: Particle) => {
      const isMouseActive = mouseRef.current.active;
      
      if (isMouseActive) {
        // Magnetic cursor - attract at medium distance, repel when close
        const dx = mouseRef.current.x - particle.x;
        const dy = mouseRef.current.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const attractDistance = 250;
        const repelDistance = 100;

        if (distance < repelDistance) {
          // Repel when very close
          const force = (1 - distance / repelDistance) * 0.04;
          particle.vx -= dx * force;
          particle.vy -= dy * force;
          particle.opacity = Math.min(particle.baseOpacity * 2.5, 0.9);
        } else if (distance < attractDistance) {
          // Attract at medium distance
          const force = ((attractDistance - distance) / attractDistance) * 0.008;
          particle.vx += dx * force;
          particle.vy += dy * force;
          particle.opacity = particle.baseOpacity * 1.5;
        } else {
          particle.opacity = particle.baseOpacity + Math.sin(Date.now() * 0.0005 + particle.x * 0.005) * particle.baseOpacity * 0.5;
        }
        
        // Click burst effect
        if (clickBurstRef.current) {
          const timeSinceClick = Date.now() - clickBurstRef.current.time;
          if (timeSinceClick < 500) {
            const cdx = clickBurstRef.current.x - particle.x;
            const cdy = clickBurstRef.current.y - particle.y;
            const cdistance = Math.sqrt(cdx * cdx + cdy * cdy);
            const burstRadius = 300;
            
            if (cdistance < burstRadius) {
              const burstForce = (1 - timeSinceClick / 500) * (1 - cdistance / burstRadius) * 0.15;
              particle.vx -= cdx * burstForce;
              particle.vy -= cdy * burstForce;
              particle.opacity = Math.min(particle.baseOpacity * 3, 1);
            }
          } else {
            clickBurstRef.current = null;
          }
        }
      } else {
        // When mouse is not active, create gentle flowing movement
        const time = Date.now() * 0.0003;
        const flowX = Math.sin(time + particle.y * 0.002) * 0.3;
        const flowY = Math.cos(time + particle.x * 0.002) * 0.3;
        
        particle.vx += flowX * 0.01;
        particle.vy += flowY * 0.01;
        
        // Pulsating opacity for patterns
        particle.opacity = particle.baseOpacity + Math.sin(time * 2 + particle.x * 0.01) * particle.baseOpacity * 0.4;
      }

      // Apply velocity with damping
      particle.vx *= 0.97;
      particle.vy *= 0.97;
      particle.x += particle.vx;
      particle.y += particle.vy;

      // Wrap around edges
      if (particle.x < 0) particle.x = canvas.width;
      if (particle.x > canvas.width) particle.x = 0;
      if (particle.y < 0) particle.y = canvas.height;
      if (particle.y > canvas.height) particle.y = 0;
    };

    const animate = () => {
      ctx.fillStyle = 'rgba(17, 24, 39, 1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Check if mouse is active (moved in last 1.5 seconds)
      const now = Date.now();
      mouseRef.current.active = (now - lastMouseMoveRef.current) < 1500;

      drawConnections();

      particlesRef.current.forEach(particle => {
        updateParticle(particle);
        drawParticle(particle);
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      lastMouseMoveRef.current = Date.now();
    };
    
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouseRef.current.x = e.touches[0].clientX;
        mouseRef.current.y = e.touches[0].clientY;
        lastMouseMoveRef.current = Date.now();
      }
    };
    
    const handleClick = (e: MouseEvent) => {
      if (prefersReducedMotion.current) return;
      clickBurstRef.current = {
        x: e.clientX,
        y: e.clientY,
        time: Date.now()
      };
    };
    
    const handleTouchStart = (e: TouchEvent) => {
      if (prefersReducedMotion.current || e.touches.length === 0) return;
      clickBurstRef.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
        time: Date.now()
      };
    };

    resize();
    createParticles();
    animate();

    const handleMotionChange = () => {
      prefersReducedMotion.current = motionMediaQuery.matches;
    };

    window.addEventListener('resize', () => {
      resize();
      createParticles();
    });
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('click', handleClick);
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    motionMediaQuery.addEventListener('change', handleMotionChange);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('click', handleClick);
      window.removeEventListener('touchstart', handleTouchStart);
      motionMediaQuery.removeEventListener('change', handleMotionChange);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0"
      style={{ background: 'transparent', pointerEvents: 'auto', cursor: 'default' }}
    />
  );
};

export default ParticleBackground;
