import React, { useState } from 'react';
import { Wine, MapPin, Phone, Mail, Clock, ArrowRight, Heart, Check } from 'lucide-react';
import { Language } from '../types';

interface FooterProps {
  currentLang: Language;
  onOpenOrderModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ currentLang, onOpenOrderModal }) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 4000);
      setNewsletterEmail('');
    }
  };

  return (
    <footer className="bg-paper-textured text-zinc-900 border-t border-zinc-300 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Col 1 & 2: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-lg bg-black p-1 border border-zinc-300 flex items-center justify-center">
                <Wine className="w-5 h-5 text-red-500" />
              </div>
              <div>
                <div className="text-xl font-black tracking-tight text-black flex items-center gap-0.5">
                  <span>NOVA</span>
                  <span className="text-red-600 font-serif italic">e</span>
                  <span className="text-black">TAPA</span>
                </div>
                <p className="text-[10px] tracking-widest text-zinc-600 font-bold uppercase">
                  Palma Nova · Mallorca
                </p>
              </div>
            </div>

            <p className="text-xs text-zinc-700 leading-relaxed max-w-sm font-bold">
              Homemade Sangrias & Local Tapas
            </p>


            <div className="space-y-1.5 text-xs text-zinc-800 font-bold">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-red-600 shrink-0" />
                <span>Passeig Mar, 32, Loc 2, 07181 Palma Nova, España</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-red-600 shrink-0" />
                <a href="tel:+34971678190" className="hover:text-red-600">
                  +34 971 67 81 90
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-red-600 shrink-0" />
                <span>{currentLang === 'es' ? '10:00 – 23:00 (Miércoles cerrado)' : '10:00 AM – 11:00 PM (Wed Closed)'}</span>
              </div>
            </div>
          </div>

          {/* Col 3: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-black text-black uppercase tracking-wider">{currentLang === 'es' ? 'Navegación' : 'Explore'}</h4>
            <ul className="space-y-2 text-xs text-zinc-700 font-medium">
              <li>
                <a href="#menu" className="hover:text-red-600 transition-colors">
                  {currentLang === 'es' ? 'Menú Completo' : 'Full Menu'}
                </a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-red-600 transition-colors">
                  {currentLang === 'es' ? 'Opiniones 4.7★' : '4.7★ Google Reviews'}
                </a>
              </li>
              <li>
                <a href="#atmosphere" className="hover:text-red-600 transition-colors">
                  {currentLang === 'es' ? 'Galería & Ambiente' : 'Gallery & Vibe'}
                </a>
              </li>
              <li>
                <a href="#location" className="hover:text-red-600 transition-colors">
                  {currentLang === 'es' ? 'Ubicación' : 'Location & Map'}
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Dining Info */}
          <div className="space-y-3">
            <h4 className="text-xs font-black text-black uppercase tracking-wider">{currentLang === 'es' ? 'Destacados' : 'Popular Items'}</h4>
            <ul className="space-y-2 text-xs text-zinc-700 font-medium">
              <li>Gambas al Ajillo</li>
              <li>Patatas Bravas Caseras</li>
              <li>Sangría de Cava</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-zinc-300 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-600 font-medium">
          <p>© {new Date().getFullYear()} NOVA e TAPA Palma Nova. {currentLang === 'es' ? 'Todos los derechos reservados.' : 'All rights reserved.'}</p>
          <div className="flex items-center gap-4">
            <span>Passeig Mar 32, Palma Nova</span>
            <span>•</span>
            <button onClick={onOpenOrderModal} className="hover:text-red-600 font-bold uppercase">
              {currentLang === 'es' ? 'Pedir Online' : 'Order Online'}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
