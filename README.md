## 🎯 Project Overview

This is a WebSocket-based chat client that connects to the Kabaw Sockets test server. It demonstrates real-time messaging, connection management, and robust error handling in a React/Next.js environment.

## 📋 Prerequisites

Before running this application, you need to have the following installed:

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **Git**

## 🚀 Getting Started

### Step 1: Set Up the WebSocket Server

First, you need to download and run the Kabaw Sockets test server:

1. Clone the server repository:

   ```bash
   git clone https://github.com/kabaw-ai/kabaw-sockets.git
   cd kabaw-sockets
   ```

2. Follow the instructions in the server's README to start it
   - The server will run on `http://localhost:8080` by default
   - Make sure the server is running before starting the client

### Step 2: Set Up the Chat Client

1. **Clone this repository:**

   ```bash
   git clone <your-repository-url>
   cd chat-kabaw-sockets
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Run the development server:**

   ```bash
   npm run dev
   ```

4. **Open your browser:**
   ```
   Navigate to http://localhost:3000
   ```

## 📖 How to Use

1. **Enter your details:**

   - Fill in your username (default: "testKabaw")
   - Enter a channel name (default: "general")

2. **Connect to the server:**

   - Click the "Connect" button
   - Wait for the connection status to show "Connected"
   - You'll receive a unique user ID

3. **Start chatting:**

   - Type your message in the input field
   - Press Enter or click "Send"
   - Messages appear in real-time for all connected users

4. **Disconnect:**
   - Click the "Disconnect" button when you're done

## 🧪 Testing

### Test Multiple Users

Open multiple browser tabs to simulate different users and see real-time message synchronization.

## 📁 Project Structure

This project follows a **Feature-Driven Architecture (FDD)** pattern, which organizes code by features rather than technical layers. This approach improves scalability, maintainability, and makes the codebase easier to navigate.

### Why Feature-Driven Architecture?

- **Better organization:** All code related to a feature lives together
- **Easier maintenance:** Changes to a feature are isolated to one directory
- **Improved scalability:** Easy to add new features without affecting existing ones
- **Clear boundaries:** Each feature is self-contained with its own components, hooks, and types

Read more: [Feature-Driven Architecture with Next.js](https://dev.to/rufatalv/feature-driven-architecture-with-nextjs-a-better-way-to-structure-your-application-1lph)

### Directory Structure

```
src/
├── app/                          # Next.js app directory
│   ├── error.tsx                # Global error boundary
│   └── page.tsx                 # Main page
├── features/                    # Feature-based modules
│   └── chat/                    # Chat feature (self-contained)
│       ├── components/          # Chat UI components
│       │   ├── ChatFeature.tsx
│       │   ├── ChatMessages.tsx
│       │   ├── ChatWindow.tsx
│       │   ├── ConnectionForm.tsx
│       │   ├── ConnectionStatus.tsx
│       │   ├── MessageInput.tsx
│       │   └── Instructions.tsx
│       ├── hooks/
│       │   └── useWebSocket.ts  # WebSocket connection logic
│       └── types/
│           └── index.ts         # TypeScript type definitions
└── components/
    └── ui/                      # Shared/reusable UI components
```

## 📝 Notes

- This application was built as part of a technical assessment
- The WebSocket server must be running for the chat to function
- Messages are not persisted; they exist only during active connections

## 🙏 Acknowledgments

- Built for Kabaw AI technical assessment
- WebSocket server: [kabaw-sockets](https://github.com/kabaw-ai/kabaw-sockets)

---

Built with ❤️ using Next.js and WebSocket
