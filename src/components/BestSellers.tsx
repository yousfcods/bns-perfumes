import { useState } from 'react';
import { ChevronLeft, ChevronRight, Star, ShoppingBag, Eye, Award } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Perfume } from '../types';
import { useLanguage, getTranslatedPerfume } from '../context/LanguageContext';
import { ImageWithFallback } from './ImageWithFallback';

interface BestSellersProps {
  perfumes: Perfume[];
  onAddToCart: (perfume: Perfume, size: string) => void;
  onProductClick: (perfume: Perfume) => void;
}

export default function BestSellers({
  perfumes,
  onAddToCart,
  onProductClick,
}: BestSellersProps) {
  const { t, language, dir } = useLanguage();
  const bestSellers = perfumes.filter((p) => p.availability === 'Best Seller');
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % bestSellers.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + bestSellers.length) % bestSellers.length);
  };

  if (bestSellers.length === 0) return null;

  // Translate active item on the fly
  const rawItem = bestSellers[currentIndex];
  const currentItem = getTranslatedPerfume(rawItem, language);

  return (
    <section id="bestsellers" className="relative py-20 bg-[#070707] border-t border-[#C8A96A]/10 overflow-hidden" style={{ direction: dir }}>
      {/* Background graphic */}
      <div className="absolute right-0 bottom-0 w-96 h-96 bg-[#C8A96A]/2 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute left-0 top-0 w-96 h-96 bg-[#C8A96A]/2 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-[1700px] mx-auto px-6 md:px-12 text-center relative z-10">
        
        {/* Section Title */}
        <div className="space-y-2 mb-12">
          <div className="flex items-center justify-center gap-2">
            <Award size={14} className="text-[#C8A96A]" />
            <span className="text-[10px] tracking-[0.4em] uppercase text-[#C8A96A] font-sans font-light">
              {language === 'ar' ? 'روائع عطورنا الأكثر طلباً' : 'Haute Prestige Selection'}
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-white tracking-wide font-light">
            {t('bestsellers_title')}
          </h2>
          <p className="text-gray-400 font-sans font-light text-xs max-w-xl mx-auto mt-2 leading-relaxed">
            {t('bestsellers_desc')}
          </p>
          <div className="w-12 h-[1px] bg-[#C8A96A]/40 mx-auto mt-4" />
        </div>

        {/* Carousel Showcase Layout */}
        <div className="relative max-w-5xl mx-auto">
          
          {/* Controls - Floating side buttons */}
          <div className={`absolute top-1/2 -translate-y-1/2 ${dir === 'rtl' ? 'right-0' : 'left-0'} z-20 hidden md:block`}>
            <button
              onClick={dir === 'rtl' ? handleNext : handlePrev}
              className="p-3 bg-[#0B0B0B] border border-[#C8A96A]/20 text-[#C8A96A] hover:bg-[#C8A96A] hover:text-black hover:border-transparent transition-all cursor-pointer"
              aria-label="Previous Slide"
              id="bestsellers-prev-btn"
            >
              <ChevronLeft size={20} className={dir === 'rtl' ? 'rotate-180' : ''} />
            </button>
          </div>
          <div className={`absolute top-1/2 -translate-y-1/2 ${dir === 'rtl' ? 'left-0' : 'right-0'} z-20 hidden md:block`}>
            <button
              onClick={dir === 'rtl' ? handlePrev : handleNext}
              className="p-3 bg-[#0B0B0B] border border-[#C8A96A]/20 text-[#C8A96A] hover:bg-[#C8A96A] hover:text-black hover:border-transparent transition-all cursor-pointer"
              aria-label="Next Slide"
              id="bestsellers-next-btn"
            >
              <ChevronRight size={20} className={dir === 'rtl' ? 'rotate-180' : ''} />
            </button>
          </div>

          {/* Active Spotlight Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentItem.id}
              initial={{ opacity: 0, x: dir === 'rtl' ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: dir === 'rtl' ? 20 : -20 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 lg:grid-cols-12 bg-[#111111] border border-[#C8A96A]/20 overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.8)] mx-2 md:mx-12"
            >
              {/* Card Left: Large Product Zoomable Image */}
              <div 
                onClick={() => onProductClick(rawItem)}
                className="lg:col-span-6 h-80 sm:h-[400px] lg:h-[480px] bg-black/50 relative overflow-hidden group cursor-pointer"
              >
                <ImageWithFallback
                  perfume={rawItem}
                  alt={`${currentItem.brand} ${currentItem.name}`}
                  className="w-full h-full object-cover object-center scale-100 group-hover:scale-105 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                
                {/* Image overlay prompt */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/30 backdrop-blur-[1px]">
                  <span className="flex items-center space-x-2 space-x-reverse px-4 py-2 bg-black/90 border border-[#C8A96A] text-[#C8A96A] text-[9px] uppercase tracking-widest font-sans font-medium">
                    <Eye size={12} />
                    <span>{t('quick_view')}</span>
                  </span>
                </div>
              </div>

              {/* Card Right: Story, Notes, Interactive Pricing */}
              <div className={`lg:col-span-6 p-8 md:p-12 flex flex-col justify-between ${dir === 'rtl' ? 'text-right' : 'text-left'} space-y-6`}>
                <div className="space-y-4">
                  
                  {/* Brand & Stars */}
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] tracking-[0.3em] text-[#C8A96A] uppercase font-sans">
                      {currentItem.brand}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <Star size={12} fill="#C8A96A" stroke="none" />
                      <span className="text-xs text-gray-300 font-mono font-medium">{currentItem.rating}</span>
                      <span className="text-[10px] text-gray-500 font-sans">({currentItem.reviewsCount} {language === 'ar' ? 'تقييم' : 'reviews'})</span>
                    </div>
                  </div>

                  {/* Name */}
                  <h3 
                    onClick={() => onProductClick(rawItem)}
                    className={`text-2xl sm:text-3xl font-serif text-white hover:text-[#C8A96A] cursor-pointer transition-colors ${dir === 'rtl' ? 'text-right' : 'text-left'}`}
                  >
                    {currentItem.name}
                  </h3>

                  {/* Inspired by sublabel */}
                  <p className={`text-xs text-gray-400 italic font-sans font-light mt-1 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
                    {language === 'ar' ? 'مستوحى من' : language === 'fr' ? 'Inspiré de' : 'Inspired by'} <span className="font-medium text-gray-300">{currentItem.inspiredBy}</span>
                  </p>

                  {/* Description & Story */}
                  <p className={`text-gray-400 font-sans font-light text-xs sm:text-sm leading-relaxed ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
                    {currentItem.description}
                  </p>

                  {/* Scent Pyramid Accordion Representation */}
                  <div className={`border-t border-[#C8A96A]/10 pt-4 mt-2 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
                    <p className="text-[9px] tracking-[0.2em] uppercase text-gray-500 font-sans mb-3">
                      {language === 'ar' ? 'مكونات العطر الملكي' : 'Scent Olfactory Pyramid'}
                    </p>
                    <div className="grid grid-cols-3 gap-3">
                      <div className="space-y-1">
                        <span className="text-[8px] uppercase tracking-wider text-[#C8A96A] font-light">{t('top_notes')}</span>
                        <p className="text-[10px] text-gray-300 truncate font-sans font-light">{currentItem.topNotes.slice(0, 2).map(n => t(n)).join(', ')}</p>
                      </div>
                      <div className={`space-y-1 ${dir === 'rtl' ? 'border-r border-l' : 'border-l border-r'} border-[#C8A96A]/10 px-3`}>
                        <span className="text-[8px] uppercase tracking-wider text-[#C8A96A] font-light">{t('heart_notes')}</span>
                        <p className="text-[10px] text-gray-300 truncate font-sans font-light">{currentItem.heartNotes.slice(0, 2).map(n => t(n)).join(', ')}</p>
                      </div>
                      <div className="space-y-1">
                        <span className="text-[8px] uppercase tracking-wider text-[#C8A96A] font-light">{t('base_notes')}</span>
                        <p className="text-[10px] text-gray-300 truncate font-sans font-light">{currentItem.baseNotes.slice(0, 2).map(n => t(n)).join(', ')}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Pricing and Cart Actions */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between border-t border-[#C8A96A]/10 pt-6 gap-4">
                  <div className={`space-y-0.5 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
                    <span className="text-[9px] text-gray-500 tracking-wider font-sans">{language === 'ar' ? 'سعر زجاجة العطر:' : 'EXPERIENCE PRICE'}</span>
                    <p className="text-2xl font-mono text-white tracking-wider font-light">
                      {language === 'ar' ? `${currentItem.price.toLocaleString()} د.ج` : `${currentItem.price.toLocaleString()} DA`}
                      <span className="text-xs text-[#C8A96A] ml-2 font-sans font-light">
                        {language === 'ar' ? `لحجم عبوة ${currentItem.defaultSize}` : `for ${currentItem.defaultSize}`}
                      </span>
                    </p>
                  </div>

                  <button
                    onClick={() => onAddToCart(rawItem, currentItem.defaultSize)}
                    className="px-6 py-3 bg-[#C8A96A] hover:bg-white text-black font-sans text-[10px] tracking-[0.25em] uppercase font-semibold transition-all duration-300 flex items-center justify-center gap-2 rounded-none cursor-pointer min-h-[44px]"
                  >
                    <ShoppingBag size={14} />
                    <span>{t('add_to_bag')}</span>
                  </button>
                </div>

              </div>
            </motion.div>
          </AnimatePresence>

          {/* Carousel Mobile Navigation Controls */}
          <div className="flex items-center justify-center gap-6 mt-8 md:hidden">
            <button
              onClick={handlePrev}
              className="p-2 border border-[#C8A96A]/20 text-[#C8A96A] hover:bg-[#C8A96A]/10 rounded-none cursor-pointer"
            >
              <ChevronLeft size={16} className={dir === 'rtl' ? 'rotate-180' : ''} />
            </button>
            <span className="text-xs text-gray-500 font-mono">
              {currentIndex + 1} / {bestSellers.length}
            </span>
            <button
              onClick={handleNext}
              className="p-2 border border-[#C8A96A]/20 text-[#C8A96A] hover:bg-[#C8A96A]/10 rounded-none cursor-pointer"
            >
              <ChevronRight size={16} className={dir === 'rtl' ? 'rotate-180' : ''} />
            </button>
          </div>

          {/* Luxury Carousel Dot Indicators */}
          <div className="hidden md:flex justify-center items-center gap-2 mt-8">
            {bestSellers.map((item, index) => (
              <button
                key={item.id}
                onClick={() => setCurrentIndex(index)}
                className={`h-1.5 transition-all duration-500 rounded-none cursor-pointer ${
                  currentIndex === index ? 'w-10 bg-[#C8A96A]' : 'w-2 bg-gray-800 hover:bg-gray-600'
                }`}
                aria-label={`Slide ${index + 1}`}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
