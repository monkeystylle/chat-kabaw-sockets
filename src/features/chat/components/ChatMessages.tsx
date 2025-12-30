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
import { Card, CardContent } from '@/components/ui/card';
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
    if (scrollContainerRef.current) {
      let scrollableElement = scrollContainerRef.current.parentElement;

      while (scrollableElement) {
        const overflow = window.getComputedStyle(scrollableElement).overflow;
        const overflowY = window.getComputedStyle(scrollableElement).overflowY;

        if (
          overflow === 'auto' ||
          overflow === 'scroll' ||
          overflowY === 'auto' ||
          overflowY === 'scroll' ||
          scrollableElement.hasAttribute('data-radix-scroll-area-viewport')
        ) {
          scrollableElement.scrollTop = scrollableElement.scrollHeight;
          break;
        }

        scrollableElement = scrollableElement.parentElement;

        if (!scrollableElement || scrollableElement === document.body) {
          break;
        }
      }
    }
  }, [messages]); // Dependency: run when messages array changes

  const formatTime = (timestamp?: string) => {
    if (!timestamp) return new Date().toLocaleTimeString();
    return new Date(timestamp).toLocaleTimeString();
  };

  return (
    <Card className="mb-4">
      <CardContent className="p-0">
        {/* ScrollArea is a shadcn component that makes content scrollable */}
        <ScrollArea className="h-100 p-4">
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
                        ? 'bg-primary text-primary-foreground' // Blue for current user
                        : 'bg-muted' // Gray for others
                    }`}
                  >
                    {/* Message Header: Username + Timestamp */}
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-sm">
                        {message.username}
                      </span>
                      <span className="text-xs opacity-70">
                        {formatTime(message.timestamp)}
                      </span>
                    </div>

                    {/* Message Content */}
                    <div className="text-sm wrap-break-word">
                      {message.content}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
