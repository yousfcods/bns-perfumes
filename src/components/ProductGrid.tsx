import { useState } from 'react';
import { SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Perfume } from '../types';
import ProductCard from './ProductCard';
import { useLanguage, getTranslatedPerfume } from '../context/LanguageContext';

interface ProductGridProps {
  perfumes: Perfume[];
  selectedCollection: string;
  onSelectCollection: (collection: string) => void;
  onAddToCart: (perfume: Perfume, size: string) => void;
  onToggleWishlist: (perfumeId: string) => void;
  wishlist: string[];
  onOpenMobileFilters: () => void;
  onProductClick: (perfume: Perfume) => void;
}

type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'rating';

export default function ProductGrid({
  perfumes,
  selectedCollection,
  onSelectCollection,
  onAddToCart,
  onToggleWishlist,
  wishlist,
  onOpenMobileFilters,
  onProductClick,
}: ProductGridProps) {
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const { t, language, dir } = useLanguage();

  const collectionsList = [
    { id: '', label: language === 'ar' ? 'الكل' : 'All' },
    { id: 'Fresh & Citrus', label: language === 'ar' ? 'الانتعاش والحمضيات' : 'Fresh & Citrus' },
    { id: 'Woody', label: language === 'ar' ? 'خشبي' : 'Woody' },
    { id: 'Amber', label: language === 'ar' ? 'العنبر' : 'Amber' },
    { id: 'Oriental', label: language === 'ar' ? 'الشرقي' : 'Oriental' },
    { id: 'Vanilla', label: language === 'ar' ? 'الفانيليا' : 'Vanilla' },
    { id: 'Tobacco', label: language === 'ar' ? 'التبغ' : 'Tobacco' },
    { id: 'Summer Collection', label: language === 'ar' ? 'مجموعة الصيف' : 'Summer Collection' },
    { id: 'Winter Collection', label: language === 'ar' ? 'مجموعة الشتاء' : 'Winter Collection' },
    { id: 'Best Sellers', label: language === 'ar' ? 'الأكثر مبيعاً' : 'Best Sellers' },
    { id: 'New Arrivals', label: language === 'ar' ? 'وصلنا حديثاً' : 'New Arrivals' },
    { id: "Men's Collection", label: language === 'ar' ? 'المجموعة الرجالية' : "Men's Collection" },
    { id: "Women's Collection", label: language === 'ar' ? 'المجموعة النسائية' : "Women's Collection" },
    { id: "Unisex Collection", label: language === 'ar' ? 'مجموعة الجنسين' : "Unisex Collection" },
  ];

  // Dynamically translate all perfumes before sorting or rendering
  const translatedPerfumes = perfumes.map((p) => getTranslatedPerfume(p, language));

  // Perform sorting on the translated perfumes
  const sortedPerfumes = [...translatedPerfumes].sort((a, b) => {
    if (sortBy === 'price-asc') {
      return a.price - b.price;
    }
    if (sortBy === 'price-desc') {
      return b.price - a.price;
    }
    if (sortBy === 'rating') {
      return b.rating - a.rating;
    }
    return 0; // 'featured' retains natural listing order
  });

  return (
    <div className={`flex-1 min-w-0 space-y-8 ${dir === 'rtl' ? 'text-right' : 'text-left'}`} style={{ direction: dir }}>
      {/* Premium Collections Tab Row */}
      <div className="space-y-3">
        <p className="text-[10px] uppercase tracking-[0.25em] text-[#C8A96A] font-sans font-light">
          {language === 'ar' ? 'المجموعات الملكية الفاخرة' : 'Premium Private Collections'}
        </p>
        <div className="flex overflow-x-auto pb-4 pt-1.5 scrollbar-none -mx-6 px-6 md:mx-0 md:px-0 gap-3 w-full max-w-full">
          {collectionsList.map((col) => {
            const isSelected = selectedCollection === col.id;
            return (
              <button
                key={col.id}
                onClick={() => onSelectCollection(col.id)}
                className={`flex-shrink-0 px-5 py-2.5 text-[10px] uppercase tracking-[0.2em] font-sans font-light relative select-none cursor-pointer border transition-all duration-300 min-h-[40px] flex items-center justify-center rounded-none ${
                  isSelected
                    ? 'border-[#C8A96A] bg-[#C8A96A]/10 text-[#C8A96A] font-medium shadow-[0_0_15px_rgba(200,169,106,0.1)]'
                    : 'border-gray-900 bg-black/50 text-gray-400 hover:border-gray-800 hover:text-white'
                }`}
              >
                {col.label}
                {isSelected && (
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#C8A96A] rounded-full shadow-[0_0_8px_#C8A96A]" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid Top Bar Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-5 border-b border-[#C8A96A]/10 gap-4">
        
        {/* Results Count */}
        <div className={`space-y-1 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
          <p className="text-xs uppercase tracking-[0.2em] text-gray-300 font-sans font-medium">
            {language === 'ar' ? 'كتالوج BNS' : 'BNS Catalogue'}
          </p>
          <p className="text-[10px] text-gray-500 font-mono">
            {language === 'fr' ? (
              <>Affichage de <span className="text-[#C8A96A]">{sortedPerfumes.length}</span> parfums de luxe</>
            ) : language === 'ar' ? (
              <>نعرض <span className="text-[#C8A96A]">{sortedPerfumes.length}</span> عطراً ملكياً فاخراً</>
            ) : (
              <>Showing <span className="text-[#C8A96A]">{sortedPerfumes.length}</span> luxury fragrances</>
            )}
          </p>
        </div>

        {/* Sort & Grid Controls */}
        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
          {/* Mobile Filter Button */}
          <button
            onClick={onOpenMobileFilters}
            className="lg:hidden flex items-center gap-2 border border-[#C8A96A]/30 text-[#C8A96A] hover:bg-[#C8A96A]/10 px-4 py-2.5 text-xs uppercase tracking-widest transition-all cursor-pointer min-h-[44px]"
            id="mobile-filter-drawer-trigger"
          >
            <SlidersHorizontal size={12} />
            <span>{t('finder_title')}</span>
          </button>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 bg-black border border-gray-900 px-3 py-2.5 text-xs min-h-[44px]">
            <ArrowUpDown size={12} className="text-[#C8A96A]" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="bg-transparent border-none text-gray-300 focus:outline-none cursor-pointer pr-4 font-sans text-xs uppercase tracking-widest"
              id="grid-sort-select"
            >
              <option value="featured" className="bg-[#111] text-white">{t('sort_best_selling')}</option>
              <option value="price-asc" className="bg-[#111] text-white">{t('sort_price_low')}</option>
              <option value="price-desc" className="bg-[#111] text-white">{t('sort_price_high')}</option>
              <option value="rating" className="bg-[#111] text-white">{t('sort_rating')}</option>
            </select>
          </div>
        </div>
      </div>

      {/* Product Card Grid */}
      {sortedPerfumes.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center justify-center text-center py-20 border border-dashed border-[#C8A96A]/10 p-6"
        >
          <p className="text-[#C8A96A] text-2xl font-serif italic mb-2">
            {language === 'ar' ? 'لا تطابق متاح' : 'No Matching Essence'}
          </p>
          <p className="text-gray-500 text-xs font-sans max-w-sm leading-relaxed mb-6">
            {t('no_results')}
          </p>
        </motion.div>
      ) : (
        <AnimatePresence mode="wait">
          <motion.div 
            key={selectedCollection + sortBy}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.05,
                  delayChildren: 0.02,
                },
              },
              exit: { opacity: 0, transition: { duration: 0.2 } },
            }}
            id="product-grid-items"
            className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6 lg:gap-8 justify-center mx-auto w-full gpu-layer"
          >
            {sortedPerfumes.map((perfume) => (
              <ProductCard
                key={perfume.id}
                perfume={perfume}
                onAddToCart={onAddToCart}
                onToggleWishlist={onToggleWishlist}
                isWishlisted={wishlist.includes(perfume.id)}
                onProductClick={onProductClick}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}
