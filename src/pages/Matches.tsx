
import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Search, Send } from 'lucide-react';
import FadeInView from '@/components/animations/FadeInView';
import GlassmorphicCard from '@/components/ui/GlassmorphicCard';

// Mock data
const mockMatches = [
  {
    id: 1,
    name: 'Sophie',
    lastMessage: 'Ça me va ! À demain alors 😊',
    timestamp: '12:30',
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=987&auto=format&fit=crop',
    online: true,
    unread: 1
  },
  {
    id: 2,
    name: 'Thomas',
    lastMessage: 'Tu connais ce restaurant ?',
    timestamp: 'Hier',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=987&auto=format&fit=crop',
    online: false,
    unread: 0
  },
  {
    id: 3,
    name: 'Julie',
    lastMessage: 'J\'adore cette photo !',
    timestamp: 'Hier',
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=964&auto=format&fit=crop',
    online: true,
    unread: 0
  }
];

const mockNewMatches = [
  {
    id: 4,
    name: 'Antoine',
    matchTime: 'il y a 2h',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=987&auto=format&fit=crop',
  },
  {
    id: 5,
    name: 'Léa',
    matchTime: 'il y a 12h',
    photo: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=1964&auto=format&fit=crop',
  }
];

// Mock conversation
const mockConversation = [
  {
    id: 1,
    senderId: 'other',
    text: 'Salut ! Comment ça va ?',
    timestamp: '10:05'
  },
  {
    id: 2,
    senderId: 'me',
    text: 'Bonjour ! Ça va bien et toi ?',
    timestamp: '10:10'
  },
  {
    id: 3,
    senderId: 'other',
    text: 'Très bien merci ! J\'ai vu que tu aimais la photographie. Tu as des endroits préférés pour prendre des photos ?',
    timestamp: '10:12'
  },
  {
    id: 4,
    senderId: 'me',
    text: 'J\'adore aller dans les parcs et aussi près de la Seine pour les couchers de soleil. Et toi, qu\'est-ce que tu aimes faire pendant ton temps libre ?',
    timestamp: '10:20'
  },
  {
    id: 5,
    senderId: 'other',
    text: 'J\'aime beaucoup cuisiner et découvrir de nouveaux restaurants. D\'ailleurs, je connais un endroit sympa qui vient d\'ouvrir près de Montmartre, ça te dirait d\'y aller un de ces jours ?',
    timestamp: '10:25'
  }
];

const Matches = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedConversation, setSelectedConversation] = useState<number | null>(null);
  const [newMessage, setNewMessage] = useState('');
  
  const filteredMatches = mockMatches.filter(
    match => match.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleConversationSelect = (id: number) => {
    setSelectedConversation(id);
  };
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      console.log('Sending message:', newMessage);
      setNewMessage('');
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 pt-16 pb-20 px-4 md:px-6">
        <div className="max-w-xl mx-auto h-full">
          {selectedConversation === null ? (
            <FadeInView>
              <Tabs defaultValue="conversations" className="mt-3">
                <TabsList className="w-full grid grid-cols-2 mb-4">
                  <TabsTrigger value="conversations">Messages</TabsTrigger>
                  <TabsTrigger value="new-matches">Nouveaux Matchs</TabsTrigger>
                </TabsList>
                
                <TabsContent value="conversations" className="space-y-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Rechercher une conversation..."
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                      className="pl-9"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    {filteredMatches.length > 0 ? (
                      filteredMatches.map(match => (
                        <div
                          key={match.id}
                          onClick={() => handleConversationSelect(match.id)}
                          className="p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                        >
                          <div className="flex items-center">
                            <div className="relative">
                              <Avatar className="h-12 w-12">
                                <AvatarImage src={match.photo} alt={match.name} />
                                <AvatarFallback>{match.name.substring(0, 2)}</AvatarFallback>
                              </Avatar>
                              {match.online && (
                                <span className="absolute bottom-0 right-0 w-3 h-3 bg-success rounded-full border-2 border-background"></span>
                              )}
                            </div>
                            
                            <div className="ml-3 flex-1">
                              <div className="flex items-center justify-between">
                                <h3 className="font-medium">{match.name}</h3>
                                <span className="text-xs text-muted-foreground">{match.timestamp}</span>
                              </div>
                              
                              <div className="flex items-center justify-between mt-1">
                                <p className="text-sm text-muted-foreground truncate max-w-[180px]">
                                  {match.lastMessage}
                                </p>
                                {match.unread > 0 && (
                                  <Badge variant="default" className="rounded-full h-5 w-5 p-0 flex items-center justify-center">
                                    {match.unread}
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-muted-foreground">Aucune conversation trouvée</p>
                      </div>
                    )}
                  </div>
                </TabsContent>
                
                <TabsContent value="new-matches" className="space-y-4">
                  <p className="text-sm text-muted-foreground mb-4">
                    Nouveaux matchs ({mockNewMatches.length}). Démarrez une conversation !
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4">
                    {mockNewMatches.map(match => (
                      <GlassmorphicCard 
                        key={match.id}
                        className="p-4 text-center cursor-pointer hover:scale-[1.03] transition-transform"
                        intensity="light"
                        onClick={() => handleConversationSelect(match.id)}
                      >
                        <Avatar className="h-20 w-20 mx-auto mb-3">
                          <AvatarImage src={match.photo} alt={match.name} />
                          <AvatarFallback>{match.name.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        
                        <h3 className="font-medium truncate">{match.name}</h3>
                        <p className="text-xs text-muted-foreground mt-1">Match {match.matchTime}</p>
                      </GlassmorphicCard>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </FadeInView>
          ) : (
            <FadeInView className="h-full flex flex-col">
              <div className="flex items-center p-4 border-b">
                <button 
                  onClick={() => setSelectedConversation(null)}
                  className="mr-3 text-muted-foreground hover:text-foreground"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                
                <Avatar className="h-10 w-10">
                  <AvatarImage 
                    src={mockMatches.find(m => m.id === selectedConversation)?.photo || mockNewMatches.find(m => m.id === selectedConversation)?.photo} 
                    alt="Contact" 
                  />
                  <AvatarFallback>
                    {(mockMatches.find(m => m.id === selectedConversation)?.name || mockNewMatches.find(m => m.id === selectedConversation)?.name || 'UN').substring(0, 2)}
                  </AvatarFallback>
                </Avatar>
                
                <div className="ml-3">
                  <h3 className="font-medium">
                    {mockMatches.find(m => m.id === selectedConversation)?.name || 
                     mockNewMatches.find(m => m.id === selectedConversation)?.name || 
                     'Conversation'}
                  </h3>
                  <p className="text-xs text-success">En ligne</p>
                </div>
              </div>
              
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {mockConversation.map(message => (
                  <div 
                    key={message.id} 
                    className={`flex ${message.senderId === 'me' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div 
                      className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                        message.senderId === 'me' 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-muted'
                      }`}
                    >
                      <p>{message.text}</p>
                      <p className={`text-xs mt-1 ${
                        message.senderId === 'me' 
                          ? 'text-primary-foreground/70' 
                          : 'text-muted-foreground'
                      }`}>
                        {message.timestamp}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              
              <form onSubmit={handleSendMessage} className="p-4 border-t">
                <div className="flex items-center gap-2">
                  <Input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Écrire un message..."
                    className="flex-1"
                  />
                  <button 
                    type="submit" 
                    className="bg-primary text-primary-foreground rounded-full p-2.5 flex items-center justify-center hover:bg-primary/90 transition-colors"
                    disabled={!newMessage.trim()}
                  >
                    <Send className="h-5 w-5" />
                  </button>
                </div>
              </form>
            </FadeInView>
          )}
        </div>
      </main>
    </div>
  );
};

export default Matches;
