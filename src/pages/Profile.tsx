
import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Camera, 
  ChevronRight, 
  Settings, 
  User, 
  LogOut,
  MapPin,
  Shield,
  Heart,
  HelpCircle,
  Image as ImageIcon,
  Plus
} from 'lucide-react';
import FadeInView from '@/components/animations/FadeInView';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from 'sonner';

const Profile = () => {
  const [editingBio, setEditingBio] = useState(false);
  const [bio, setBio] = useState('Passionné de voyage et d\'aventures. J\'aime les sorties en plein air, la bonne cuisine et les conversations intéressantes.');
  const [distance, setDistance] = useState([30]);
  
  const handleSaveBio = () => {
    setEditingBio(false);
    toast.success('Bio mise à jour avec succès');
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 pt-16 pb-20 px-4 md:px-6">
        <div className="max-w-lg mx-auto">
          <FadeInView className="mt-4 mb-6 text-center">
            <Avatar className="h-28 w-28 mx-auto mb-4 border-2 border-primary">
              <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=964&auto=format&fit=crop" alt="Photo de profil" />
              <AvatarFallback>JP</AvatarFallback>
            </Avatar>
            
            <h1 className="text-2xl font-semibold">Julie Petit, 24</h1>
            <div className="flex items-center justify-center text-muted-foreground mt-1">
              <MapPin className="h-4 w-4 mr-1" />
              <span>Paris, France</span>
            </div>
          </FadeInView>
          
          <div className="grid grid-cols-3 gap-4 mb-8">
            <Button variant="outline" className="flex flex-col gap-1.5 h-20">
              <Heart className="h-5 w-5 text-primary" />
              <span className="text-xs">26 Likes</span>
            </Button>
            
            <Button variant="outline" className="flex flex-col gap-1.5 h-20">
              <User className="h-5 w-5 text-primary" />
              <span className="text-xs">12 Matchs</span>
            </Button>
            
            <Button variant="outline" className="flex flex-col gap-1.5 h-20">
              <ImageIcon className="h-5 w-5 text-primary" />
              <span className="text-xs">Photos</span>
            </Button>
          </div>
          
          <div className="space-y-6">
            <div className="bg-card rounded-xl p-5 shadow-sm border">
              <h2 className="text-lg font-medium mb-3">Photos</h2>
              <div className="grid grid-cols-3 gap-2">
                <div className="aspect-square rounded-lg overflow-hidden bg-muted">
                  <img 
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=964&auto=format&fit=crop" 
                    alt="Photo 1" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="aspect-square rounded-lg overflow-hidden bg-muted">
                  <img 
                    src="https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1074&auto=format&fit=crop" 
                    alt="Photo 2" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="aspect-square rounded-lg overflow-hidden bg-muted flex items-center justify-center cursor-pointer hover:bg-muted/80 transition-colors">
                  <Plus className="h-8 w-8 text-muted-foreground" />
                </div>
              </div>
            </div>
            
            <div className="bg-card rounded-xl p-5 shadow-sm border">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-medium">À propos de moi</h2>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setEditingBio(!editingBio)}
                >
                  {editingBio ? 'Annuler' : 'Modifier'}
                </Button>
              </div>
              
              {editingBio ? (
                <div className="space-y-3">
                  <Textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="Parlez de vous en quelques mots..."
                    className="min-h-[100px]"
                    maxLength={500}
                  />
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">
                      {bio.length}/500 caractères
                    </span>
                    <Button size="sm" onClick={handleSaveBio}>
                      Enregistrer
                    </Button>
                  </div>
                </div>
              ) : (
                <p className="text-muted-foreground">{bio}</p>
              )}
            </div>
            
            <div className="bg-card rounded-xl p-5 shadow-sm border">
              <h2 className="text-lg font-medium mb-4">Préférences</h2>
              
              <div className="space-y-5">
                <div className="space-y-3">
                  <h3 className="font-medium">Distance maximale</h3>
                  <Slider
                    value={distance}
                    min={1}
                    max={100}
                    step={1}
                    onValueChange={setDistance}
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>1 km</span>
                    <span>{distance[0]} km</span>
                    <span>100 km</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="show-profile" className="font-medium">Montrer mon profil</Label>
                    <Switch id="show-profile" defaultChecked />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Lorsque cette option est désactivée, votre profil ne sera pas visible pour les autres utilisateurs.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="notifications" className="font-medium">Notifications</Label>
                    <Switch id="notifications" defaultChecked />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Recevez des notifications pour les nouveaux matchs et messages.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <Button 
                variant="outline" 
                className="w-full justify-between py-6"
                onClick={() => toast.info('Paramètres ouverts')}
              >
                <div className="flex items-center">
                  <Settings className="h-5 w-5 mr-2" />
                  <span>Paramètres</span>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full justify-between py-6"
                onClick={() => toast.info('Confidentialité ouverte')}
              >
                <div className="flex items-center">
                  <Shield className="h-5 w-5 mr-2" />
                  <span>Confidentialité</span>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full justify-between py-6"
                onClick={() => toast.info('Aide ouverte')}
              >
                <div className="flex items-center">
                  <HelpCircle className="h-5 w-5 mr-2" />
                  <span>Aide et support</span>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full justify-between py-6 text-destructive hover:text-destructive"
                onClick={() => toast.info('Déconnexion')}
              >
                <div className="flex items-center">
                  <LogOut className="h-5 w-5 mr-2" />
                  <span>Déconnexion</span>
                </div>
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
