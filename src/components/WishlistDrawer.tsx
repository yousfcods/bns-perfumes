import { motion, AnimatePresence } from 'motion/react';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { Perfume } from '../types';
import { useLanguage, getTranslatedPerfume } from '../context/LanguageContext';
import { ImageWithFallback } from './ImageWithFallback';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistIds: string[];
  perfumes: Perfume[];
  onRemoveFromWishlist: (id: string) => void;
  onAddToCart: (perfume: Perfume, size: string) => void;
}

export default function WishlistDrawer({
  isOpen,
  onClose,
  wishlistIds,
  perfumes,
  onRemoveFromWishlist,
  onAddToCart,
}: WishlistDrawerProps) {
  const { t, language, dir } = useLanguage();
  
  // Filter the full list of perfumes based on what is in the wishlist
  const savedPerfumes = perfumes.filter((p) => wishlistIds.includes(p.id));

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden text-left font-sans" style={{ direction: dir }}>
          {/* Backdrop blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/75 backdrop-blur-[4px]"
          />

          <div className={`absolute inset-y-0 ${dir === 'rtl' ? 'left-0' : 'right-0'} max-w-full flex`}>
            <motion.div
              initial={{ x: dir === 'rtl' ? '-100%' : '100%' }}
              animate={{ x: 0 }}
              exit={{ x: dir === 'rtl' ? '-100%' : '100%' }}
              transition={{ type: 'spring', damping: 26, stiffness: 220 }}
              className="w-screen max-w-md bg-[#0B0B0B] border-l border-r border-[#C8A96A]/20 shadow-[0_0_50px_rgba(0,0,0,0.85)] flex flex-col justify-between"
            >
              
              {/* Drawer Header */}
              <div className="p-6 border-b border-[#C8A96A]/15 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Heart size={18} fill="#C8A96A" className="text-[#C8A96A]" />
                  <span className="text-xs uppercase tracking-[0.25em] text-white font-medium">
                    {t('wishlist_drawer_title')}
                  </span>
                </div>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-[#C8A96A] p-1 cursor-pointer transition-colors"
                  aria-label="Close Wishlist"
                  id="wishlist-drawer-close"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Saved Items List */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
                {savedPerfumes.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-20">
                    <Heart size={48} strokeWidth={1} className="text-gray-700" />
                    <p className="text-sm font-serif text-[#C8A96A] italic font-light">
                      {language === 'ar' ? 'خزنتك العطرية فارغة' : 'Your Vault is Empty'}
                    </p>
                    <p className="text-[11px] text-gray-500 font-light max-w-xs">
                      {language === 'ar' 
                        ? 'تتبع ملفات روائحك المفضلة عن طريق الضغط على أيقونة القلب في بطاقة المنتج.'
                        : 'Keep track of your favorite luxury scent profiles by clicking the heart icon on individual products.'}
                    </p>
                    <button
                      onClick={onClose}
                      className="px-6 py-2 border border-[#C8A96A]/30 text-[#C8A96A] text-[10px] tracking-widest uppercase hover:bg-[#C8A96A]/15 transition-all mt-2 cursor-pointer"
                    >
                      {t('shop_collection')}
                    </button>
                  </div>
                ) : (
                  savedPerfumes.map((perfume) => {
                    const transPerfume = getTranslatedPerfume(perfume, language);
                    return (
                      <div
                        key={perfume.id}
                        className="flex gap-4 pb-6 border-b border-gray-900/50 last:border-b-0 items-center justify-between"
                      >
                        {/* Image preview */}
                        <div className="h-20 w-20 bg-black/40 border border-gray-900 shrink-0 overflow-hidden">
                          <ImageWithFallback
                            perfume={perfume}
                            alt={transPerfume.name}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Details */}
                        <div className={`flex-1 min-w-0 space-y-1 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
                          <span className="text-[8px] text-[#C8A96A] tracking-wider uppercase font-light">
                            {transPerfume.brand}
                          </span>
                          <h4 className="text-xs text-white font-medium truncate pr-2">
                            {transPerfume.name}
                          </h4>
                          <p className="text-[10px] text-gray-500 font-mono">
                            {language === 'ar' ? `${transPerfume.price.toLocaleString()} د.ج` : `${transPerfume.price.toLocaleString()} DA`} ({transPerfume.defaultSize})
                          </p>

                          {/* Add to Cart Directly from Wishlist */}
                          <button
                            onClick={() => {
                              onAddToCart(perfume, perfume.defaultSize);
                              onRemoveFromWishlist(perfume.id); // clean up from wishlist on buy
                            }}
                            className="text-[8px] uppercase tracking-widest text-[#C8A96A] font-sans font-medium flex items-center gap-1.5 hover:text-white transition-colors mt-2 cursor-pointer"
                          >
                            <ShoppingBag size={10} />
                            <span>{language === 'ar' ? 'نقل للحقيبة' : 'Move to Bag'}</span>
                          </button>
                        </div>

                        {/* Delete Action */}
                        <button
                          onClick={() => onRemoveFromWishlist(perfume.id)}
                          className="text-gray-600 hover:text-red-400 p-2 cursor-pointer transition-colors"
                          title="Remove Scent"
                          id={`remove-saved-${perfume.id}`}
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Footer */}
              <div className="p-6 bg-[#111] border-t border-[#C8A96A]/15 text-center">
                <p className="text-[9px] tracking-widest uppercase text-gray-500 font-sans font-light">
                  {language === 'ar' ? '© خزنة دار الذهب المؤمنة بالكامل' : '© MAISON D\'OR SECURED VAULT'}
                </p>
              </div>

            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
