/**
 * CHAT WINDOW COMPONENT
 * ======================
 * Container that combines ChatMessages and MessageInput into a unified chat interface.
 * Composes existing modular components.
 */

'use client';

import { ChatMessage } from '../types';
import { Card } from '@/components/ui/card';
import { ChatMessages } from './ChatMessages';
import { MessageInput } from './MessageInput';
import { ErrorBoundary } from 'react-error-boundary';
import { Button } from '@/components/ui/button';

interface ChatWindowProps {
  messages: ChatMessage[];
  currentUsername: string;
  onSendMessage: (content: string) => void;
  disabled: boolean;
}

function ErrorFallback({
  resetErrorBoundary,
}: {
  resetErrorBoundary: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center h-full p-8 text-center">
      <div className="mb-4">
        <svg
          className="w-16 h-16 mx-auto text-destructive"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
      </div>

      <h3 className="text-lg font-semibold mb-2">Something went wrong</h3>

      <p className="text-sm text-muted-foreground mb-4 max-w-md">
        An error occurred while displaying the chat window.
      </p>

      <Button onClick={resetErrorBoundary} variant="default">
        Try Again
      </Button>
    </div>
  );
}

export function ChatWindow({
  messages,
  currentUsername,
  onSendMessage,
  disabled,
}: ChatWindowProps) {
  return (
    <Card className="flex flex-col h-150">
      <ErrorBoundary
        FallbackComponent={ErrorFallback}
        onReset={() => {
          // Reset any state that might have caused the error
          console.log('[ChatWindow] Error boundary reset');
        }}
      >
        {/* Messages Area - Takes up available space */}
        <div className="flex-1 overflow-hidden">
          <ChatMessages messages={messages} currentUsername={currentUsername} />
        </div>

        {/* Message Input - Fixed at bottom */}
        <div className="border-t">
          <MessageInput onSendMessage={onSendMessage} disabled={disabled} />
        </div>
      </ErrorBoundary>
    </Card>
  );
}
