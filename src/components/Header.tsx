import React, { useState, useEffect } from 'react';
import { Phone, MapPin, Clock, Calendar, Utensils, Globe, Menu as MenuIcon, X, Wine } from 'lucide-react';
import { Language } from '../types';

interface HeaderProps {
  currentLang: Language;
  onSelectLang: (lang: Language) => void;
  onOpenReservation: () => void;
  onOpenOrderDrawer: () => void;
  orderCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentLang,
  onSelectLang,
  onOpenReservation,
  onOpenOrderDrawer,
  orderCount,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLabels = {
    es: {
      menu: 'Carta & Tapas',
      reviews: '4.7★ Reseñas',
      location: 'Palma Nova',
      vibe: 'Ambiente',
      reserve: 'Reservar Mesa',
      tastingBox: 'Mi Pedido',
      hours: '10:00 - 23:00 (Miércoles cerrado)',
    },
    en: {
      menu: 'Menu & Tapas',
      reviews: '4.7★ Reviews',
      location: 'Palma Nova',
      vibe: 'Atmosphere',
      reserve: 'Book Table',
      tastingBox: 'My Tray',
      hours: '10:00 AM - 11:00 PM (Wed Closed)',
    },
  };

  const t = navLabels[currentLang] || navLabels.es;

  return (
    <>
      {/* Top Utility Bar */}
      <div className="bg-black text-white text-xs py-2 px-4 hidden md:block select-none border-b border-zinc-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-zinc-300 font-medium">
              <MapPin className="w-3.5 h-3.5 text-red-600" />
              Passeig Mar, 32, Loc 2, 07181 Palma Nova, Mallorca
            </span>
            <span className="flex items-center gap-1.5 text-zinc-300 font-medium">
              <Clock className="w-3.5 h-3.5 text-red-600" />
              {t.hours}
            </span>
          </div>

          <div className="flex items-center gap-6">
            <a
              href="tel:+34971678190"
              className="flex items-center gap-1.5 hover:text-red-400 transition-colors text-zinc-200 font-bold"
            >
              <Phone className="w-3.5 h-3.5 text-red-600" />
              +34 971 67 81 90
            </a>

            <div className="h-3.5 w-[1px] bg-zinc-800" />

            {/* Language Switcher ES / EN */}
            <div className="flex items-center gap-1 bg-zinc-900 p-0.5 rounded-lg border border-zinc-800">
              <Globe className="w-3.5 h-3.5 text-red-500 ml-1.5" />
              {(['es', 'en'] as Language[]).map((lang) => (
                <button
                  key={lang}
                  onClick={() => onSelectLang(lang)}
                  className={`px-2 py-0.5 rounded text-[11px] font-black uppercase transition-all ${
                    currentLang === lang
                      ? 'bg-red-600 text-white shadow-sm'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  {lang === 'es' ? 'Español' : 'English'}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Sticky Navbar */}
      <header
        className={`sticky top-0 z-40 transition-all duration-200 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md border-b border-zinc-200 py-3 shadow-sm'
            : 'bg-white border-b border-zinc-200 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          {/* Logo Brand matching Nova eTapa poster */}
          <a href="#" className="group flex items-center gap-2 sm:gap-3 shrink-0">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-black border-2 border-red-600 flex items-center justify-center transition-all relative overflow-hidden shrink-0">
              <div className="absolute top-1 left-1 w-1 sm:w-1.5 h-1 sm:h-1.5 rounded-full bg-red-600" />
              <div className="absolute bottom-1 right-1 w-1 sm:w-1.5 h-1 sm:h-1.5 rounded-full bg-white" />
              <Wine className="w-4 h-4 sm:w-5 sm:h-5 text-red-500" />
            </div>
            <div>
              <div className="text-lg sm:text-2xl font-black tracking-tight text-black flex items-center gap-0.5 leading-none uppercase">
                <span>Nova</span>
                <span className="text-red-600 font-serif italic text-lg sm:text-2xl lowercase -mx-0.5">e</span>
                <span>Tapa</span>
              </div>
              <p className="text-[9px] sm:text-[11px] text-red-600 font-serif italic font-extrabold tracking-widest -mt-0.5">
                Tapas & Copas
              </p>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-bold text-zinc-800">
            <a href="#menu" className="hover:text-red-600 transition-colors">
              {t.menu}
            </a>
            <a href="#reviews" className="hover:text-red-600 transition-colors flex items-center gap-1">
              <span className="text-amber-500 text-xs font-bold">4.7★</span>
              {t.reviews}
            </a>
            <a href="#atmosphere" className="hover:text-red-600 transition-colors">
              {t.vibe}
            </a>
            <a href="#location" className="hover:text-red-600 transition-colors">
              {t.location}
            </a>
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-1.5 sm:gap-3">
            {/* Quick ES / EN toggle for mobile */}
            <div className="flex lg:hidden items-center bg-zinc-100 p-0.5 rounded-xl border border-zinc-300">
              {(['es', 'en'] as Language[]).map((lang) => (
                <button
                  key={lang}
                  onClick={() => onSelectLang(lang)}
                  className={`px-1.5 sm:px-2.5 py-1 sm:py-1.5 rounded-lg text-[10px] sm:text-xs font-black uppercase transition-all active:scale-95 ${
                    currentLang === lang ? 'bg-red-600 text-white shadow-sm' : 'text-zinc-700 hover:text-black'
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>

            {/* Tasting Order Tray Drawer Button */}
            <button
              onClick={onOpenOrderDrawer}
              className="relative min-h-[36px] sm:min-h-[42px] px-2 sm:px-3 py-1.5 sm:py-2 rounded-xl bg-zinc-100 border-2 border-zinc-300 hover:border-black active:scale-95 text-zinc-900 transition-all flex items-center gap-1.5 sm:gap-2 shadow-sm"
              title="View Tray"
            >
              <Utensils className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-600" />
              <span className="hidden sm:inline text-xs font-bold">{t.tastingBox}</span>
              {orderCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-red-600 text-white text-[10px] sm:text-[11px] font-black flex items-center justify-center shadow-md">
                  {orderCount}
                </span>
              )}
            </button>

            {/* Primary Reserve Table Button */}
            <button
              onClick={onOpenReservation}
              className="min-h-[36px] sm:min-h-[42px] px-2.5 sm:px-5 py-1.5 sm:py-2.5 rounded-xl bg-red-600 hover:bg-red-700 active:scale-95 text-white font-extrabold text-[11px] sm:text-sm transition-all flex items-center gap-1 sm:gap-2 uppercase tracking-wider shadow-sm border border-red-700"
            >
              <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>{t.reserve}</span>
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden min-h-[36px] min-w-[36px] sm:min-h-[42px] sm:min-w-[42px] p-1 sm:p-2 rounded-xl bg-zinc-100 active:scale-95 text-zinc-900 border-2 border-zinc-300 hover:border-black flex items-center justify-center"
            >
              {mobileMenuOpen ? <X className="w-4 h-4 sm:w-5 sm:h-5" /> : <MenuIcon className="w-4 h-4 sm:w-5 sm:h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-zinc-200 px-4 py-5 mt-2 space-y-4 shadow-lg">
            <nav className="flex flex-col space-y-3 text-sm font-bold text-zinc-900">
              <a
                href="#menu"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-red-600 py-1.5 border-b border-zinc-100"
              >
                {t.menu}
              </a>
              <a
                href="#reviews"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-red-600 py-1.5 border-b border-zinc-100"
              >
                {t.reviews}
              </a>
              <a
                href="#atmosphere"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-red-600 py-1.5 border-b border-zinc-100"
              >
                {t.vibe}
              </a>
              <a
                href="#location"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-red-600 py-1.5 border-b border-zinc-100"
              >
                {t.location}
              </a>
            </nav>

            <div className="pt-2 flex items-center justify-between text-xs text-zinc-600">
              <div className="flex items-center gap-1.5">
                <Globe className="w-4 h-4 text-red-600" />
                {(['es', 'en'] as Language[]).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => onSelectLang(lang)}
                    className={`px-2 py-1 rounded text-xs font-bold uppercase ${
                      currentLang === lang ? 'bg-red-600 text-white' : 'bg-zinc-100 text-zinc-700'
                    }`}
                  >
                    {lang === 'es' ? 'ES' : 'EN'}
                  </button>
                ))}
              </div>

              <a href="tel:+34971678190" className="flex items-center gap-1.5 text-red-600 font-extrabold">
                <Phone className="w-3.5 h-3.5" />
                +34 971 67 81 90
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
