'use client';

import FloatingHearts from '@/components/FloatingHearts';
import ConfessionCard from '@/components/ConfessionCard';

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <FloatingHearts />
      <ConfessionCard />
    </main>
  );
}
