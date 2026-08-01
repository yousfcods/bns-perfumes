import { useState } from 'react';
import { Heart, Star, ShoppingBag, Eye, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { Perfume, BottleDesign } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { ImageWithFallback } from './ImageWithFallback';
import { getPriceForSize } from '../data/perfumes';
import { getBottlesForSize } from '../data/bottles';

interface ProductCardProps {
  key?: string;
  perfume: Perfume;
  onAddToCart: (perfume: Perfume, size: string, concentration?: 'x1' | 'x2', bottle?: BottleDesign) => void;
  onToggleWishlist: (perfumeId: string) => void;
  isWishlisted: boolean;
  onProductClick: (perfume: Perfume) => void;
}

export default function ProductCard({
  perfume,
  onAddToCart,
  onToggleWishlist,
  isWishlisted,
  onProductClick,
}: ProductCardProps) {
  const [selectedSize, setSelectedSize] = useState<string>(perfume.defaultSize || '100ml');
  const [selectedConcentration, setSelectedConcentration] = useState<'x1' | 'x2'>('x1');
  const [isHovered, setIsHovered] = useState(false);
  const { t, language, dir } = useLanguage();

  // Determine current price based on selected size and concentration
  const currentPrice = getPriceForSize(perfume, selectedSize, selectedConcentration);


  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      whileHover={{ y: -6, scale: 1.025 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative bg-[#0d0d0d] border border-[#C8A96A]/15 p-2.5 sm:p-4 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col justify-between hover:border-[#C8A96A]/50 hover:shadow-[0_20px_45px_rgba(0,0,0,0.95),0_0_25px_rgba(200,169,106,0.12)] overflow-hidden h-full min-h-[380px] sm:min-h-[460px] w-full gpu-layer"
      style={{ direction: dir }}
    >
      {/* Golden accent linear lights that glow on hover */}
      <div className="absolute top-0 left-0 w-full h-[1.5px] bg-gradient-to-r from-transparent via-[#C8A96A]/0 group-hover:via-[#C8A96A]/80 to-transparent transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]" />
      <div className="absolute bottom-0 left-0 w-full h-[1.5px] bg-gradient-to-r from-transparent via-[#C8A96A]/0 group-hover:via-[#C8A96A]/80 to-transparent transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]" />
      
      {/* Background Soft Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 bg-[#C8A96A]/0 rounded-full blur-[50px] group-hover:bg-[#C8A96A]/8 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none" />

      {/* REAL STRUCTURAL CARD LAYER */}
      <div className="flex flex-col h-full justify-between">
        <div>
          {/* Card Top Badges / Actions */}
          <div className="flex justify-between items-center mb-2 sm:mb-3 relative z-10 gap-1 sm:gap-2 min-h-[22px] sm:min-h-[24px]">
            {perfume.availability !== 'In Stock' ? (
              <span className="text-[7.5px] sm:text-[8px] uppercase tracking-[0.15em] sm:tracking-[0.2em] text-black bg-[#C8A96A] px-1.5 sm:px-2.5 py-0.5 font-sans font-medium truncate max-w-[100px] sm:max-w-none">
                {perfume.availability === 'New Arrival' ? t('new_arrival') : t('best_seller')}
              </span>
            ) : (
              <span className="text-[7.5px] sm:text-[8px] uppercase tracking-[0.15em] sm:tracking-[0.2em] text-gray-500 font-sans font-medium truncate max-w-[100px] sm:max-w-none">
                {language === 'ar' ? 'اختيار BNS' : 'BNS Choice'}
              </span>
            )}

            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleWishlist(perfume.id);
              }}
              className={`p-1.5 rounded-full cursor-pointer transition-colors duration-300 relative z-20 ${
                isWishlisted 
                  ? 'text-[#C8A96A]' 
                  : 'text-gray-500 hover:text-[#C8A96A]'
              }`}
              title={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
            >
              <motion.div
                whileTap={{ scale: 1.4 }}
                whileHover={{ scale: 1.15 }}
                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
              >
                <Heart size={14} fill={isWishlisted ? "#C8A96A" : "none"} strokeWidth={1.5} className="will-change-transform" />
              </motion.div>
            </button>
          </div>

          {/* Product Image Frame */}
          <div 
            onClick={() => onProductClick(perfume)}
            className="relative w-full aspect-[3/4] overflow-hidden bg-black/50 border border-gray-900/60 cursor-pointer mb-2.5 sm:mb-3.5 flex items-center justify-center rounded-sm"
          >
            {/* Image with Fallback */}
            <ImageWithFallback
              perfume={perfume}
              alt={`${perfume.brand} ${perfume.name}`}
              className="w-full h-full object-cover object-center scale-100 group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform"
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors pointer-events-none" />

            {/* Quick Preview overlay */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black/45 backdrop-blur-[1px] pointer-events-none">
              <span className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-1.5 sm:py-2 bg-black/90 border border-[#C8A96A]/40 text-[#C8A96A] text-[8px] sm:text-[9px] uppercase tracking-[0.15em] sm:tracking-[0.2em] font-sans font-semibold transition-transform duration-300 translate-y-2 group-hover:translate-y-0">
                <Eye size={12} />
                <span>{t('quick_view')}</span>
              </span>
            </div>
          </div>

          {/* Scent Brand & Title */}
          <div className="space-y-1 text-center mb-2 sm:mb-3">
            <p className="text-[8px] sm:text-[9px] uppercase tracking-[0.2em] sm:tracking-[0.25em] text-[#C8A96A] font-sans font-medium truncate">
              {perfume.brand}
            </p>
            <h4 
              onClick={() => onProductClick(perfume)}
              className="text-xs sm:text-sm font-serif font-normal text-white tracking-wide hover:text-[#C8A96A] transition-colors cursor-pointer truncate max-w-full px-0.5"
            >
              {perfume.name}
            </h4>
            <p className="text-[8px] sm:text-[9.5px] text-gray-500 italic font-sans font-light mt-0.5 truncate">
              {language === 'ar' ? 'مستوحى' : language === 'fr' ? 'Inspiré par' : 'Inspired by'} <span className="font-normal text-gray-400">{perfume.inspiredBy}</span>
            </p>

            {/* Scent Notes tags */}
            <div className="flex justify-center flex-wrap gap-1 pt-1 min-h-[18px] sm:min-h-[22px]">
              {perfume.notes.slice(0, 2).map((note, idx) => (
                <span key={note} className={`text-[7.5px] sm:text-[8px] uppercase tracking-[0.1em] text-gray-400 bg-black px-1.5 sm:px-2 py-0.5 border border-gray-900 font-sans font-light ${idx > 0 ? 'hidden sm:inline-block' : ''}`}>
                  {t(note)}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Card Footer: Size Selection, Concentration, Price, Rating, Cart */}
        <div className="space-y-2 pt-2 border-t border-[#C8A96A]/10">

          {/* Sizes Selector */}
          <div className="space-y-1.5">
            <div className="flex flex-wrap justify-center items-center gap-1 sm:gap-1.5">
              {perfume.sizes.map((sz) => (
                <button
                  key={sz}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedSize(sz);
                  }}
                  className={`text-[8px] sm:text-[9px] uppercase tracking-wider px-1 sm:px-1.5 py-0.5 transition-all duration-300 cursor-pointer ${
                    selectedSize === sz
                      ? 'text-[#C8A96A] font-semibold border-b border-[#C8A96A]'
                      : 'text-gray-500 hover:text-gray-300'
                  }`}
                >
                  {sz}
                </button>
              ))}
            </div>

            {/* Fragrance Concentration Selector (x1 / x2) */}
            <div className="pt-1.5 border-t border-gray-900/90 space-y-1">
              <div className="flex items-center justify-between px-0.5">
                <span className="text-[8px] font-semibold text-[#C8A96A] uppercase tracking-wider">
                  {language === 'ar' ? 'تركيز العطر:' : 'Concentration:'}
                </span>
                <span className="text-[7.5px] text-gray-400 font-mono">
                  {selectedConcentration === 'x1'
                    ? (language === 'ar' ? 'عادي' : 'Standard')
                    : (language === 'ar' ? 'قوي جداً' : 'Extra Strong')}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-1">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedConcentration('x1');
                  }}
                  className={`py-1 px-1 border text-[8px] sm:text-[8.5px] font-mono transition-all cursor-pointer flex items-center justify-center gap-0.5 ${
                    selectedConcentration === 'x1'
                      ? 'bg-[#C8A96A]/20 border-[#C8A96A] text-[#C8A96A] font-semibold shadow-[0_0_8px_rgba(200,169,106,0.25)]'
                      : 'bg-black/60 border-gray-900 text-gray-400 hover:border-gray-700 hover:text-gray-200'
                  }`}
                >
                  <span>x1</span>
                  <span className="text-[7px] sm:text-[7.5px] opacity-80 font-sans">
                    ({language === 'ar' ? 'عادي' : 'Standard'})
                  </span>
                </button>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedConcentration('x2');
                  }}
                  className={`py-1 px-1 border text-[8px] sm:text-[8.5px] font-mono transition-all cursor-pointer flex items-center justify-center gap-0.5 ${
                    selectedConcentration === 'x2'
                      ? 'bg-[#C8A96A]/20 border-[#C8A96A] text-[#C8A96A] font-semibold shadow-[0_0_8px_rgba(200,169,106,0.25)]'
                      : 'bg-black/60 border-gray-900 text-gray-400 hover:border-gray-700 hover:text-gray-200'
                  }`}
                >
                  <span>x2</span>
                  <span className="text-[7px] sm:text-[7.5px] opacity-80 font-sans">
                    ({language === 'ar' ? 'قوي جداً' : 'Extra Strong'})
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Rating and Price */}
          <div className="flex justify-between items-center px-0.5 pt-0.5">
            {/* Star Rating */}
            <div className="flex items-center gap-0.5 sm:gap-1" title={`${perfume.rating} out of 5 stars`}>
              <Star size={10} fill="#C8A96A" stroke="none" />
              <span className="text-[9px] sm:text-[10px] text-gray-300 font-mono font-medium">{perfume.rating}</span>
            </div>

            {/* Current Price */}
            <div className="text-right">
              <p className="text-xs sm:text-sm font-mono text-white tracking-wider font-semibold">
                {language === 'ar' ? `${currentPrice.toLocaleString()} د.ج` : `${currentPrice.toLocaleString()} DA`}
              </p>
            </div>
          </div>

          {/* Luxury CTA: Add to Bag */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            onClick={() => {
              const defaultBottle = getBottlesForSize(selectedSize)[0];
              onAddToCart(perfume, selectedSize, selectedConcentration, defaultBottle);
            }}
            className="w-full py-2 sm:py-2.5 bg-[#C8A96A]/10 hover:bg-[#C8A96A] border border-[#C8A96A]/40 text-[#C8A96A] hover:text-black font-semibold text-[8px] sm:text-[9px] tracking-[0.15em] sm:tracking-[0.2em] uppercase transition-all duration-300 flex items-center justify-center gap-1.5 sm:gap-2 rounded-none cursor-pointer min-h-[36px] sm:min-h-[40px] group/btn shadow-[0_0_10px_rgba(200,169,106,0.1)] hover:shadow-[0_0_20px_rgba(200,169,106,0.35)]"
            id={`add-to-cart-${perfume.id}`}
          >
            <ShoppingBag size={11} className="group-hover/btn:scale-110 transition-transform duration-300" />
            <span>{t('add_to_bag')}</span>
          </motion.button>

        </div>
      </div>
    </motion.div>
  );
}
