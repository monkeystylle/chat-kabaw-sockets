'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface ConnectionFormProps {
  onConnect: (username: string, channel: string) => void; // Callback when user clicks Connect
  onDisconnect: () => void; // Callback when user clicks Disconnect
  isConnected: boolean; // Whether we're currently connected
}

export function ConnectionForm({
  onConnect,
  onDisconnect,
  isConnected,
}: ConnectionFormProps) {
  const [username, setUsername] = useState('testKabaw'); // Default value
  const [channel, setChannel] = useState('general'); // Default value

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const finalUsername = username.trim() || 'Anonymous';
    const finalChannel = channel.trim() || 'general';

    // Call the parent's connect function (passed via props)
    onConnect(finalUsername, finalChannel);
  };

  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle>Connection Settings</CardTitle>
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
          <div className="flex gap-2">
            <Button
              type="submit"
              disabled={isConnected} // Can't connect if already connected
              className="flex-1"
            >
              Connect
            </Button>
            <Button
              type="button"
              onClick={onDisconnect}
              disabled={!isConnected} // Can't disconnect if not connected
              variant="destructive" // Red color for destructive action
              className="flex-1"
            >
              Disconnect
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
