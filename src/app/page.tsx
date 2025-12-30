import { ChatFeature } from '@/features/chat/components/ChatFeature';

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 font-sans dark:bg-zinc-900 p-4">
      <main className="max-w-2xl mx-auto py-8">
        <ChatFeature />
      </main>
    </div>
  );
}
