
import React, { ReactNode } from 'react';
import { cn } from "@/lib/utils";

interface GlassmorphicCardProps {
  children: ReactNode;
  className?: string;
  intensity?: 'light' | 'medium' | 'heavy';
  hover?: boolean;
  onClick?: () => void;
}

const GlassmorphicCard: React.FC<GlassmorphicCardProps> = ({
  children,
  className,
  intensity = 'medium',
  hover = false,
  onClick
}) => {
  const getIntensityStyles = () => {
    switch (intensity) {
      case 'light':
        return 'bg-white/40 dark:bg-black/30 backdrop-blur-sm border border-white/30 dark:border-white/5';
      case 'medium':
        return 'bg-white/60 dark:bg-black/50 backdrop-blur-md border border-white/40 dark:border-white/10';
      case 'heavy':
        return 'bg-white/80 dark:bg-black/70 backdrop-blur-lg border border-white/50 dark:border-white/20';
      default:
        return 'bg-white/60 dark:bg-black/50 backdrop-blur-md border border-white/40 dark:border-white/10';
    }
  };

  return (
    <div
      className={cn(
        'rounded-2xl shadow-sm transition-all duration-300',
        getIntensityStyles(),
        hover && 'hover:shadow-lg hover:scale-[1.02] hover:-translate-y-1',
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default GlassmorphicCard;
