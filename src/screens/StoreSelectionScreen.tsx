
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { useToast } from '@/hooks/use-toast';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from '@/lib/utils';

interface Store {
  id: string;
  name: string;
  location: string;
}

const StoreSelectionScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [stores, setStores] = useState<Store[]>([]);
  const [selectedStore, setSelectedStore] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Simulate API call to get stores from Treez
    const fetchStores = async () => {
      setTimeout(() => {
        // Mock data - would be replaced with actual API call
        const mockStores = [
          { id: "1", name: "Green Valley Dispensary", location: "San Francisco, CA" },
          { id: "2", name: "Herbal Wellness Center", location: "Los Angeles, CA" },
          { id: "3", name: "Coastal Cannabis", location: "San Diego, CA" },
          { id: "4", name: "Mountain High", location: "Denver, CO" }
        ];
        setStores(mockStores);
        setIsLoading(false);
      }, 1000);
    };

    fetchStores();
  }, []);

  const handleContinue = () => {
    if (!selectedStore) {
      toast({
        title: "Selection Required",
        description: "Please select a store to continue",
        variant: "destructive",
      });
      return;
    }

    // Save selected store (would use proper state management in a real app)
    localStorage.setItem('selectedStore', selectedStore);
    navigate('/id-scanner');
  };

  const handleLogout = () => {
    navigate('/login');
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out",
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-xl text-center">Select Your Store</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {isLoading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#295c07]"></div>
            </div>
          ) : (
            <>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between"
                  >
                    {selectedStore
                      ? stores.find((store) => store.id === selectedStore)?.name
                      : "Select store..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
                  <Command>
                    <CommandInput placeholder="Search store..." />
                    <CommandEmpty>No stores found.</CommandEmpty>
                    <CommandGroup>
                      {stores.map((store) => (
                        <CommandItem
                          key={store.id}
                          value={store.id}
                          onSelect={(currentValue) => {
                            setSelectedStore(currentValue === selectedStore ? null : currentValue);
                            setOpen(false);
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              selectedStore === store.id ? "opacity-100" : "opacity-0"
                            )}
                          />
                          <div className="flex flex-col">
                            <span>{store.name}</span>
                            <span className="text-sm text-muted-foreground">{store.location}</span>
                          </div>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>

              <Button 
                onClick={handleContinue} 
                className="w-full bg-[#295c07] hover:bg-[#265b07] mt-4"
              >
                Continue
              </Button>
              
              <div className="pt-4 text-center">
                <button
                  onClick={handleLogout}
                  className="text-sm text-[#295c07] hover:underline"
                >
                  Sign out
                </button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default StoreSelectionScreen;
