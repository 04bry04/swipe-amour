
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mail, Lock, ArrowRight, AlertCircle } from 'lucide-react';
import GlassmorphicCard from '../ui/GlassmorphicCard';
import FadeInView from '../animations/FadeInView';
import { useNavigate } from 'react-router-dom';
import { toast } from "sonner";
import { Alert, AlertDescription } from "@/components/ui/alert";

const AuthForm: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const validateInputs = () => {
    if (!email || !email.includes('@')) {
      setError('Veuillez entrer un email valide');
      return false;
    }
    if (!password || password.length < 6) {
      setError('Le mot de passe doit contenir au moins 6 caractères');
      return false;
    }
    setError(null);
    return true;
  };

  const handleAuth = async (action: 'login' | 'register') => {
    console.log(`${action} with:`, { email, password });
    
    if (!validateInputs()) return;
    
    setIsLoading(true);
    
    try {
      // Simulation d'authentification (à remplacer par une vraie API)
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulation réussie
      toast.success(action === 'login' 
        ? 'Connexion réussie !' 
        : 'Compte créé avec succès !');
      
      // Redirection vers la page de swipe
      setTimeout(() => {
        navigate('/swipe');
      }, 500);
    } catch (error) {
      console.error('Erreur d\'authentification:', error);
      setError(action === 'login'
        ? 'Impossible de se connecter. Vérifiez vos identifiants.'
        : 'Impossible de créer un compte. Veuillez réessayer.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FadeInView className="w-full max-w-md mx-auto">
      <GlassmorphicCard className="px-6 py-8">
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="login">Connexion</TabsTrigger>
            <TabsTrigger value="register">Inscription</TabsTrigger>
          </TabsList>
          
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          <TabsContent value="login" className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold tracking-tight">Bienvenue</h2>
              <p className="text-sm text-muted-foreground">
                Connectez-vous pour retrouver vos matchs et conversations
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <Input
                  type="email"
                  placeholder="Email"
                  className="pl-10"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <Input
                  type="password"
                  placeholder="Mot de passe"
                  className="pl-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              
              <Button 
                className="w-full group" 
                size="lg"
                disabled={isLoading}
                onClick={() => handleAuth('login')}
              >
                {isLoading ? (
                  <span className="flex items-center">Connexion en cours...</span>
                ) : (
                  <span className="flex items-center">
                    Connexion
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                )}
              </Button>
              
              <div className="relative flex items-center py-2">
                <div className="flex-grow border-t border-border"></div>
                <span className="flex-shrink mx-3 text-xs text-muted-foreground">OU</span>
                <div className="flex-grow border-t border-border"></div>
              </div>
              
              <Button variant="outline" className="w-full" disabled={isLoading}>
                <svg className="mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                  <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z" />
                  <path fill="#FF3D00" d="m6.306 14.691 6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z" />
                  <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z" />
                  <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z" />
                </svg>
                Continuer avec Google
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="register" className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold tracking-tight">Créer un compte</h2>
              <p className="text-sm text-muted-foreground">
                Inscrivez-vous pour commencer à rencontrer des personnes
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <Input
                  type="email"
                  placeholder="Email"
                  className="pl-10"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <Input
                  type="password"
                  placeholder="Mot de passe"
                  className="pl-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              
              <Button 
                className="w-full group" 
                size="lg"
                disabled={isLoading}
                onClick={() => handleAuth('register')}
              >
                {isLoading ? (
                  <span className="flex items-center">Inscription en cours...</span>
                ) : (
                  <span className="flex items-center">
                    S'inscrire
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                )}
              </Button>
              
              <div className="relative flex items-center py-2">
                <div className="flex-grow border-t border-border"></div>
                <span className="flex-shrink mx-3 text-xs text-muted-foreground">OU</span>
                <div className="flex-grow border-t border-border"></div>
              </div>
              
              <Button variant="outline" className="w-full" disabled={isLoading}>
                <svg className="mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                  <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z" />
                  <path fill="#FF3D00" d="m6.306 14.691 6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z" />
                  <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z" />
                  <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z" />
                </svg>
                Continuer avec Google
              </Button>
              
              <p className="text-xs text-center text-muted-foreground mt-4">
                En vous inscrivant, vous acceptez nos
                <a href="#" className="text-primary hover:underline ml-1">
                  conditions d'utilisation
                </a>
                <span className="mx-1">et</span>
                <a href="#" className="text-primary hover:underline">
                  politique de confidentialité
                </a>
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </GlassmorphicCard>
    </FadeInView>
  );
};

export default AuthForm;
