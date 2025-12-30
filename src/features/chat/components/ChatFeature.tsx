'use client';

import { useWebSocket } from '../hooks/useWebSocket';
import { ChatWindow } from './ChatWindow';
import { ConnectionForm } from './ConnectionForm';
import { Instructions } from './Instructions';

export function ChatFeature() {
  const {
    messages, // Array of all chat messages
    connectionStatus, // 'connected' | 'disconnected' | 'connecting'
    connect, // Function to establish WebSocket connection
    disconnect, // Function to close WebSocket connection
    sendMessage, // Function to send a message
    username, // Current username
  } = useWebSocket();

  return (
    <div className="space-y-4">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Chat</h1>
        <p className="text-sm text-muted-foreground">
          Running Next.js - Testing WebSocket connection to port 8080
        </p>
      </div>

      {/* Instructions */}
      <Instructions />

      {/* Connection Form - handles username/channel input and connect/disconnect */}
      <ConnectionForm
        onConnect={connect}
        onDisconnect={disconnect}
        isConnected={connectionStatus === 'connected'}
        connectionStatus={connectionStatus}
      />

      {/* Chat Window - Combined messages display and input */}
      <ChatWindow
        messages={messages}
        currentUsername={username}
        onSendMessage={sendMessage}
        disabled={connectionStatus !== 'connected'}
      />
    </div>
  );
}
