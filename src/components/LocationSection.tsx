import React, { useState } from 'react';
import { MapPin, Phone, Clock, ExternalLink, Navigation, Check, Layers } from 'lucide-react';
import { Language } from '../types';

interface LocationSectionProps {
  currentLang: Language;
}

export const LocationSection: React.FC<LocationSectionProps> = ({ currentLang }) => {
  const [copied, setCopied] = useState(false);
  const [mapType, setMapType] = useState<'roadmap' | 'satellite'>('roadmap');

  const fullAddress = 'Passeig Mar, 32, Loc 2, 07181 Palma Nova, Illes Balears, España';

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(fullAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const mapEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(
    'Passeig Mar 32, Loc 2, 07181 Palma Nova, Balearic Islands, Spain'
  )}&t=${mapType === 'satellite' ? 'k' : ''}&z=16&ie=UTF8&iwloc=&output=embed`;

  return (
    <section id="location" className="py-16 lg:py-24 bg-paper-textured text-zinc-900 border-b border-zinc-300 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Location Info Column */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black text-white text-xs font-black uppercase tracking-wider">
              <MapPin className="w-3.5 h-3.5 text-red-500" />
              <span>{currentLang === 'es' ? 'Ubicación Exacta & Contacto' : 'Exact Location & Contact'}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-black uppercase">
              {currentLang === 'es' ? 'Encuéntranos en ' : 'Visit NOVA e TAPA in '}
              <span className="text-red-600 font-serif italic">Palma Nova</span>
            </h2>

            <p className="text-zinc-700 text-sm leading-relaxed font-medium">
              {currentLang === 'es'
                ? 'Situados en el emblemático Passeig Mar, a escasos 100 metros del mar y de la playa principal de Palma Nova, Calvià, Mallorca.'
                : 'Located right on the vibrant Passeig Mar beachfront promenade, just 100 meters from Palma Nova beach in Calvià, Mallorca.'}
            </p>

            {/* Address Details Card */}
            <div className="p-6 rounded-2xl bg-white border-2 border-zinc-300 space-y-4 shadow-sm">
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-black text-white shrink-0 mt-1">
                  <MapPin className="w-5 h-5 text-red-500" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-black text-sm text-black uppercase">{currentLang === 'es' ? 'Dirección Exacta' : 'Full Address'}</h4>
                    <button
                      onClick={handleCopyAddress}
                      className="inline-flex items-center gap-1 text-[11px] font-bold text-red-600 hover:text-red-700 bg-red-50 px-2 py-0.5 rounded border border-red-200 transition-colors"
                    >
                      {copied ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-600" />
                          <span className="text-emerald-700">{currentLang === 'es' ? '¡Copiado!' : 'Copied!'}</span>
                        </>
                      ) : (
                        <span>{currentLang === 'es' ? 'Copiar Dirección' : 'Copy Address'}</span>
                      )}
                    </button>
                  </div>
                  <p className="text-xs text-zinc-900 font-extrabold mt-1">Passeig Mar, 32, Loc 2, 07181 Palma Nova</p>
                  <p className="text-[11px] text-zinc-600 font-medium">Islas Baleares, España · Local a Pie de Calle</p>
                  <p className="text-[11px] text-red-600 font-mono font-bold mt-1">Coordenadas: 39.5168° N, 2.5358° E</p>
                </div>
              </div>

              <div className="h-[1px] bg-zinc-200" />

              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-black text-white shrink-0 mt-1">
                  <Clock className="w-5 h-5 text-red-500" />
                </div>
                <div>
                  <h4 className="font-black text-sm text-black uppercase">{currentLang === 'es' ? 'Horario de Apertura' : 'Opening Hours'}</h4>
                  <p className="text-xs text-zinc-900 font-extrabold mt-0.5">
                    {currentLang === 'es' ? '10:00 – 23:00 (Jueves a Martes sin interrupción)' : '10:00 AM – 11:00 PM (Thursday to Tuesday non-stop)'}
                  </p>
                  <p className="text-[11px] text-red-600 font-bold">
                    {currentLang === 'es' ? 'Miércoles: CERRADO por descanso del personal' : 'Wednesday: CLOSED (Staff Rest Day)'}
                  </p>
                </div>
              </div>

              <div className="h-[1px] bg-zinc-200" />

              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-black text-white shrink-0 mt-1">
                  <Phone className="w-5 h-5 text-red-500" />
                </div>
                <div>
                  <h4 className="font-black text-sm text-black uppercase">{currentLang === 'es' ? 'Teléfono Directo' : 'Direct Phone'}</h4>
                  <a href="tel:+34971678190" className="text-sm text-red-600 font-black hover:underline">
                    +34 971 67 81 90
                  </a>
                  <p className="text-[11px] text-zinc-500 font-medium">
                    {currentLang === 'es' ? 'Llámanos para reservas de mesa, consultas o grupos' : 'Call for table bookings, special dietary requests or group inquiries'}
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Action Links */}
            <div className="flex flex-wrap gap-3">
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
                  'Passeig Mar 32 Loc 2 07181 Palma Nova Balearic Islands Spain'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 rounded-xl bg-red-600 hover:bg-red-700 active:scale-95 text-white font-black text-xs flex items-center gap-2 transition-all uppercase tracking-wider shadow-md hover:shadow-lg"
              >
                <Navigation className="w-4 h-4" />
                <span>{currentLang === 'es' ? 'Cómo Llegar (GPS Route)' : 'Get Driving Directions'}</span>
                <ExternalLink className="w-3.5 h-3.5 text-white/80" />
              </a>

              <a
                href="tel:+34971678190"
                className="px-5 py-3 rounded-xl bg-black hover:bg-zinc-800 active:scale-95 text-white font-black text-xs flex items-center gap-2 transition-all uppercase tracking-wider shadow-md"
              >
                <Phone className="w-4 h-4 text-red-500" />
                <span>{currentLang === 'es' ? 'Llamar al Restaurante' : 'Call Restaurant'}</span>
              </a>
            </div>
          </div>

          {/* Right Visual Map Card Frame */}
          <div className="lg:col-span-6">
            <div className="rounded-2xl bg-white border-2 border-zinc-300 p-3 shadow-md space-y-3">
              {/* Header Bar for Map Controls */}
              <div className="flex items-center justify-between px-2 pt-1 pb-2">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-600 animate-pulse" />
                  <span className="text-xs font-black uppercase text-black tracking-wide">
                    NOVA e TAPA · Passeig Mar, 32
                  </span>
                </div>

                <div className="flex items-center gap-1 bg-zinc-100 p-1 rounded-lg border border-zinc-200 text-[10px] font-bold">
                  <button
                    onClick={() => setMapType('roadmap')}
                    className={`px-2.5 py-1 rounded transition-colors ${
                      mapType === 'roadmap' ? 'bg-black text-white' : 'text-zinc-600 hover:text-black'
                    }`}
                  >
                    {currentLang === 'es' ? 'Mapa' : 'Map'}
                  </button>
                  <button
                    onClick={() => setMapType('satellite')}
                    className={`px-2.5 py-1 rounded transition-colors ${
                      mapType === 'satellite' ? 'bg-black text-white' : 'text-zinc-600 hover:text-black'
                    }`}
                  >
                    <span className="flex items-center gap-1">
                      <Layers className="w-3 h-3" />
                      {currentLang === 'es' ? 'Satélite' : 'Satellite'}
                    </span>
                  </button>
                </div>
              </div>

              {/* Styled Interactive Map Iframe Container */}
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-zinc-300 shadow-inner bg-zinc-200">
                <iframe
                  title="NOVAeTAPA Palma Nova Map"
                  src={mapEmbedUrl}
                  className="w-full h-full border-0 contrast-100"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />

                <div className="absolute top-3 left-3 px-3 py-1.5 rounded-lg bg-black/90 backdrop-blur-sm text-white text-[11px] font-black flex items-center gap-2 border border-zinc-700 shadow-md">
                  <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0" />
                  <span>Passeig Mar, 32, Loc 2, Palma Nova</span>
                </div>
              </div>

              {/* Proximity Distances */}
              <div className="grid grid-cols-3 gap-2 text-center text-[11px]">
                <div className="p-2.5 rounded-lg bg-zinc-100 border border-zinc-300">
                  <span className="text-zinc-500 block text-[10px] font-bold uppercase">{currentLang === 'es' ? 'Playa Palma Nova' : 'Palma Nova Beach'}</span>
                  <span className="font-extrabold text-black text-xs">100m (2 min)</span>
                </div>
                <div className="p-2.5 rounded-lg bg-zinc-100 border border-zinc-300">
                  <span className="text-zinc-500 block text-[10px] font-bold uppercase">{currentLang === 'es' ? 'Palma Centro' : 'Palma City'}</span>
                  <span className="font-extrabold text-black text-xs">15 min</span>
                </div>
                <div className="p-2.5 rounded-lg bg-zinc-100 border border-zinc-300">
                  <span className="text-zinc-500 block text-[10px] font-bold uppercase">{currentLang === 'es' ? 'Aeropuerto PMI' : 'PMI Airport'}</span>
                  <span className="font-extrabold text-black text-xs">20 min</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

