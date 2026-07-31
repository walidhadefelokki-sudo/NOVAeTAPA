import React, { useState } from 'react';
import { Phone, MapPin, Clock, X, Sparkles, Copy, Check, Utensils, Calendar } from 'lucide-react';
import { Language } from '../types';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLang: Language;
}

export const ReservationModal: React.FC<ReservationModalProps> = ({ isOpen, onClose, currentLang }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const PHONE_NUMBER = '+34971678190';
  const DISPLAY_PHONE = '+34 971 67 81 90';

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(DISPLAY_PHONE);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const labels = {
    es: {
      badge: 'Reserva & Pedidos Telefónicos',
      title: 'Llama Directamente para Reservar o Pedir',
      subtitle: 'Atención inmediata por teléfono para tu mesa en Palma Nova',
      callButton: 'Llamar Ahora: +34 971 67 81 90',
      copyButton: 'Copiar Número',
      copiedText: '¡Copiado!',
      hoursTitle: 'Horario de Atención',
      hoursText: '10:00 – 23:00 (Miércoles cerrado por descanso)',
      addressTitle: 'Ubicación',
      addressText: 'Passeig Mar 32, Loc 2, Palma Nova, Mallorca',
      notice: 'Llámanos directamente para reservar tu mesa, consultar disponibilidad de terraza o realizar tu pedido de tapas y copas.',
      doneButton: 'Cerrar',
    },
    en: {
      badge: 'Direct Phone Booking & Orders',
      title: 'Call Us Directly to Book or Order',
      subtitle: 'Instant phone service for your table or takeaway in Palma Nova',
      callButton: 'Call Now: +34 971 67 81 90',
      copyButton: 'Copy Number',
      copiedText: 'Copied!',
      hoursTitle: 'Opening Hours',
      hoursText: '10:00 AM – 11:00 PM (Closed Wednesdays)',
      addressTitle: 'Address',
      addressText: 'Passeig Mar 32, Loc 2, Palma Nova, Mallorca',
      notice: 'Call us directly to reserve your table, check terrace availability, or place your tapas & drinks order.',
      doneButton: 'Close',
    },
    fr: {
      badge: 'Réservation & Commandes Téléphoniques',
      title: 'Appelez-nous Directement pour Réserver ou Commander',
      subtitle: 'Service téléphonique immédiat pour votre table à Palma Nova',
      callButton: 'Appeler Maintenant: +34 971 67 81 90',
      copyButton: 'Copier le Numéro',
      copiedText: 'Copié !',
      hoursTitle: 'Horaires d’Ouverture',
      hoursText: '10h00 – 23h00 (Fermé le mercredi)',
      addressTitle: 'Adresse',
      addressText: 'Passeig Mar 32, Loc 2, Palma Nova, Majorque',
      notice: 'Appelez-nous directement pour réserver votre table, vérifier la disponibilité en terrasse ou passer commande.',
      doneButton: 'Fermer la Fenêtre',
    },
  };

  const t = labels[currentLang] || labels.es;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white border-2 border-black max-w-lg w-full rounded-2xl overflow-hidden shadow-2xl relative text-zinc-900">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-zinc-100 hover:bg-black text-zinc-800 hover:text-white flex items-center justify-center border border-zinc-300 font-bold transition-colors active:scale-95"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="p-6 bg-black text-white text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-600 text-white text-[11px] font-black uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>{t.badge}</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black tracking-tight uppercase leading-snug">
            {t.title}
          </h3>
          <p className="text-xs text-zinc-400 font-medium max-w-sm mx-auto">
            {t.subtitle}
          </p>
        </div>

        {/* Body Content */}
        <div className="p-6 space-y-6">
          {/* Highlight Phone Box */}
          <div className="p-6 rounded-2xl bg-red-50 border-2 border-red-600 text-center space-y-4 shadow-sm">
            <div className="w-14 h-14 rounded-full bg-red-600 text-white flex items-center justify-center mx-auto shadow-md">
              <Phone className="w-7 h-7" />
            </div>

            <div className="space-y-1">
              <span className="text-[11px] font-black uppercase text-red-700 tracking-widest block">
                {currentLang === 'es' ? 'Teléfono Directo Resto-Bar' : 'Direct Restaurant Phone'}
              </span>
              <a
                href={`tel:${PHONE_NUMBER}`}
                className="text-2xl sm:text-3xl font-black text-black hover:text-red-600 transition-colors tracking-tight font-mono block"
              >
                {DISPLAY_PHONE}
              </a>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 pt-1">
              <a
                href={`tel:${PHONE_NUMBER}`}
                className="flex-1 py-3.5 px-4 rounded-xl bg-red-600 hover:bg-red-700 active:scale-95 text-white font-black text-xs sm:text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-md border border-red-700 text-center"
              >
                <Phone className="w-4 h-4" />
                <span>{t.callButton}</span>
              </a>

              <button
                type="button"
                onClick={handleCopyPhone}
                className="px-4 py-3.5 rounded-xl bg-white hover:bg-zinc-100 text-zinc-900 border border-zinc-300 font-extrabold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 active:scale-95 shrink-0"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-zinc-600" />}
                <span>{copied ? t.copiedText : t.copyButton}</span>
              </button>
            </div>
          </div>

          {/* Details & Info Grid */}
          <div className="space-y-3">
            <div className="p-3.5 rounded-xl bg-zinc-50 border border-zinc-200 flex items-start gap-3">
              <Clock className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-black text-black uppercase block">{t.hoursTitle}</span>
                <span className="text-xs text-zinc-600 font-medium">{t.hoursText}</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-zinc-50 border border-zinc-200 flex items-start gap-3">
              <MapPin className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-black text-black uppercase block">{t.addressTitle}</span>
                <span className="text-xs text-zinc-600 font-medium">{t.addressText}</span>
              </div>
            </div>
          </div>

          <p className="text-[11px] text-zinc-500 font-medium text-center leading-relaxed italic">
            "{t.notice}"
          </p>

          <button
            onClick={onClose}
            className="w-full py-3 rounded-xl bg-black hover:bg-zinc-800 text-white font-extrabold text-xs uppercase tracking-wider transition-colors"
          >
            {t.doneButton}
          </button>
        </div>
      </div>
    </div>
  );
};
