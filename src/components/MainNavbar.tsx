
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ChevronLeft, Home, Menu, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

interface MainNavbarProps {
  title?: string;
  showBackButton?: boolean;
  showHomeButton?: boolean;
}

const MainNavbar = ({ 
  title = "Treez", 
  showBackButton = false, 
  showHomeButton = true 
}: MainNavbarProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const goBack = () => {
    navigate(-1);
  };
  
  const goHome = () => {
    navigate('/store-selection');
  };

  // Don't show navbar on login screen
  if (location.pathname === '/login') {
    return null;
  }

  return (
    <header className="sticky top-0 z-10 bg-white border-b border-gray-200">
      <div className="flex items-center justify-between h-16 px-4">
        <div className="flex items-center gap-2">
          {showBackButton && (
            <Button variant="ghost" size="icon" onClick={goBack} className="mr-2">
              <ChevronLeft className="h-5 w-5" />
            </Button>
          )}
          <h1 className="text-xl font-semibold text-[#295c07]">{title}</h1>
        </div>
        
        <div className="flex items-center gap-2">
          {showHomeButton && (
            <Button variant="ghost" size="icon" onClick={goHome}>
              <Home className="h-5 w-5" />
            </Button>
          )}
          
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <div className="grid gap-4 py-4">
                <Button 
                  variant="ghost" 
                  className="w-full justify-start"
                  onClick={() => navigate('/store-selection')}
                >
                  <Home className="mr-2 h-5 w-5" /> Home
                </Button>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start"
                  onClick={() => navigate('/customer-search')}
                >
                  <User className="mr-2 h-5 w-5" /> Customer Search
                </Button>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start"
                  onClick={() => navigate('/login')}
                >
                  Log Out
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default MainNavbar;
