'use client';

import { useWebSocket } from '../hooks/useWebSocket';
import { ChatWindow } from './ChatWindow';
import { ConnectionForm } from './ConnectionForm';
import { Instructions } from './Instructions';

export function ChatFeature() {
  const {
    messages,
    connectionStatus,
    connect,
    disconnect,
    sendMessage,
    username,
    currentUserID,
    error,
  } = useWebSocket();

  return (
    <div className="space-y-4">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-3xl font-bold">Chat</h1>
          {currentUserID && (
            <span className="text-sm bg-muted px-3 py-1 rounded-full">
              ID: {currentUserID}
            </span>
          )}
        </div>
        <p className="text-sm text-muted-foreground">
          Running Next.js - Testing WebSocket connection to port 8080
        </p>
      </div>

      {/* Loading State */}
      {connectionStatus === 'connecting' && (
        <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded-lg flex items-center gap-2">
          <div className="animate-spin h-4 w-4 border-2 border-blue-700 border-t-transparent rounded-full"></div>
          <p className="font-semibold">Connecting to server...</p>
        </div>
      )}

      {/* Error Display */}
      {error && (
        <div className="bg-destructive/10 border border-destructive text-destructive px-4 py-3 rounded-lg">
          <p className="font-semibold">Connection Error</p>
          <p className="text-sm">{error}</p>
        </div>
      )}

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
