import Link from 'next/link';
import { Navigation, ShieldCheck, MapPin, Zap, Activity, Users, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function HomePage() {
  return (
    <main className="relative overflow-hidden">
      
      {/* Background Glow Overlay */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-600/15 blur-[120px] rounded-full pointer-events-none" />

      {/* Hero Section */}
      <section className="relative mx-auto max-w-7xl px-6 pt-24 pb-20 text-center md:pt-32 md:pb-28">
        <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-xs font-semibold text-blue-400 mb-8">
          <Zap className="h-3.5 w-3.5" />
          <span>FleetPulse v2.0 Released with 2dsphere Geospatial Dispatch</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-tight">
          Next-Generation Fleet Tracking & <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Smart Geospatial Dispatch</span>
        </h1>

        <p className="mt-6 text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Streamline vehicle assignments, optimize routes in real time, and gain complete visibility over your logistics operations with automated trip lifecycles.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/demo"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-blue-600/25 hover:bg-blue-500 active:scale-[0.98] transition-all"
          >
            <span>Start Free Trial</span>
            <ArrowRight className="h-5 w-5" />
          </Link>
          <Link
            href="#features"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-slate-800 bg-slate-900/50 px-7 py-3.5 text-base font-semibold text-slate-300 hover:bg-slate-800 hover:text-white transition-all"
          >
            Explore Platform
          </Link>
        </div>

        {/* Stats Strip */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 border-y border-slate-800/80 py-8 text-center">
          <div>
            <div className="text-3xl font-extrabold text-white">99.9%</div>
            <div className="text-xs text-slate-400 mt-1 uppercase tracking-wider font-medium">Uptime SLA</div>
          </div>
          <div>
            <div className="text-3xl font-extrabold text-white">&lt; 50ms</div>
            <div className="text-xs text-slate-400 mt-1 uppercase tracking-wider font-medium">Geospatial Query</div>
          </div>
          <div>
            <div className="text-3xl font-extrabold text-white">100k+</div>
            <div className="text-xs text-slate-400 mt-1 uppercase tracking-wider font-medium">Trips Dispatched</div>
          </div>
          <div>
            <div className="text-3xl font-extrabold text-white">35%</div>
            <div className="text-xs text-slate-400 mt-1 uppercase tracking-wider font-medium">Fuel Cost Saved</div>
          </div>
        </div>
      </section>

      {/* Feature Section */}
      <section id="features" className="mx-auto max-w-7xl px-6 py-20">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-white">Built for High-Scale Fleet Operations</h2>
          <p className="text-slate-400 mt-3">From multi-tenant management to live route updates, FleetPulse provides every tool required for modern logistics.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Feature 1 */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-8 hover:border-slate-700 transition-all">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600/10 text-blue-500 mb-6">
              <Navigation className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-white">2dsphere Geospatial Dispatch</h3>
            <p className="mt-3 text-sm text-slate-400 leading-relaxed">
              Find the nearest available driver instantly using indexed geospatial location queries and automatically calculate optimal pickup routes.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-8 hover:border-slate-700 transition-all">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600/10 text-indigo-500 mb-6">
              <MapPin className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-white">Live Leaflet Map Tracking</h3>
            <p className="mt-3 text-sm text-slate-400 leading-relaxed">
              Real-time vehicle telemetry and interactive Leaflet map overlays give dispatchers full visibility across active trips.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-8 hover:border-slate-700 transition-all">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-600/10 text-emerald-500 mb-6">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-white">Atomic Transactions & RBAC</h3>
            <p className="mt-3 text-sm text-slate-400 leading-relaxed">
              Guaranteed data integrity for driver availability, vehicle assignments, and role-based permissions across your entire tenant workforce.
            </p>
          </div>

        </div>
      </section>

      {/* Call To Action Section */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-900/40 to-slate-900 border border-blue-500/20 p-10 md:p-16 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="text-3xl font-extrabold text-white">Ready to optimize your fleet dispatching?</h2>
            <p className="text-slate-300 mt-2 max-w-xl">Set up your multi-tenant account in minutes and manage vehicles with precision.</p>
          </div>
          <Link
            href="/demo"
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-8 py-4 text-base font-semibold text-white shadow-xl hover:bg-blue-500 transition-all whitespace-nowrap"
          >
            <span>Get Started Now</span>
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>

    </main>
  );
}