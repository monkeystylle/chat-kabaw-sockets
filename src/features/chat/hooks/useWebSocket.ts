'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { ChatMessage, OutgoingMessage, ConnectionStatus } from '../types';

export function useWebSocket() {
  // WebSocket instance - stored in ref because it's not render-dependent
  // useRef persists across renders but doesn't trigger re-renders when changed
  const wsRef = useRef<WebSocket | null>(null);

  // Current user ID assigned by server
  const currentUserIDRef = useRef<string | null>(null);

  // Track if connection was ever successfully opened

  const wasConnectedRef = useRef<boolean>(false);

  // Messages array - all chat messages
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  // Connection status - controls UI state
  const [connectionStatus, setConnectionStatus] =
    useState<ConnectionStatus>('disconnected');

  // Current connection info
  const [username, setUsername] = useState<string>('');
  const [channel, setChannel] = useState<string>('');
  const [currentUserID, setCurrentUserID] = useState<string>('');
  const [error, setError] = useState<string>('');

  // This function adds a new message to our messages array
  const addMessage = useCallback((message: ChatMessage) => {
    setMessages(prevMessages => [...prevMessages, message]);
  }, []);

  // Establishes WebSocket connection to the server
  const connect = useCallback(
    (connectUsername: string, connectChannel: string) => {
      // Validation: Don't connect if already connected
      if (wsRef.current?.readyState === WebSocket.OPEN) {
        console.log('[HOOK] Already connected');
        return;
      }

      // Store connection details
      setUsername(connectUsername);
      setChannel(connectChannel);
      setConnectionStatus('connecting');

      // Build WebSocket URL with query parameters
      // encodeURIComponent prevents injection attacks and handles special characters
      const wsUrl = `ws://localhost:8080/ws?username=${encodeURIComponent(
        connectUsername
      )}&channel=${encodeURIComponent(connectChannel)}`;

      console.log(`[HOOK] Connecting to: ${wsUrl}`);

      try {
        // Create new WebSocket instance
        const ws = new WebSocket(wsUrl);
        wsRef.current = ws;

        // EVENT HANDLER: onopen
        // Called when connection is successfully established
        ws.onopen = () => {
          console.log(
            `[HOOK] Connected as ${connectUsername} in ${connectChannel}`
          );
          wasConnectedRef.current = true; // Mark that we successfully connected
          setConnectionStatus('connected');
          setError(''); // Clear any previous errors

          // Add system message to chat
          addMessage({
            type: 'system',
            username: 'System',
            content: `Connected as ${connectUsername} to channel ${connectChannel}`,
            timestamp: new Date().toISOString(),
          });
        };

        // EVENT HANDLER: onmessage
        // Called whenever a message is received from the server
        ws.onmessage = event => {
          try {
            // Parse the JSON message from the server
            const message: ChatMessage = JSON.parse(event.data);
            console.log('[HOOK] Message received:', message);

            // Special handling for user_connected message
            // This tells us our unique user ID
            if (message.type === 'user_connected' && message.user_id) {
              currentUserIDRef.current = message.user_id;
              setCurrentUserID(message.user_id);
              console.log(`[HOOK] User ID assigned: ${message.user_id}`);
            }

            // Add the message to our messages array
            addMessage(message);
          } catch (error) {
            console.warn('[HOOK] Error parsing message:', error);
          }
        };

        // EVENT HANDLER: onclose
        // Called when connection closes (either intentionally or due to error)
        ws.onclose = event => {
          console.log(`[HOOK] Connection closed. Code: ${event.code}`);
          setConnectionStatus('disconnected');
          currentUserIDRef.current = null;
          wsRef.current = null;

          // Only show "Connection closed" if we were actually connected before
          // This prevents duplicate messages when connection fails immediately
          if (wasConnectedRef.current) {
            addMessage({
              type: 'system',
              username: 'System',
              content: 'Connection closed',
              timestamp: new Date().toISOString(),
            });
          }

          wasConnectedRef.current = false; // Reset the flag
        };

        // EVENT HANDLER: onerror
        // Called when an error occurs
        ws.onerror = error => {
          console.warn('[HOOK] WebSocket error:', error);
          setConnectionStatus('disconnected');
          setError('Connection error occurred');
          currentUserIDRef.current = null;
          wsRef.current = null;

          addMessage({
            type: 'system',
            username: 'System',
            content: 'Connection error occurred',
            timestamp: new Date().toISOString(),
          });
        };
      } catch (error) {
        console.warn('[HOOK] Failed to create WebSocket:', error);
        setConnectionStatus('disconnected');
        setError('Failed to connect to server');
        addMessage({
          type: 'system',
          username: 'System',
          content: 'Failed to connect to server',
          timestamp: new Date().toISOString(),
        });
      }
    },
    [addMessage]
  ); // Dependency: recreate if addMessage changes

  // Closes the WebSocket connection gracefully
  const disconnect = useCallback(() => {
    if (wsRef.current) {
      console.log('[HOOK] User initiated disconnect');
      wsRef.current.close(); // This triggers the onclose handler
      wsRef.current = null;
    }
  }, []);

  // Sends a message through the WebSocket
  const sendMessage = useCallback((content: string) => {
    // Validation: Can only send if connected
    if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) {
      console.warn('[HOOK] Cannot send message: not connected');
      return;
    }

    // Validation: Don't send empty messages
    if (!content.trim()) {
      return;
    }

    // Create message object
    const message: OutgoingMessage = {
      type: 'message',
      content: content.trim(),
    };

    // Send as JSON string
    console.log('[HOOK] Sending message:', message);
    wsRef.current.send(JSON.stringify(message));
  }, []);

  useEffect(() => {
    return () => {
      // CLEANUP: This runs when component unmounts

      if (wsRef.current) {
        console.log('[HOOK] Component unmounting - closing WebSocket');
        wsRef.current.close(); // Gracefully close the connection
        wsRef.current = null;
      }
    };
  }, []);

  return {
    messages,
    connectionStatus,
    username,
    channel,
    currentUserID,
    error,
    connect,
    disconnect,
    sendMessage,
  };
}
