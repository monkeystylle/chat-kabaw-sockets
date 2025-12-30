/**
 * CHAT MESSAGES COMPONENT
 * ========================
 * Displays the chat message history with auto-scrolling.
 *
 * Component Responsibilities:
 * - Render all messages in a scrollable container
 * - Differentiate between message types (user, other, system)
 * - Auto-scroll to bottom when new messages arrive
 * - Format timestamps nicely
 *
 * Key React Concepts Used:
 * - useRef: To access DOM element for scrolling
 * - useEffect: To scroll when messages change
 * - map: To render array of messages
 * - Conditional styling: Different styles per message type
 */

'use client';

import { useEffect, useRef } from 'react';
import { ChatMessage } from '../types';
import { ScrollArea } from '@/components/ui/scroll-area';

interface ChatMessagesProps {
  messages: ChatMessage[];
  currentUsername: string;
}

export function ChatMessages({ messages, currentUsername }: ChatMessagesProps) {
  // Ref to the scrollable container
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // When messages change, we scroll to bottom
  useEffect(() => {
    if (!scrollContainerRef.current) return;

    const viewport = scrollContainerRef.current.closest(
      '[data-radix-scroll-area-viewport]'
    );
    if (viewport) {
      viewport.scrollTop = viewport.scrollHeight;
    }
  }, [messages]); // Dependency: run when messages array changes

  const formatTime = (timestamp?: string) => {
    if (!timestamp) return new Date().toLocaleTimeString();
    return new Date(timestamp).toLocaleTimeString();
  };

  // 🧪 TEST: Uncomment the line below to simulate an error
  // throw new Error('This is a test error to preview the error boundary!');

  return (
    <ScrollArea className="h-full p-4">
      <div ref={scrollContainerRef} className="space-y-4">
        {messages.map((message, index) => {
          // Check if this message is from the current user
          const isCurrentUser = message.username === currentUsername;

          // SYSTEM MESSAGES
          if (message.type === 'system') {
            return (
              <div key={index} className="flex justify-center">
                <div className="bg-muted px-3 py-1 rounded-full text-sm text-muted-foreground italic">
                  {message.content}
                </div>
              </div>
            );
          }

          // Regular chat messages aligned based on sender
          return (
            <div
              key={index}
              className={`flex ${
                isCurrentUser ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`max-w-[70%] rounded-lg px-4 py-2 ${
                  isCurrentUser
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted'
                }`}
              >
                {/* Message Header */}
                <div className="mb-1">
                  {/* Username + Timestamp */}
                  <div className="flex items-center gap-1">
                    <span className="font-semibold text-sm">
                      {message.username}
                    </span>
                    <span className="text-xs opacity-70">
                      ({formatTime(message.timestamp)})
                    </span>
                  </div>
                </div>

                {/* Message Content */}
                <div className="text-sm wrap-break-word">{message.content}</div>
              </div>
            </div>
          );
        })}
      </div>
    </ScrollArea>
  );
}
