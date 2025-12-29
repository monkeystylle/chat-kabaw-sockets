/**
 * INSTRUCTIONS COMPONENT
 * =======================
 * Static informational component showing usage instructions and server endpoints.
 *
 * Component Responsibilities:
 * - Display how to use the chat
 * - Show server endpoints for reference
 * - Provide helpful context to users
 *
 * Design Pattern: Pure Presentational Component
 * - No props needed (static content)
 * - No state
 * - Just renders information
 */

'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export function Instructions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Instructions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* How to Use */}
        <div>
          <h4 className="font-semibold mb-2">How to Use:</h4>
          <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
            <li>Enter your username and channel name</li>
            <li>Click Connect to establish WebSocket connection</li>
            <li>Start typing messages in the input field</li>
            <li>Open multiple browser tabs to test multi-user chat</li>
          </ol>
        </div>

        {/* Server Endpoints */}
        <div>
          <h4 className="font-semibold mb-2">Server Endpoints (port 8080):</h4>
          <ul className="space-y-1 text-sm">
            <li>
              <strong>WebSocket:</strong>{' '}
              <code className="bg-muted px-1 py-0.5 rounded">
                ws://localhost:8080/ws
              </code>
            </li>
            <li>
              <strong>Health:</strong>{' '}
              <a
                href="http://localhost:8080/health"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                http://localhost:8080/health
              </a>
            </li>
            <li>
              <strong>Stats:</strong>{' '}
              <a
                href="http://localhost:8080/stats"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                http://localhost:8080/stats
              </a>
            </li>
          </ul>
        </div>

        {/* Technical Note */}
        <div className="bg-muted p-3 rounded-lg">
          <p className="text-sm text-muted-foreground">
            <strong>Note:</strong> This Next.js application connects to the
            WebSocket server running on port 8080. Make sure the server is
            running before attempting to connect.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
