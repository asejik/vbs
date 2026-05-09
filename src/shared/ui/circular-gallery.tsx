import React, { useState, useEffect, useRef, type HTMLAttributes, useMemo } from 'react';

const cn = (...classes: (string | undefined | null | false)[]) => {
  return classes.filter(Boolean).join(' ');
}

export interface GalleryItem {
  title: string;
  subtitle: string;
  photo: {
    url: string; 
    alt: string;
    pos?: string;
  };
}

interface CircularGalleryProps extends HTMLAttributes<HTMLDivElement> {
  items: GalleryItem[];
  radius?: number;
  autoRotateSpeed?: number;
}

/**
 * 3D Circular Gallery with stability fixes:
 * 1. Removed direct window access from render path to prevent crashes.
 * 2. Optimized scroll handling via passive listeners and direct state updates.
 * 3. Enhanced image loading with lazy loading for performance.
 */
const CircularGallery = React.forwardRef<HTMLDivElement, CircularGalleryProps>(
  ({ items, className, radius = 600, autoRotateSpeed = 0.02, ...props }, ref) => {
    const [rotation, setRotation] = useState(0);
    const [isScrolling, setIsScrolling] = useState(false);
    const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const animationFrameRef = useRef<number | null>(null);

    // Track viewport state safely
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
      const checkMobile = () => setIsMobile(window.innerWidth < 640);
      checkMobile();
      window.addEventListener('resize', checkMobile);
      return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
      const handleScroll = () => {
        setIsScrolling(true);
        if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
        
        // Use a multiplier to make the rotation feel responsive to scroll
        const scrollRotation = (window.scrollY / 10); 
        setRotation(scrollRotation);
        
        scrollTimeoutRef.current = setTimeout(() => setIsScrolling(false), 150);
      };
      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => {
        window.removeEventListener('scroll', handleScroll);
        if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      };
    }, []);

    useEffect(() => {
      const autoRotate = () => {
        if (!isScrolling) setRotation(prev => prev + autoRotateSpeed);
        animationFrameRef.current = requestAnimationFrame(autoRotate);
      };
      animationFrameRef.current = requestAnimationFrame(autoRotate);
      return () => {
        if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      };
    }, [isScrolling, autoRotateSpeed]);

    const anglePerItem = useMemo(() => 360 / Math.max(items.length, 1), [items.length]);
    
    return (
      <div
        ref={ref}
        role="region"
        aria-label="Circular 3D Gallery"
        className={cn("relative w-full h-full flex items-center justify-center overflow-hidden", className)}
        style={{ perspective: '2000px' }}
        {...props}
      >
        <div
          className="relative w-full h-full"
          style={{ 
            transform: `rotateY(${rotation}deg)`, 
            transformStyle: 'preserve-3d',
            transition: isScrolling ? 'none' : 'transform 0.5s ease-out' 
          }}
        >
          {items.map((item, i) => {
            const itemAngle = i * anglePerItem;
            const totalRotation = rotation % 360;
            const relativeAngle = (itemAngle + totalRotation + 360) % 360;
            const normalizedAngle = Math.abs(relativeAngle > 180 ? 360 - relativeAngle : relativeAngle);
            
            // Fade items as they move to the background
            const opacity = Math.max(0, 1 - (normalizedAngle / 120));

            return (
              <div
                key={item.photo.url + i} 
                role="group"
                aria-label={item.title}
                className="absolute w-[200px] sm:w-[320px] h-[280px] sm:h-[440px]"
                style={{
                  transform: `rotateY(${itemAngle}deg) translateZ(${radius}px)`,
                  left: '50%',
                  top: '50%',
                  marginLeft: '-100px', 
                  marginTop: '-140px',
                  opacity: opacity,
                  transition: 'opacity 0.4s ease-out',
                  backfaceVisibility: 'hidden',
                }}
              >
                <div 
                   className={cn(
                     "relative w-full h-full rounded-3xl shadow-2xl overflow-hidden group border-4 border-white bg-white/10 backdrop-blur-sm transition-all duration-300",
                     isMobile ? "" : "ml-[-60px] mt-[-80px]"
                   )}
                >
                  <img
                    src={item.photo.url}
                    alt={item.photo.alt}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    style={{ objectPosition: item.photo.pos || 'center' }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 w-full p-4 sm:p-8 text-white">
                    <h2 className="text-xl sm:text-2xl font-heading font-black leading-tight">{item.title}</h2>
                    <p className="text-[10px] sm:text-sm font-medium mt-1 sm:mt-2 text-white/80 tracking-wide uppercase">{item.subtitle}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
);

CircularGallery.displayName = 'CircularGallery';
export { CircularGallery };
