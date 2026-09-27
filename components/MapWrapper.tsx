'use client';

import dynamic from 'next/dynamic';
import { FleetMapProps } from './FleetMap';

// Safe dynamic import inside a Client Component
const FleetMap = dynamic(() => import('./FleetMap'), {
  ssr: false,
  loading: () => (
    <div className="h-[550px] w-full bg-slate-800 animate-pulse rounded-xl flex items-center justify-center text-slate-400">
      Loading Interactive Fleet Map...
    </div>
  ),
});

export default function MapWrapper(props: FleetMapProps) {
  return <FleetMap {...props} />;
}