
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Camera, User, Search, AlertTriangle } from 'lucide-react';
import ConnectivityWarning from '../components/ConnectivityWarning';

const IDScannerScreen = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [showConnectivityIssue, setShowConnectivityIssue] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const startScan = () => {
    setIsScanning(true);
    
    // Simulate scanner process
    setTimeout(() => {
      setIsScanning(false);
      
      // Randomly simulate success or failure for demo purposes
      const success = Math.random() > 0.3;
      
      if (success) {
        // Simulate successful scan
        const mockCustomerId = "cus_" + Math.random().toString(36).substring(2, 10);
        navigate(`/customer-profile/${mockCustomerId}`);
        toast({
          title: "ID Scanned Successfully",
          description: "Customer information retrieved",
        });
      } else {
        // Simulate failed scan
        toast({
          title: "Scan Failed",
          description: "Could not read ID clearly. Please try again or enter manually.",
          variant: "destructive",
        });
      }
    }, 2000);
  };
  
  const handleManualEntry = () => {
    navigate('/customer-search');
  };

  return (
    <div className="flex flex-col p-4 h-full">
      <div className="text-center mb-6">
        <h2 className="text-xl font-semibold">Customer Check-In</h2>
        <p className="text-muted-foreground mt-1">Scan ID or search for customer</p>
      </div>
      
      <div className="space-y-6">
        <Card className="overflow-hidden">
          <div className="bg-muted h-56 flex flex-col items-center justify-center">
            {isScanning ? (
              <div className="space-y-4 text-center">
                <div className="animate-pulse">
                  <Camera className="h-16 w-16 mx-auto text-muted-foreground" />
                </div>
                <p>Position ID in frame...</p>
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#295c07] mx-auto"></div>
              </div>
            ) : (
              <div className="space-y-2 text-center">
                <Camera className="h-16 w-16 mx-auto text-muted-foreground" />
                <p className="text-muted-foreground">Camera preview</p>
              </div>
            )}
          </div>
          <CardContent className="p-4">
            <Button 
              onClick={startScan} 
              className="w-full bg-[#295c07] hover:bg-[#265b07]"
              disabled={isScanning}
            >
              {isScanning ? "Scanning..." : "Scan ID"}
            </Button>
          </CardContent>
        </Card>
        
        <div className="relative flex items-center">
          <div className="flex-grow border-t border-gray-200"></div>
          <span className="flex-shrink mx-4 text-gray-400 text-sm">or</span>
          <div className="flex-grow border-t border-gray-200"></div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <Button
            variant="outline"
            className="h-20 flex flex-col space-y-2 border-gray-300"
            onClick={handleManualEntry}
          >
            <User className="h-5 w-5" />
            <span>Manual Entry</span>
          </Button>
          <Button
            variant="outline"
            className="h-20 flex flex-col space-y-2 border-gray-300"
            onClick={() => navigate('/customer-search')}
          >
            <Search className="h-5 w-5" />
            <span>Search Customer</span>
          </Button>
        </div>
        
        <div className="mt-4 flex flex-col items-center justify-center">
          <Button
            variant="ghost"
            className="text-xs text-muted-foreground"
            onClick={() => setShowConnectivityIssue(true)}
          >
            <AlertTriangle className="h-4 w-4 mr-2" />
            Test Connectivity Issue
          </Button>
        </div>
      </div>
      
      <Sheet open={showConnectivityIssue} onOpenChange={setShowConnectivityIssue}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Connection Issue</SheetTitle>
            <SheetDescription>
              There seems to be a problem with the connection to Treez services.
            </SheetDescription>
          </SheetHeader>
          <div className="mt-6">
            <ConnectivityWarning onRetryClick={() => setShowConnectivityIssue(false)} />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default IDScannerScreen;
