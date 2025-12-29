'use client'; // Required because we use React hooks (useState, useEffect)

import { ConnectionForm } from './components/ConnectionForm';
import { ChatMessages } from './components/ChatMessages';
import { MessageInput } from './components/MessageInput';
import { ConnectionStatus } from './components/ConnectionStatus';
import { Instructions } from './components/Instructions';
import { useWebSocket } from '../hooks/useWebSocket';

export function ChatFeature() {
  // This custom hook encapsulates ALL WebSocket logic
  // It returns everything we need to manage the chat
  const {
    messages, // Array of all chat messages
    connectionStatus, // 'connected' | 'disconnected' | 'connecting'
    connect, // Function to establish WebSocket connection
    disconnect, // Function to close WebSocket connection
    sendMessage, // Function to send a message
    username, // Current username
    channel, // Current channel
  } = useWebSocket();

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Kabaw Discord Test Client</h1>
        <p className="text-muted-foreground">
          <strong>
            Running Next.js - Testing WebSocket connection to port 8080
          </strong>
        </p>
      </div>

      {/* Connection Form - handles username/channel input and connect/disconnect */}
      <ConnectionForm
        onConnect={connect}
        onDisconnect={disconnect}
        isConnected={connectionStatus === 'connected'}
      />

      {/* Connection Status Indicator */}
      <ConnectionStatus status={connectionStatus} />

      {/* Chat Messages Display */}
      <ChatMessages messages={messages} currentUsername={username} />

      {/* Message Input Form */}
      <MessageInput
        onSendMessage={sendMessage}
        disabled={connectionStatus !== 'connected'}
      />

      {/* Instructions */}
      <Instructions />
    </div>
  );
}
