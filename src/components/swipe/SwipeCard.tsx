
import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useTransform, PanInfo } from 'framer-motion';
import ProfileCard from '../profile/ProfileCard';

interface SwipeCardProps {
  name: string;
  age: number;
  location: string;
  distance: number;
  photos: string[];
  bio?: string;
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
}

const SwipeCard: React.FC<SwipeCardProps> = ({
  name,
  age,
  location,
  distance,
  photos,
  bio,
  onSwipeLeft,
  onSwipeRight
}) => {
  const [exitX, setExitX] = useState<number>(0);
  const [hasExited, setHasExited] = useState<boolean>(false);
  
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 0, 200], [-20, 0, 20]);
  
  const opacity = useTransform(
    x,
    [-200, -100, 0, 100, 200],
    [0, 1, 1, 1, 0]
  );
  
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Card background indicators
  const likeOpacity = useTransform(
    x,
    [0, 100],
    [0, 1]
  );
  
  const nopeOpacity = useTransform(
    x,
    [-100, 0],
    [1, 0]
  );
  
  const handleDragEnd = (e: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.x > 100) {
      setExitX(200);
      setHasExited(true);
      onSwipeRight();
    } else if (info.offset.x < -100) {
      setExitX(-200);
      setHasExited(true);
      onSwipeLeft();
    }
  };
  
  const handleManualSwipe = (direction: 'left' | 'right') => {
    setExitX(direction === 'left' ? -200 : 200);
    setHasExited(true);
    direction === 'left' ? onSwipeLeft() : onSwipeRight();
  };

  return (
    <motion.div
      ref={cardRef}
      style={{
        x,
        rotate,
        opacity,
        position: 'absolute',
        width: '100%',
        height: '100%',
      }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      animate={hasExited ? { x: exitX } : {}}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="touch-none"
    >
      {/* Like indicator */}
      <motion.div
        style={{ opacity: likeOpacity }}
        className="absolute top-8 right-8 z-10 rotate-12 border-4 border-success rounded-lg px-2 py-1"
      >
        <p className="text-success font-bold text-2xl">J'AIME</p>
      </motion.div>
      
      {/* Nope indicator */}
      <motion.div
        style={{ opacity: nopeOpacity }}
        className="absolute top-8 left-8 z-10 -rotate-12 border-4 border-destructive rounded-lg px-2 py-1"
      >
        <p className="text-destructive font-bold text-2xl">PASSE</p>
      </motion.div>
      
      {/* Card content */}
      <ProfileCard
        name={name}
        age={age}
        location={location}
        distance={distance}
        photos={photos}
        bio={bio}
        onSwipeLeft={() => handleManualSwipe('left')}
        onSwipeRight={() => handleManualSwipe('right')}
        className="w-full h-full"
      />
    </motion.div>
  );
};

export default SwipeCard;
