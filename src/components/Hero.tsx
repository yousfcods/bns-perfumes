import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';

interface HeroProps {
  onExploreClick: () => void;
}

export default function Hero({ onExploreClick }: HeroProps) {
  const { t, language, dir } = useLanguage();
  const heroRef = useRef<HTMLDivElement>(null);

  // Parallax scroll effects
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const videoY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const textY = useTransform(scrollYProgress, [0, 1], ['0px', '40px']);
  const textOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.2]);

  return (
    <div ref={heroRef} id="home" className="w-full bg-[#0B0B0B]" style={{ direction: dir }}>
      {/* 1. Full-Screen Standalone Hero Video Section with Subtle Parallax */}
      <section className="relative h-[85vh] lg:h-screen w-full overflow-hidden bg-black flex items-center justify-center">
        <motion.div 
          style={{ y: videoY, scale: videoScale }}
          className="w-full h-full absolute inset-0 gpu-layer"
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="w-full h-full object-cover"
            style={{ objectPosition: 'center' }}
          >
            <source
              src="https://res.cloudinary.com/qmmcvx8e/video/upload/v1784485117/Generated_Video_July_16_2026_-_1_24PM_ymofz8.mp4"
              type="video/mp4"
            />
          </video>
        </motion.div>

        {/* Subtle dark black overlay (35%) */}
        <div className="absolute inset-0 bg-black/35 pointer-events-none z-10" />

        {/* Minimal Vignette Frame */}
        <div className="absolute inset-0 bg-radial-[circle_at_center,transparent_65%,rgba(0,0,0,0.6)_100%] pointer-events-none z-10" />

        {/* Minimal Bottom Scroll Indicator over Video edge */}
        <motion.div 
          style={{ y: textY, opacity: textOpacity }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center space-y-2 select-none"
        >
          <span className="text-[9px] uppercase tracking-[0.4em] text-gray-300 font-sans font-light bg-black/50 px-3.5 py-1 rounded-full border border-white/10 backdrop-blur-md shadow-lg">
            {language === 'ar' ? 'اسحب للتكتشاف' : 'Scroll to discover'}
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="w-5 h-8 border border-[#C8A96A]/60 hover:border-[#C8A96A] rounded-full flex justify-center p-1 cursor-pointer transition-colors duration-300 shadow-[0_0_15px_rgba(200,169,106,0.3)] bg-black/50 backdrop-blur-md"
            onClick={() => {
              const el = document.getElementById('bns-hero-brand-section');
              if (el) {
                el.scrollIntoView({ behavior: 'smooth' });
              } else {
                onExploreClick();
              }
            }}
          >
            <motion.div 
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="w-1.5 h-2.5 bg-[#C8A96A] rounded-full" 
            />
          </motion.div>
        </motion.div>
      </section>

      {/* 2. Brand Identity & Text Section Positioned Directly Underneath Video */}
      <section id="bns-hero-brand-section" className="relative py-12 sm:py-20 md:py-24 lg:py-28 px-4 sm:px-6 bg-[#0B0B0B] text-center overflow-hidden border-b border-[#C8A96A]/15">
        {/* Subtle Ambient Background Lighting */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#C8A96A]/5 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#C8A96A]/30 to-transparent pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto space-y-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.12,
                },
              },
            }}
            className="space-y-4"
          >
            {/* Subtitle */}
            <motion.span 
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
              }}
              className="text-xs sm:text-sm uppercase tracking-[0.45em] text-[#C8A96A] font-mono font-medium block"
            >
              {t('hero_subtitle')}
            </motion.span>

            {/* Headline */}
            <motion.h1 
              variants={{
                hidden: { opacity: 0, y: 25 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } }
              }}
              className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-serif text-white tracking-[0.2em] sm:tracking-[0.25em] font-light leading-none uppercase drop-shadow-md"
            >
              {t('hero_title')}
            </motion.h1>

            {/* Gold Divider Line */}
            <motion.div 
              variants={{
                hidden: { scaleX: 0, opacity: 0 },
                visible: { scaleX: 1, opacity: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
              }}
              className="w-20 h-[1.5px] bg-gradient-to-r from-transparent via-[#C8A96A] to-transparent mx-auto my-5 origin-center" 
            />

            {/* Description */}
            <motion.p 
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
              }}
              className="text-sm sm:text-base md:text-lg text-gray-300 font-sans font-light max-w-2xl mx-auto leading-relaxed pt-1"
            >
              {t('hero_desc')}
            </motion.p>
          </motion.div>

          {/* Call To Action Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="pt-3"
          >
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              onClick={onExploreClick}
              className="inline-flex items-center justify-center px-9 py-4 text-xs sm:text-sm uppercase tracking-[0.3em] font-medium text-black bg-gradient-to-r from-[#D4AF37] via-[#C8A96A] to-[#B89755] hover:from-[#E5C158] hover:to-[#D4AF37] transition-all duration-500 rounded-none shadow-[0_0_20px_rgba(200,169,106,0.25)] hover:shadow-[0_0_35px_rgba(200,169,106,0.5)] cursor-pointer relative overflow-hidden group"
            >
              <span className="relative z-10">{t('hero_cta')}</span>
              <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

