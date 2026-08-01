import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, Sparkles } from 'lucide-react';
import { BottleDesign } from '../types';
import { getBottlesForSize } from '../data/bottles';
import { useLanguage } from '../context/LanguageContext';
import { ImageWithFallback } from './ImageWithFallback';

interface BottleSelectorProps {
  selectedSize: string;
  selectedBottle?: BottleDesign;
  onSelectBottle: (bottle: BottleDesign) => void;
  compact?: boolean; // For tighter product cards vs expanded modal view
}

export const BottleSelector: React.FC<BottleSelectorProps> = ({
  selectedSize,
  selectedBottle,
  onSelectBottle,
  compact = false,
}) => {
  const { language } = useLanguage();
  const availableBottles = getBottlesForSize(selectedSize);

  // If a size has no bottle options (12ml, 15ml, 80ml), completely hide the Bottle Design section
  if (availableBottles.length === 0) {
    return null;
  }

  const currentBottle =
    selectedBottle && availableBottles.some((b) => b.id === selectedBottle.id)
      ? selectedBottle
      : availableBottles[0];

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={selectedSize}
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 4 }}
        transition={{ duration: 0.2 }}
        className="space-y-1.5 sm:space-y-2"
      >
        {/* Title Header */}
        <div className="flex items-center justify-between px-0.5">
          <label className="text-[9px] sm:text-[10px] font-semibold text-[#C8A96A] uppercase tracking-widest flex items-center gap-1">
            <Sparkles size={11} className="text-[#C8A96A] shrink-0" />
            <span>{language === 'ar' ? 'تصميم الزجاجة:' : 'Choose Your Bottle:'}</span>
          </label>
          <span className="text-[8px] sm:text-[9px] text-gray-400 font-mono font-medium truncate max-w-[120px] text-right">
            {language === 'ar' ? currentBottle.nameAr : currentBottle.name}
          </span>
        </div>

        {/* Bottle Cards Grid / Carousel */}
        <div
          className={`flex sm:grid gap-1.5 overflow-x-auto sm:overflow-visible snap-x snap-mandatory scrollbar-thin scrollbar-thumb-[#C8A96A]/40 scrollbar-track-black/40 pb-1 sm:pb-0 ${
            compact
              ? 'grid-cols-3 sm:grid-cols-5'
              : 'grid-cols-3 sm:grid-cols-3 md:grid-cols-5'
          }`}
        >
          {availableBottles.map((bottle) => {
            const isSelected = currentBottle.id === bottle.id;
            const bottleName = language === 'ar' ? bottle.nameAr : bottle.name;

            return (
              <motion.button
                key={bottle.id}
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectBottle(bottle);
                }}
                className={`relative flex-shrink-0 snap-start w-[72px] sm:w-auto p-1.5 rounded-md border transition-all duration-300 cursor-pointer text-center flex flex-col items-center justify-between group ${
                  isSelected
                    ? 'bg-[#C8A96A]/15 border-[#C8A96A] text-white shadow-[0_0_12px_rgba(200,169,106,0.3)] ring-1 ring-[#C8A96A]/50'
                    : 'bg-black/60 border-gray-800 text-gray-400 hover:border-gray-600 hover:text-gray-200'
                }`}
              >
                {/* Selected Badge */}
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 z-10 bg-[#C8A96A] text-black rounded-full p-0.5 shadow-md flex items-center justify-center"
                    title={language === 'ar' ? 'محدد' : 'Selected'}
                  >
                    <Check size={9} strokeWidth={3} />
                  </motion.div>
                )}

                {/* Tag / Badge if any */}
                {bottle.tag && !isSelected && (
                  <span className="absolute top-1 left-1 text-[6.5px] bg-black/80 text-[#C8A96A] border border-[#C8A96A]/30 px-1 py-0.2 rounded-[2px] z-10 font-mono">
                    {language === 'ar' ? bottle.tagAr || bottle.tag : bottle.tag}
                  </span>
                )}

                {/* Bottle Image Container (Clean White Background, object-fit contain) */}
                <div className="w-full aspect-square bg-white rounded flex items-center justify-center p-1 mb-1 overflow-hidden shadow-inner group-hover:shadow-md transition-shadow">
                  <ImageWithFallback
                    src={bottle.image}
                    alt={bottleName}
                    className="w-full h-full object-contain filter group-hover:brightness-105 transition-all duration-300"
                  />
                </div>

                {/* Bottle Name & Selected Label */}
                <div className="w-full space-y-0.5">
                  <p
                    className={`text-[8px] sm:text-[8.5px] font-medium leading-tight truncate ${
                      isSelected ? 'text-[#C8A96A] font-semibold' : 'text-gray-300'
                    }`}
                    title={bottleName}
                  >
                    {bottleName}
                  </p>
                  {isSelected && (
                    <span className="block text-[7px] text-[#C8A96A] font-mono uppercase tracking-wider">
                      {language === 'ar' ? 'محدد' : 'Selected'}
                    </span>
                  )}
                </div>
              </motion.button>
            );
          })}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

