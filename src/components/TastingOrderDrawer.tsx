import React from 'react';
import { SelectedOrderItem, Language } from '../types';
import { ShoppingBag, X, Trash2, Plus, Minus, ArrowRight, Utensils, Wine } from 'lucide-react';

interface TastingOrderDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  selectedItems: SelectedOrderItem[];
  onUpdateQuantity: (itemId: string, delta: number) => void;
  onClearOrder: () => void;
  onOpenReservationWithOrder: () => void;
  currentLang: Language;
}

export const TastingOrderDrawer: React.FC<TastingOrderDrawerProps> = ({
  isOpen,
  onClose,
  selectedItems,
  onUpdateQuantity,
  onClearOrder,
  onOpenReservationWithOrder,
  currentLang,
}) => {
  if (!isOpen) return null;

  const totalPrice = selectedItems.reduce((sum, item) => sum + item.item.price * item.quantity, 0);
  const totalCount = selectedItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex justify-end animate-in fade-in duration-200">
      <div className="bg-[#0f0f13] border-l border-red-950/80 w-full max-w-md h-full flex flex-col justify-between shadow-2xl text-white">
        {/* Drawer Header */}
        <div className="p-5 bg-gradient-to-r from-red-950/80 to-black border-b border-red-950 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-red-900/60 border border-red-700/60 flex items-center justify-center text-red-400">
              <Utensils className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-white uppercase tracking-wider">
                {currentLang === 'es' ? 'Mi Selección' : 'Your Tasting Tray'}
              </h3>
              <p className="text-[11px] text-zinc-400 font-medium">
                {totalCount} {currentLang === 'es' ? 'platos/bebidas seleccionados' : 'items selected'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-zinc-900 hover:bg-zinc-800 active:scale-95 text-zinc-400 hover:text-white flex items-center justify-center border border-zinc-800 transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Drawer Body Items */}
        <div className="flex-1 overflow-y-auto p-5 space-y-3">
          {selectedItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center text-zinc-500 space-y-3 py-12">
              <Wine className="w-12 h-12 text-zinc-700" />
              <div>
                <p className="text-sm font-bold text-zinc-400">
                  {currentLang === 'es' ? 'Tu bandeja está vacía' : 'Your tray is empty'}
                </p>
                <p className="text-xs text-zinc-600 max-w-xs mt-1">
                  {currentLang === 'es'
                    ? 'Explora nuestra carta de tapas y bebidas para añadir tus favoritos.'
                    : 'Explore our tapas and drinks menu to start building your order.'}
                </p>
              </div>
            </div>
          ) : (
            selectedItems.map(({ item, quantity }) => (
              <div
                key={item.id}
                className="p-3.5 rounded-xl bg-zinc-950 border border-red-950/80 flex items-center justify-between gap-3"
              >
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-xs text-white truncate">
                    {currentLang === 'es' ? (item.spanishName || item.name) : item.name}
                  </h4>
                  <p className="text-[11px] text-red-400 font-extrabold">{item.price.toFixed(2)} €</p>
                </div>

                {/* Quantity Buttons */}
                <div className="flex items-center gap-2 bg-zinc-900 rounded-lg p-1 border border-zinc-800">
                  <button
                    onClick={() => onUpdateQuantity(item.id, -1)}
                    className="w-7 h-7 rounded bg-zinc-800 hover:bg-zinc-700 active:scale-95 text-zinc-200 flex items-center justify-center text-xs transition-transform"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-xs font-black text-white px-1.5 font-mono">{quantity}</span>
                  <button
                    onClick={() => onUpdateQuantity(item.id, 1)}
                    className="w-7 h-7 rounded bg-zinc-800 hover:bg-zinc-700 active:scale-95 text-zinc-200 flex items-center justify-center text-xs transition-transform"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer Total & CTA */}
        {selectedItems.length > 0 && (
          <div className="p-5 bg-zinc-950 border-t border-red-950 space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span className="font-bold text-zinc-400">{currentLang === 'es' ? 'Total Estimado:' : 'Estimated Total:'}</span>
              <span className="text-xl font-black text-red-400 font-mono">{totalPrice.toFixed(2)} €</span>
            </div>

            <div className="text-[11px] text-zinc-500 text-center font-medium">
              NOVA e TAPA · Palma Nova, Mallorca
            </div>

            <div className="space-y-2">
              <button
                onClick={() => {
                  onClose();
                  onOpenReservationWithOrder();
                }}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-red-700 via-red-600 to-red-800 hover:from-red-600 hover:to-red-700 active:scale-95 text-white font-extrabold text-xs shadow-xl shadow-red-950 flex items-center justify-center gap-2 transition-all uppercase tracking-wider"
              >
                <span>{currentLang === 'es' ? 'Adjuntar Selección a Reserva de Mesa' : 'Attach Tray to Table Reservation'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onClearOrder}
                className="w-full py-2 text-xs text-zinc-500 hover:text-red-400 active:scale-95 flex items-center justify-center gap-1 transition-colors font-bold uppercase tracking-wider"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>{currentLang === 'es' ? 'Vaciar Bandeja' : 'Clear Tray'}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
