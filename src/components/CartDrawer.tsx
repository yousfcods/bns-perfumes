import { motion, AnimatePresence } from 'motion/react';
import { X, Minus, Plus, Trash2, ShoppingBag, MessageSquare, Sparkles, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import { CartItem } from '../types';
import { useLanguage, getTranslatedPerfume } from '../context/LanguageContext';
import { ImageWithFallback } from './ImageWithFallback';
import { calculateCartTotals } from '../utils/cartUtils';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, qty: number) => void;
  onRemoveItem: (id: string) => void;
  onCheckoutSuccess: () => void;
  onOpenCheckout?: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onCheckoutSuccess,
  onOpenCheckout,
}: CartDrawerProps) {
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const { t, language, dir } = useLanguage();

  // Compute Subtotal & Promotional Discounts
  const { subtotal, promoDiscount, totalAfterDiscount, eligible30mlX2Count } = calculateCartTotals(cartItems);
  const shipping = totalAfterDiscount > 3000 ? 0 : 500; // Complimentary over 3,000 DA
  const total = totalAfterDiscount + shipping;

  const handleCheckout = () => {
    if (onOpenCheckout) {
      onClose();
      onOpenCheckout();
    } else {
      setIsCheckingOut(true);
      setTimeout(() => {
        setIsCheckingOut(false);
        setOrderPlaced(true);
      }, 1500);
    }
  };

  const resetAndClose = () => {
    setOrderPlaced(false);
    onCheckoutSuccess(); // clears cart
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden text-left font-sans" style={{ direction: dir }}>
          {/* Backdrop blur effect */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/75 backdrop-blur-[4px]"
          />

          {/* Side Panel Drawer */}
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
                  <ShoppingBag size={18} className="text-[#C8A96A]" />
                  <span className="text-xs uppercase tracking-[0.25em] text-white font-medium">
                    {t('cart_drawer_title')}
                  </span>
                </div>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-[#C8A96A] p-1 cursor-pointer transition-colors"
                  aria-label="Close Cart"
                  id="cart-drawer-close"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Order Placed Success View */}
              {orderPlaced ? (
                <div className="flex-1 overflow-y-auto p-8 flex flex-col items-center justify-center text-center space-y-6">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="p-5 bg-[#C8A96A]/10 border border-[#C8A96A]/30 rounded-full"
                  >
                    <CheckCircle2 size={54} className="text-[#C8A96A] animate-pulse" />
                  </motion.div>
                  
                  <div className="space-y-2">
                    <p className="text-xl font-serif text-white tracking-wide">{t('purchase_completed')}</p>
                    <p className="text-[10px] uppercase tracking-[0.3em] text-[#C8A96A] font-medium">{t('order_id')}</p>
                  </div>

                  <p className="text-xs text-gray-400 font-light leading-relaxed max-w-xs">
                    {t('order_success_desc')}
                  </p>

                  <div className="w-full pt-4">
                    <button
                      onClick={resetAndClose}
                      className="w-full py-3.5 bg-[#C8A96A] text-black font-semibold text-[10px] tracking-[0.25em] uppercase hover:bg-white transition-all cursor-pointer"
                      id="cart-drawer-done"
                    >
                      {t('continue_exploring')}
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  {/* Cart Items List */}
                  <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
                    {cartItems.length === 0 ? (
                      <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-20">
                        <ShoppingBag size={48} strokeWidth={1} className="text-gray-700" />
                        <p className="text-sm font-serif text-[#C8A96A] italic">{t('cart_empty')}</p>
                        <p className="text-[11px] text-gray-500 font-light max-w-xs">
                          {t('cart_empty_desc')}
                        </p>
                        <button
                          onClick={onClose}
                          className="px-6 py-2 border border-[#C8A96A]/30 text-[#C8A96A] text-[10px] tracking-widest uppercase hover:bg-[#C8A96A]/15 transition-all mt-2 cursor-pointer"
                        >
                          {t('shop_collection')}
                        </button>
                      </div>
                    ) : (
                      cartItems.map((item) => {
                        // Translate perfume detail fields in real-time
                        const transPerfume = getTranslatedPerfume(item.perfume, language);
                        return (
                          <div
                            key={item.id}
                            className="flex gap-4 pb-6 border-b border-gray-900/50 last:border-b-0 items-center justify-between"
                          >
                            {/* Image preview */}
                            <div className="h-20 w-20 bg-black/40 border border-gray-900 shrink-0 overflow-hidden relative">
                              <ImageWithFallback
                                perfume={item.perfume}
                                alt={transPerfume.name}
                                className="w-full h-full object-cover"
                              />
                            </div>

                            {/* Details */}
                            <div className={`flex-1 min-w-0 space-y-1 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
                              <span className="text-[8px] text-[#C8A96A] tracking-wider uppercase font-light">
                                {transPerfume.brand}
                              </span>
                              <h4 className="text-xs text-white font-medium font-sans truncate pr-2">
                                {transPerfume.name}
                              </h4>
                              <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
                                <span className="text-[9px] text-gray-400 font-mono font-medium">{language === 'ar' ? 'الحجم:' : 'Size:'} <strong className="text-white">{item.selectedSize}</strong></span>
                                <span className={`text-[8px] border px-1.5 py-0.2 font-semibold uppercase tracking-wider ${
                                  (item.concentration || 'x1') === 'x2'
                                    ? 'bg-[#C8A96A]/20 text-[#C8A96A] border-[#C8A96A]/40'
                                    : 'bg-gray-900 text-gray-400 border-gray-800'
                                }`}>
                                  {(item.concentration || 'x1') === 'x2'
                                    ? (language === 'ar' ? 'تركيز قوي جداً (x2)' : 'x2 Extra Strong')
                                    : (language === 'ar' ? 'تركيز عادي (x1)' : 'x1 Standard')}
                                </span>
                              </div>
                              {item.selectedBottle && (
                                <div className="flex items-center gap-1 text-[8.5px] text-gray-300 font-sans pt-0.5">
                                  <span className="text-[#C8A96A] font-medium">{language === 'ar' ? 'الزجاجة:' : 'Bottle:'}</span>
                                  <span className="bg-black/90 text-gray-200 border border-[#C8A96A]/30 px-1.5 py-0.5 font-sans font-medium flex items-center gap-1 truncate max-w-[170px]">
                                    <span className="w-2.5 h-2.5 bg-white rounded-full flex items-center justify-center p-0.5 shrink-0">
                                      <img src={item.selectedBottle.image} alt="" className="w-full h-full object-contain" />
                                    </span>
                                    <span className="truncate">{language === 'ar' ? item.selectedBottle.nameAr : item.selectedBottle.name}</span>
                                  </span>
                                </div>
                              )}
                              <div className="text-[10px] text-[#C8A96A] font-mono font-medium">
                                {language === 'ar' ? `${(item.price * item.quantity).toLocaleString()} د.ج` : `${(item.price * item.quantity).toLocaleString()} DA`}
                                {item.quantity > 1 && (
                                  <span className="text-[8.5px] text-gray-500 font-normal ml-1">
                                    ({language === 'ar' ? `${item.price.toLocaleString()} د.ج / وحدة` : `${item.price.toLocaleString()} DA ea`})
                                  </span>
                                )}
                              </div>

                              {/* Quantity buttons */}
                              <div className="flex items-center gap-2.5 pt-1">
                                <button
                                  onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                                  className="w-7 h-7 sm:w-5 sm:h-5 bg-black border border-gray-800 hover:border-gray-600 flex items-center justify-center text-gray-400 hover:text-white cursor-pointer active:scale-95 transition-transform"
                                  aria-label="Decrease quantity"
                                  id={`qty-dec-${item.id}`}
                                >
                                  <Minus size={12} className="sm:w-2.5 sm:h-2.5" />
                                </button>
                                <span className="text-xs text-white font-mono px-1">{item.quantity}</span>
                                <button
                                  onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                                  className="w-7 h-7 sm:w-5 sm:h-5 bg-black border border-gray-800 hover:border-gray-600 flex items-center justify-center text-gray-400 hover:text-white cursor-pointer active:scale-95 transition-transform"
                                  aria-label="Increase quantity"
                                  id={`qty-inc-${item.id}`}
                                >
                                  <Plus size={12} className="sm:w-2.5 sm:h-2.5" />
                                </button>
                              </div>
                            </div>

                            {/* Delete Action and Price Total */}
                            <div className={`flex flex-col ${dir === 'rtl' ? 'items-start' : 'items-end'} space-y-2 shrink-0`}>
                              <span className="text-xs font-mono text-white">{language === 'ar' ? `${(item.price * item.quantity).toLocaleString()} د.ج` : `${(item.price * item.quantity).toLocaleString()} DA`}</span>
                              <button
                                onClick={() => onRemoveItem(item.id)}
                                className="text-gray-600 hover:text-red-400 p-1 cursor-pointer transition-colors"
                                title="Delete Item"
                                id={`remove-item-${item.id}`}
                              >
                                <Trash2 size={12} />
                              </button>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>

                  {/* Summary Block */}
                  {cartItems.length > 0 && (
                    <div className="p-6 bg-[#111] border-t border-[#C8A96A]/15 space-y-4">
                      {/* Optional promo progress hint */}
                      {eligible30mlX2Count % 4 !== 0 && (
                        <div className="flex items-center gap-1.5 text-[9.5px] text-[#C8A96A] bg-[#C8A96A]/10 px-2.5 py-1.5 border border-[#C8A96A]/20">
                          <Sparkles size={11} className="shrink-0 animate-pulse" />
                          <span>
                            {language === 'ar'
                              ? `أضف ${4 - (eligible30mlX2Count % 4)} عطر آخر (30ML • تركيز X2) للحصول على خصم 2,000 د.ج!`
                              : `Add ${4 - (eligible30mlX2Count % 4)} more 30ML X2 fragrance${
                                  4 - (eligible30mlX2Count % 4) > 1 ? 's' : ''
                                } to get 2,000 DA off!`}
                          </span>
                        </div>
                      )}

                      <div className="space-y-2 text-xs">
                        <div className="flex justify-between text-gray-400">
                          <span>{t('subtotal')}</span>
                          <span className="font-mono">{language === 'ar' ? `${subtotal.toLocaleString()} د.ج` : `${subtotal.toLocaleString()} DA`}</span>
                        </div>

                        {promoDiscount > 0 && (
                          <div className="flex justify-between text-[#C8A96A] font-medium">
                            <span className="flex items-center gap-1">
                              <Sparkles size={10} className="shrink-0" />
                              <span>{language === 'ar' ? 'خصم العرض الترويجي:' : 'Promotion Discount:'}</span>
                            </span>
                            <span className="font-mono">
                              {language === 'ar' ? `- ${promoDiscount.toLocaleString()} د.ج` : `- ${promoDiscount.toLocaleString()} DA`}
                            </span>
                          </div>
                        )}

                        <div className="flex justify-between text-gray-400">
                          <span>{t('shipping')}</span>
                          <span className="font-mono">
                            {shipping === 0 ? (
                              <span className="text-[#C8A96A] font-light">{t('complimentary')}</span>
                            ) : (
                              language === 'ar' ? `${shipping.toLocaleString()} د.ج` : `${shipping.toLocaleString()} DA`
                            )}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-[8.5px] text-[#C8A96A] bg-[#C8A96A]/5 px-2 py-1 border border-[#C8A96A]/10 mt-1">
                          <Sparkles size={10} />
                          <span>{t('gift_wrapping')}</span>
                        </div>
                      </div>

                      {/* Total */}
                      <div className="flex justify-between items-end border-t border-gray-800 pt-3 text-white">
                        <span className="text-xs uppercase tracking-widest text-gray-400">{t('total_invoice')}</span>
                        <span className="text-xl font-mono font-light text-[#C8A96A]">{language === 'ar' ? `${Math.round(total).toLocaleString()} د.ج` : `${Math.round(total).toLocaleString()} DA`}</span>
                      </div>

                      {/* Checkout button */}
                      <button
                        onClick={handleCheckout}
                        disabled={isCheckingOut}
                        className="w-full py-4 bg-gradient-to-r from-[#C8A96A] to-[#A08146] disabled:from-gray-700 disabled:to-gray-800 text-black font-semibold text-[10px] tracking-[0.25em] uppercase hover:opacity-90 transition-all flex items-center justify-center gap-2 rounded-none cursor-pointer"
                        id="cart-checkout-submit-btn"
                      >
                        {isCheckingOut ? (
                          <div className="flex items-center gap-2">
                            <span className="animate-spin h-3.5 w-3.5 border-2 border-black border-t-transparent rounded-full" />
                            <span>{t('processing')}</span>
                          </div>
                        ) : (
                          <>
                            <MessageSquare size={14} />
                            <span>{t('secure_checkout')}</span>
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </>
              )}

            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
