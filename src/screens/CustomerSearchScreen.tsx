
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Search, UserPlus, ArrowLeft } from 'lucide-react';

interface CustomerResult {
  id: string;
  name: string;
  email: string;
  lastVisit: string;
}

const CustomerSearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<CustomerResult[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!searchQuery.trim()) {
      toast({
        title: "Search Error",
        description: "Please enter a search term",
        variant: "destructive",
      });
      return;
    }
    
    setIsSearching(true);
    setHasSearched(true);
    
    // Simulate API call to search customers
    setTimeout(() => {
      if (searchQuery.toLowerCase().includes('john')) {
        // Mock data for demo purposes
        setSearchResults([
          { 
            id: "cust_1", 
            name: "John Smith", 
            email: "john.smith@example.com",
            lastVisit: "Apr 2, 2025"
          },
          { 
            id: "cust_2", 
            name: "John Davis", 
            email: "john.davis@example.com",
            lastVisit: "Mar 28, 2025" 
          }
        ]);
      } else {
        // No results for other queries in this demo
        setSearchResults([]);
      }
      
      setIsSearching(false);
    }, 1000);
  };
  
  const handleCustomerSelect = (customerId: string) => {
    navigate(`/customer-profile/${customerId}`);
  };
  
  const handleCreateNew = () => {
    navigate('/customer-creation');
  };

  return (
    <div className="flex flex-col min-h-screen bg-background p-4">
      <div className="flex items-center mb-4">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => navigate('/id-scanner')}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-semibold ml-2">Search Customers</h1>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Find a customer</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search by name, email, phone..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button 
              type="submit" 
              className="w-full bg-[#295c07] hover:bg-[#265b07]"
              disabled={isSearching}
            >
              {isSearching ? "Searching..." : "Search"}
            </Button>
          </form>
        </CardContent>
      </Card>
      
      {hasSearched && (
        <div className="mt-6">
          <h2 className="text-lg font-medium mb-4">
            {isSearching ? "Searching..." : 
             searchResults.length > 0 ? "Search Results" : "No Results Found"}
          </h2>
          
          {isSearching ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#295c07]"></div>
            </div>
          ) : (
            <>
              {searchResults.map((customer) => (
                <Card 
                  key={customer.id} 
                  className="mb-3 cursor-pointer hover:bg-accent transition-colors"
                  onClick={() => handleCustomerSelect(customer.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-medium">{customer.name}</div>
                        <div className="text-sm text-muted-foreground">{customer.email}</div>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Last visit: {customer.lastVisit}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              {searchResults.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-muted-foreground mb-6">
                    No customers found matching "{searchQuery}"
                  </p>
                  <Button 
                    onClick={handleCreateNew}
                    className="bg-[#295c07] hover:bg-[#265b07]"
                  >
                    <UserPlus className="mr-2 h-4 w-4" />
                    Create New Customer
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default CustomerSearchScreen;
