import React from 'react';
import { Star, MapPin, Calendar, ArrowRight, ShieldCheck, Clock, Wine, UtensilsCrossed } from 'lucide-react';
import { Language } from '../types';

interface HeroProps {
  currentLang: Language;
  onOpenReservation: () => void;
}

export const Hero: React.FC<HeroProps> = ({ currentLang, onOpenReservation }) => {
  const content = {
    es: {
      badge: 'Palma Nova, Mallorca · Passeig Mar 32',
      titleMain: 'Coctelería de Autor &',
      titleSub: 'Tapas Auténticas',
      description:
        'El lugar de referencia en Palma Nova para disfrutar de tapas españolas recién hechas, sangrías de autor y coctelería a 100 metros del mar.',
      ctaReserve: 'Reservar Mesa Ahora',
      ctaMenu: 'Ver Carta Completa',
      ratingText: 'Reseñas Verificadas en Google (385+)',
      priceBadge: '10–20 € por persona',
      highlights: [
        { title: '4.7★ Valoración Google', subtitle: 'Más de 385 opiniones reales' },
        { title: 'Coctelería de Autor', subtitle: 'Sangría de cava y cócteles artesanos' },
        { title: 'Tapas de Mallorca', subtitle: 'Gambas al ajillo, bravas y jamón ibérico' },
        { title: 'Horario 10:00 – 23:00', subtitle: 'Abierto cada día (Miércoles cerrado)' },
      ],
      instantNotice: 'Confirmación Online Inmediata',
    },
    en: {
      badge: 'Palma Nova, Mallorca · Passeig Mar 32',
      titleMain: 'Craft Cocktails &',
      titleSub: 'Authentic Tapas',
      description:
        'Palma Nova’s premier lounge for handcrafted cocktails, sizzling Spanish prawns, and cold Cava sangria — just 100m from the sea.',
      ctaReserve: 'Book Table Now',
      ctaMenu: 'View Full Menu',
      ratingText: 'Google Verified Reviews (385+)',
      priceBadge: '10–20 € per person',
      highlights: [
        { title: '4.7★ Google Rating', subtitle: 'Over 385 authentic reviews' },
        { title: 'Craft Mixology', subtitle: 'Cava sangria & signature cocktails' },
        { title: 'Authentic Tapas', subtitle: 'Wild prawns, patatas bravas & ham' },
        { title: 'Hours 10:00 AM – 11:00 PM', subtitle: 'Open daily (Wednesdays closed)' },
      ],
      instantNotice: 'Instant Online Table Confirmation',
    },
    fr: {
      badge: 'Palma Nova, Majorque · Passeig Mar 32',
      titleMain: 'Cocktails Artisanaux &',
      titleSub: 'Tapas Authentiques',
      description:
        'Le lounge incontournable de Palma Nova pour savourer des tapas espagnoles fraîches et des cocktails sur-mesure à 100m de la plage.',
      ctaReserve: 'Réserver une Table',
      ctaMenu: 'Découvrir le Menu',
      ratingText: 'Avis Google Vérifiés (385+)',
      priceBadge: '10–20 € par personne',
      highlights: [
        { title: 'Note 4.7★ Google', subtitle: 'Plus de 385 avis certifiés' },
        { title: 'Mixologie Artisanale', subtitle: 'Sangria au cava & cocktails' },
        { title: 'Tapas de Majorque', subtitle: 'Gambas grillées, patatas bravas' },
        { title: 'Horaires 10h – 23h', subtitle: 'Ouvert chaque jour (Fermé mercredi)' },
      ],
      instantNotice: 'Confirmation de Table Immédiate',
    },
  };

  const t = content[currentLang] || content.es;

  return (
    <section className="relative bg-paper-textured text-zinc-900 pt-8 pb-16 lg:py-20 border-b border-zinc-300">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headline & Action CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Location & Rating Badge Header */}
            <div className="inline-flex flex-wrap items-center justify-center lg:justify-start gap-2.5 bg-white border-2 border-zinc-900 rounded-full px-4 py-1.5 text-xs text-zinc-900 shadow-sm">
              <span className="flex items-center gap-1.5 text-red-600 font-extrabold">
                <span className="w-2.5 h-2.5 rounded-full bg-red-600 inline-block" />
                <MapPin className="w-3.5 h-3.5 text-red-600" />
                {t.badge}
              </span>
              <span className="text-zinc-300">•</span>
              <span className="flex items-center gap-1 font-black text-amber-600">
                <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                4.7 / 5.0
              </span>
              <span className="text-zinc-300 hidden sm:inline">•</span>
              <span className="text-zinc-700 text-[11px] font-bold hidden sm:inline">{t.priceBadge}</span>
            </div>

            {/* Headline matching Nova eTapa poster branding */}
            <div className="space-y-1">
              <div className="text-2xl sm:text-3xl font-black text-red-600 tracking-widest font-serif italic uppercase">
                Tapas & Copas
              </div>
              <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight text-black leading-none uppercase">
                <span>NOVA </span>
                <span className="text-red-600 font-serif italic lowercase text-6xl sm:text-8xl lg:text-9xl -mx-1 inline-block">e</span>
                <span> TAPA</span>
              </h1>
              <p className="text-2xl sm:text-3xl font-extrabold text-zinc-900 pt-2 tracking-tight">
                {t.titleMain} <span className="text-red-600 font-serif italic">{t.titleSub}</span>
              </p>
            </div>

            {/* Subdescription */}
            <p className="text-base sm:text-lg text-zinc-700 max-w-2xl mx-auto lg:mx-0 font-medium leading-relaxed">
              {t.description}
            </p>

            {/* Action CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button
                onClick={onOpenReservation}
                className="w-full sm:w-auto min-h-[48px] px-8 py-3.5 rounded-xl bg-red-600 hover:bg-red-700 active:scale-95 text-white font-black text-sm sm:text-base shadow-md border-2 border-red-700 transition-all flex items-center justify-center gap-3 group uppercase tracking-wider"
              >
                <Calendar className="w-5 h-5 text-white" />
                <span>{t.ctaReserve}</span>
                <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href="#menu"
                className="w-full sm:w-auto min-h-[48px] px-7 py-3.5 rounded-xl bg-black hover:bg-zinc-900 active:scale-95 border-2 border-black text-white font-extrabold text-sm transition-all flex items-center justify-center gap-2 uppercase tracking-wider"
              >
                <UtensilsCrossed className="w-4 h-4 text-red-500" />
                <span>{t.ctaMenu}</span>
              </a>
            </div>

            {/* Trust bar */}
            <div className="pt-4 border-t border-zinc-300 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-zinc-700">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80"
                    className="w-7 h-7 rounded-full border-2 border-white object-cover"
                    alt="Guest review"
                    referrerPolicy="no-referrer"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80"
                    className="w-7 h-7 rounded-full border-2 border-white object-cover"
                    alt="Guest review"
                    referrerPolicy="no-referrer"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=80&q=80"
                    className="w-7 h-7 rounded-full border-2 border-white object-cover"
                    alt="Guest review"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="text-left">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                    ))}
                  </div>
                  <span className="text-[11px] text-zinc-800 font-bold">{t.ratingText}</span>
                </div>
              </div>

              <div className="h-4 w-[1px] bg-zinc-300 hidden sm:block" />

              <div className="flex items-center gap-1.5 text-zinc-900 font-bold">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>{t.instantNotice}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Poster Image Display */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="relative rounded-2xl bg-black border-4 border-black p-3 shadow-xl">
                <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-black">
                  <img
                    src="/src/assets/images/nova_flamenco_poster_1784988560790.jpg"
                    alt="Nova eTapa Tapas & Copas Poster"
                    className="w-full h-full object-contain bg-black"
                    referrerPolicy="no-referrer"
                  />

                  {/* Top Left Logo Badge */}
                  <div className="absolute top-3 left-3 bg-black/90 backdrop-blur-sm border-2 border-red-600 px-2.5 py-1 rounded-xl flex items-center gap-2 shadow-lg">
                    <div className="w-6 h-6 rounded-md bg-black border border-red-600 flex items-center justify-center relative overflow-hidden shrink-0">
                      <div className="absolute top-0.5 left-0.5 w-1 h-1 rounded-full bg-red-600" />
                      <div className="absolute bottom-0.5 right-0.5 w-1 h-1 rounded-full bg-white" />
                      <Wine className="w-3.5 h-3.5 text-red-500" />
                    </div>
                    <div className="text-[11px] font-black tracking-tight text-white flex items-center gap-0.5 uppercase">
                      <span>Nova</span>
                      <span className="text-red-500 font-serif italic lowercase -mx-0.5">e</span>
                      <span>Tapa</span>
                    </div>
                  </div>

                  {/* Overlay Bottom Card */}
                  <div className="absolute bottom-3 left-3 right-3 p-3.5 rounded-xl bg-black/95 border border-zinc-800 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-red-600 flex items-center justify-center shrink-0">
                        <Wine className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="text-xs font-black text-white uppercase tracking-wider">
                          NOVA e TAPA
                        </div>
                        <p className="text-[11px] text-red-500 font-serif italic">Tapas & Copas · Palma Nova</p>
                      </div>
                    </div>

                    <button
                      onClick={onOpenReservation}
                      className="px-3.5 py-2 text-xs font-black rounded-xl bg-red-600 hover:bg-red-500 active:scale-95 text-white transition-all uppercase tracking-wider shrink-0 shadow-sm"
                    >
                      {currentLang === 'es' ? 'Reservar' : 'Book'}
                    </button>
                  </div>
                </div>

                {/* Sub Features */}
                <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center gap-2.5 text-white">
                    <UtensilsCrossed className="w-4 h-4 text-red-500 shrink-0" />
                    <div>
                      <div className="font-black text-[11px] uppercase">Tapas Frescas</div>
                      <div className="text-[10px] text-zinc-400">Gambas, Bravas, Ibéricos</div>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center gap-2.5 text-white">
                    <Clock className="w-4 h-4 text-red-500 shrink-0" />
                    <div>
                      <div className="font-black text-[11px] uppercase">Horario Amplio</div>
                      <div className="text-[10px] text-zinc-400">10:00 AM – 02:00 AM</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Highlights Cards */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {t.highlights.map((h, index) => (
            <div
              key={index}
              className="p-5 rounded-xl bg-white border-2 border-zinc-300 hover:border-black transition-all"
            >
              <div className="w-8 h-8 rounded-lg bg-black flex items-center justify-center mb-3 text-red-500">
                {index === 0 && <Star className="w-4 h-4 fill-amber-500 text-amber-500" />}
                {index === 1 && <Wine className="w-4 h-4 text-red-500" />}
                {index === 2 && <UtensilsCrossed className="w-4 h-4 text-red-500" />}
                {index === 3 && <Clock className="w-4 h-4 text-red-500" />}
              </div>
              <h3 className="font-extrabold text-sm text-black mb-1">{h.title}</h3>
              <p className="text-xs text-zinc-600 font-medium">{h.subtitle}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

