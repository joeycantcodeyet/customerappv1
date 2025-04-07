
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
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

  return (
    <div className="flex flex-col p-4 max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-6">Select Your Store</h2>
      
      {isLoading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#295c07]"></div>
        </div>
      ) : (
        <>
          <div className="space-y-4">
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
              Continue to Customer Check-In
            </Button>
          </div>
          
          <div className="mt-8 space-y-4">
            <h3 className="text-lg font-medium">Recent Activity</h3>
            <div className="space-y-2">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="p-3 hover:bg-muted/50 cursor-pointer">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">Customer #{i}</p>
                      <p className="text-sm text-muted-foreground">2 minutes ago</p>
                    </div>
                    <div className="text-sm px-2 py-1 bg-[#F7F7F7] rounded-md">
                      Check-in
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default StoreSelectionScreen;
