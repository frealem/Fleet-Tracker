import { Truck } from 'lucide-react';

interface LoadingPulseProps {
  text?: string;
  subText?: string;
}

export function LoadingPulse({ 
  text = "Connecting to FleetPulse Network...", 
  subText = "Optimizing geospatial dispatch routes" 
}: LoadingPulseProps) {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-slate-950 px-6 antialiased">
      <div className="relative flex flex-col items-center justify-center">
        
        <div className="relative flex items-center justify-center mb-8">

          <div className="absolute h-32 w-32 rounded-full bg-emerald-500/20 animate-ping [animation-duration:2s]" />
          

          <div className="absolute h-24 w-24 rounded-full bg-emerald-500/30 animate-pulse" />

          <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-2xl shadow-emerald-500/40 border border-emerald-400/20">
            <Truck className="h-8 w-8 animate-bounce [animation-duration:1.5s]" />
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-3xl font-bold tracking-tighter text-white mb-3">
          <span>Fleet</span>
          <span className="text-emerald-500">Pulse</span>
        </div>

        <p className="text-sm font-semibold tracking-wide text-white animate-pulse">
          {text}
        </p>
        
        <p className="text-xs text-slate-500 mt-1.5">
          {subText}
        </p>

      </div>
    </div>
  );
}