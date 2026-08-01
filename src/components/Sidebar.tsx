import { ChangeEvent } from 'react';
import { motion } from 'motion/react';
import { X, Sparkles, Filter, Check } from 'lucide-react';
import { FilterState } from '../types';
import { BRANDS, FRAGRANCE_NOTES, BOTTLE_SIZES, AVAILABILITIES } from '../data/perfumes';
import { useLanguage } from '../context/LanguageContext';

interface SidebarProps {
  filters: FilterState;
  setFilters: (filters: FilterState | ((prev: FilterState) => FilterState)) => void;
  onResetFilters: () => void;
  isMobileDrawerOpen?: boolean;
  onCloseMobileDrawer?: () => void;
}

export default function Sidebar({
  filters,
  setFilters,
  onResetFilters,
  isMobileDrawerOpen = false,
  onCloseMobileDrawer,
}: SidebarProps) {
  const { t, language, dir } = useLanguage();

  const handleBrandChange = (brandName: string) => {
    setFilters((prev) => ({
      ...prev,
      brand: prev.brand === brandName ? '' : brandName,
    }));
  };

  const handleGenderChange = (gender: string) => {
    setFilters((prev) => ({
      ...prev,
      gender: prev.gender === gender ? '' : gender,
    }));
  };

  const handleNoteChange = (note: string) => {
    setFilters((prev) => ({
      ...prev,
      note: prev.note === note ? '' : note,
    }));
  };

  const handleSizeChange = (size: string) => {
    setFilters((prev) => ({
      ...prev,
      size: prev.size === size ? '' : size,
    }));
  };

  const handleAvailabilityChange = (status: string) => {
    setFilters((prev) => ({
      ...prev,
      availability: prev.availability === status ? '' : status,
    }));
  };

  const handlePriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setFilters((prev) => ({
      ...prev,
      maxPrice: value,
    }));
  };

  const content = (
    <div className={`flex flex-col space-y-8 p-1 ${dir === 'rtl' ? 'text-right' : 'text-left'}`} style={{ direction: dir }}>
      {/* Header section in Drawer */}
      <div className="flex items-center justify-between pb-4 border-b border-[#C8A96A]/10">
        <div className="flex items-center gap-2">
          <Filter size={14} className="text-[#C8A96A]" />
          <h3 className="text-xs uppercase tracking-[0.25em] font-sans text-white font-medium">
            {language === 'ar' ? 'تصفية المجموعة' : 'Refine Collection'}
          </h3>
        </div>
        <button
          onClick={onResetFilters}
          className="text-[9px] tracking-[0.15em] uppercase text-[#C8A96A] hover:text-white transition-colors cursor-pointer"
        >
          {t('finder_reset')}
        </button>
      </div>

      {/* PRICE RANGE FILTER */}
      <div className="space-y-3">
        <div className="flex justify-between items-center text-[10px] tracking-wider uppercase">
          <span className="text-gray-400 font-sans">{t('finder_price_label')}</span>
          <span className="text-[#C8A96A] font-mono font-medium">
            {language === 'ar' ? `${filters.maxPrice.toLocaleString()} د.ج حد أقصى` : `${filters.maxPrice.toLocaleString()} DA Max`}
          </span>
        </div>
        <div className="relative pt-1">
          <input
            type="range"
            min="250"
            max="2000"
            step="50"
            value={filters.maxPrice}
            onChange={handlePriceChange}
            className="w-full h-1 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-[#C8A96A]"
            id="sidebar-price-slider"
          />
          <div className="flex justify-between text-[8px] text-gray-500 font-mono mt-1">
            <span>{language === 'ar' ? '٢٥٠ د.ج' : '250 DA'}</span>
            <span>{language === 'ar' ? '٢,٠٠٠ د.ج' : '2,000 DA'}</span>
          </div>
        </div>
      </div>

      {/* BRANDS / FASHION HOUSES */}
      <div className="space-y-3">
        <span className="text-[10px] tracking-wider uppercase text-gray-400 font-sans block">
          {t('finder_brand_label')}
        </span>
        <div className="flex flex-col space-y-2">
          {BRANDS.map((b) => {
            const isChecked = filters.brand === b.name;
            return (
              <button
                key={b.name}
                onClick={() => handleBrandChange(b.name)}
                className={`flex items-center justify-between text-xs text-gray-300 hover:text-[#C8A96A] transition-colors py-0.5 w-full ${dir === 'rtl' ? 'text-right' : 'text-left'} cursor-pointer group`}
              >
                <div className="flex items-center gap-2.5">
                  <div
                    className={`w-3.5 h-3.5 border transition-all flex items-center justify-center rounded-none ${
                      isChecked ? 'border-[#C8A96A] bg-[#C8A96A]/10' : 'border-gray-700 bg-black group-hover:border-gray-500'
                    }`}
                  >
                    {isChecked && <Check size={10} className="text-[#C8A96A]" />}
                  </div>
                  <span className="font-light tracking-wide">{b.name}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* GENDER / SCENT AURA */}
      <div className="space-y-3">
        <span className="text-[10px] tracking-wider uppercase text-gray-400 font-sans block">
          {t('finder_gender_label')}
        </span>
        <div className="grid grid-cols-3 gap-1.5">
          {['Men', 'Women', 'Unisex'].map((g) => {
            const isSelected = filters.gender === g;
            return (
              <button
                key={g}
                onClick={() => handleGenderChange(g)}
                className={`py-2 text-[10px] uppercase tracking-widest font-sans font-light border transition-all text-center cursor-pointer rounded-none ${
                  isSelected
                    ? 'border-[#C8A96A] bg-[#C8A96A]/10 text-[#C8A96A]'
                    : 'border-gray-800 bg-black text-gray-400 hover:border-gray-600 hover:text-white'
                }`}
              >
                {t(g)}
              </button>
            );
          })}
        </div>
      </div>

      {/* FRAGRANCE NOTES */}
      <div className="space-y-3">
        <span className="text-[10px] tracking-wider uppercase text-gray-400 font-sans block">
          {t('finder_notes_label')}
        </span>
        <div className="flex flex-wrap gap-1.5">
          {FRAGRANCE_NOTES.map((n) => {
            const isSelected = filters.note === n;
            return (
              <button
                key={n}
                onClick={() => handleNoteChange(n)}
                className={`px-3 py-1.5 text-[9px] uppercase tracking-widest font-sans font-light border transition-all cursor-pointer rounded-none ${
                  isSelected
                    ? 'border-[#C8A96A] bg-[#C8A96A]/15 text-[#C8A96A] shadow-[0_0_10px_rgba(200,169,106,0.1)]'
                    : 'border-gray-800 bg-black text-gray-400 hover:border-gray-600 hover:text-white'
                }`}
              >
                {t(n)}
              </button>
            );
          })}
        </div>
      </div>

      {/* BOTTLE SIZE */}
      <div className="space-y-3">
        <span className="text-[10px] tracking-wider uppercase text-gray-400 font-sans block">
          {language === 'ar' ? 'حجم العبوة' : 'Bottle Volume'}
        </span>
        <div className="grid grid-cols-3 gap-1.5">
          {BOTTLE_SIZES.map((s) => {
            const isSelected = filters.size === s;
            return (
              <button
                key={s}
                onClick={() => handleSizeChange(s)}
                className={`py-2 text-[10px] font-sans font-light border transition-all text-center cursor-pointer rounded-none ${
                  isSelected
                    ? 'border-[#C8A96A] bg-[#C8A96A]/10 text-[#C8A96A]'
                    : 'border-gray-800 bg-black text-gray-400 hover:border-gray-600 hover:text-white'
                }`}
              >
                {s}
              </button>
            );
          })}
        </div>
      </div>

      {/* AVAILABILITY */}
      <div className="space-y-3">
        <span className="text-[10px] tracking-wider uppercase text-gray-400 font-sans block">
          {language === 'ar' ? 'حالة التوفر' : 'Availability'}
        </span>
        <div className="flex flex-col space-y-2">
          {AVAILABILITIES.map((status) => {
            const isSelected = filters.availability === status;
            return (
              <button
                key={status}
                onClick={() => handleAvailabilityChange(status)}
                className={`flex items-center justify-between text-xs text-gray-300 hover:text-[#C8A96A] transition-colors py-0.5 w-full ${dir === 'rtl' ? 'text-right' : 'text-left'} cursor-pointer group`}
              >
                <div className="flex items-center gap-2.5">
                  <div
                    className={`w-3.5 h-3.5 border transition-all flex items-center justify-center rounded-none ${
                      isSelected ? 'border-[#C8A96A] bg-[#C8A96A]/10' : 'border-gray-700 bg-black group-hover:border-gray-500'
                    }`}
                  >
                    {isSelected && <Check size={10} className="text-[#C8A96A]" />}
                  </div>
                  <span className="font-light tracking-wide">{t(status === 'Best Seller' ? 'best_seller' : status === 'New Arrival' ? 'new_arrival' : 'in_stock')}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="pt-4 border-t border-[#C8A96A]/10 text-center">
        <p className="text-[8px] tracking-[0.2em] uppercase text-[#C8A96A]/60 font-light flex items-center justify-center gap-1">
          <Sparkles size={8} />
          <span>BNS Haute Selection</span>
        </p>
      </div>
    </div>
  );

  // Desktop Static Sidebar
  if (!onCloseMobileDrawer) {
    return (
      <div className="hidden lg:block w-52 shrink-0 sticky top-28 self-start bg-black/40 border border-[#C8A96A]/10 p-5 backdrop-blur-md max-h-[85vh] overflow-y-auto custom-scrollbar shadow-[0_15px_30px_rgba(0,0,0,0.5)]" style={{ direction: dir }}>
        {content}
      </div>
    );
  }

  // Mobile Slideup Bottom Sheet with Animated Backdrop
  return (
    <div className="relative z-[150]" style={{ direction: dir }}>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.75 }}
        exit={{ opacity: 0 }}
        onClick={onCloseMobileDrawer}
        className="fixed inset-0 bg-black/90"
      />

      {/* Sliding Panel */}
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 26, stiffness: 220 }}
        className="fixed bottom-0 left-0 right-0 bg-[#0C0C0C] border-t border-[#C8A96A]/35 p-6 rounded-t-[2.25rem] z-[160] max-h-[85vh] overflow-y-auto pb-safe shadow-[0_-20px_50px_rgba(0,0,0,0.95)]"
      >
        <div className="w-12 h-1 bg-gray-800 rounded-full mx-auto mb-4 cursor-pointer" onClick={onCloseMobileDrawer} />
        
        {/* Close trigger header */}
        <div className="flex justify-between items-center mb-4 border-b border-white/5 pb-3">
          <div className="flex items-center gap-2">
            <Filter size={14} className="text-[#C8A96A]" />
            <span className="text-xs tracking-[0.2em] uppercase text-white font-serif">{language === 'ar' ? 'تصفية عطور BNS' : 'BNS Refinement'}</span>
          </div>
          <button
            onClick={onCloseMobileDrawer}
            className="text-gray-400 hover:text-white p-1 cursor-pointer"
            id="sidebar-mobile-close"
          >
            <X size={16} />
          </button>
        </div>
        
        {content}

        {/* Apply Button */}
        <div className="mt-6">
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={onCloseMobileDrawer}
            className="w-full py-4 bg-gradient-to-r from-[#C8A96A] to-[#A08146] text-black font-semibold text-xs tracking-[0.2em] uppercase flex items-center justify-center shadow-[0_10px_30px_rgba(200,169,106,0.2)]"
          >
            {language === 'ar' ? 'تطبيق التصفية' : 'Apply Refinements'}
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
