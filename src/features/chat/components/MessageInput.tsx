'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react'; // Icon for send button

interface MessageInputProps {
  onSendMessage: (content: string) => void; // Callback to send message
  disabled: boolean; // Whether input is disabled
}

export function MessageInput({ onSendMessage, disabled }: MessageInputProps) {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Don't send empty messages
    if (!inputValue.trim()) return;

    // Call parent's sendMessage function
    onSendMessage(inputValue);

    setInputValue('');
  };

  return (
    <Card className="mb-4">
      <CardContent className="p-4">
        <form onSubmit={handleSubmit} className="flex gap-2">
          {/* Message Input Field */}
          <Input
            type="text"
            placeholder={
              disabled ? 'Connect to send messages...' : 'Type your message...'
            }
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            disabled={disabled}
            className="flex-1"
          />

          {/* Send Button */}
          <Button
            type="submit"
            disabled={disabled || !inputValue.trim()} // Disabled if not connected or empty
            size="icon" // Makes button square for icon
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
