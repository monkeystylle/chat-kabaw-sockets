/**
 * CONNECTION STATUS COMPONENT
 * ============================
 * Reusable visual indicator showing the current connection status.
 *
 */

'use client';

import { ConnectionStatus as ConnectionStatusType } from '../types';
import { Badge } from '@/components/ui/badge';

interface ConnectionStatusProps {
  status: ConnectionStatusType;
  size?: 'sm' | 'md';
  className?: string;
}

export function ConnectionStatus({
  status,
  size = 'md',
  className = '',
}: ConnectionStatusProps) {
  const statusConfig = {
    connected: {
      text: 'Connected',
      variant: 'default' as const,
    },
    disconnected: {
      text: 'Disconnected',
      variant: 'secondary' as const,
    },
    connecting: {
      text: 'Connecting...',
      variant: 'outline' as const,
    },
  };

  const config = statusConfig[status];

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-4 py-2',
  };

  return (
    <Badge
      variant={config.variant}
      className={`${sizeClasses[size]} ${
        status === 'connected' ? 'bg-green-600' : ''
      } ${className}`}
    >
      {config.text}
    </Badge>
  );
}
