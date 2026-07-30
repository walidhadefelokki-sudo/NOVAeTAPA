import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MENU_ITEMS } from '../data/menuData';
import { MenuItem, MenuCategory, Language } from '../types';
import {
  Wine,
  Utensils,
  Search,
  Plus,
  Check,
  Sparkles,
  Flame,
  Info,
  Filter,
  Layers,
  UtensilsCrossed,
  Egg,
  Salad,
  Beer,
  ChevronDown,
} from 'lucide-react';

interface MenuSectionProps {
  currentLang: Language;
  onAddItemToTray: (item: MenuItem) => void;
  selectedItemsMap: Record<string, number>;
  onOpenOrderModal: () => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({
  currentLang,
  onAddItemToTray,
  selectedItemsMap,
  onOpenOrderModal,
}) => {
  const [activeTab, setActiveTab] = useState<MenuCategory | 'all'>('all');
  const [activeFilterTag, setActiveFilterTag] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [detailModalItem, setDetailModalItem] = useState<MenuItem | null>(null);

  // State to track which categories are manually expanded/collapsed
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({
    desayunos: false,
    sandwiches_baguettes: false,
    tapas: true, // Default open the popular tapas category
    combos: false,
    burgers: false,
    huevos: false,
    platos_combinados: false,
    pa_amb_oli: false,
    ensaladas_wraps: false,
    pastas: false,
    bebidas_sangrias: false,
    postres: false,
  });

  const filterTags = ['all', 'Tapas', 'Mallorca', 'Marisco', 'Ibérico', 'Vegetariano', 'Top Ventas'];

  const categoryLabels = {
    es: {
      all: 'Carta Completa',
      desayunos: 'Desayunos (Hasta 12h)',
      sandwiches_baguettes: 'Sándwiches & Baguettes',
      tapas: 'Nuestras Tapas (1-25)',
      combos: 'Combos (2 Personas)',
      burgers: 'Hamburguesas',
      huevos: 'Huevos en Sartén',
      platos_combinados: 'Platos Combinados',
      pa_amb_oli: 'Pa Amb Oli (Mallorca)',
      ensaladas_wraps: 'Ensaladas & Wraps',
      pastas: 'Pastas',
      bebidas_sangrias: 'Sangrías & Bebidas',
      postres: 'Postres & Helados',
    },
    en: {
      all: 'Full Menu',
      desayunos: 'Breakfast (Until 12h)',
      sandwiches_baguettes: 'Sandwiches & Baguettes',
      tapas: 'Authentic Tapas (1-25)',
      combos: 'Combos (For 2)',
      burgers: 'Gourmet Burgers',
      huevos: 'Pan-Fried Eggs',
      platos_combinados: 'Combined Plates',
      pa_amb_oli: 'Pa Amb Oli (Mallorca)',
      ensaladas_wraps: 'Salads & Wraps',
      pastas: 'Pastas',
      bebidas_sangrias: 'Sangrias & Drinks',
      postres: 'Desserts & Ice Cream',
    },
  };

  const categorySubtexts = {
    es: {
      desayunos: 'Para empezar el día con energía frente al mar (Hasta las 12:00h)',
      sandwiches_baguettes: 'Pan crujiente recién horneado con rellenos ibéricos y gourmet',
      tapas: 'Nuestra selección estelar de la 1 a la 25 ideales para compartir',
      combos: 'Raciones generosas en pareja acompañadas de jarra de sangría o bebida',
      burgers: 'Carne 100% vacuno a la parrilla con pan brioche y patatas caseras',
      huevos: 'Huevos rotos de corral fritos en sartén con jamón, sobrasada o gulas',
      platos_combinados: 'Platos completos tradicionales con guarnición recién hecha',
      pa_amb_oli: 'Especialidad mallorquina tradicional en pan rústico con tomate de ramellet',
      ensaladas_wraps: 'Opciones frescas, mediterráneas y ligeras',
      pastas: 'Pastas hechas al momento con salsas artesanales',
      bebidas_sangrias: 'Sangrías caseras maceradas, cervezas heladas y vinos locales',
      postres: 'El toque dulce final y helados artesanos',
    },
    en: {
      desayunos: 'Start your morning with fresh seaside breakfasts (Until 12:00h)',
      sandwiches_baguettes: 'Crispy baked bread filled with Spanish hams & gourmet toppings',
      tapas: 'Our star selection 1 to 25 perfect for authentic sharing',
      combos: 'Generous tasting platters for two with drinks included',
      burgers: '100% prime beef grilled burgers with brioche buns & fries',
      huevos: 'Pan-fried free-range eggs with Iberian ham, chorizo or garlic elvers',
      platos_combinados: 'Full traditional combined plates with freshly made garnish',
      pa_amb_oli: 'Traditional Mallorcan rustic bread with ramellet tomatoes & olive oil',
      ensaladas_wraps: 'Fresh, Mediterranean and light wraps & salads',
      pastas: 'Fresh pasta dishes prepared with homemade sauces',
      bebidas_sangrias: 'House-macerated sangrias, ice cold beers & local wines',
      postres: 'Artisanal desserts & sweet ice cream treats',
    },
  };

  const tCategory = categoryLabels[currentLang] || categoryLabels.es;
  const tSubtext = categorySubtexts[currentLang] || categorySubtexts.es;

  const allCategoriesKeys: MenuCategory[] = [
    'desayunos',
    'sandwiches_baguettes',
    'tapas',
    'combos',
    'burgers',
    'huevos',
    'platos_combinados',
    'pa_amb_oli',
    'ensaladas_wraps',
    'pastas',
    'bebidas_sangrias',
    'postres',
  ];

  const categoriesList: (MenuCategory | 'all')[] = ['all', ...allCategoriesKeys];

  // Helper function to toggle a category accordion
  const toggleCategory = (catKey: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [catKey]: !prev[catKey],
    }));
  };

  // Expand or collapse all
  const setAllCategoriesExpanded = (expanded: boolean) => {
    const updated: Record<string, boolean> = {};
    allCategoriesKeys.forEach((key) => {
      updated[key] = expanded;
    });
    setExpandedCategories(updated);
  };

  // Filter items logic
  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      // Category Filter
      if (activeTab !== 'all' && item.category !== activeTab) return false;

      // Tag Filter
      if (activeFilterTag !== 'all') {
        const matchesTag = item.tags.some(
          (tag) => tag.toLowerCase() === activeFilterTag.toLowerCase()
        );
        if (!matchesTag) return false;
      }

      // Search Filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesSpanish = item.spanishName?.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        const matchesIngredient = item.ingredients?.some((ing) => ing.toLowerCase().includes(query));
        if (!matchesName && !matchesSpanish && !matchesDesc && !matchesIngredient) return false;
      }

      return true;
    });
  }, [activeTab, activeFilterTag, searchQuery]);

  // Group filtered items by category
  const groupedItems = useMemo(() => {
    const groups: Record<string, MenuItem[]> = {};
    allCategoriesKeys.forEach((catKey) => {
      groups[catKey] = [];
    });

    filteredItems.forEach((item) => {
      if (groups[item.category]) {
        groups[item.category].push(item);
      }
    });

    return groups;
  }, [filteredItems]);

  const activeCategoriesToDisplay = useMemo(() => {
    if (activeTab !== 'all') {
      return [activeTab as MenuCategory];
    }
    // Return categories that have items in filtered list
    return allCategoriesKeys.filter((catKey) => groupedItems[catKey] && groupedItems[catKey].length > 0);
  }, [activeTab, groupedItems]);

  const isSearchOrFilterActive = searchQuery.trim().length > 0 || activeFilterTag !== 'all';

  const getCategoryIcon = (catKey: string) => {
    switch (catKey) {
      case 'desayunos':
        return <Sparkles className="w-5 h-5 text-amber-500" />;
      case 'sandwiches_baguettes':
        return <UtensilsCrossed className="w-5 h-5 text-orange-500" />;
      case 'tapas':
        return <Flame className="w-5 h-5 text-red-500" />;
      case 'combos':
        return <Layers className="w-5 h-5 text-amber-500" />;
      case 'burgers':
        return <Flame className="w-5 h-5 text-orange-500" />;
      case 'huevos':
        return <Egg className="w-5 h-5 text-amber-500" />;
      case 'platos_combinados':
        return <Utensils className="w-5 h-5 text-red-500" />;
      case 'pa_amb_oli':
        return <UtensilsCrossed className="w-5 h-5 text-red-600" />;
      case 'ensaladas_wraps':
        return <Salad className="w-5 h-5 text-emerald-600" />;
      case 'pastas':
        return <Utensils className="w-5 h-5 text-amber-600" />;
      case 'bebidas_sangrias':
        return <Beer className="w-5 h-5 text-amber-600" />;
      case 'postres':
        return <Wine className="w-5 h-5 text-pink-600" />;
      default:
        return <Utensils className="w-5 h-5 text-red-500" />;
    }
  };

  return (
    <section id="menu" className="py-16 lg:py-24 bg-paper-textured text-zinc-900 border-b border-zinc-300 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black text-white text-xs font-black uppercase tracking-widest border border-black">
            <Utensils className="w-3.5 h-3.5 text-red-500" />
            <span>
              {currentLang === 'es'
                ? 'NUESTRA CARTA · PALMA NOVA'
                : currentLang === 'en'
                ? 'OUR MENU · PALMA NOVA'
                : 'NOTRE MENU · PALMA NOVA'}
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight uppercase text-black">
            Tapas, Copas & <span className="text-red-600 font-serif italic lowercase text-4xl sm:text-6xl">Especialidades</span>
          </h2>
          <p className="text-zinc-700 text-sm sm:text-base font-medium">
            {currentLang === 'es'
              ? 'Haz clic en cada categoría para revelar de forma individual sus platos y especialidades recién preparadas.'
              : currentLang === 'en'
              ? 'Click on any category title to smoothly reveal its freshly crafted dishes and specialties.'
              : 'Cliquez sur chaque catégorie para revelar sus especialidades.'}
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 scrollbar-none px-2">
          {categoriesList.map((cat) => {
            const isActive = activeTab === cat;
            return (
              <button
                key={cat}
                onClick={() => {
                  setActiveTab(cat);
                  if (cat !== 'all') {
                    setExpandedCategories((prev) => ({ ...prev, [cat]: true }));
                  }
                }}
                className={`px-4 py-2.5 rounded-xl font-black text-xs sm:text-sm whitespace-nowrap transition-all flex items-center gap-2 uppercase tracking-wider active:scale-95 shrink-0 ${
                  isActive
                    ? 'bg-red-600 text-white border-2 border-red-700 shadow-sm'
                    : 'bg-white text-zinc-800 hover:text-black border-2 border-zinc-300 hover:border-black'
                }`}
              >
                {cat === 'all' ? <Utensils className="w-4 h-4" /> : getCategoryIcon(cat)}
                <span>{tCategory[cat]}</span>
              </button>
            );
          })}
        </div>

        {/* Search & Tag Filter Bar */}
        <div className="mt-4 p-4 rounded-2xl bg-white border-2 border-zinc-300 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Tag Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            <span className="text-xs text-zinc-900 font-black mr-1 flex items-center gap-1 shrink-0 uppercase tracking-wider">
              <Filter className="w-3.5 h-3.5 text-red-600" />
              {currentLang === 'es' ? 'Filtrar:' : currentLang === 'en' ? 'Filter:' : 'Filtrer:'}
            </span>
            {filterTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveFilterTag(tag)}
                className={`px-3 py-1 rounded-lg text-xs font-black whitespace-nowrap transition-colors uppercase active:scale-95 ${
                  activeFilterTag === tag
                    ? 'bg-black text-white'
                    : 'bg-zinc-100 text-zinc-700 hover:text-black border border-zinc-300'
                }`}
              >
                {tag === 'all' ? (currentLang === 'es' ? 'Todos' : 'All') : tag}
              </button>
            ))}
          </div>

          {/* Search Bar & Expand/Collapse All Buttons */}
          <div className="flex items-center gap-2 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={currentLang === 'es' ? 'Buscar gambas, croquetas...' : 'Search prawns, tapas...'}
                className="w-full pl-9 pr-8 py-2 bg-zinc-100 border border-zinc-300 rounded-xl text-xs text-black placeholder-zinc-500 focus:outline-none focus:border-red-600 transition-colors font-medium"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-500 hover:text-black font-bold"
                >
                  ✕
                </button>
              )}
            </div>

            {activeTab === 'all' && !isSearchOrFilterActive && (
              <div className="hidden sm:flex items-center gap-1 shrink-0">
                <button
                  onClick={() => setAllCategoriesExpanded(true)}
                  className="px-2.5 py-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 border border-zinc-300 text-[11px] font-black text-black uppercase tracking-wider active:scale-95"
                >
                  {currentLang === 'es' ? 'Abrir Todo' : 'Expand All'}
                </button>
                <button
                  onClick={() => setAllCategoriesExpanded(false)}
                  className="px-2.5 py-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 border border-zinc-300 text-[11px] font-black text-black uppercase tracking-wider active:scale-95"
                >
                  {currentLang === 'es' ? 'Cerrar Todo' : 'Collapse All'}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Chef's Signature Pairings Showcase Banner */}
        {activeTab === 'all' && !searchQuery && activeFilterTag === 'all' && (
          <div className="mt-8 p-6 rounded-2xl bg-black text-white border-2 border-zinc-900 shadow-xl space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-zinc-800 pb-4">
              <div>
                <span className="text-[11px] font-black uppercase text-red-500 tracking-widest flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  {currentLang === 'es' ? 'Combinaciones Recomendadas' : 'Chef’s Signature Tapas Pairings'}
                </span>
                <h3 className="text-xl font-black text-white uppercase tracking-tight mt-0.5">
                  {currentLang === 'es' ? 'Maridajes Insuperables de la Casa' : 'Best Seller Pairings in Palma Nova'}
                </h3>
              </div>
              <span className="text-xs text-zinc-400 font-bold bg-zinc-900 px-3 py-1 rounded-full border border-zinc-800">
                {currentLang === 'es' ? 'Acompaña tu Copa' : 'Perfect for 2 Sharing'}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Pairing 1 */}
              <div className="p-4 rounded-xl bg-zinc-900/90 border border-zinc-800 hover:border-red-600/60 transition-all space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <div className="text-xs font-black text-white uppercase tracking-wider">Gambas + Sangría Tinta</div>
                  <span className="text-xs text-red-400 font-black px-2 py-0.5 rounded bg-zinc-800 border border-zinc-700">14.85 €</span>
                </div>
                <p className="text-[11px] text-zinc-400 leading-snug">
                  {currentLang === 'es'
                    ? 'Langostinos borboteando al ajillo con nuestra jarra de sangría casera macerada.'
                    : 'Sizzling garlic prawns paired with cold house red wine sangria.'}
                </p>
              </div>

              {/* Pairing 2 */}
              <div className="p-4 rounded-xl bg-zinc-900/90 border border-zinc-800 hover:border-red-600/60 transition-all space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <div className="text-xs font-black text-white uppercase tracking-wider">Quesos Mahón + Palma Crimson</div>
                  <span className="text-xs text-red-400 font-black px-2 py-0.5 rounded bg-zinc-800 border border-zinc-700">21.00 €</span>
                </div>
                <p className="text-[11px] text-zinc-400 leading-snug">
                  {currentLang === 'es'
                    ? 'Tabla de Queso Manchego y Mahonés con nuestro cóctel ahumado de autor.'
                    : 'Aged Manchego & Mahón cheese board with smoked signature cocktail.'}
                </p>
              </div>

              {/* Pairing 3 */}
              <div className="p-4 rounded-xl bg-zinc-900/90 border border-zinc-800 hover:border-red-600/60 transition-all space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <div className="text-xs font-black text-white uppercase tracking-wider">Pa amb Oli + Rosa Blanca</div>
                  <span className="text-xs text-red-400 font-black px-2 py-0.5 rounded bg-zinc-800 border border-zinc-700">12.70 €</span>
                </div>
                <p className="text-[11px] text-zinc-400 leading-snug">
                  {currentLang === 'es'
                    ? 'Pan tostado con tomate de ramellet, jamón ibérico y cerveza artesana helada.'
                    : 'Toasted Mallorcan bread with ramellet tomato, ham & hoppy local lager.'}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* STANDALONE CATEGORY ACCORDIONS LIST */}
        <div className="mt-8 space-y-6">
          {activeCategoriesToDisplay.map((catKey) => {
            const catItems = groupedItems[catKey] || [];
            if (catItems.length === 0) return null;

            // Auto-expand if search/filter is active or if specifically selected in state
            const isExpanded = isSearchOrFilterActive || expandedCategories[catKey];

            return (
              <div
                key={catKey}
                className="rounded-2xl bg-white border-2 border-zinc-300 overflow-hidden shadow-sm hover:border-black transition-all duration-300"
              >
                {/* Category Header Bar (Clickable Standalone Title) */}
                <button
                  type="button"
                  onClick={() => toggleCategory(catKey)}
                  className="w-full p-4 sm:p-5 bg-white hover:bg-zinc-50 flex items-center justify-between gap-4 text-left transition-colors cursor-pointer group active:bg-zinc-100"
                >
                  <div className="flex items-center gap-3.5 sm:gap-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-black border-2 border-red-600 flex items-center justify-center text-white shrink-0 group-hover:scale-105 transition-transform shadow-sm">
                      {getCategoryIcon(catKey)}
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-base sm:text-xl font-black text-black uppercase tracking-tight group-hover:text-red-600 transition-colors">
                          {tCategory[catKey]}
                        </h3>
                        <span className="px-2.5 py-0.5 rounded-full bg-zinc-100 border border-zinc-300 text-zinc-800 text-[10px] sm:text-[11px] font-black font-mono">
                          {catItems.length} {currentLang === 'es' ? 'Platos' : 'Items'}
                        </span>
                      </div>
                      <p className="text-xs text-zinc-600 font-medium mt-0.5 hidden sm:block">
                        {tSubtext[catKey as keyof typeof tSubtext]}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 shrink-0">
                    <span className="hidden md:inline-block text-xs font-black uppercase text-red-600 tracking-wider">
                      {isExpanded
                        ? currentLang === 'es'
                          ? 'Ocultar'
                          : 'Hide'
                        : currentLang === 'es'
                        ? 'Ver Platos'
                        : 'Reveal Plates'}
                    </span>
                    <div
                      className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl border-2 border-zinc-300 flex items-center justify-center transition-transform duration-300 ${
                        isExpanded
                          ? 'bg-black text-white border-black rotate-180'
                          : 'bg-zinc-100 text-zinc-800 group-hover:border-black'
                      }`}
                    >
                      <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                  </div>
                </button>

                {/* Smooth Reveal Animation Container */}
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden border-t-2 border-zinc-200 bg-zinc-50/50"
                    >
                      <div className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {catItems.map((item, idx) => {
                          const countInTray = selectedItemsMap[item.id] || 0;
                          return (
                            <motion.div
                              key={item.id}
                              initial={{ opacity: 0, y: 15 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.25, delay: idx * 0.04 }}
                              className="group rounded-2xl bg-white border-2 border-zinc-300 hover:border-black transition-all duration-200 flex flex-col justify-between p-5 relative shadow-sm"
                            >
                              {/* Header info & badges */}
                              <div className="space-y-3">
                                <div className="flex items-center justify-between gap-2 border-b border-zinc-100 pb-2.5">
                                  <div className="flex flex-wrap items-center gap-1.5">
                                    {item.tags.slice(0, 2).map((tag, tIdx) => (
                                      <span
                                        key={tIdx}
                                        className="px-2.5 py-0.5 rounded-full bg-zinc-900 text-white text-[10px] font-black uppercase tracking-wider"
                                      >
                                        {tag}
                                      </span>
                                    ))}
                                    {item.alcoholByVolume && (
                                      <span className="px-2 py-0.5 rounded bg-red-100 text-red-700 text-[10px] font-mono border border-red-200 font-bold">
                                        ABV {item.alcoholByVolume}
                                      </span>
                                    )}
                                  </div>
                                  <div className="px-3 py-1 rounded-xl bg-black text-white font-black text-sm shrink-0">
                                    {item.price.toFixed(2)} €
                                  </div>
                                </div>

                                {/* Title & description */}
                                <div className="space-y-1">
                                  <h4 className="font-extrabold text-base text-black group-hover:text-red-600 transition-colors">
                                    {currentLang === 'es' ? item.spanishName || item.name : item.name}
                                  </h4>
                                  {currentLang !== 'es' &&
                                    item.spanishName &&
                                    item.name !== item.spanishName && (
                                      <p className="text-xs text-red-600 font-serif italic font-bold">
                                        {item.spanishName}
                                      </p>
                                    )}
                                  <p className="text-xs text-zinc-600 leading-relaxed font-medium pt-1">
                                    {item.description}
                                  </p>
                                </div>
                              </div>

                              {/* Card Footer Actions */}
                              <div className="pt-4 mt-4 border-t border-zinc-200 flex items-center justify-between gap-2">
                                <button
                                  type="button"
                                  onClick={() => setDetailModalItem(item)}
                                  className="text-xs text-zinc-600 hover:text-black flex items-center gap-1 transition-colors font-bold active:scale-95"
                                >
                                  <Info className="w-3.5 h-3.5 text-red-600" />
                                  <span>{currentLang === 'es' ? 'Detalles' : 'Details'}</span>
                                </button>

                                <button
                                  type="button"
                                  onClick={() => onAddItemToTray(item)}
                                  className={`px-3.5 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 active:scale-95 uppercase tracking-wider ${
                                    countInTray > 0
                                      ? 'bg-emerald-600 text-white border border-emerald-700'
                                      : 'bg-red-600 hover:bg-red-700 text-white'
                                  }`}
                                >
                                  {countInTray > 0 ? (
                                    <>
                                      <Check className="w-3.5 h-3.5 text-white" />
                                      <span>
                                        {currentLang === 'es'
                                          ? `Añadido (${countInTray})`
                                          : `Added (${countInTray})`}
                                      </span>
                                    </>
                                  ) : (
                                    <>
                                      <Plus className="w-3.5 h-3.5 text-white" />
                                      <span>{currentLang === 'es' ? 'Añadir' : 'Add'}</span>
                                    </>
                                  )}
                                </button>
                              </div>
                            </motion.div>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-16 text-zinc-600 space-y-2 bg-white rounded-2xl border-2 border-zinc-300 mt-6">
            <p className="text-base font-bold text-black">
              {currentLang === 'es' ? 'No se encontraron platos.' : 'No items found.'}
            </p>
            <p className="text-xs">
              {currentLang === 'es'
                ? 'Prueba borrando la búsqueda o seleccionando otra categoría.'
                : 'Try clearing your search or choosing another category.'}
            </p>
            <button
              onClick={() => {
                setActiveTab('all');
                setActiveFilterTag('all');
                setSearchQuery('');
              }}
              className="mt-2 px-4 py-2 rounded-xl bg-red-600 text-xs text-white font-bold hover:bg-red-700 active:scale-95"
            >
              {currentLang === 'es' ? 'Restablecer Filtros' : 'Reset Filters'}
            </button>
          </div>
        )}

        {/* CTA banner below menu */}
        <div className="mt-14 p-6 sm:p-8 rounded-2xl bg-black border-2 border-black flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md text-white">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-lg font-black text-white flex items-center justify-center sm:justify-start gap-2 uppercase tracking-wider">
              <Sparkles className="w-5 h-5 text-red-500" />
              <span>
                {currentLang === 'es'
                  ? '¿Quieres hacer tu pedido online en Palma Nova?'
                  : 'Want to place an online order in Palma Nova?'}
              </span>
            </h4>
            <p className="text-xs text-zinc-300 font-medium">
              {currentLang === 'es'
                ? 'Introduce tu número de teléfono y confirma tu pedido de tapas y bebidas al instante.'
                : 'Enter your phone number and confirm your tapas & drinks order instantly.'}
            </p>
          </div>
          <button
            onClick={onOpenOrderModal}
            className="px-6 py-3.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-black text-xs sm:text-sm transition-all shrink-0 uppercase tracking-widest active:scale-95"
          >
            {currentLang === 'es' ? 'Pedir Online' : 'Order Online'}
          </button>
        </div>
      </div>

      {/* Item Detail Modal */}
      {detailModalItem && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white border-2 border-black max-w-lg w-full rounded-2xl overflow-hidden shadow-2xl relative space-y-0 text-zinc-900">
            <button
              onClick={() => setDetailModalItem(null)}
              className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-black text-white hover:bg-red-600 flex items-center justify-center transition-colors font-bold active:scale-95"
            >
              ✕
            </button>

            <div className="p-6 bg-black text-white border-b-2 border-black space-y-2">
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                {detailModalItem.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-0.5 rounded-full bg-red-600 text-white text-[10px] font-black uppercase tracking-wider"
                  >
                    {tag}
                  </span>
                ))}
                {detailModalItem.alcoholByVolume && (
                  <span className="px-2 py-0.5 rounded bg-zinc-800 text-red-400 text-[10px] font-mono border border-zinc-700 font-bold">
                    ABV {detailModalItem.alcoholByVolume}
                  </span>
                )}
              </div>
              <div className="flex items-start justify-between gap-3 pt-1">
                <div>
                  <h3 className="text-xl font-black text-white uppercase tracking-tight">
                    {currentLang === 'es' ? detailModalItem.spanishName || detailModalItem.name : detailModalItem.name}
                  </h3>
                  {detailModalItem.spanishName && detailModalItem.name !== detailModalItem.spanishName && (
                    <p className="text-xs text-red-400 font-serif italic font-bold">{detailModalItem.spanishName}</p>
                  )}
                </div>
                <span className="text-2xl font-black text-red-500 shrink-0">{detailModalItem.price.toFixed(2)} €</span>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <p className="text-xs text-zinc-700 leading-relaxed font-medium">
                {detailModalItem.longDescription || detailModalItem.description}
              </p>

              {/* Ingredients List */}
              {detailModalItem.ingredients && (
                <div className="space-y-1.5 pt-2 border-t border-zinc-200">
                  <span className="text-[11px] font-black text-red-600 uppercase tracking-wider">
                    {currentLang === 'es' ? 'Ingredientes Destacados:' : 'Key Ingredients:'}
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {detailModalItem.ingredients.map((ing, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-md bg-zinc-100 text-zinc-800 text-[11px] border border-zinc-300 font-bold"
                      >
                        {ing}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="pt-4 flex items-center gap-3">
                <button
                  onClick={() => {
                    onAddItemToTray(detailModalItem);
                    setDetailModalItem(null);
                  }}
                  className="flex-1 py-3.5 rounded-xl bg-red-600 hover:bg-red-700 active:scale-95 text-white font-black text-xs transition-colors uppercase tracking-wider"
                >
                  {currentLang === 'es' ? 'Añadir al Pedido' : 'Add to Order'}
                </button>
                <button
                  onClick={() => setDetailModalItem(null)}
                  className="px-4 py-3.5 rounded-xl bg-zinc-100 hover:bg-zinc-200 active:scale-95 text-zinc-800 text-xs font-bold border border-zinc-300"
                >
                  {currentLang === 'es' ? 'Cerrar' : 'Close'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
