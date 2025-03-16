
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import SwipeCard from '@/components/swipe/SwipeCard';
import FadeInView from '@/components/animations/FadeInView';
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sliders, MapPin } from 'lucide-react';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';

// Sample user data
const mockUsers = [
  {
    id: 1,
    name: 'Sophie',
    age: 26,
    location: 'Paris',
    distance: 5,
    photos: [
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=987&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=987&auto=format&fit=crop',
    ],
    bio: 'Passionnée de photographie et d\'art. J\'aime voyager et découvrir de nouveaux endroits. À la recherche de quelqu\'un pour partager des aventures.'
  },
  {
    id: 2,
    name: 'Thomas',
    age: 28,
    location: 'Lyon',
    distance: 8,
    photos: [
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=987&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1170&auto=format&fit=crop',
    ],
    bio: 'Amateur de musique et de concerts. J\'adore cuisiner et essayer de nouveaux restaurants. Je cherche quelqu\'un de spontané et d\'ouvert d\'esprit.'
  },
  {
    id: 3,
    name: 'Julie',
    age: 24,
    location: 'Marseille',
    distance: 12,
    photos: [
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=964&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1074&auto=format&fit=crop',
    ],
    bio: 'Sportive et aventureuse. J\'aime la randonnée, le yoga et les sports d\'eau. Je recherche quelqu\'un d\'actif qui aime passer du temps en plein air.'
  },
  {
    id: 4,
    name: 'Antoine',
    age: 30,
    location: 'Bordeaux',
    distance: 15,
    photos: [
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=987&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1492447166138-50c3889fccb1?q=80&w=987&auto=format&fit=crop',
    ],
    bio: 'Entrepreneur et voyageur. Passionné par les startups et la technologie. Je cherche quelqu\'un d\'ambitieux et de curieux pour des discussions stimulantes.'
  }
];

const Swipe = () => {
  const [users, setUsers] = useState(mockUsers);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [distance, setDistance] = useState([50]);
  const [remainingSwipes, setRemainingSwipes] = useState(10);
  const [showFilters, setShowFilters] = useState(false);
  
  const navigate = useNavigate();
  
  const handleSwipeLeft = () => {
    if (remainingSwipes > 0) {
      console.log('Swipe left on', users[currentIndex].name);
      setRemainingSwipes(prev => prev - 1);
      if (currentIndex < users.length - 1) {
        setTimeout(() => {
          setCurrentIndex(currentIndex + 1);
        }, 300);
      } else {
        toast.info("Plus de profils disponibles pour le moment!");
      }
    } else {
      toast.error("Limite de swipes quotidienne atteinte!");
    }
  };
  
  const handleSwipeRight = () => {
    if (remainingSwipes > 0) {
      console.log('Swipe right on', users[currentIndex].name);
      setRemainingSwipes(prev => prev - 1);
      
      // Simulate a match with 30% probability
      if (Math.random() > 0.7) {
        toast.success(`Match avec ${users[currentIndex].name}! 🎉`, {
          action: {
            label: "Envoyer un message",
            onClick: () => navigate('/matches')
          }
        });
      }
      
      if (currentIndex < users.length - 1) {
        setTimeout(() => {
          setCurrentIndex(currentIndex + 1);
        }, 300);
      } else {
        toast.info("Plus de profils disponibles pour le moment!");
      }
    } else {
      toast.error("Limite de swipes quotidienne atteinte!");
    }
  };
  
  const handleDistanceChange = (value: number[]) => {
    setDistance(value);
    // In a real app, you would filter users by distance here
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 pt-16 pb-20 px-4 md:px-6 relative">
        <div className="max-w-md mx-auto h-full flex flex-col">
          {/* Filter header */}
          <div className="flex items-center justify-between mb-4 mt-2">
            <div className="flex items-center">
              <Badge variant="outline" className="flex items-center gap-1 py-1.5">
                <MapPin className="h-3.5 w-3.5" />
                <span>{distance[0]} km</span>
              </Badge>
            </div>
            
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="py-1.5">
                {remainingSwipes} swipes restants
              </Badge>
              
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setShowFilters(!showFilters)}
                className={showFilters ? "bg-muted" : ""}
              >
                <Sliders className="h-5 w-5" />
              </Button>
            </div>
          </div>
          
          {/* Filters panel */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden mb-4"
              >
                <div className="bg-card p-4 rounded-xl shadow-sm border">
                  <h3 className="font-medium mb-3">Distance maximale</h3>
                  <Slider
                    value={distance}
                    min={1}
                    max={100}
                    step={1}
                    onValueChange={handleDistanceChange}
                    className="py-2"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground mt-1">
                    <span>1 km</span>
                    <span>{distance[0]} km</span>
                    <span>100 km</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Swipe cards */}
          <div className="flex-1 flex items-center justify-center relative">
            <div className="w-full aspect-[3/4] relative">
              {users.map((user, index) => {
                if (index < currentIndex || index > currentIndex + 2) return null;
                
                return (
                  <FadeInView key={user.id} className="absolute inset-0">
                    <SwipeCard
                      name={user.name}
                      age={user.age}
                      location={user.location}
                      distance={user.distance}
                      photos={user.photos}
                      bio={user.bio}
                      onSwipeLeft={handleSwipeLeft}
                      onSwipeRight={handleSwipeRight}
                    />
                  </FadeInView>
                );
              })}
              
              {/* Empty state */}
              {(currentIndex >= users.length || users.length === 0) && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-card rounded-xl border p-8 text-center">
                  <div className="mb-4 p-4 bg-muted rounded-full">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 5.5C12 5.5 11.7614 4 10 4C8.23858 4 7 5.23858 7 7C7 10 12 11 12 11C12 11 17 10 17 7C17 5.23858 15.7614 4 14 4C12.2386 4 12 5.5 12 5.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M4.59267 21C3.16226 18.7506 2.38898 16.1631 2.36251 13.5019C2.33604 10.8407 3.05848 8.23893 4.44345 5.95995" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M19.4073 21C20.8377 18.7506 21.611 16.1631 21.6375 13.5019C21.664 10.8407 20.9415 8.23893 19.5566 5.95995" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium mb-2">Plus de profils disponibles</h3>
                  <p className="text-muted-foreground mb-4">
                    Ajustez vos filtres ou revenez plus tard pour découvrir de nouveaux profils.
                  </p>
                  <Button onClick={() => navigate('/profile')}>
                    Voir mon profil
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Swipe;
