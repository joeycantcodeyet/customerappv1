
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Camera, User, Search } from 'lucide-react';
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

  const testConnectivityIssue = () => {
    setShowConnectivityIssue(true);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-xl text-center">Customer Verification</CardTitle>
          <CardDescription className="text-center">
            Scan customer ID or search manually
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 pt-4">
          <Button 
            onClick={startScan} 
            className="w-full h-24 bg-[#295c07] hover:bg-[#265b07] text-lg"
            disabled={isScanning}
          >
            {isScanning ? (
              <div className="flex items-center space-x-2">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>Scanning...</span>
              </div>
            ) : (
              <div className="flex flex-col items-center space-y-2">
                <Camera className="h-6 w-6" />
                <span>Scan ID</span>
              </div>
            )}
          </Button>
          
          <div className="relative flex items-center">
            <div className="flex-grow border-t border-gray-200"></div>
            <span className="flex-shrink mx-4 text-gray-400 text-sm">or</span>
            <div className="flex-grow border-t border-gray-200"></div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <Button
              variant="outline"
              className="h-20 flex flex-col space-y-2"
              onClick={handleManualEntry}
            >
              <User className="h-5 w-5" />
              <span>Manual Entry</span>
            </Button>
            <Button
              variant="outline"
              className="h-20 flex flex-col space-y-2"
              onClick={() => navigate('/customer-search')}
            >
              <Search className="h-5 w-5" />
              <span>Search Customer</span>
            </Button>
          </div>

          {/* Development only - button to test connectivity issues */}
          <Button
            variant="ghost"
            className="text-xs text-muted-foreground"
            onClick={testConnectivityIssue}
          >
            Test Connectivity Issue
          </Button>
        </CardContent>
      </Card>
      
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
