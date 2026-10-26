'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Truck, Navigation, Shield, BarChart3, Menu, X, ArrowRight } from 'lucide-react';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800 bg-slate-950/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-500/20 group-hover:bg-blue-500 transition-colors">
            <Truck className="h-5 w-5" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white">
            Fleet<span className="text-blue-500">Pulse</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          <Link href="#features" className="hover:text-blue-400 transition-colors">Features</Link>
          <Link href="#tracking" className="hover:text-blue-400 transition-colors">Live Tracking</Link>
          <Link href="#dispatch" className="hover:text-blue-400 transition-colors">Geospatial Dispatch</Link>
          <Link href="#analytics" className="hover:text-blue-400 transition-colors">Analytics</Link>
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/login"
            className="text-sm font-semibold text-slate-300 hover:text-white transition-colors"
          >
            Sign In
          </Link>
          <Link
            href="/demo"
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-blue-500 active:scale-[0.98] transition-all"
          >
            <span>Request Demo</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-slate-400 hover:text-white p-2"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-800 bg-slate-950 px-6 py-6 space-y-4">
          <nav className="flex flex-col gap-4 text-base font-medium text-slate-300">
            <Link href="#features" onClick={() => setMobileMenuOpen(false)}>Features</Link>
            <Link href="#tracking" onClick={() => setMobileMenuOpen(false)}>Live Tracking</Link>
            <Link href="#dispatch" onClick={() => setMobileMenuOpen(false)}>Geospatial Dispatch</Link>
            <Link href="#analytics" onClick={() => setMobileMenuOpen(false)}>Analytics</Link>
          </nav>
          <div className="pt-4 border-t border-slate-800 flex flex-col gap-3">
            <Link href="/login" className="w-full text-center text-slate-300 font-semibold py-2">
              Sign In
            </Link>
            <Link href="/demo" className="w-full text-center bg-blue-600 text-white font-semibold py-2.5 rounded-lg">
              Request Demo
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}