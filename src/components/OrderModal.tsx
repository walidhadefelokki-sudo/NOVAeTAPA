import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { ShoppingBag, Phone, CheckCircle2, Sparkles, X, Copy, Check, Utensils, ArrowRight, User, FileText } from 'lucide-react';
import { Language, SelectedOrderItem, OnlineOrderRequest } from '../types';

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedItems: SelectedOrderItem[];
  onClearOrder: () => void;
  currentLang: Language;
}

export const OrderModal: React.FC<OrderModalProps> = ({
  isOpen,
  onClose,
  selectedItems,
  onClearOrder,
  currentLang,
}) => {
  const [phone, setPhone] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<OnlineOrderRequest | null>(null);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const totalAmount = selectedItems.reduce((sum, entry) => sum + entry.item.price * entry.quantity, 0);

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone) return;

    setLoading(true);

    try {
      const payload = {
        phone,
        customerName: customerName.trim() || undefined,
        items: selectedItems.map((s) => ({
          id: s.item.id,
          name: s.item.spanishName || s.item.name,
          price: s.item.price,
          quantity: s.quantity,
        })),
        totalAmount,
        notes: notes.trim() || undefined,
      };

      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.success && data.order) {
        setConfirmedOrder({
          id: data.order.id,
          phone: data.order.phone,
          customerName: data.order.customerName,
          items: selectedItems,
          totalAmount: data.order.totalAmount,
          notes: data.order.notes,
          createdAt: data.order.createdAt,
          status: 'confirmed',
        });

        // Trigger confetti celebration
        try {
          confetti({
            particleCount: 90,
            spread: 80,
            origin: { y: 0.6 },
            colors: ['#e11d48', '#b91c1c', '#fbbf24', '#ffffff'],
          });
        } catch (err) {
          // Fallback if blocked
        }
      }
    } catch (err) {
      console.error('Failed placing order:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCopyCode = () => {
    if (confirmedOrder?.id) {
      navigator.clipboard.writeText(confirmedOrder.id);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleCloseAndReset = () => {
    setConfirmedOrder(null);
    onClearOrder();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white border-2 border-black max-w-lg w-full rounded-2xl overflow-hidden shadow-2xl relative text-zinc-900 my-8">
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
            <span>{currentLang === 'es' ? 'Pedido Online por Teléfono' : 'Online Phone Order'}</span>
          </div>
          <h3 className="text-xl font-black tracking-tight uppercase">
            {currentLang === 'es' ? 'Realizar Pedido en Palma Nova' : 'Place Your Order in Palma Nova'}
          </h3>
          <p className="text-xs text-zinc-400 font-medium">
            {currentLang === 'es' ? 'Ingresa tu número de teléfono para confirmar tu pedido' : 'Enter your phone number to complete your order'}
          </p>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-5">
          {confirmedOrder ? (
            /* Order Success Screen */
            <div className="text-center space-y-5 py-2">
              <div className="w-16 h-16 rounded-full bg-emerald-100 border-2 border-emerald-600 text-emerald-700 mx-auto flex items-center justify-center shadow-sm">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-1">
                <h4 className="text-2xl font-black text-black uppercase">
                  {currentLang === 'es' ? '¡Pedido Confirmado!' : 'Order Confirmed!'}
                </h4>
                <p className="text-xs text-zinc-600 font-medium">
                  {currentLang === 'es'
                    ? 'Tu pedido se está preparando en cocina. Te llamaremos o enviaremos SMS al '
                    : 'Your order is being prepared. We will call or SMS '}
                  <span className="text-red-600 font-mono font-extrabold">{confirmedOrder.phone}</span>.
                </p>
              </div>

              {/* Order Reference Ticket */}
              <div className="p-5 rounded-xl bg-zinc-100 border-2 border-zinc-300 text-left space-y-3 relative">
                <div className="flex items-center justify-between pb-3 border-b border-zinc-300">
                  <span className="text-xs font-black text-zinc-700 uppercase tracking-widest">
                    {currentLang === 'es' ? 'Nº de Pedido' : 'Order Ref'}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-lg font-black text-red-600">{confirmedOrder.id}</span>
                    <button
                      onClick={handleCopyCode}
                      className="p-1.5 rounded bg-white hover:bg-zinc-200 text-black border border-zinc-300 transition-colors"
                      title="Copy code"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between text-zinc-600">
                    <span className="font-bold">{currentLang === 'es' ? 'Teléfono de contacto:' : 'Phone Contact:'}</span>
                    <span className="font-mono font-extrabold text-black">{confirmedOrder.phone}</span>
                  </div>
                  {confirmedOrder.customerName && (
                    <div className="flex justify-between text-zinc-600">
                      <span className="font-bold">{currentLang === 'es' ? 'Cliente:' : 'Customer:'}</span>
                      <span className="font-bold text-black">{confirmedOrder.customerName}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-zinc-600">
                    <span className="font-bold">{currentLang === 'es' ? 'Tiempo Estimado:' : 'Est. Preparation:'}</span>
                    <span className="font-bold text-emerald-700 font-mono">20 - 25 min</span>
                  </div>
                </div>

                {/* Items Summary */}
                {confirmedOrder.items.length > 0 && (
                  <div className="pt-2 border-t border-zinc-200 space-y-1">
                    <span className="text-[10px] font-black uppercase text-zinc-500 block">
                      {currentLang === 'es' ? 'Resumen de Platos:' : 'Ordered Items:'}
                    </span>
                    <div className="max-h-28 overflow-y-auto space-y-1 pr-1">
                      {confirmedOrder.items.map((itemEntry, idx) => (
                        <div key={idx} className="flex justify-between text-xs font-medium text-zinc-800">
                          <span>
                            {itemEntry.quantity}x {itemEntry.item.spanishName || itemEntry.item.name}
                          </span>
                          <span className="font-mono font-bold">{(itemEntry.item.price * itemEntry.quantity).toFixed(2)} €</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-between text-sm font-black text-black pt-1 border-t border-zinc-300">
                      <span>Total:</span>
                      <span className="text-red-600 font-mono">{confirmedOrder.totalAmount.toFixed(2)} €</span>
                    </div>
                  </div>
                )}
              </div>

              <button
                onClick={handleCloseAndReset}
                className="w-full py-3.5 rounded-xl bg-black hover:bg-zinc-800 text-white font-black text-xs uppercase tracking-wider transition-colors"
              >
                {currentLang === 'es' ? 'Entendido' : 'Done'}
              </button>
            </div>
          ) : (
            /* Form for placing online order with phone number */
            <form onSubmit={handleSubmitOrder} className="space-y-4">
              {/* Selected Items Tray Summary inside modal */}
              <div className="p-4 rounded-xl bg-zinc-50 border-2 border-zinc-200 space-y-2">
                <div className="flex items-center justify-between text-xs font-black uppercase text-black border-b border-zinc-200 pb-2">
                  <span className="flex items-center gap-1.5">
                    <Utensils className="w-3.5 h-3.5 text-red-600" />
                    {currentLang === 'es' ? 'Platos Seleccionados' : 'Selected Items'}
                  </span>
                  <span className="text-red-600 font-mono font-extrabold">{totalAmount.toFixed(2)} €</span>
                </div>

                {selectedItems.length === 0 ? (
                  <p className="text-xs text-zinc-500 italic py-2">
                    {currentLang === 'es'
                      ? 'No has añadido platos a tu bandeja aún. Puedes añadir tu teléfono abajo para que te llamemos o ver la carta.'
                      : 'Your tray is empty. Enter your phone number below and we will contact you.'}
                  </p>
                ) : (
                  <div className="max-h-36 overflow-y-auto space-y-1.5 pr-1 divide-y divide-zinc-100 text-xs">
                    {selectedItems.map(({ item, quantity }) => (
                      <div key={item.id} className="pt-1.5 flex items-center justify-between font-medium">
                        <span className="text-zinc-900 font-bold">
                          <span className="text-red-600 font-mono mr-1">{quantity}x</span>
                          {item.spanishName || item.name}
                        </span>
                        <span className="text-zinc-700 font-mono font-bold">
                          {(item.price * quantity).toFixed(2)} €
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Required Phone Number Input */}
              <div>
                <label className="text-xs font-black text-black uppercase block mb-1">
                  {currentLang === 'es' ? 'Teléfono Móvil (Obligatorio) *' : 'Phone Number (Required) *'}
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-red-600 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+34 600 000 000"
                    className="w-full pl-9 pr-4 py-3 rounded-xl bg-zinc-100 border-2 border-zinc-300 text-sm text-black font-extrabold focus:outline-none focus:border-red-600 transition-colors"
                  />
                </div>
                <p className="text-[11px] text-zinc-500 mt-1 font-medium">
                  {currentLang === 'es'
                    ? 'Te llamaremos o enviaremos un SMS para confirmar los detalles de tu pedido.'
                    : 'We will call or SMS this number to confirm order status.'}
                </p>
              </div>

              {/* Optional Name */}
              <div>
                <label className="text-xs font-black text-black uppercase block mb-1">
                  {currentLang === 'es' ? 'Nombre (Opcional)' : 'Name (Optional)'}
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder={currentLang === 'es' ? 'Ej. Carlos' : 'e.g. John'}
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-zinc-100 border border-zinc-300 text-xs text-black font-medium focus:outline-none focus:border-red-600"
                  />
                </div>
              </div>

              {/* Optional Notes */}
              <div>
                <label className="text-xs font-black text-black uppercase block mb-1">
                  {currentLang === 'es' ? 'Instrucciones del Pedido / Alergias' : 'Special Instructions / Notes'}
                </label>
                <div className="relative">
                  <FileText className="w-4 h-4 text-zinc-400 absolute left-3 top-3" />
                  <textarea
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder={currentLang === 'es' ? 'Ej. Para llevar a las 20:30h, sin cebolla...' : 'e.g. Takeaway at 8:30pm, no onions...'}
                    className="w-full pl-9 pr-4 py-2 rounded-xl bg-zinc-100 border border-zinc-300 text-xs text-black font-medium focus:outline-none focus:border-red-600"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading || !phone}
                  className="w-full py-4 rounded-xl bg-red-600 hover:bg-red-700 active:scale-95 text-white font-black text-xs sm:text-sm uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <ShoppingBag className="w-4 h-4 text-white" />
                  <span>
                    {loading
                      ? currentLang === 'es'
                        ? 'Enviando Pedido...'
                        : 'Submitting...'
                      : currentLang === 'es'
                      ? 'Confirmar Pedido Online'
                      : 'Confirm Online Order'}
                  </span>
                  <ArrowRight className="w-4 h-4 text-white" />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
