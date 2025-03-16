
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import FadeInView from '@/components/animations/FadeInView';
import GlassmorphicCard from '@/components/ui/GlassmorphicCard';
import { motion } from 'framer-motion';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-background pointer-events-none" />
      
      {/* Animated background shapes */}
      <motion.div 
        className="absolute top-20 right-10 w-64 h-64 rounded-full bg-primary/5 blur-3xl"
        animate={{ 
          x: [0, 30, 0],
          y: [0, 40, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      
      <motion.div 
        className="absolute bottom-20 left-10 w-80 h-80 rounded-full bg-accent/10 blur-3xl"
        animate={{ 
          x: [0, -20, 0],
          y: [0, 30, 0],
          scale: [1, 1.2, 1]
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      
      <div className="flex-1 flex flex-col items-center justify-center p-6 relative z-10">
        <div className="text-center mb-8">
          <FadeInView delay={100} className="mb-3">
            <h1 className="text-5xl font-bold tracking-tight mb-2">
              <span className="text-primary">Rencontr</span>
            </h1>
          </FadeInView>
          
          <FadeInView delay={300}>
            <p className="text-xl text-muted-foreground max-w-md mx-auto">
              Découvrez des personnes qui partagent vos intérêts et créez des connexions authentiques.
            </p>
          </FadeInView>
        </div>
        
        <div className="max-w-sm w-full">
          <FadeInView delay={500}>
            <GlassmorphicCard className="p-6 space-y-6" hover>
              <motion.div 
                className="w-full aspect-square relative overflow-hidden rounded-xl shadow-lg"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <img 
                  src="https://images.unsplash.com/photo-1533227268428-f9ed0900fb3b?q=80&w=1171&auto=format&fit=crop" 
                  alt="Couple heureux" 
                  className="w-full h-full object-cover" 
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                  <div className="p-6 text-white">
                    <h3 className="text-xl font-semibold mb-1">Trouvez votre match</h3>
                    <p className="text-sm opacity-90">Des rencontres basées sur de vraies connexions</p>
                  </div>
                </div>
              </motion.div>
              
              <div className="space-y-3">
                <Button 
                  onClick={() => navigate('/auth')}
                  className="w-full text-md font-medium"
                  size="lg"
                >
                  Commencer
                </Button>
                
                <Button 
                  variant="outline" 
                  onClick={() => navigate('/swipe')} 
                  className="w-full text-md"
                  size="lg"
                >
                  Explorer
                </Button>
              </div>
            </GlassmorphicCard>
          </FadeInView>
        </div>
      </div>
      
      <footer className="py-4 px-6 text-center text-sm text-muted-foreground">
        <p>© 2024 Rencontr. Tous droits réservés.</p>
      </footer>
    </div>
  );
};

export default Index;
