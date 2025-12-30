'use client';

import { Placeholder } from '@/components/placeholder';

export default function Error({ error }: { error: Error }) {
  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <Placeholder label={error.message ?? 'Something went wrong!'} />
    </div>
  );
}
