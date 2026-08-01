import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Star, ShoppingBag, ShieldCheck, Heart, Award, Sparkles } from 'lucide-react';
import { Perfume, BottleDesign } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { ImageWithFallback } from './ImageWithFallback';
import { getPriceForSize } from '../data/perfumes';
import { BottleSelector } from './BottleSelector';
import { DEFAULT_BOTTLE, getBottlesForSize } from '../data/bottles';

interface ProductDetailModalProps {
  perfume: Perfume | null;
  onClose: () => void;
  onAddToCart: (perfume: Perfume, size: string, concentration?: 'x1' | 'x2', bottle?: BottleDesign) => void;
  onToggleWishlist: (perfumeId: string) => void;
  isWishlisted: boolean;
}

export default function ProductDetailModal({
  perfume,
  onClose,
  onAddToCart,
  onToggleWishlist,
  isWishlisted,
}: ProductDetailModalProps) {
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedConcentration, setSelectedConcentration] = useState<'x1' | 'x2'>('x1');
  const [selectedBottle, setSelectedBottle] = useState<BottleDesign | undefined>(DEFAULT_BOTTLE);
  const { t, language, dir } = useLanguage();

  // Handle initialization of default size when perfume changes
  if (perfume && !selectedSize) {
    setSelectedSize(perfume.defaultSize);
  }

  // Auto-update selected bottle when size changes
  useEffect(() => {
    if (!selectedSize) return;
    const currentAvailable = getBottlesForSize(selectedSize);
    if (currentAvailable.length > 0) {
      if (!selectedBottle || !currentAvailable.some((b) => b.id === selectedBottle.id)) {
        setSelectedBottle(currentAvailable[0]);
      }
    } else {
      setSelectedBottle(undefined);
    }
  }, [selectedSize]);

  const handleClose = () => {
    setSelectedSize('');
    setSelectedConcentration('x1');
    setSelectedBottle(DEFAULT_BOTTLE);
    onClose();
  };


  if (!perfume) return null;

  const availableSizes = Array.from(
    new Set([...(perfume.sizes || []), '12ml', '15ml', '30ml', '50ml', '80ml', '100ml'])
  );

  const currentPrice = getPriceForSize(perfume, selectedSize, selectedConcentration);

  return (
    <AnimatePresence>
      <div className={`fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 ${dir === 'rtl' ? 'text-right' : 'text-left'} font-sans`} style={{ direction: dir }}>
        {/* Backdrop glass blur */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          className="absolute inset-0 bg-black/85 backdrop-blur-[6px]"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 30 }}
          transition={{ type: 'spring', damping: 25, stiffness: 220 }}
          className="relative bg-[#111111] border border-[#C8A96A]/30 p-4 sm:p-6 md:p-10 shadow-[0_30px_70px_rgba(0,0,0,0.95)] max-w-4xl w-full max-h-[92vh] sm:max-h-[90vh] overflow-y-auto z-10 rounded-none custom-scrollbar touch-scrolling"
        >
          {/* External Gilded Corners */}
          <div className="absolute top-4 left-4 w-2 h-2 border-t border-l border-[#C8A96A]" />
          <div className="absolute top-4 right-4 w-2 h-2 border-t border-r border-[#C8A96A]" />
          <div className="absolute bottom-4 left-4 w-2 h-2 border-b border-l border-[#C8A96A]" />
          <div className="absolute bottom-4 right-4 w-2 h-2 border-b border-r border-[#C8A96A]" />

          {/* Close Button */}
          <button
            onClick={handleClose}
            className={`absolute top-6 ${dir === 'rtl' ? 'left-6' : 'right-6'} p-2 text-gray-400 hover:text-[#C8A96A] cursor-pointer transition-all hover:rotate-90 duration-300`}
            aria-label="Close Modal"
            id="product-detail-modal-close"
          >
            <X size={20} />
          </button>

          {/* Grid Layout */}
          <div className={`grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 mt-4 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
            
            {/* Left Column: Product Showcase Frame */}
            <div className="md:col-span-5 flex flex-col space-y-4">
              <div className="relative aspect-square md:aspect-auto md:h-96 w-full overflow-hidden bg-black/40 border border-gray-900">
                <ImageWithFallback
                  perfume={perfume}
                  alt={`${perfume.brand} ${perfume.name}`}
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                
                {/* Float luxury badge */}
                <span className={`absolute bottom-4 ${dir === 'rtl' ? 'right-4' : 'left-4'} px-2.5 py-1 bg-black/70 border border-[#C8A96A]/30 backdrop-blur-md text-[#C8A96A] text-[8px] uppercase tracking-widest font-sans`}>
                  {language === 'ar' ? 'أصلي ومضمون' : 'Origin Certified'}
                </span>
              </div>

              {/* Security & Authenticity guarantees */}
              <div className="p-3.5 bg-black/50 border border-gray-900 flex items-start gap-3">
                <ShieldCheck size={18} className="text-[#C8A96A] shrink-0 mt-0.5" />
                <div className={`space-y-0.5 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
                  <p className="text-[10px] uppercase tracking-wider text-white font-medium">
                    {language === 'ar' ? 'ضمان جودة وثبات العطر' : 'Guaranteed Genuine Scent'}
                  </p>
                  <p className="text-[9px] text-gray-500 font-light leading-snug">
                    {language === 'ar' 
                      ? 'عطورنا مستوحاة بجودة استثنائية، مُصنّعة بأعلى درجات التركيز من زيوت خام فاخرة لتضمن ثباتاً ممتداً.'
                      : 'This premium extrait remains intact inside vacuum-sealed cases.'}
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Descriptions & Custom Selection */}
            <div className="md:col-span-7 flex flex-col justify-between space-y-6">
              
              <div className="space-y-4">
                {/* Brand & Stars */}
                <div className="flex justify-between items-center">
                  <span className="text-[10px] tracking-[0.3em] text-[#C8A96A] uppercase font-sans">
                    {perfume.brand}
                  </span>
                  
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <Star size={11} fill="#C8A96A" stroke="none" />
                      <span className="text-xs text-gray-300 font-mono font-medium">{perfume.rating}</span>
                    </div>
                    <span className="text-[10px] text-gray-500">|</span>
                    <button
                      onClick={() => onToggleWishlist(perfume.id)}
                      className="flex items-center gap-1.5 text-gray-400 hover:text-[#C8A96A] text-[10px] uppercase tracking-widest transition-colors cursor-pointer"
                      id="modal-toggle-wishlist-btn"
                    >
                      <Heart size={12} fill={isWishlisted ? '#C8A96A' : 'none'} stroke={isWishlisted ? 'none' : 'currentColor'} />
                      <span>{isWishlisted ? (language === 'ar' ? 'مضاف للمفضلة' : 'Saved') : t('wishlist_drawer_title')}</span>
                    </button>
                  </div>
                </div>

                {/* Name */}
                <h3 className={`text-2xl md:text-3xl font-serif text-white tracking-wide font-light ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
                  {perfume.name}
                </h3>

                {/* Inspired by sublabel */}
                <div className="flex items-center gap-2 pt-1 pb-2">
                  <span className="text-[10px] text-gray-400 font-sans tracking-wide">
                    {language === 'ar' ? 'مستوحى من عطر:' : language === 'fr' ? 'Inspiré de :' : 'Inspired by :'}
                  </span>
                  <span className="text-[11px] text-[#C8A96A] font-serif tracking-wide font-medium italic">
                    {perfume.inspiredBy}
                  </span>
                </div>

                {/* Perfume performance parameters */}
                <div className={`flex flex-wrap gap-2.5 pt-1 pb-1.5 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
                  <div className="bg-black/50 border border-gray-900/80 px-2.5 py-1 flex items-center gap-1.5">
                    <span className="text-[8.5px] uppercase tracking-wider text-gray-500">{language === 'ar' ? 'ثبات العطر:' : 'Longevity:'}</span>
                    <span className="text-[9.5px] text-gray-300 font-mono font-medium">{perfume.longevity}</span>
                  </div>
                  <div className="bg-black/50 border border-gray-900/80 px-2.5 py-1 flex items-center gap-1.5">
                    <span className="text-[8.5px] uppercase tracking-wider text-gray-500">{language === 'ar' ? 'فوحان العطر:' : 'Projection:'}</span>
                    <span className="text-[9.5px] text-gray-300 font-mono font-medium">{perfume.projection}</span>
                  </div>
                </div>

                {/* Description */}
                <p className={`text-xs text-gray-300 font-sans font-light leading-relaxed ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
                  {perfume.description}
                </p>

                {/* Scent Heritage Story snippet */}
                <div className={`p-4 bg-black/40 border-l-2 ${dir === 'rtl' ? 'border-r-2 border-l-0 text-right' : 'border-l-2 text-left'} border-[#C8A96A] space-y-1`}>
                  <span className="text-[8.5px] uppercase tracking-[0.2em] text-[#C8A96A] font-medium flex items-center gap-1">
                    <Award size={10} />
                    <span>{language === 'ar' ? 'رواية دار العطور الملكية' : 'The House Narrative'}</span>
                  </span>
                  <p className="text-[11px] text-gray-400 font-sans font-light leading-relaxed italic">
                    "{perfume.story}"
                  </p>
                </div>

                {/* Visual Scent Notes Pyramid Accord */}
                <div className={`space-y-2.5 pt-2 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
                  <span className="text-[9px] tracking-[0.25em] uppercase text-gray-500 font-sans block">
                    {language === 'ar' ? 'الهرم العطري والمكونات الأساسية' : 'Olfactory Fragrance Pyramid'}
                  </span>

                  <div className="flex flex-col space-y-1.5 font-sans">
                    {/* Top notes block */}
                    <div className="grid grid-cols-12 bg-black/60 p-2.5 border border-gray-900/60 items-center">
                      <div className={`col-span-3 text-[8.5px] uppercase tracking-wider text-[#C8A96A] font-medium ${dir === 'rtl' ? 'border-l border-r-0 pl-2' : 'border-r border-l-0 pr-2'} border-[#C8A96A]/10 flex items-center`}>
                        {language === 'ar' ? 'افتتاحية العطر' : 'Top Notes'}
                      </div>
                      <div className={`col-span-9 ${dir === 'rtl' ? 'pr-3' : 'pl-3'} text-xs text-gray-300 font-light flex items-center`}>
                        {perfume.topNotes.map(n => t(n)).join(', ')}
                      </div>
                    </div>

                    {/* Heart notes block */}
                    <div className="grid grid-cols-12 bg-black/60 p-2.5 border border-gray-900/60 items-center">
                      <div className={`col-span-3 text-[8.5px] uppercase tracking-wider text-[#C8A96A] font-medium ${dir === 'rtl' ? 'border-l border-r-0 pl-2' : 'border-r border-l-0 pr-2'} border-[#C8A96A]/10 flex items-center`}>
                        {language === 'ar' ? 'قلب العطر' : 'Heart / Core'}
                      </div>
                      <div className={`col-span-9 ${dir === 'rtl' ? 'pr-3' : 'pl-3'} text-xs text-gray-300 font-light flex items-center font-sans`}>
                        {perfume.heartNotes.map(n => t(n)).join(', ')}
                      </div>
                    </div>

                    {/* Base notes block */}
                    <div className="grid grid-cols-12 bg-black/60 p-2.5 border border-gray-900/60 items-center">
                      <div className={`col-span-3 text-[8.5px] uppercase tracking-wider text-[#C8A96A] font-medium ${dir === 'rtl' ? 'border-l border-r-0 pl-2' : 'border-r border-l-0 pr-2'} border-[#C8A96A]/10 flex items-center`}>
                        {language === 'ar' ? 'قاعدة العطر' : 'Base Notes'}
                      </div>
                      <div className={`col-span-9 ${dir === 'rtl' ? 'pr-3' : 'pl-3'} text-xs text-gray-300 font-light flex items-center font-sans`}>
                        {perfume.baseNotes.map(n => t(n)).join(', ')}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Purchase Section: Bottle Design, Size Picker and Concentration Selector and CTA */}
              <div className="pt-6 border-t border-[#C8A96A]/10 space-y-5">
                
                {/* Bottle Design Selector (Placed above bottle volume selector) */}
                {getBottlesForSize(selectedSize).length > 0 && (
                  <div className="p-3 bg-[#121212] border border-[#C8A96A]/20">
                    <BottleSelector
                      selectedSize={selectedSize}
                      selectedBottle={selectedBottle}
                      onSelectBottle={setSelectedBottle}
                      compact={false}
                    />
                  </div>
                )}

                {/* Bottle Sizes Selector */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] text-gray-400 tracking-widest uppercase font-sans">
                      {language === 'ar' ? 'حجم العبوة:' : 'Select Bottle Volume:'}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {availableSizes.map((sz) => (
                      <button
                        key={sz}
                        onClick={() => setSelectedSize(sz)}
                        className={`px-3 py-1.5 text-xs font-mono border transition-all cursor-pointer ${
                          selectedSize === sz
                            ? 'border-[#C8A96A] bg-[#C8A96A]/15 text-[#C8A96A] font-semibold'
                            : 'border-gray-800 bg-black/60 text-gray-400 hover:border-gray-600 hover:text-white'
                        }`}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Fragrance Concentration Selector (x1 / x2) */}
                <div className="p-3.5 bg-[#141414] border border-[#C8A96A]/30 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-[#C8A96A] uppercase tracking-wider flex items-center gap-1.5">
                      <Sparkles size={14} className="text-[#C8A96A]" />
                      <span>{language === 'ar' ? 'تركيز العطر' : 'Fragrance Concentration'}</span>
                    </span>
                    <span className="text-[9.5px] text-[#C8A96A] font-mono">
                      {selectedConcentration === 'x1'
                        ? (language === 'ar' ? 'تركيز عادي' : 'Standard Concentration')
                        : (language === 'ar' ? 'تركيز قوي جداً' : 'Extra Strong Concentration')}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    <button
                      type="button"
                      onClick={() => setSelectedConcentration('x1')}
                      className={`p-2.5 border transition-all cursor-pointer text-center flex flex-col items-center justify-center gap-0.5 ${
                        selectedConcentration === 'x1'
                          ? 'bg-[#C8A96A]/20 border-[#C8A96A] text-white shadow-[0_0_12px_rgba(200,169,106,0.25)]'
                          : 'bg-black border-gray-800 text-gray-400 hover:border-gray-700 hover:text-gray-200'
                      }`}
                    >
                      <span className="text-xs font-mono font-semibold">x1</span>
                      <span className="text-[10px] text-gray-400 font-sans">
                        {language === 'ar' ? 'تركيز عادي (افتراضي)' : 'Standard Concentration'}
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setSelectedConcentration('x2')}
                      className={`p-2.5 border transition-all cursor-pointer text-center flex flex-col items-center justify-center gap-0.5 ${
                        selectedConcentration === 'x2'
                          ? 'bg-[#C8A96A]/20 border-[#C8A96A] text-white shadow-[0_0_12px_rgba(200,169,106,0.25)]'
                          : 'bg-black border-gray-800 text-gray-400 hover:border-gray-700 hover:text-gray-200'
                      }`}
                    >
                      <span className="text-xs font-mono font-semibold text-[#C8A96A]">x2</span>
                      <span className="text-[10px] text-[#C8A96A] font-sans">
                        {language === 'ar' ? 'تركيز قوي جداً' : 'Extra Strong Concentration'}
                      </span>
                    </button>
                  </div>
                </div>

                {/* Price Display and Add Button */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-2">
                  <div className={`space-y-0.5 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
                    <span className="text-[8px] text-gray-500 tracking-wider uppercase">
                      {language === 'ar' ? 'السعر الإجمالي' : 'SECURE INVOICE PRICE'}
                    </span>
                    <p className="text-2xl font-mono text-white tracking-wider font-medium">
                      {language === 'ar' ? `${currentPrice.toLocaleString()} د.ج` : `${currentPrice.toLocaleString()} DA`}
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      onAddToCart(perfume, selectedSize, selectedConcentration, selectedBottle);
                      handleClose();
                    }}
                    className="px-8 py-3.5 bg-[#C8A96A] hover:bg-white text-black font-semibold text-[10px] tracking-[0.2em] uppercase transition-all duration-300 flex items-center justify-center gap-2 rounded-none cursor-pointer shadow-[0_4px_20px_rgba(200,169,106,0.2)]"
                    id="modal-add-to-cart-submit"
                  >
                    <ShoppingBag size={14} />
                    <span>{t('add_to_bag')}</span>
                  </button>
                </div>

              </div>

            </div>

          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
