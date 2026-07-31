import React, { useState } from 'react';
import { Volume2, VolumeX, Music, Sparkles, Image as ImageIcon } from 'lucide-react';
import { Language } from '../types';
import image1 from '../assets/images/gallery_interior_1784994010224.jpg'
import image2 from '../assets/images/gallery_exterior_1784994025154.jpg'
import image3 from '../assets/images/gallery_plates_1784994038567.jpg'
import image4 from '../assets/images/gallery_atmosphere_1784994049405.jpg'
interface AtmosphereSectionProps {
  currentLang: Language;
}

export const AtmosphereSection: React.FC<AtmosphereSectionProps> = ({ currentLang }) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioOscillator, setAudioOscillator] = useState<AudioContext | null>(null);

  const galleryImages = [
    {
      title: currentLang === 'es' ? 'Interior & Salon Lounge' : 'Modern Interior Lounge',
      subtitle: currentLang === 'es' ? 'Diseño acogedor con toque mediterráneo' : 'Warm contemporary Mediterranean design',
      image: image1,
    },
    {
      title: currentLang === 'es' ? 'Nuestras Tapas & Platos' : 'Gourmet Plates & Tapas',
      subtitle: currentLang === 'es' ? 'Bravas, gambas, ibéricos y mariscos' : 'Sizzling prawns, bravas & fresh seafood',
      image: image3,
    },
    {
      title: currentLang === 'es' ? 'Ambiente Sunset & Vibe' : 'Evening Vibe & Atmosphere',
      subtitle: currentLang === 'es' ? 'Luces cálidas y coctelería al atardecer' : 'Twilight lights, cocktails & relaxed music',
      image: image4,
    },
  ];

  const toggleSoundtrack = () => {
    if (isPlayingAudio) {
      if (audioOscillator) {
        audioOscillator.close();
        setAudioOscillator(null);
      }
      setIsPlayingAudio(false);
    } else {
      try {
        const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(110, ctx.currentTime);
        gain.gain.setValueAtTime(0.05, ctx.currentTime);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();

        setAudioOscillator(ctx);
        setIsPlayingAudio(true);
      } catch (err) {
        console.warn('Web Audio API unavailable:', err);
      }
    }
  };

  return (
    <section id="atmosphere" className="py-16 lg:py-24 bg-paper-textured text-zinc-900 border-b border-zinc-300 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {galleryImages.map((img, idx) => (
            <div
              key={idx}
              className="group relative rounded-2xl overflow-hidden bg-white border-2 border-zinc-300 hover:border-black transition-all aspect-[3/4]"
            >
              <img
                src={img.image}
                alt={img.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />

              <div className="absolute bottom-4 left-4 right-4 space-y-1">
                <span className="text-[10px] uppercase font-black text-red-500 tracking-widest block">
                  NOVA e TAPA · Palma Nova
                </span>
                <h4 className="font-extrabold text-sm text-white">{img.title}</h4>
                <p className="text-[11px] text-zinc-300 font-medium">{img.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
