import Link from 'next/link';
import { Truck, Mail, MapPin, Phone } from 'lucide-react';
import { FaGithub, FaLinkedin, FaXTwitter } from 'react-icons/fa6';

export function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 text-slate-400">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10"> 
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-600 text-white">
                <Truck className="h-5 w-5" />
              </div>
              <span className="text-lg font-bold text-white">FleetPulse</span>
            </div>
            <p className="text-sm leading-relaxed text-slate-400">
              Enterprise-grade fleet management and geospatial dispatch platform enabling real-time asset tracking, driver optimization, and automated trip lifecycles.
            </p>
            <div className="flex gap-4 text-slate-400">
              <a href="#" className="hover:text-emerald-400 transition-colors"><FaXTwitter className="h-5 w-5" /></a>
              <a href="#" className="hover:text-emerald-400 transition-colors"><FaLinkedin className="h-5 w-5" /></a>
              <a href="#" className="hover:text-emerald-400 transition-colors"><FaGithub className="h-5 w-5" /></a>
            </div>
          </div>

        
          <div className="space-y-3">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-200">Platform</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="#dispatch" className="hover:text-white transition-colors">Geospatial Dispatch</Link></li>
              <li><Link href="#tracking" className="hover:text-white transition-colors">Live GPS Tracking</Link></li>
              <li><Link href="#drivers" className="hover:text-white transition-colors">Driver Management</Link></li>
              <li><Link href="#maintenance" className="hover:text-white transition-colors">Vehicle Maintenance</Link></li>
              <li><Link href="#analytics" className="hover:text-white transition-colors">Reports & Analytics</Link></li>
            </ul>
          </div>

        
          <div className="space-y-3">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-200">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/careers" className="hover:text-white transition-colors">Careers</Link></li>
              <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

        
          <div className="space-y-3">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-200">Contact</h4>
            <ul className="space-y-2.5 text-sm">
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-emerald-500" />
                <span>Addis Ababa, Ethiopia</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-emerald-500" />
                <span>support@fleetpulse.io</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-emerald-500" />
                <span>+251 900 000 000</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="mt-12 border-t border-slate-800/80 pt-8 text-center text-xs text-slate-500">
          © {new Date().getFullYear()} FleetPulse Inc. All rights reserved!
        </div>
      </div>
    </footer>
  );
}