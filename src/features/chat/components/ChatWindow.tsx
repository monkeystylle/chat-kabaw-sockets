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

interface ChatWindowProps {
  messages: ChatMessage[];
  currentUsername: string;
  onSendMessage: (content: string) => void;
  disabled: boolean;
}

export function ChatWindow({
  messages,
  currentUsername,
  onSendMessage,
  disabled,
}: ChatWindowProps) {
  return (
    <Card className="flex flex-col h-150">
      {/* Messages Area - Takes up available space */}
      <div className="flex-1 overflow-hidden">
        <ChatMessages messages={messages} currentUsername={currentUsername} />
      </div>

      {/* Message Input - Fixed at bottom */}
      <div className="border-t " style={{ border: '1px solid red' }}>
        <MessageInput onSendMessage={onSendMessage} disabled={disabled} />
      </div>
    </Card>
  );
}
