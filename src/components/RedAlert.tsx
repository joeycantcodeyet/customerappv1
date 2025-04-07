
import React from 'react';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';

interface RedAlertProps {
  message: string;
  onAcknowledge: () => void;
}

const RedAlert = ({ message, onAcknowledge }: RedAlertProps) => {
  return (
    <div className="bg-[#ef4444]/10 border border-[#ef4444] rounded-md p-4 mb-6">
      <div className="flex items-start">
        <AlertTriangle className="h-5 w-5 text-[#ef4444] mr-3 mt-0.5 flex-shrink-0" />
        <div className="flex-1">
          <h3 className="font-semibold text-[#ef4444]">Customer Alert</h3>
          <p className="text-sm my-1">{message}</p>
          <p className="text-xs text-muted-foreground mb-2">
            This alert requires acknowledgment for compliance purposes
          </p>
          <Button 
            onClick={onAcknowledge}
            className="bg-[#ef4444] hover:bg-[#dc2626] text-white"
            size="sm"
          >
            Acknowledge Alert
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RedAlert;
