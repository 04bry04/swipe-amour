
import React from 'react';
import { cn } from '@/lib/utils';
import { MapPin, Calendar, ChevronRight, Camera, Image } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ProfileCardProps {
  name: string;
  age: number;
  location: string;
  distance: number;
  photos: string[];
  bio?: string;
  className?: string;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  minimal?: boolean;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  name,
  age,
  location,
  distance,
  photos,
  bio,
  className,
  onSwipeLeft,
  onSwipeRight,
  minimal = false
}) => {
  const [currentPhotoIndex, setCurrentPhotoIndex] = React.useState(0);
  
  const nextPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev + 1) % photos.length);
  };
  
  const prevPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  if (minimal) {
    return (
      <div className={cn("rounded-xl overflow-hidden shadow-sm transition-all duration-300 hover:shadow-md", className)}>
        <div className="relative aspect-[3/4] overflow-hidden">
          {photos.length > 0 ? (
            <img
              src={photos[0]}
              alt={`Photo de ${name}`}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-muted flex items-center justify-center">
              <Camera className="h-10 w-10 text-muted-foreground" />
            </div>
          )}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
            <div className="text-white">
              <h3 className="font-medium">{name}, {age}</h3>
              <div className="flex items-center text-xs">
                <MapPin className="h-3 w-3 mr-1" />
                <span>{distance} km</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("rounded-xl overflow-hidden shadow-md bg-card relative", className)}>
      <div className="relative aspect-[4/5] overflow-hidden">
        {photos.length > 0 ? (
          <img
            src={photos[currentPhotoIndex]}
            alt={`Photo de ${name}`}
            className="w-full h-full object-cover transition-opacity duration-300"
          />
        ) : (
          <div className="w-full h-full bg-muted flex items-center justify-center">
            <Image className="h-16 w-16 text-muted-foreground" />
          </div>
        )}
        
        {/* Photo navigation dots */}
        <div className="absolute top-4 left-0 right-0 flex justify-center gap-1">
          {photos.map((_, index) => (
            <div 
              key={index} 
              className={cn(
                "h-1 rounded-full transition-all", 
                index === currentPhotoIndex 
                  ? "w-6 bg-white" 
                  : "w-1.5 bg-white/50"
              )}
            />
          ))}
        </div>
        
        {/* Left/right arrows */}
        {photos.length > 1 && (
          <>
            <button 
              className="absolute left-3 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-black/20 backdrop-blur-sm text-white flex items-center justify-center transform rotate-180 hover:bg-black/30 transition-all"
              onClick={(e) => {
                e.stopPropagation();
                prevPhoto();
              }}
            >
              <ChevronRight className="h-6 w-6" />
            </button>
            <button 
              className="absolute right-3 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-black/20 backdrop-blur-sm text-white flex items-center justify-center hover:bg-black/30 transition-all"
              onClick={(e) => {
                e.stopPropagation();
                nextPhoto();
              }}
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </>
        )}
        
        {/* Gradient overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
        <div className="flex items-end justify-between mb-3">
          <div>
            <h3 className="text-2xl font-semibold">{name}, {age}</h3>
            <div className="flex items-center mt-1 text-white/90">
              <MapPin className="h-4 w-4 mr-1" />
              <span>{location} • {distance} km</span>
            </div>
          </div>
        </div>
        
        {bio && (
          <p className="text-sm text-white/80 line-clamp-3">{bio}</p>
        )}
      </div>
      
      {/* Swipe buttons */}
      {(onSwipeLeft || onSwipeRight) && (
        <div className="absolute bottom-6 right-6 flex gap-3">
          {onSwipeLeft && (
            <Button 
              variant="destructive" 
              size="icon" 
              className="h-14 w-14 rounded-full shadow-lg"
              onClick={onSwipeLeft}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Button>
          )}
          
          {onSwipeRight && (
            <Button 
              variant="default" 
              size="icon" 
              className="h-14 w-14 rounded-full shadow-lg bg-success hover:bg-success/90"
              onClick={onSwipeRight}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 5.5C12 5.5 11.7614 4 10 4C8.23858 4 7 5.23858 7 7C7 10 12 11 12 11C12 11 17 10 17 7C17 5.23858 15.7614 4 14 4C12.2386 4 12 5.5 12 5.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M4.59267 21C3.16226 18.7506 2.38898 16.1631 2.36251 13.5019C2.33604 10.8407 3.05848 8.23893 4.44345 5.95995" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M19.4073 21C20.8377 18.7506 21.611 16.1631 21.6375 13.5019C21.664 10.8407 20.9415 8.23893 19.5566 5.95995" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default ProfileCard;
