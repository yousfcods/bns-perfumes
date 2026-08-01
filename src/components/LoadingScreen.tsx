import { motion } from 'motion/react';

export default function LoadingScreen() {
  // Floating luxury gold dust particles
  const particles = [
    { id: 1, size: 2, x: 15, y: 30, duration: 4.2, delay: 0 },
    { id: 2, size: 3, x: 80, y: 25, duration: 5.1, delay: 0.5 },
    { id: 3, size: 2, x: 25, y: 70, duration: 3.8, delay: 1.2 },
    { id: 4, size: 2.5, x: 75, y: 65, duration: 4.6, delay: 0.3 },
    { id: 5, size: 1.5, x: 45, y: 20, duration: 3.5, delay: 0.8 },
    { id: 6, size: 3, x: 55, y: 80, duration: 4.8, delay: 1.5 },
    { id: 7, size: 2, x: 90, y: 45, duration: 3.9, delay: 0.2 },
    { id: 8, size: 2.5, x: 10, y: 55, duration: 4.5, delay: 1.0 },
    { id: 9, size: 1.8, x: 35, y: 40, duration: 5.0, delay: 0.7 },
    { id: 10, size: 2.2, x: 65, y: 35, duration: 4.1, delay: 1.4 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 bg-[#0B0B0B] z-[9999] flex flex-col items-center justify-center text-center select-none overflow-hidden"
    >
      {/* Radial subtle ambient golden glows */}
      <div className="absolute w-[500px] h-[500px] bg-[#C8A96A]/10 rounded-full blur-[140px] pointer-events-none -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" />
      <div className="absolute w-[260px] h-[260px] bg-[#D4AF37]/15 rounded-full blur-[90px] pointer-events-none -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" />

      {/* Floating luxury gold dust particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: `${p.y}%`, x: `${p.x}%` }}
            animate={{
              opacity: [0, 0.7, 0],
              y: [`${p.y}%`, `${p.y - 12}%`, `${p.y - 25}%`],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: 'easeInOut',
            }}
            style={{
              width: `${p.size}px`,
              height: `${p.size}px`,
            }}
            className="absolute rounded-full bg-[#C8A96A] shadow-[0_0_8px_#C8A96A]"
          />
        ))}
      </div>

      {/* Central Brand Emblem & Titles */}
      <div className="relative z-10 flex flex-col items-center space-y-7 px-6 max-w-lg">
        
        {/* Large BNS Monogram Logo */}
        <motion.div
          initial={{ scale: 0.88, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center"
        >
          {/* Emblem Container */}
          <div className="w-20 h-20 md:w-24 md:h-24 border border-[#C8A96A]/40 flex items-center justify-center relative mb-6 shadow-[0_0_35px_rgba(200,169,106,0.18)] bg-[#0F0F0F]/90 backdrop-blur-md">
            {/* Corner accents */}
            <div className="absolute inset-1 border border-[#C8A96A]/20" />
            <div className="absolute -top-1 -left-1 w-2 h-2 border-t border-l border-[#C8A96A]" />
            <div className="absolute -top-1 -right-1 w-2 h-2 border-t border-r border-[#C8A96A]" />
            <div className="absolute -bottom-1 -left-1 w-2 h-2 border-b border-l border-[#C8A96A]" />
            <div className="absolute -bottom-1 -right-1 w-2 h-2 border-b border-r border-[#C8A96A]" />
            
            <span className="text-3xl md:text-4xl font-serif text-[#C8A96A] font-light tracking-[0.2em] translate-x-1">
              BNS
            </span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif tracking-[0.3em] text-[#C8A96A] font-light uppercase">
            BNS
          </h1>

          {/* Subtitle */}
          <span className="text-xs md:text-sm tracking-[0.35em] text-gray-300 font-sans uppercase mt-3 font-light">
            Premium Inspired Fragrances
          </span>
        </motion.div>

        {/* Elegant Gold Loading Animation */}
        <div className="w-56 md:w-64 space-y-3.5 pt-2">
          {/* Shimmering Gold Line Bar */}
          <div className="h-[1.5px] bg-gray-900/80 w-full overflow-hidden relative rounded-full border-x border-[#C8A96A]/20">
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: '100%' }}
              transition={{ repeat: Infinity, duration: 1.4, ease: 'easeInOut' }}
              className="absolute top-0 bottom-0 w-28 bg-gradient-to-r from-transparent via-[#C8A96A] to-transparent shadow-[0_0_12px_#C8A96A]"
            />
          </div>

          {/* Subtle status pulse */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.35, 0.85, 0.35] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
            className="flex items-center justify-center gap-2.5"
          >
            <span className="w-1 h-1 rounded-full bg-[#C8A96A]" />
            <span className="text-[9px] uppercase tracking-[0.4em] text-gray-400 font-sans font-light">
              Haute Parfumerie
            </span>
            <span className="w-1 h-1 rounded-full bg-[#C8A96A]" />
          </motion.div>
        </div>

      </div>
    </motion.div>
  );
}
