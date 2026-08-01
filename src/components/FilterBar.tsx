import { useState, useRef, useEffect } from 'react';
import { Search, ChevronDown, SlidersHorizontal, RefreshCw, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { FilterState } from '../types';
import { BRANDS, FRAGRANCE_NOTES } from '../data/perfumes';
import { useLanguage } from '../context/LanguageContext';

interface FilterBarProps {
  filters: FilterState;
  setFilters: (filters: FilterState | ((prev: FilterState) => FilterState)) => void;
  onSearchSubmit: () => void;
  onResetFilters: () => void;
}

export default function FilterBar({
  filters,
  setFilters,
  onSearchSubmit,
  onResetFilters,
}: FilterBarProps) {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isSticky, setIsSticky] = useState(false);
  const [isMobileSheetOpen, setIsMobileSheetOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const { t, language, dir } = useLanguage();

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Sticky search capsule on scroll (mobile only)
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 450) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDropdown = (name: string) => {
    if (activeDropdown === name) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(name);
    }
  };

  const handleSelect = (field: keyof FilterState, value: any) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
    setActiveDropdown(null);
  };

  const priceOptions = [
    { label: t('finder_price_all'), value: 10000 },
    { label: language === 'ar' ? 'أقل من ٥٠٠ د.ج' : 'Under 500 DA', value: 500 },
    { label: language === 'ar' ? 'أقل من ٨٠٠ د.ج' : 'Under 800 DA', value: 800 },
    { label: language === 'ar' ? 'أقل من ١,٢٠٠ د.ج' : 'Under 1,200 DA', value: 1200 },
    { label: language === 'ar' ? 'أقل من ١,٨٠٠ د.ج' : 'Under 1,800 DA', value: 1800 },
  ];

  const genderOptions = [
    { label: t('finder_gender_all'), value: '' },
    { label: t('Men'), value: 'Men' },
    { label: t('Women'), value: 'Women' },
    { label: t('Unisex'), value: 'Unisex' },
  ];

  return (
    <div className="relative z-30 max-w-[1700px] mx-auto px-6 md:px-12 -mt-12 sm:-mt-16 mb-16">
      
      {/* ----------------- MOBILE STICKY SEARCH BAR (iOS Capsule style) ----------------- */}
      <AnimatePresence>
        {isSticky && (
          <motion.div
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -80, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-[75px] left-0 right-0 z-[80] px-5 md:hidden"
          >
            <div 
              onClick={() => setIsMobileSheetOpen(true)}
              className="w-full bg-[#0B0B0B]/90 backdrop-blur-2xl border border-[#C8A96A]/25 py-3 px-5 rounded-full flex items-center justify-between shadow-[0_15px_35px_rgba(0,0,0,0.8)] cursor-pointer select-none active:scale-98 transition-transform duration-200"
              style={{ direction: dir }}
            >
              <div className="flex items-center gap-3">
                <Search size={15} className="text-[#C8A96A]" />
                <span className="text-[11px] font-sans text-gray-300 tracking-wide font-light">
                  {filters.search ? `${t('finder_search_label')}: "${filters.search}"` : t('finder_search_placeholder')}
                </span>
              </div>
              <div className="flex items-center gap-1.5 bg-[#C8A96A]/10 border border-[#C8A96A]/30 px-3 py-1 rounded-full">
                <SlidersHorizontal size={10} className="text-[#C8A96A]" />
                <span className="text-[8px] uppercase tracking-widest font-sans font-medium text-[#C8A96A]">{t('finder_title')}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ----------------- STATIC CONTAINER ----------------- */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.6 }}
        ref={dropdownRef}
        className="bg-[#0B0B0B]/85 backdrop-blur-2xl border border-[#C8A96A]/20 p-5 sm:p-6 shadow-[0_20px_50px_rgba(0,0,0,0.9)] relative overflow-visible"
        style={{ direction: dir }}
      >
        {/* Corner golden elements to emphasize "luxury casing" */}
        <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-[#C8A96A]" />
        <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-[#C8A96A]" />
        <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-[#C8A96A]" />
        <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-[#C8A96A]" />

        {/* Floating title row */}
        <div className="flex justify-between items-center mb-6 pb-4 border-b border-[#C8A96A]/10">
          <div className="flex items-center gap-2">
            <SlidersHorizontal size={14} className="text-[#C8A96A]" />
            <h2 className="text-[10px] tracking-[0.3em] uppercase text-white font-sans font-light">
              {t('finder_title')}
            </h2>
          </div>
          <button
            onClick={onResetFilters}
            className="text-[9px] tracking-[0.2em] uppercase text-[#C8A96A] hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <RefreshCw size={10} />
            <span>{t('finder_reset')}</span>
          </button>
        </div>

        {/* ----------------- DESKTOP FILTER VIEW (hidden on mobile) ----------------- */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-6 gap-4 items-end text-left">
          
          {/* Search Query Input */}
          <div className="lg:col-span-1 flex flex-col space-y-1.5 text-left">
            <label className="text-[9px] tracking-[0.15em] uppercase text-gray-400 font-sans">
              {t('finder_search_label')}
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder={t('finder_search_placeholder')}
                value={filters.search}
                onChange={(e) => handleSelect('search', e.target.value)}
                className="w-full bg-black/60 border border-[#C8A96A]/20 focus:border-[#C8A96A] text-white px-3 py-2.5 text-xs placeholder-gray-600 outline-none transition-colors"
              />
              <Search size={14} className={`absolute ${dir === 'rtl' ? 'left-3' : 'right-3'} top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none`} />
            </div>
          </div>

          {/* Brand Dropdown */}
          <div className="flex flex-col space-y-1.5 relative text-left">
            <label className="text-[9px] tracking-[0.15em] uppercase text-gray-400 font-sans">
              {t('finder_brand_label')}
            </label>
            <button
              onClick={() => toggleDropdown('brand')}
              className="w-full bg-black/60 border border-[#C8A96A]/20 hover:border-[#C8A96A]/50 text-white px-3 py-2.5 text-xs flex justify-between items-center transition-colors text-left"
              id="filter-brand-btn"
              style={{ direction: dir }}
            >
              <span className="truncate">{t(filters.brand) || t('finder_brand_all')}</span>
              <ChevronDown size={14} className="text-[#C8A96A] transition-transform duration-300" />
            </button>
            <AnimatePresence>
              {activeDropdown === 'brand' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute left-0 right-0 top-full mt-1 bg-[#121212] border border-[#C8A96A]/20 max-h-56 overflow-y-auto z-40 shadow-2xl"
                >
                  <button
                    onClick={() => handleSelect('brand', '')}
                    className="w-full text-left px-4 py-2 text-xs text-gray-300 hover:bg-[#C8A96A]/10 hover:text-white transition-colors"
                  >
                    {t('finder_brand_all')}
                  </button>
                  {BRANDS.map((b) => (
                    <button
                      key={b.name}
                      onClick={() => handleSelect('brand', b.name)}
                      className={`w-full text-left px-4 py-2 text-xs transition-colors ${
                        filters.brand === b.name ? 'text-[#C8A96A] bg-[#C8A96A]/5' : 'text-gray-300 hover:bg-[#C8A96A]/10 hover:text-white'
                      }`}
                      style={{ textAlign: dir === 'rtl' ? 'right' : 'left' }}
                    >
                      {t(b.name)}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Gender Dropdown */}
          <div className="flex flex-col space-y-1.5 relative text-left">
            <label className="text-[9px] tracking-[0.15em] uppercase text-gray-400 font-sans">
              {t('finder_gender_label')}
            </label>
            <button
              onClick={() => toggleDropdown('gender')}
              className="w-full bg-black/60 border border-[#C8A96A]/20 hover:border-[#C8A96A]/50 text-white px-3 py-2.5 text-xs flex justify-between items-center transition-colors text-left"
              id="filter-gender-btn"
              style={{ direction: dir }}
            >
              <span className="truncate">{t(filters.gender) || t('finder_gender_all')}</span>
              <ChevronDown size={14} className="text-[#C8A96A] transition-transform duration-300" />
            </button>
            <AnimatePresence>
              {activeDropdown === 'gender' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute left-0 right-0 top-full mt-1 bg-[#121212] border border-[#C8A96A]/20 z-40 shadow-2xl"
                >
                  {genderOptions.map((g) => (
                    <button
                      key={g.value}
                      onClick={() => handleSelect('gender', g.value)}
                      className={`w-full text-left px-4 py-2 text-xs transition-colors ${
                        filters.gender === g.value ? 'text-[#C8A96A] bg-[#C8A96A]/5' : 'text-gray-300 hover:bg-[#C8A96A]/10 hover:text-white'
                      }`}
                      style={{ textAlign: dir === 'rtl' ? 'right' : 'left' }}
                    >
                      {g.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Price Range Dropdown */}
          <div className="flex flex-col space-y-1.5 relative text-left">
            <label className="text-[9px] tracking-[0.15em] uppercase text-gray-400 font-sans">
              {t('finder_price_label')}
            </label>
            <button
              onClick={() => toggleDropdown('price')}
              className="w-full bg-black/60 border border-[#C8A96A]/20 hover:border-[#C8A96A]/50 text-white px-3 py-2.5 text-xs flex justify-between items-center transition-colors text-left"
              id="filter-price-btn"
              style={{ direction: dir }}
            >
              <span className="truncate">
                {filters.maxPrice === 10000 ? t('finder_price_all') : `${t('finder_price_under')} ${filters.maxPrice.toLocaleString()} ${language === 'ar' ? 'د.ج' : 'DA'}`}
              </span>
              <ChevronDown size={14} className="text-[#C8A96A] transition-transform duration-300" />
            </button>
            <AnimatePresence>
              {activeDropdown === 'price' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute left-0 right-0 top-full mt-1 bg-[#121212] border border-[#C8A96A]/20 z-40 shadow-2xl"
                >
                  {priceOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => handleSelect('maxPrice', option.value)}
                      className={`w-full text-left px-4 py-2 text-xs transition-colors ${
                        filters.maxPrice === option.value ? 'text-[#C8A96A] bg-[#C8A96A]/5' : 'text-gray-300 hover:bg-[#C8A96A]/10 hover:text-white'
                      }`}
                      style={{ textAlign: dir === 'rtl' ? 'right' : 'left' }}
                    >
                      {option.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Fragrance Notes Dropdown */}
          <div className="flex flex-col space-y-1.5 relative text-left">
            <label className="text-[9px] tracking-[0.15em] uppercase text-gray-400 font-sans">
              {t('finder_notes_label')}
            </label>
            <button
              onClick={() => toggleDropdown('note')}
              className="w-full bg-black/60 border border-[#C8A96A]/20 hover:border-[#C8A96A]/50 text-white px-3 py-2.5 text-xs flex justify-between items-center transition-colors text-left"
              id="filter-note-btn"
              style={{ direction: dir }}
            >
              <span className="truncate">{t(filters.note) || t('finder_notes_all')}</span>
              <ChevronDown size={14} className="text-[#C8A96A] transition-transform duration-300" />
            </button>
            <AnimatePresence>
              {activeDropdown === 'note' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute left-0 right-0 top-full mt-1 bg-[#121212] border border-[#C8A96A]/20 max-h-56 overflow-y-auto z-40 shadow-2xl"
                >
                  <button
                    onClick={() => handleSelect('note', '')}
                    className="w-full text-left px-4 py-2 text-xs text-gray-300 hover:bg-[#C8A96A]/10 hover:text-white transition-colors"
                  >
                    {t('finder_notes_all')}
                  </button>
                  {FRAGRANCE_NOTES.map((n) => (
                    <button
                      key={n}
                      onClick={() => handleSelect('note', n)}
                      className={`w-full text-left px-4 py-2 text-xs transition-colors ${
                        filters.note === n ? 'text-[#C8A96A] bg-[#C8A96A]/5' : 'text-gray-300 hover:bg-[#C8A96A]/10 hover:text-white'
                      }`}
                      style={{ textAlign: dir === 'rtl' ? 'right' : 'left' }}
                    >
                      {t(n)}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Search Button */}
          <button
            onClick={onSearchSubmit}
            className="w-full py-3 bg-[#C8A96A] text-black font-semibold text-[10px] tracking-[0.2em] uppercase transition-all duration-300 hover:bg-white flex items-center justify-center gap-2 rounded-none cursor-pointer group"
            id="filter-search-submit-btn"
          >
            <Search size={14} className="group-hover:scale-110 transition-transform" />
            <span>{t('finder_discover')}</span>
          </button>

        </div>

        {/* ----------------- MOBILE FILTER VIEW (Thumb friendly) ----------------- */}
        <div className="flex md:hidden flex-col space-y-4">
          <div className="relative">
            <input
              type="text"
              placeholder={t('finder_search_placeholder')}
              value={filters.search}
              onChange={(e) => handleSelect('search', e.target.value)}
              className="w-full bg-black/60 border border-[#C8A96A]/20 focus:border-[#C8A96A] text-white pl-4 pr-10 py-3 rounded-full text-xs placeholder-gray-600 outline-none transition-all duration-300"
            />
            <Search size={16} className={`absolute ${dir === 'rtl' ? 'left-4' : 'right-4'} top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none`} />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setIsMobileSheetOpen(true)}
              className="w-full py-3 bg-black/40 border border-[#C8A96A]/30 text-white font-semibold text-[10px] tracking-[0.15em] uppercase flex items-center justify-center gap-2 rounded-full cursor-pointer select-none active:bg-[#C8A96A]/5 transition-colors"
            >
              <SlidersHorizontal size={12} className="text-[#C8A96A]" />
              <span>{t('finder_title')}</span>
              {Object.values(filters).filter(v => v !== '' && v !== 10000).length > 0 && (
                <span className="w-2 h-2 rounded-full bg-[#C8A96A] animate-pulse" />
              )}
            </button>

            <button
              onClick={onSearchSubmit}
              className="w-full py-3 bg-[#C8A96A] text-black font-semibold text-[10px] tracking-[0.15em] uppercase flex items-center justify-center gap-2 rounded-full cursor-pointer select-none active:opacity-80 transition-opacity"
            >
              <span>{t('finder_discover')}</span>
            </button>
          </div>
        </div>

      </motion.div>

      {/* ----------------- MOBILE BOTTOM SHEET DRAWER (iOS style) ----------------- */}
      <AnimatePresence>
        {isMobileSheetOpen && (
          <>
            {/* Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileSheetOpen(false)}
              className="fixed inset-0 bg-black/90 z-[110] md:hidden"
            />

            {/* Slide-up panel */}
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 24, stiffness: 200 }}
              className="fixed bottom-0 left-0 right-0 bg-[#0C0C0C] rounded-t-[2.5rem] border-t border-[#C8A96A]/35 z-[120] p-6 max-h-[85vh] overflow-y-auto md:hidden pb-safe text-left shadow-[0_-25px_50px_rgba(0,0,0,0.95)]"
              style={{ direction: dir }}
            >
              {/* Grab bar */}
              <div className="w-12 h-1 bg-gray-800 rounded-full mx-auto mb-6 cursor-pointer" onClick={() => setIsMobileSheetOpen(false)} />

              {/* Title & Reset Row */}
              <div className="flex justify-between items-center mb-6 border-b border-white/5 pb-4">
                <div className="flex items-center gap-2.5">
                  <SlidersHorizontal size={15} className="text-[#C8A96A]" />
                  <h3 className="text-xs tracking-[0.25em] uppercase text-white font-serif font-light">{t('finder_title')}</h3>
                </div>
                <button
                  onClick={() => {
                    onResetFilters();
                    setIsMobileSheetOpen(false);
                  }}
                  className="text-[9px] uppercase tracking-[0.2em] text-[#C8A96A] flex items-center gap-1 py-1 px-2.5 bg-[#C8A96A]/10 rounded-full"
                >
                  <RefreshCw size={8} />
                  <span>{t('finder_reset')}</span>
                </button>
              </div>

              <div className="space-y-6">
                {/* Search Text Input inside Bottom Sheet */}
                <div className="space-y-2">
                  <span className="text-[9px] uppercase tracking-[0.2em] text-[#C8A96A] font-sans font-light block">{t('finder_search_label')}</span>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder={t('finder_search_placeholder')}
                      value={filters.search}
                      onChange={(e) => handleSelect('search', e.target.value)}
                      className="w-full bg-black/50 border border-[#C8A96A]/20 focus:border-[#C8A96A] text-white px-4 py-3 rounded-xl text-xs placeholder-gray-700 outline-none transition-colors"
                    />
                    <Search size={14} className={`absolute ${dir === 'rtl' ? 'left-4' : 'right-4'} top-1/2 -translate-y-1/2 text-gray-600`} />
                  </div>
                </div>

                {/* Fashion Houses */}
                <div className="space-y-2.5">
                  <span className="text-[9px] uppercase tracking-[0.2em] text-[#C8A96A] font-sans font-light block">{t('finder_brand_label')}</span>
                  <div className="flex flex-wrap gap-2.5 max-h-48 overflow-y-auto py-1">
                    <button
                      onClick={() => handleSelect('brand', '')}
                      className={`px-4 py-2.5 text-xs rounded-full border transition-all duration-300 select-none min-h-[44px] cursor-pointer ${
                        filters.brand === '' 
                          ? 'bg-[#C8A96A] text-black border-[#C8A96A] font-medium shadow-[0_4px_15px_rgba(200,169,106,0.3)]' 
                          : 'bg-black/50 text-gray-300 border-white/5 hover:border-[#C8A96A]/30'
                      }`}
                    >
                      {t('finder_brand_all')}
                    </button>
                    {BRANDS.map((b) => (
                      <button
                        key={b.name}
                        onClick={() => handleSelect('brand', b.name)}
                        className={`px-4 py-2.5 text-xs rounded-full border transition-all duration-300 select-none min-h-[44px] cursor-pointer ${
                          filters.brand === b.name 
                            ? 'bg-[#C8A96A] text-black border-[#C8A96A] font-medium shadow-[0_4px_15px_rgba(200,169,106,0.3)]' 
                            : 'bg-black/50 text-gray-300 border-white/5 hover:border-[#C8A96A]/30'
                        }`}
                      >
                        {t(b.name)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Scent Accords */}
                <div className="space-y-2.5">
                  <span className="text-[9px] uppercase tracking-[0.2em] text-[#C8A96A] font-sans font-light block">{t('finder_notes_label')}</span>
                  <div className="flex flex-wrap gap-2.5 max-h-48 overflow-y-auto py-1">
                    <button
                      onClick={() => handleSelect('note', '')}
                      className={`px-4 py-2.5 text-xs rounded-full border transition-all duration-300 select-none min-h-[44px] cursor-pointer ${
                        filters.note === '' 
                          ? 'bg-[#C8A96A] text-black border-[#C8A96A] font-medium shadow-[0_4px_15px_rgba(200,169,106,0.3)]' 
                          : 'bg-black/50 text-gray-300 border-white/5 hover:border-[#C8A96A]/30'
                      }`}
                    >
                      {t('finder_notes_all')}
                    </button>
                    {FRAGRANCE_NOTES.map((n) => (
                      <button
                        key={n}
                        onClick={() => handleSelect('note', n)}
                        className={`px-4 py-2.5 text-xs rounded-full border transition-all duration-300 select-none min-h-[44px] cursor-pointer ${
                          filters.note === n 
                            ? 'bg-[#C8A96A] text-black border-[#C8A96A] font-medium shadow-[0_4px_15px_rgba(200,169,106,0.3)]' 
                            : 'bg-black/50 text-gray-300 border-white/5 hover:border-[#C8A96A]/30'
                        }`}
                      >
                        {t(n)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Genders */}
                <div className="space-y-2.5">
                  <span className="text-[9px] uppercase tracking-[0.2em] text-[#C8A96A] font-sans font-light block">{t('finder_gender_label')}</span>
                  <div className="grid grid-cols-4 gap-2">
                    {genderOptions.map((g) => (
                      <button
                        key={g.value}
                        onClick={() => handleSelect('gender', g.value)}
                        className={`py-3 text-[10px] text-center rounded-xl border transition-all duration-300 select-none min-h-[44px] cursor-pointer ${
                          filters.gender === g.value 
                            ? 'bg-[#C8A96A] text-black border-[#C8A96A] font-medium shadow-[0_4px_15px_rgba(200,169,106,0.3)]' 
                            : 'bg-black/50 text-gray-400 border-white/5 hover:border-[#C8A96A]/30'
                        }`}
                      >
                        {g.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price range */}
                <div className="space-y-2.5">
                  <span className="text-[9px] uppercase tracking-[0.2em] text-[#C8A96A] font-sans font-light block">{t('finder_price_label')}</span>
                  <div className="grid grid-cols-5 gap-2">
                    {priceOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => handleSelect('maxPrice', option.value)}
                        className={`py-3 text-[10px] text-center rounded-xl border transition-all duration-300 select-none min-h-[44px] cursor-pointer ${
                          filters.maxPrice === option.value 
                            ? 'bg-[#C8A96A] text-black border-[#C8A96A] font-medium shadow-[0_4px_15px_rgba(200,169,106,0.3)]' 
                            : 'bg-black/50 text-gray-400 border-white/5 hover:border-[#C8A96A]/30'
                        }`}
                      >
                        {option.value === 10000 ? (language === 'ar' ? 'الكل' : 'Any') : `${option.value.toLocaleString()}`}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Primary CTA Apply button */}
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    onSearchSubmit();
                    setIsMobileSheetOpen(false);
                  }}
                  className="w-full mt-6 py-4 bg-gradient-to-r from-[#C8A96A] to-[#A08146] text-black font-sans font-semibold text-xs tracking-[0.25em] uppercase flex items-center justify-center gap-2 shadow-[0_10px_30px_rgba(200,169,106,0.2)]"
                >
                  <span>{t('finder_discover')}</span>
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
}
