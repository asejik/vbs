import React, { useState, useEffect, useRef, type HTMLAttributes } from 'react';

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

const CircularGallery = React.forwardRef<HTMLDivElement, CircularGalleryProps>(
  ({ items, className, radius = 600, autoRotateSpeed = 0.02, ...props }, ref) => {
    const [rotation, setRotation] = useState(0);
    const [isScrolling, setIsScrolling] = useState(false);
    const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const animationFrameRef = useRef<number | null>(null);

    useEffect(() => {
      const handleScroll = () => {
        setIsScrolling(true);
        if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
        
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

    const anglePerItem = 360 / items.length;
    
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
            
            const opacity = Math.max(0, 1 - (normalizedAngle / 120));

            return (
              <div
                key={item.photo.url + i} 
                role="group"
                aria-label={item.title}
                // Reduced sizes for mobile, standard for tablet+
                className="absolute w-[200px] sm:w-[320px] h-[280px] sm:h-[440px]"
                style={{
                  transform: `rotateY(${itemAngle}deg) translateZ(${radius}px)`,
                  left: '50%',
                  top: '50%',
                  // Centering math adjusted for new sizes
                  marginLeft: '-100px', // Half of 200px
                  marginTop: '-140px', // Half of 280px
                  opacity: opacity,
                  transition: 'opacity 0.4s ease-out',
                  backfaceVisibility: 'hidden',
                }}
              >
                {/* Fixed margin adjustments for larger screens via class-based override isn't possible in style objects easily, so we use SM specific math if needed but marginLeft-100 looks okay for sm:w-320 if handled carefully or just use calc */}
                <div 
                   className="relative w-full h-full rounded-3xl shadow-2xl overflow-hidden group border-4 border-white bg-white/10 backdrop-blur-sm sm:ml-[-60px] sm:mt-[-80px]"
                   style={{
                     // Refined centering for larger screens to override the mobile default
                     marginLeft: window.innerWidth >= 640 ? '-60px' : '0',
                     marginTop: window.innerWidth >= 640 ? '-80px' : '0'
                   }}
                >
                  <img
                    src={item.photo.url}
                    alt={item.photo.alt}
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
