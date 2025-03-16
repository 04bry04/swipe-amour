
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Heart, User, MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';

const Header: React.FC = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 animate-fade-in">
      <div className="container h-full flex items-center justify-between px-4">
        <Link to="/" className="flex items-center">
          <span className="text-xl font-semibold text-primary">Rencontr</span>
        </Link>
        
        <nav className="fixed bottom-0 left-0 right-0 h-16 bg-white/80 dark:bg-black/80 backdrop-blur-md border-t border-border z-50">
          <div className="container h-full mx-auto">
            <ul className="flex items-center justify-around h-full">
              <li>
                <Link 
                  to="/swipe" 
                  className={cn(
                    "flex flex-col items-center justify-center transition-all",
                    isActive('/swipe') ? 'text-primary scale-110' : 'text-muted-foreground'
                  )}
                >
                  <Heart className={cn(
                    "w-6 h-6 mb-1",
                    isActive('/swipe') && "fill-primary"
                  )} />
                  <span className="text-xs font-medium">Explorer</span>
                </Link>
              </li>
              <li>
                <Link 
                  to="/matches" 
                  className={cn(
                    "flex flex-col items-center justify-center transition-all",
                    isActive('/matches') ? 'text-primary scale-110' : 'text-muted-foreground'
                  )}
                >
                  <MessageSquare className={cn(
                    "w-6 h-6 mb-1",
                    isActive('/matches') && "fill-primary"
                  )} />
                  <span className="text-xs font-medium">Messages</span>
                </Link>
              </li>
              <li>
                <Link 
                  to="/profile" 
                  className={cn(
                    "flex flex-col items-center justify-center transition-all",
                    isActive('/profile') ? 'text-primary scale-110' : 'text-muted-foreground'
                  )}
                >
                  <User className={cn(
                    "w-6 h-6 mb-1",
                    isActive('/profile') && "fill-primary"
                  )} />
                  <span className="text-xs font-medium">Profil</span>
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
