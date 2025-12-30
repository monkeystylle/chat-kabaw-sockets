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

  // Empty state when no messages
  if (messages.length === 0) {
    return (
      <ScrollArea className="h-full p-4">
        <div className="flex flex-col items-center justify-center h-full min-h-100">
          <div className="mb-4">
            <svg
              className="w-20 h-20 text-muted-foreground/40"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
          </div>
          <p className="text-lg font-medium text-muted-foreground">
            No messages yet
          </p>
          <p className="text-sm text-muted-foreground/70 mt-1">
            Connect to start chatting
          </p>
        </div>
      </ScrollArea>
    );
  }

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
