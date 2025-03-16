
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import AuthForm from '@/components/auth/AuthForm';
import FadeInView from '@/components/animations/FadeInView';

const Auth = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-background pointer-events-none" />
      
      {/* Back button */}
      <div className="p-4">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => navigate('/')}
          className="h-10 w-10"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
      </div>
      
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <FadeInView className="w-full max-w-md">
          <AuthForm />
        </FadeInView>
      </div>
    </div>
  );
};

export default Auth;
