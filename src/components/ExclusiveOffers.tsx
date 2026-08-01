import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { motion, PanInfo } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { Perfume } from '../types';

interface OfferBanner {
  id: string;
  alt: string;
  imageUrl: string;
  perfumeId: string;
}

const OFFER_BANNERS: OfferBanner[] = [
  {
    id: 'offer-1',
    alt: 'Exclusive Men\'s X2 Collection Offer',
    imageUrl: 'https://res.cloudinary.com/qmmcvx8e/image/upload/v1785533323/2_ziy3hv.png',
    perfumeId: 'sospiro-vebrato-x6',
  },
  {
    id: 'offer-2',
    alt: 'Exclusive Women\'s X2 Collection Offer',
    imageUrl: 'https://res.cloudinary.com/qmmcvx8e/image/upload/v1785533325/1_cfwzx0.png',
    perfumeId: 'lattafa-yara',
  },
  {
    id: 'offer-3',
    alt: 'Exclusive Megamare Offer',
    imageUrl: 'https://res.cloudinary.com/qmmcvx8e/image/upload/v1785536461/ae718a6d-db66-480c-ab7b-8a0f2c8fcfb7_lsee3l.png',
    perfumeId: 'megamare',
  },
];

interface ExclusiveOffersProps {
  onProductClick?: (perfume: Perfume) => void;
  onExploreClick?: () => void;
  onSelectMensOffer?: () => void;
  onSelectWomensOffer?: () => void;
}

export default function ExclusiveOffers({ onProductClick, onExploreClick, onSelectMensOffer, onSelectWomensOffer }: ExclusiveOffersProps) {
  const { language, dir } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const total = OFFER_BANNERS.length;

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % total);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  };

  // Auto-slide every 5 seconds, pauses when hovered
  useEffect(() => {
    if (isPaused) return;

    timerRef.current = setInterval(() => {
      handleNext();
    }, 5000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [currentIndex, isPaused]);

  // Handle Swipe/Pan gesture on mobile
  const handlePanEnd = (_: any, info: PanInfo) => {
    const swipeThreshold = 40;
    if (info.offset.x < -swipeThreshold) {
      handleNext();
    } else if (info.offset.x > swipeThreshold) {
      handlePrev();
    }
  };

  return (
    <section
      id="exclusive-offers"
      className="relative py-12 sm:py-16 md:py-20 bg-[#070707] border-b border-[#C8A96A]/15 overflow-hidden select-none"
      style={{ direction: dir }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Subtle Ambient Gold Glow */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#C8A96A]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-[1700px] mx-auto px-4 sm:px-8 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center space-y-2 mb-8 sm:mb-12">
          <div className="flex items-center justify-center gap-2">
            <Sparkles size={14} className="text-[#C8A96A]" />
            <span className="text-[10px] sm:text-xs tracking-[0.35em] sm:tracking-[0.4em] uppercase text-[#C8A96A] font-sans font-light">
              {language === 'ar' ? 'العروض والتخفيضات' : 'Promotional Highlights'}
            </span>
            <Sparkles size={14} className="text-[#C8A96A]" />
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif text-white tracking-wide font-light">
            {language === 'ar' ? 'العروض الحصرية' : 'Exclusive Offers'}
          </h2>

          <p className="text-gray-400 font-sans font-light text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
            {language === 'ar'
              ? 'اكتشف أحدث العروض والمبادرات الخاصة المتاحة لفترة محدودة'
              : 'Explore our latest curated promotional campaigns.'}
          </p>

          <div className="w-12 h-[1px] bg-[#C8A96A]/40 mx-auto mt-3 sm:mt-4" />
        </div>

        {/* Carousel Container */}
        <div className="relative w-full max-w-[1400px] mx-auto h-[380px] xs:h-[420px] sm:h-[500px] md:h-[560px] lg:h-[620px] flex items-center justify-center">
          
          {/* Navigation Arrow Left */}
          <button
            onClick={handlePrev}
            aria-label="Previous Offer"
            className="absolute left-1 sm:left-4 md:left-8 lg:left-12 z-40 bg-[#0B0B0B]/85 hover:bg-[#C8A96A] text-[#C8A96A] hover:text-black border border-[#C8A96A]/40 p-2.5 sm:p-3.5 rounded-full shadow-[0_0_15px_rgba(0,0,0,0.8)] transition-all duration-300 backdrop-blur-md cursor-pointer hover:scale-110 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C8A96A]"
          >
            {dir === 'rtl' ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>

          {/* Navigation Arrow Right */}
          <button
            onClick={handleNext}
            aria-label="Next Offer"
            className="absolute right-1 sm:right-4 md:right-8 lg:right-12 z-40 bg-[#0B0B0B]/85 hover:bg-[#C8A96A] text-[#C8A96A] hover:text-black border border-[#C8A96A]/40 p-2.5 sm:p-3.5 rounded-full shadow-[0_0_15px_rgba(0,0,0,0.8)] transition-all duration-300 backdrop-blur-md cursor-pointer hover:scale-110 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C8A96A]"
          >
            {dir === 'rtl' ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
          </button>

          {/* Slides Track with Touch/Pan Gestures */}
          <motion.div
            className="relative w-full h-full flex items-center justify-center overflow-hidden touch-pan-y"
            onPanEnd={handlePanEnd}
          >
            {OFFER_BANNERS.map((banner, index) => {
              // Calculate relative offset for 3D/layered slide effect
              let offset = index - currentIndex;
              if (offset < -Math.floor(total / 2)) offset += total;
              if (offset > Math.floor(total / 2)) offset -= total;

              const isCenter = offset === 0;
              const isVisible = Math.abs(offset) <= 1;

              // Responsive offsets: horizontal translation percentages
              let translateX = '0%';
              if (offset < 0) translateX = '-72%';
              if (offset > 0) translateX = '72%';

              return (
                <motion.div
                  key={banner.id}
                  initial={false}
                  animate={{
                    x: translateX,
                    scale: isCenter ? 1.0 : 0.8,
                    opacity: isCenter ? 1 : isVisible ? 0.65 : 0,
                    zIndex: isCenter ? 30 : isVisible ? 10 : 0,
                  }}
                  transition={{
                    duration: 0.65,
                    ease: [0.32, 0.72, 0, 1],
                  }}
                  aria-label={banner.alt}
                  style={{ aspectRatio: '3 / 4' }}
                  className="absolute w-[240px] xs:w-[270px] sm:w-[330px] md:w-[380px] lg:w-[420px] aspect-[3/4] rounded-[20px] overflow-hidden border border-[#C8A96A]/40 bg-[#0F0F0F] shadow-[0_15px_40px_rgba(0,0,0,0.9),0_0_25px_rgba(200,169,106,0.15)] transition-all duration-300 ease-out pointer-events-none cursor-default select-none"
                >
                  {/* Image Container with 3:4 aspect ratio and object-cover fit without any text or gradient overlays */}
                  <div className="relative w-full h-full aspect-[3/4] bg-[#0A0A0A] overflow-hidden flex items-center justify-center rounded-[20px]">
                    <img
                      src={banner.imageUrl}
                      alt={banner.alt}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />

                    {/* Subtle Gold Frame Accent */}
                    <div className="absolute inset-0 border border-[#C8A96A]/30 rounded-[20px] pointer-events-none" />
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Carousel Indicators / Dots */}
        <div className="flex items-center justify-center gap-2 mt-6 sm:mt-8">
          {OFFER_BANNERS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-1.5 rounded-full transition-all duration-500 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C8A96A] ${
                idx === currentIndex
                  ? 'w-8 bg-[#C8A96A] shadow-[0_0_10px_rgba(200,169,106,0.6)]'
                  : 'w-2 bg-[#C8A96A]/30 hover:bg-[#C8A96A]/60'
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}

