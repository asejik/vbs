'use client';
import React, { useEffect, useState } from 'react';

type ArcGalleryProps = {
  images: string[];
  startAngle?: number;
  endAngle?: number;
  radiusLg?: number;
  radiusMd?: number;
  radiusSm?: number;
  cardSizeLg?: number;
  cardSizeMd?: number;
  cardSizeSm?: number;
  className?: string;
  children?: React.ReactNode;
};

export const ArcGallery: React.FC<ArcGalleryProps> = ({
  images,
  // Widened angles for better curvature
  startAngle = 10,
  endAngle = 170,
  // Adjusted radius for better overlap/fit
  radiusLg = 450,
  radiusMd = 340,
  radiusSm = 220,
  // Increased card sizes to ensure overlap
  cardSizeLg = 160,
  cardSizeMd = 130,
  cardSizeSm = 100,
  className = '',
  children,
}) => {
  const [dimensions, setDimensions] = useState({ radius: radiusLg, cardSize: cardSizeLg });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setDimensions({ radius: radiusSm, cardSize: cardSizeSm });
      } else if (width < 1024) {
        setDimensions({ radius: radiusMd, cardSize: cardSizeMd });
      } else {
        setDimensions({ radius: radiusLg, cardSize: cardSizeLg });
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [radiusLg, radiusMd, radiusSm, cardSizeLg, cardSizeMd, cardSizeSm]);

  const count = Math.max(images.length, 2);
  // Calculate step based on count
  const step = (endAngle - startAngle) / (count - 1);

  return (
    <section className={`relative overflow-hidden w-full flex flex-col pt-12 pb-24 ${className}`}>
      {/* Arc Geometry Container */}
      <div className="relative mx-auto w-full" style={{ height: dimensions.radius * 1.1 }}>
        <div className="absolute left-1/2 bottom-0 -translate-x-1/2">
          {images.map((src, i) => {
            const angle = startAngle + step * i;
            const angleRad = (angle * Math.PI) / 180;
            
            // Polar to Cartesian conversion
            const x = Math.cos(angleRad) * dimensions.radius;
            const y = Math.sin(angleRad) * dimensions.radius;
            
            // Calculate rotation to follow the arc (tangent-ish)
            // 90deg is the top of the arc where rotation should be 0
            const rotation = angle - 90;

            return (
              <div
                key={i}
                className="absolute opacity-0 animate-fade-in-up"
                style={{
                  width: dimensions.cardSize,
                  height: dimensions.cardSize,
                  left: `calc(50% + ${x}px)`,
                  bottom: `${y}px`,
                  transform: `translate(-50%, 50%) rotate(${rotation / 2}deg)`,
                  animationDelay: `${i * 80}ms`,
                  animationFillMode: 'forwards',
                  // Overlap logic: images in the center appear "higher" or sequential overlap
                  zIndex: i,
                }}
              >
                <div 
                  className="rounded-2xl shadow-2xl overflow-hidden ring-4 ring-white transition-all duration-500 hover:scale-110 hover:z-[100] w-full h-full cursor-pointer bg-white group"
                >
                  <img 
                    src={src} 
                    alt={`VBS Memory ${i}`} 
                    className="block w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                    draggable={false} 
                  />
                  {/* Subtle glass overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Dynamic Children Content (Hero Text) positioned below arc */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-6 -mt-16 sm:-mt-24 md:-mt-32 lg:-mt-40">
        <div className="opacity-0 animate-fade-in w-full flex justify-center" style={{ animationDelay: '600ms', animationFillMode: 'forwards' }}>
          {children}
        </div>
      </div>

      <style>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translate(-50%, 80%) rotate(0deg); }
          to { opacity: 1; transform: translate(-50%, 50%) rotate(inherit); }
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up { animation: fade-in-up 1s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-fade-in { animation: fade-in 1s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      `}</style>
    </section>
  );
};
