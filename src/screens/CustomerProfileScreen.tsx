
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Edit, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import RedAlert from '../components/RedAlert';

interface CustomerData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  isFlagged: boolean;
  flagReason?: string;
  lastVisit?: string;
  status: 'active' | 'banned' | 'restricted';
}

const CustomerProfileScreen = () => {
  const { id } = useParams<{ id: string }>();
  const [customer, setCustomer] = useState<CustomerData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showFlaggedAlert, setShowFlaggedAlert] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Simulate API call to get customer data
    const fetchCustomerData = async () => {
      setIsLoading(true);
      
      setTimeout(() => {
        // For demo purposes, we'll create a mock customer
        // In a real app, this would come from the Treez API
        const isFlagged = Math.random() > 0.7; // Randomly flag some customers for demo
        
        const mockCustomer: CustomerData = {
          id: id || "unknown",
          firstName: "John",
          lastName: "Smith",
          email: "john.smith@example.com",
          phone: "(555) 123-4567",
          dateOfBirth: "1990-05-15",
          address: {
            street: "123 Main St",
            city: "San Francisco",
            state: "CA",
            zipCode: "94105"
          },
          isFlagged: isFlagged,
          flagReason: isFlagged ? "Previously banned from Greenfield location" : undefined,
          lastVisit: "April 2, 2025",
          status: isFlagged ? "restricted" : "active"
        };
        
        setCustomer(mockCustomer);
        setIsLoading(false);
        
        if (isFlagged) {
          setShowFlaggedAlert(true);
        }
      }, 1500);
    };
    
    fetchCustomerData();
  }, [id]);

  const handleAlertAcknowledge = () => {
    // In a real app, this would log the acknowledgment via API
    setShowFlaggedAlert(false);
    toast({
      title: "Alert Acknowledged",
      description: "This interaction has been recorded",
    });
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#295c07]"></div>
        <p className="mt-4 text-muted-foreground">Loading customer data...</p>
      </div>
    );
  }

  if (!customer) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
        <AlertCircle className="h-12 w-12 text-[#ef4444] mb-4" />
        <h1 className="text-xl font-semibold mb-2">Customer Not Found</h1>
        <p className="mb-6 text-muted-foreground">
          We couldn't find customer details for ID: {id}
        </p>
        <Button
          className="bg-[#295c07] hover:bg-[#265b07]"
          onClick={() => navigate('/customer-search')}
        >
          Back to Search
        </Button>
      </div>
    );
  }

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
        <h1 className="text-xl font-semibold ml-2">Customer Profile</h1>
      </div>
      
      {showFlaggedAlert && customer.isFlagged && (
        <RedAlert 
          message={customer.flagReason || "This customer has been flagged"}
          onAcknowledge={handleAlertAcknowledge}
        />
      )}
      
      <div className="mb-4 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">
            {customer.firstName} {customer.lastName}
          </h2>
          {customer.lastVisit && (
            <p className="text-sm text-muted-foreground">
              Last visit: {customer.lastVisit}
            </p>
          )}
        </div>
        <Button 
          variant="outline"
          className="flex items-center"
          onClick={() => {
            toast({
              title: "Edit Feature",
              description: "Customer editing would be implemented here",
            });
          }}
        >
          <Edit className="h-4 w-4 mr-2" />
          Edit
        </Button>
      </div>
      
      <Card className="mb-4">
        <CardContent className="p-4">
          <h3 className="text-lg font-semibold mb-3">Personal Information</h3>
          <div className="grid grid-cols-2 gap-y-3">
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <p>{customer.email || "Not provided"}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Phone</p>
              <p>{customer.phone || "Not provided"}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Date of Birth</p>
              <p>{new Date(customer.dateOfBirth).toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Status</p>
              <div className="flex items-center">
                <span className={`inline-block w-2 h-2 rounded-full mr-2 ${
                  customer.status === 'active' ? 'bg-[#10b981]' : 
                  customer.status === 'banned' ? 'bg-[#ef4444]' : 
                  'bg-[#fbbf24]'
                }`}></span>
                <span className="capitalize">{customer.status}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="mb-4">
        <CardContent className="p-4">
          <h3 className="text-lg font-semibold mb-3">Address</h3>
          <p>{customer.address.street}</p>
          <p>{customer.address.city}, {customer.address.state} {customer.address.zipCode}</p>
        </CardContent>
      </Card>
      
      <Button 
        className="mt-auto bg-[#295c07] hover:bg-[#265b07]"
        onClick={() => navigate('/id-scanner')}
      >
        Back to Scanner
      </Button>
    </div>
  );
};

export default CustomerProfileScreen;
