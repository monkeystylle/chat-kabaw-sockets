'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ConnectionStatus } from './ConnectionStatus';
import { ConnectionStatus as ConnectionStatusType } from '../types';

interface ConnectionFormProps {
  onConnect: (username: string, channel: string) => void;
  onDisconnect: () => void;
  isConnected: boolean;
  connectionStatus: ConnectionStatusType;
}

export function ConnectionForm({
  onConnect,
  onDisconnect,
  isConnected,
  connectionStatus,
}: ConnectionFormProps) {
  const [username, setUsername] = useState('testKabaw');
  const [channel, setChannel] = useState('general');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const finalUsername = username.trim() || 'Anonymous';
    const finalChannel = channel.trim() || 'general';

    onConnect(finalUsername, finalChannel);
  };

  return (
    <Card className="mb-4">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Connection Settings</CardTitle>
          <ConnectionStatus status={connectionStatus} size="sm" />
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Username Input */}
          <div>
            <Input
              type="text"
              placeholder="Username"
              value={username}
              onChange={e => setUsername(e.target.value)}
              disabled={isConnected} // Can't change username while connected
              className="w-full"
            />
          </div>

          {/* Channel Input */}
          <div>
            <Input
              type="text"
              placeholder="Channel"
              value={channel}
              onChange={e => setChannel(e.target.value)}
              disabled={isConnected} // Can't change channel while connected
              className="w-full"
            />
          </div>

          {/* Connect/Disconnect Buttons */}
          <div className="flex gap-2 justify-end">
            <Button type="submit" disabled={isConnected}>
              Connect
            </Button>
            <Button
              type="button"
              onClick={onDisconnect}
              disabled={!isConnected}
              variant="outline"
            >
              Disconnect
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
