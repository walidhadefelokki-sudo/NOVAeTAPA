import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Calendar, Clock, Users, MapPin, CheckCircle2, Phone, Mail, User, Sparkles, X, ChevronRight, Copy, Check } from 'lucide-react';
import { Language, ReservationRequest } from '../types';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLang: Language;
}

// Replace with your Apps Script Web App /exec URL (Deploy -> New deployment -> Web app)
const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec';

const generateBookingId = () => {
  const datePart = new Date().toISOString().slice(2, 10).replace(/-/g, '');
  const randomPart = Math.floor(1000 + Math.random() * 9000);
  return `RES-${datePart}-${randomPart}`;
};

export const ReservationModal: React.FC<ReservationModalProps> = ({ isOpen, onClose, currentLang }) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [guestName, setGuestName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });
  const [time, setTime] = useState('19:30');
  const [guestsCount, setGuestsCount] = useState<number>(2);
  const [seatingArea, setSeatingArea] = useState<'terrace' | 'lounge' | 'bar'>('terrace');
  const [specialRequests, setSpecialRequests] = useState('');
  const [loading, setLoading] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState<ReservationRequest | null>(null);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const timeslots = [
    '10:00', '11:00', '12:00', '13:00', '14:00', '15:00',
    '18:00', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00'
  ];

  const isWednesday = new Date(date + 'T00:00:00').getDay() === 3;

  const handleSubmitBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const bookingId = generateBookingId();

    try {
      // Apps Script Web Apps don't return readable CORS responses from the browser
      // when called with the default mode, so we fire the request with 'no-cors'
      // and build the confirmation locally. The Apps Script itself still generates
      // and stores its own booking id in the Sheet as a source of truth.
      await fetch(APPS_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain' }, // avoids a CORS preflight
        body: JSON.stringify({
          guestName,
          email,
          phone,
          date,
          time,
          guestsCount,
          seatingArea,
          specialRequests,
          currentLang,
        }),
      });

      setConfirmedBooking({
        id: bookingId,
        guestName,
        email,
        phone,
        date,
        time,
        guestsCount,
        seatingArea,
        specialRequests,
      } as ReservationRequest);

      // Fire celebration confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#e11d48', '#b91c1c', '#fbbf24', '#ffffff'],
        });
      } catch (err) {
        // Fallback if confetti blocked
      }
    } catch (err) {
      console.error('Failed booking:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCopyCode = () => {
    if (confirmedBooking?.id) {
      navigator.clipboard.writeText(confirmedBooking.id);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
      <div className="bg-white border-2 border-black max-w-xl w-full rounded-2xl overflow-hidden shadow-2xl relative text-zinc-900">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-zinc-100 hover:bg-black text-zinc-800 hover:text-white flex items-center justify-center border border-zinc-300 font-bold transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="p-6 bg-black text-white text-center space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-red-600 text-white text-[10px] font-black uppercase tracking-wider">
            <Sparkles className="w-3 h-3 text-white" />
            <span>{currentLang === 'es' ? 'Reserva Online Directa' : 'Instant Online Booking'}</span>
          </div>
          <h3 className="text-xl font-black tracking-tight uppercase">
            {currentLang === 'es' ? 'Reserva tu Mesa en Palma Nova' : 'Reserve Your Table in Palma Nova'}
          </h3>
          <p className="text-xs text-zinc-400 font-medium">Passeig Mar 32 · {currentLang === 'es' ? 'Confirmación inmediata' : 'Free instant confirmation'}</p>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {confirmedBooking ? (
            /* Confirmation Success Screen */
            <div className="text-center space-y-6 py-2">
              <div className="w-16 h-16 rounded-full bg-emerald-100 border-2 border-emerald-600 text-emerald-700 mx-auto flex items-center justify-center shadow-sm">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-1">
                <h4 className="text-2xl font-black text-black uppercase">{currentLang === 'es' ? '¡Mesa Reservada!' : 'Table Reserved!'}</h4>
                <p className="text-xs text-zinc-600 font-medium">
                  {currentLang === 'es' ? 'Te esperamos pronto, ' : 'We look forward to welcoming you, '}
                  <span className="text-black font-extrabold">{confirmedBooking.guestName}</span>.
                </p>
              </div>

              {/* Booking Reference Pass Card */}
              <div className="p-5 rounded-xl bg-zinc-100 border-2 border-zinc-300 text-left space-y-3 relative">
                <div className="flex items-center justify-between pb-3 border-b border-zinc-300">
                  <span className="text-xs font-black text-zinc-700 uppercase tracking-widest">{currentLang === 'es' ? 'Código de Reserva' : 'Booking Code'}</span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-lg font-black text-red-600">{confirmedBooking.id}</span>
                    <button
                      onClick={handleCopyCode}
                      className="p-1.5 rounded bg-white hover:bg-zinc-200 text-black border border-zinc-300 transition-colors"
                      title="Copy code"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs font-medium">
                  <div>
                    <span className="text-zinc-500 block text-[10px] font-bold uppercase">{currentLang === 'es' ? 'Fecha y Hora' : 'Date & Time'}</span>
                    <span className="font-extrabold text-black">
                      {confirmedBooking.date} - {confirmedBooking.time}
                    </span>
                  </div>
                  <div>
                    <span className="text-zinc-500 block text-[10px] font-bold uppercase">{currentLang === 'es' ? 'Personas y Zona' : 'Guests & Area'}</span>
                    <span className="font-extrabold text-black">
                      {confirmedBooking.guestsCount} {currentLang === 'es' ? 'personas' : 'guests'} · {confirmedBooking.seatingArea.toUpperCase()}
                    </span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-zinc-500 block text-[10px] font-bold uppercase">{currentLang === 'es' ? 'Ubicación' : 'Location'}</span>
                    <span className="font-extrabold text-black">Passeig Mar 32, Loc 2, Palma Nova</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  onClick={onClose}
                  className="w-full py-3.5 rounded-xl bg-black hover:bg-zinc-800 text-white font-black text-xs uppercase tracking-wider transition-colors"
                >
                  {currentLang === 'es' ? 'Aceptar' : 'Done'}
                </button>
              </div>
            </div>
          ) : (
            /* Multi-step Reservation Form */
            <form onSubmit={handleSubmitBooking} className="space-y-6">
              {/* Step Indicators */}
              <div className="flex items-center justify-between text-xs font-black border-b border-zinc-200 pb-3 uppercase">
                <span className={step >= 1 ? 'text-red-600' : 'text-zinc-400'}>{currentLang === 'es' ? '1. Fecha y Hora' : '1. Date & Time'}</span>
                <ChevronRight className="w-3.5 h-3.5 text-zinc-400" />
                <span className={step >= 2 ? 'text-red-600' : 'text-zinc-400'}>{currentLang === 'es' ? '2. Zona' : '2. Seating Area'}</span>
                <ChevronRight className="w-3.5 h-3.5 text-zinc-400" />
                <span className={step >= 3 ? 'text-red-600' : 'text-zinc-400'}>{currentLang === 'es' ? '3. Tus Datos' : '3. Your Details'}</span>
              </div>

              {step === 1 && (
                <div className="space-y-4">
                  {/* Number of Guests */}
                  <div className="space-y-2">
                    <label className="text-xs font-black text-black uppercase flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-red-600" />
                      {currentLang === 'es' ? 'Número de Comensales:' : 'Number of Guests:'}
                    </label>
                    <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                      {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12].map((num) => (
                        <button
                          key={num}
                          type="button"
                          onClick={() => setGuestsCount(num)}
                          className={`w-10 h-10 rounded-xl font-black text-xs shrink-0 transition-all active:scale-95 ${
                            guestsCount === num
                              ? 'bg-red-600 text-white border-2 border-red-700 shadow-sm'
                              : 'bg-zinc-100 text-zinc-800 hover:text-black border border-zinc-300'
                          }`}
                        >
                          {num}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Date Selector */}
                  <div className="space-y-2">
                    <label className="text-xs font-black text-black uppercase flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-red-600" />
                      {currentLang === 'es' ? 'Seleccionar Fecha:' : 'Select Date:'}
                    </label>
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-zinc-100 border border-zinc-300 text-xs text-black font-bold focus:outline-none focus:border-red-600"
                    />
                    {isWednesday && (
                      <div className="p-3 bg-red-100 border-2 border-red-500 rounded-xl text-xs font-bold text-red-700">
                        ⚠️ {currentLang === 'es'
                          ? 'Los miércoles la cocina está cerrada por descanso semanal. Por favor, selecciona otro día.'
                          : 'We are closed on Wednesdays (Weekly Day Off). Please select another date.'}
                      </div>
                    )}
                  </div>

                  {/* Time Selector */}
                  <div className="space-y-2">
                    <label className="text-xs font-black text-black uppercase flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-red-600" />
                      {currentLang === 'es' ? 'Seleccionar Hora:' : 'Select Time:'}
                    </label>
                    <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                      {timeslots.map((ts) => (
                        <button
                          key={ts}
                          type="button"
                          onClick={() => setTime(ts)}
                          className={`py-2.5 rounded-xl text-xs font-extrabold transition-all active:scale-95 ${
                            time === ts
                              ? 'bg-red-600 text-white shadow-sm'
                              : 'bg-zinc-100 text-zinc-800 hover:text-black border border-zinc-300'
                          }`}
                        >
                          {ts}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    type="button"
                    disabled={isWednesday}
                    onClick={() => setStep(2)}
                    className="w-full py-3.5 rounded-xl bg-black hover:bg-zinc-800 disabled:bg-zinc-300 disabled:cursor-not-allowed text-white font-black text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
                  >
                    <span>{currentLang === 'es' ? 'Continuar a Zona' : 'Continue to Seating Area'}</span>
                    <ChevronRight className="w-4 h-4 text-red-500" />
                  </button>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4">
                  <label className="text-xs font-black text-black uppercase flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-red-600" />
                    {currentLang === 'es' ? 'Preferencia de Zona:' : 'Preferred Seating Area:'}
                  </label>

                  <div className="grid grid-cols-1 gap-3">
                    <button
                      type="button"
                      onClick={() => setSeatingArea('terrace')}
                      className={`p-4 rounded-xl border-2 text-left flex items-start gap-3 transition-all ${
                        seatingArea === 'terrace'
                          ? 'bg-red-50 border-red-600 text-black'
                          : 'bg-zinc-50 border-zinc-300 text-zinc-700 hover:border-zinc-400'
                      }`}
                    >
                      <div className="p-2 rounded-lg bg-black text-white font-bold text-sm">🌊</div>
                      <div>
                        <div className="font-extrabold text-xs text-black uppercase">{currentLang === 'es' ? 'Terraza Exterior' : 'Outdoor Ocean Terrace'}</div>
                        <div className="text-[11px] text-zinc-600 font-medium">{currentLang === 'es' ? 'Brisa marina y vistas al paseo de Palma Nova' : 'Fresh Mediterranean breeze & promenade vibe'}</div>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setSeatingArea('lounge')}
                      className={`p-4 rounded-xl border-2 text-left flex items-start gap-3 transition-all ${
                        seatingArea === 'lounge'
                          ? 'bg-red-50 border-red-600 text-black'
                          : 'bg-zinc-50 border-zinc-300 text-zinc-700 hover:border-zinc-400'
                      }`}
                    >
                      <div className="p-2 rounded-lg bg-black text-white font-bold text-sm">🍷</div>
                      <div>
                        <div className="font-extrabold text-xs text-black uppercase">{currentLang === 'es' ? 'Salon Interior' : 'Indoor Lounge'}</div>
                        <div className="text-[11px] text-zinc-600 font-medium">{currentLang === 'es' ? 'Ambiente cálido y climatizado' : 'Warm indoor atmosphere with plush seats & A/C'}</div>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setSeatingArea('bar')}
                      className={`p-4 rounded-xl border-2 text-left flex items-start gap-3 transition-all ${
                        seatingArea === 'bar'
                          ? 'bg-red-50 border-red-600 text-black'
                          : 'bg-zinc-50 border-zinc-300 text-zinc-700 hover:border-zinc-400'
                      }`}
                    >
                      <div className="p-2 rounded-lg bg-black text-white font-bold text-sm">🍹</div>
                      <div>
                        <div className="font-extrabold text-xs text-black uppercase">{currentLang === 'es' ? 'Barra de Coctelería' : 'Cocktail Bar Counter'}</div>
                        <div className="text-[11px] text-zinc-600 font-medium">{currentLang === 'es' ? 'En primera fila para ver la preparación de cócteles' : 'Front row seat to our head mixologist crafting drinks'}</div>
                      </div>
                    </button>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="px-4 py-3 rounded-xl bg-zinc-100 text-zinc-800 text-xs font-black uppercase border border-zinc-300"
                    >
                      {currentLang === 'es' ? 'Atrás' : 'Back'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      className="flex-1 py-3.5 rounded-xl bg-black hover:bg-zinc-800 text-white font-black text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
                    >
                      <span>{currentLang === 'es' ? 'Continuar a Datos' : 'Continue to Contact Info'}</span>
                      <ChevronRight className="w-4 h-4 text-red-500" />
                    </button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-4">
                  <div className="space-y-3">
                    <div>
                      <label className="text-xs font-black text-black uppercase block mb-1">{currentLang === 'es' ? 'Nombre Completo *' : 'Full Name *'}</label>
                      <div className="relative">
                        <User className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          required
                          value={guestName}
                          onChange={(e) => setGuestName(e.target.value)}
                          placeholder="Ej. Carlos Martínez"
                          className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-zinc-100 border border-zinc-300 text-xs text-black font-medium focus:outline-none focus:border-red-600"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs font-black text-black uppercase block mb-1">{currentLang === 'es' ? 'Teléfono *' : 'Phone Number *'}</label>
                        <div className="relative">
                          <Phone className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
                          <input
                            type="tel"
                            required
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="+34 600 000 000"
                            className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-zinc-100 border border-zinc-300 text-xs text-black font-medium focus:outline-none focus:border-red-600"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-xs font-black text-black uppercase block mb-1">{currentLang === 'es' ? 'Email' : 'Email Address'}</label>
                        <div className="relative">
                          <Mail className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="correo@ejemplo.com"
                            className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-zinc-100 border border-zinc-300 text-xs text-black font-medium focus:outline-none focus:border-red-600"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-black text-black uppercase block mb-1">
                        {currentLang === 'es' ? 'Peticiones Especiales / Alergias' : 'Special Request / Allergies'}
                      </label>
                      <input
                        type="text"
                        value={specialRequests}
                        onChange={(e) => setSpecialRequests(e.target.value)}
                        placeholder={currentLang === 'es' ? 'Ej. Celebración de cumpleaños, mesa junto a la barandilla' : 'e.g. Birthday, gluten-free option'}
                        className="w-full px-4 py-2.5 rounded-xl bg-zinc-100 border border-zinc-300 text-xs text-black font-medium focus:outline-none focus:border-red-600"
                      />
                    </div>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="px-4 py-3 rounded-xl bg-zinc-100 text-zinc-800 text-xs font-black uppercase border border-zinc-300"
                    >
                      {currentLang === 'es' ? 'Atrás' : 'Back'}
                    </button>
                    <button
                      type="submit"
                      disabled={loading || !guestName || !phone}
                      className="flex-1 py-3.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-black text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {loading ? (currentLang === 'es' ? 'Confirmando Reserva...' : 'Confirming...') : (currentLang === 'es' ? 'Confirmar Reserva de Mesa' : 'Confirm Reservation')}
                    </button>
                  </div>
                </div>
              )}
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
