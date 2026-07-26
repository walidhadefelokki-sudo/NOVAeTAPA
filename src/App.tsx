import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { MenuSection } from './components/MenuSection';
import { ReviewsSection } from './components/ReviewsSection';
import { AtmosphereSection } from './components/AtmosphereSection';
import { LocationSection } from './components/LocationSection';
import { Footer } from './components/Footer';
import { ReservationModal } from './components/ReservationModal';
import { TastingOrderDrawer } from './components/TastingOrderDrawer';
import { MENU_ITEMS } from './data/menuData';
import { Language, MenuItem, SelectedOrderItem } from './types';

export default function App() {
  const [currentLang, setCurrentLang] = useState<Language>('es');
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [isOrderDrawerOpen, setIsOrderDrawerOpen] = useState(false);
  const [selectedItemsMap, setSelectedItemsMap] = useState<Record<string, number>>({});

  const handleAddItemToTray = (item: MenuItem) => {
    setSelectedItemsMap((prev) => ({
      ...prev,
      [item.id]: (prev[item.id] || 0) + 1,
    }));
  };

  const handleUpdateQuantity = (itemId: string, delta: number) => {
    setSelectedItemsMap((prev) => {
      const current = prev[itemId] || 0;
      const next = current + delta;
      if (next <= 0) {
        const copy = { ...prev };
        delete copy[itemId];
        return copy;
      }
      return { ...prev, [itemId]: next };
    });
  };

  const handleClearOrder = () => {
    setSelectedItemsMap({});
  };

  const selectedOrderItemsList: SelectedOrderItem[] = Object.entries(selectedItemsMap)
    .map(([id, quantity]) => {
      const item = MENU_ITEMS.find((m) => m.id === id);
      if (!item) return null;
      return { item, quantity };
    })
    .filter((entry): entry is SelectedOrderItem => entry !== null);

  const totalItemCount = selectedOrderItemsList.reduce((sum, entry) => sum + entry.quantity, 0);

  return (
    <div className="min-h-screen bg-paper-textured text-zinc-900 font-sans selection:bg-red-600 selection:text-white relative overflow-x-hidden">
      {/* Crisp Minimalist Poster Polka Dot Accents (No Glows) */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-40">
        <div className="absolute top-24 right-12 w-5 h-5 rounded-full bg-red-600" />
        <div className="absolute top-48 right-32 w-3 h-3 rounded-full bg-black" />
        <div className="absolute top-1/3 right-8 w-8 h-8 rounded-full bg-red-600" />
        <div className="absolute top-1/2 right-44 w-4 h-4 rounded-full bg-red-600" />
        <div className="absolute top-2/3 right-20 w-5 h-5 rounded-full bg-black" />
        <div className="absolute bottom-32 right-16 w-7 h-7 rounded-full bg-red-600" />
        <div className="absolute bottom-12 right-60 w-2.5 h-2.5 rounded-full bg-black" />
      </div>

      <div className="relative z-10">
        {/* Header Bar */}
        <Header
          currentLang={currentLang}
          onSelectLang={setCurrentLang}
          onOpenReservation={() => setIsReservationOpen(true)}
          onOpenOrderDrawer={() => setIsOrderDrawerOpen(true)}
          orderCount={totalItemCount}
        />

        {/* Main Page Sections */}
        <main>
          <Hero currentLang={currentLang} onOpenReservation={() => setIsReservationOpen(true)} />

          <MenuSection
            currentLang={currentLang}
            onAddItemToTray={handleAddItemToTray}
            selectedItemsMap={selectedItemsMap}
            onOpenReservation={() => setIsReservationOpen(true)}
          />

          <ReviewsSection currentLang={currentLang} />

          <AtmosphereSection currentLang={currentLang} />

          <LocationSection currentLang={currentLang} />
        </main>

        {/* Footer */}
        <Footer currentLang={currentLang} onOpenReservation={() => setIsReservationOpen(true)} />

        {/* Modals & Slide-over Drawers */}
        <ReservationModal
          isOpen={isReservationOpen}
          onClose={() => setIsReservationOpen(false)}
          currentLang={currentLang}
        />

        <TastingOrderDrawer
          isOpen={isOrderDrawerOpen}
          onClose={() => setIsOrderDrawerOpen(false)}
          selectedItems={selectedOrderItemsList}
          onUpdateQuantity={handleUpdateQuantity}
          onClearOrder={handleClearOrder}
          onOpenReservationWithOrder={() => {
            setIsOrderDrawerOpen(false);
            setIsReservationOpen(true);
          }}
          currentLang={currentLang}
        />
      </div>
    </div>
  );
}
