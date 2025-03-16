
import React, { ReactNode } from 'react';
import { cn } from "@/lib/utils";

interface FadeInViewProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
}

export const FadeInView: React.FC<FadeInViewProps> = ({
  children,
  delay = 0,
  duration = 500,
  className,
  direction = 'up'
}) => {
  const getTransform = () => {
    switch (direction) {
      case 'up': return 'translateY(20px)';
      case 'down': return 'translateY(-20px)';
      case 'left': return 'translateX(20px)';
      case 'right': return 'translateX(-20px)';
      case 'none': return 'none';
      default: return 'translateY(20px)';
    }
  };

  return (
    <div
      className={cn('opacity-0', className)}
      style={{
        animation: `fadeIn ${duration}ms ease-out ${delay}ms forwards`,
        willChange: 'opacity, transform'
      }}
    >
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: ${getTransform()};
          }
          to {
            opacity: 1;
            transform: translateY(0) translateX(0);
          }
        }
      `}</style>
      {children}
    </div>
  );
};

export default FadeInView;
