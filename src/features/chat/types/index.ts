/**
 * Message Type
 * Represents the different kinds of messages in our chat
 */
export type MessageType =
  | 'message'
  | 'user_connected'
  | 'user_disconnected'
  | 'system';

/**
 * Connection Status
 * Represents the state of our WebSocket connection
 */
export type ConnectionStatus = 'connected' | 'disconnected' | 'connecting';

/**
 * Chat Message Interface
 * This is the shape of messages received from the WebSocket server
 *
 * Fields:
 * - type: What kind of message is this?
 * - username: Who sent it?
 * - content: The actual message text
 * - timestamp: When was it sent? (optional because system messages might not have one)
 * - user_id: Unique identifier for the user (optional, used for tracking)
 */
export interface ChatMessage {
  type: MessageType;
  username: string;
  content: string;
  timestamp?: string;
  user_id?: string;
}

/**
 * Outgoing Message Interface
 * This is what we SEND to the server (simpler than what we receive)
 */
export interface OutgoingMessage {
  type: 'message';
  content: string;
}

/**
 * Connection Config Interface
 * Configuration needed to establish a WebSocket connection
 */
export interface ConnectionConfig {
  username: string;
  channel: string;
}
