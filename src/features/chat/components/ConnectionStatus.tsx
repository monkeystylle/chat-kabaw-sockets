/**
 * CONNECTION STATUS COMPONENT
 * ============================
 * Visual indicator showing the current connection status.
 * 
 * Component Responsibilities:
 * - Display connection status to user
 * - Use color coding for quick visual feedback
 * - Show different text based on status
 * 

 */

'use client';

import { ConnectionStatus as ConnectionStatusType } from '../types';
import { Badge } from '@/components/ui/badge';

interface ConnectionStatusProps {
  status: ConnectionStatusType;
}

export function ConnectionStatus({ status }: ConnectionStatusProps) {
  // Determine color and text based on status
  // This is a simple mapping object
  const statusConfig = {
    connected: {
      text: 'Connected',
      variant: 'default' as const, // Green badge
    },
    disconnected: {
      text: 'Disconnected',
      variant: 'secondary' as const, // Gray badge
    },
    connecting: {
      text: 'Connecting...',
      variant: 'outline' as const, // Outlined badge
    },
  };

  const config = statusConfig[status];

  return (
    <div className="mb-4 flex items-center justify-center">
      <Badge variant={config.variant} className="text-sm px-4 py-2">
        {config.text}
      </Badge>
    </div>
  );
}
