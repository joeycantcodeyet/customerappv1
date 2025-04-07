
import React from 'react';
import { Button } from '@/components/ui/button';
import { WifiOff, RefreshCw } from 'lucide-react';

interface ConnectivityWarningProps {
  onRetryClick: () => void;
}

const ConnectivityWarning = ({ onRetryClick }: ConnectivityWarningProps) => {
  return (
    <div className="flex flex-col items-center justify-center p-6 text-center">
      <WifiOff className="h-16 w-16 text-[#ef4444] mb-4" />
      <h2 className="text-xl font-semibold mb-2">Connection Issue</h2>
      <p className="mb-6 text-muted-foreground">
        Unable to connect to Treez API. This could be due to:
      </p>
      <ul className="list-disc text-left mb-6 space-y-2 text-muted-foreground">
        <li>Your internet connection</li>
        <li>Treez API service unavailability</li>
        <li>Local network restrictions</li>
      </ul>
      <div className="space-y-4 w-full">
        <Button 
          className="w-full bg-[#295c07] hover:bg-[#265b07]"
          onClick={onRetryClick}
        >
          <RefreshCw className="mr-2 h-4 w-4" /> Retry Connection
        </Button>
        <p className="text-sm text-muted-foreground">
          If the problem persists, please contact <a href="mailto:support@treez.io" className="text-[#295c07] hover:underline">support@treez.io</a>
        </p>
      </div>
    </div>
  );
};

export default ConnectivityWarning;
