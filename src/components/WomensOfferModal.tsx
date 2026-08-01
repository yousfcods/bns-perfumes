import { useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShoppingBag, Sparkles, Flame, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { LUXURY_PERFUMES, getPriceForSize } from '../data/perfumes';
import { Perfume } from '../types';
import { ImageWithFallback } from './ImageWithFallback';

interface WomensOfferModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddBundleToCart: (
    items: { perfume: Perfume; size: string; concentration: 'x2'; price: number }[]
  ) => void;
}

// Target 4 Women's Fragrances for this fixed bundle
const WOMENS_OFFER_PERFUME_IDS = [
  'burberry-her',
  'chanel-chance',
  'mfk-baccarat-rouge-540',
  'lattafa-yara',
];

export default function WomensOfferModal({
  isOpen,
  onClose,
  onAddBundleToCart,
}: WomensOfferModalProps) {
  const { language, dir } = useLanguage();

  // Get perfume objects for the 4 featured offer fragrances
  const offerPerfumes = useMemo(() => {
    return WOMENS_OFFER_PERFUME_IDS.map((id) => {
      const found = LUXURY_PERFUMES.find((p) => p.id === id);
      if (found) return found;

      // Exact uploaded product images from catalog
      const fallbackImages: Record<string, string> = {
        'burberry-her': 'https://res.cloudinary.com/qmmcvx8e/image/upload/v1784493419/Burberry_her_snny4r.webp',
        'chanel-chance': 'https://res.cloudinary.com/qmmcvx8e/image/upload/v1784493421/Chanel_chance_lga6c7.png',
        'mfk-baccarat-rouge-540': 'https://res.cloudinary.com/qmmcvx8e/image/upload/v1784493421/Bacarrat_rouge_lmndjw.webp',
        'lattafa-yara': 'https://res.cloudinary.com/qmmcvx8e/image/upload/v1785533325/1_cfwzx0.png',
      };

      return {
        id,
        brand: id.includes('burberry')
          ? 'Burberry'
          : id.includes('chanel')
          ? 'Chanel'
          : id.includes('baccarat')
          ? 'Maison Francis Kurkdjian'
          : 'Lattafa',
        name: id.includes('burberry')
          ? 'Burberry Her'
          : id.includes('chanel')
          ? 'Chanel Chance'
          : id.includes('baccarat')
          ? 'Baccarat Rouge 540'
          : 'Yara',
        price: 500,
        rating: 4.9,
        reviewsCount: 300,
        image: fallbackImages[id] || 'https://res.cloudinary.com/qmmcvx8e/image/upload/v1784493419/Burberry_her_snny4r.webp',
        sizes: ['30ml'],
        defaultSize: '30ml',
        gender: 'Women' as const,
        notes: ['Floral', 'Fruity', 'Vanilla'],
        availability: 'Best Seller' as const,
        description: 'Luxury Women Fragrance X2 Concentration',
        topNotes: ['Berries', 'Mandarin'],
        heartNotes: ['Jasmine', 'Violet'],
        baseNotes: ['Amber', 'Musk'],
        story: 'X2 Concentration Special Edition',
        inspiredBy: 'Luxury Brand',
        longevity: '12+ Hours',
        projection: 'Very Strong',
        season: 'All Seasons',
        family: 'Floral & Fruity',
        collections: ["Women's Collection"],
      };
    });
  }, []);

  const handleAddBundleToCart = () => {
    const bundleItems = offerPerfumes.map((perfume) => ({
      perfume,
      size: '30ml',
      concentration: 'x2' as const,
      price: getPriceForSize(perfume, '30ml', 'x2'),
    }));

    onAddBundleToCart(bundleItems);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 overflow-y-auto font-sans text-left flex items-center justify-center p-3 sm:p-4 md:p-6"
        style={{ direction: dir }}
      >
        {/* Backdrop Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ scale: 0.92, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.92, opacity: 0, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 280 }}
          className="relative w-full max-w-4xl bg-[#0B0B0B] border border-[#C8A96A]/40 rounded-[24px] shadow-[0_25px_60px_rgba(0,0,0,0.95),0_0_40px_rgba(200,169,106,0.2)] overflow-hidden my-auto z-10"
        >
          {/* Header Banner Background */}
          <div className="relative p-6 sm:p-8 text-center border-b border-[#C8A96A]/20 bg-gradient-to-b from-[#181510] via-[#0D0D0D] to-[#0B0B0B]">
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20 text-gray-400 hover:text-[#C8A96A] p-2 rounded-full bg-black/50 border border-[#C8A96A]/20 hover:border-[#C8A96A]/60 transition-all cursor-pointer hover:scale-110 active:scale-95"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>

            {/* Gold Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#C8A96A]/15 border border-[#C8A96A]/60 text-[#C8A96A] text-xs sm:text-sm font-semibold tracking-wider uppercase mb-3 shadow-[0_0_20px_rgba(200,169,106,0.2)]">
              <Sparkles size={15} className="text-[#C8A96A] animate-pulse" />
              <span>
                {language === 'ar'
                  ? '4 × 30 مل • تركيز مضاعف X2'
                  : '4 × 30ML • X2 Concentration'}
              </span>
            </div>

            {/* Title & Subtitle */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-white tracking-wide font-light mb-2">
              {language === 'ar'
                ? 'باقة العطور النسائية الفاخرة X2'
                : "WOMEN'S X2 COLLECTION BUNDLE"}
            </h2>

            <p className="text-gray-300 font-sans text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
              {language === 'ar'
                ? 'مجموعة متكاملة تضم العطور النسائية الأربعة الأكثر مبيعاً في باقة واحدة فاخرة (سعة 30 مل لكل عطر بتركيز مضاعف X2).'
                : 'A pre-made luxury bundle featuring all 4 iconic women’s fragrances (30ML each in double X2 concentration).'}
            </p>

            {/* Bundle Specs Bar */}
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 mt-4 pt-4 border-t border-[#C8A96A]/15 text-xs text-[#C8A96A]">
              <span className="flex items-center gap-1.5 bg-black/60 px-3 py-1 rounded-md border border-[#C8A96A]/30">
                <Flame size={14} />
                {language === 'ar' ? '4 عطور نسائية كاملة' : '4 Complete Women Fragrances'}
              </span>
              <span className="flex items-center gap-1.5 bg-black/60 px-3 py-1 rounded-md border border-[#C8A96A]/30">
                <ShieldCheck size={14} />
                {language === 'ar' ? 'تركيز مضاعف X2' : 'X2 Double Concentration'}
              </span>
            </div>
          </div>

          {/* Bundle Included Fragrances Showcase (4 perfumes presented together in one bundle) */}
          <div className="p-5 sm:p-8 max-h-[50vh] overflow-y-auto custom-scrollbar">
            <h3 className="text-xs uppercase tracking-widest text-[#C8A96A] text-center font-sans font-semibold mb-4">
              {language === 'ar'
                ? 'العطور الأربعة المشمولة في الباقة:'
                : 'FRAGRANCES INCLUDED IN THIS BUNDLE:'}
            </h3>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {offerPerfumes.map((perfume) => (
                <div
                  key={perfume.id}
                  className="relative rounded-2xl border border-[#C8A96A]/30 bg-[#121212] p-3 sm:p-4 text-center flex flex-col items-center justify-between shadow-[0_10px_25px_rgba(0,0,0,0.6)]"
                >
                  {/* Small Included Badge */}
                  <div className="w-full flex items-center justify-between gap-1 mb-2">
                    <span className="text-[10px] font-semibold text-[#C8A96A] bg-black/80 px-2 py-0.5 rounded border border-[#C8A96A]/30 uppercase tracking-wider">
                      30ML • X2
                    </span>
                    <CheckCircle2 size={14} className="text-[#C8A96A]" />
                  </div>

                  {/* Bottle Image */}
                  <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden bg-[#0A0A0A] mb-3 border border-[#C8A96A]/15 flex items-center justify-center">
                    <ImageWithFallback
                      src={perfume.image}
                      alt={perfume.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                  </div>

                  {/* Perfume Name */}
                  <div className="w-full space-y-0.5">
                    <span className="text-[10px] uppercase tracking-widest text-[#C8A96A] font-sans font-medium block">
                      {perfume.brand}
                    </span>
                    <h4 className="text-sm sm:text-base font-serif text-white font-medium line-clamp-1">
                      {perfume.name}
                    </h4>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Action Section with Price & CTA */}
          <div className="p-5 sm:p-6 border-t border-[#C8A96A]/20 bg-[#0E0E0E] flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Price Display */}
            <div className="text-center sm:text-left space-y-1">
              <span className="text-xs text-gray-400 uppercase tracking-wider font-sans block">
                {language === 'ar' ? 'سعر الباقة الكاملة:' : 'Total Bundle Price:'}
              </span>
              <div className="text-3xl sm:text-4xl font-serif text-white font-light tracking-wide text-[#C8A96A] flex items-baseline gap-2">
                <span>2,000 DA</span>
                <span className="text-xs font-sans text-gray-400 font-normal">
                  ({language === 'ar' ? 'شاملة الـ 4 عطور' : 'All 4 Fragrances'})
                </span>
              </div>
            </div>

            {/* Single CTA Button */}
            <button
              onClick={handleAddBundleToCart}
              className="w-full sm:w-auto px-8 sm:px-10 py-4 rounded-full font-sans font-semibold text-sm sm:text-base tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-3 bg-gradient-to-r from-[#C8A96A] via-[#DFCA9B] to-[#C8A96A] text-black hover:brightness-110 shadow-[0_0_30px_rgba(200,169,106,0.4)] hover:scale-[1.02] active:scale-95 cursor-pointer"
            >
              <ShoppingBag size={20} />
              <span>
                {language === 'ar'
                  ? 'إضافة العرض للسلة (2,000 دج)'
                  : 'Add Bundle to Cart'}
              </span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
