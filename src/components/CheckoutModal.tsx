import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  ShoppingBag,
  CheckCircle2,
  Truck,
  User,
  Phone,
  MapPin,
  Building,
  FileText,
  Minus,
  Plus,
  Trash2,
  ShieldCheck,
  Sparkles,
  ChevronRight,
} from 'lucide-react';
import { CartItem } from '../types';
import { calculateCartTotals } from '../utils/cartUtils';
import { useLanguage, getTranslatedPerfume } from '../context/LanguageContext';
import { ALGERIAN_WILAYAS, Wilaya } from '../data/wilayas';
import { ImageWithFallback } from './ImageWithFallback';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, qty: number) => void;
  onRemoveItem: (id: string) => void;
  onUpdateSize?: (oldId: string, newSize: string) => void;
  onCheckoutSuccess: () => void;
}

const BOTTLE_SIZES = ['12ml', '15ml', '30ml', '50ml', '80ml', '100ml'];
const WHATSAPP_NUMBER = '213794662175';

const WhatsAppIcon = ({ size = 18, className = '' }: { size?: number; className?: string }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.99c-.002 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.05 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

export default function CheckoutModal({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onUpdateSize,
  onCheckoutSuccess,
}: CheckoutModalProps) {
  const { t, language, dir } = useLanguage();

  // Form State
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedWilayaCode, setSelectedWilayaCode] = useState('16'); // Default to 16 - Algiers
  const [commune, setCommune] = useState('');
  const [address, setAddress] = useState('');
  const [orderNotes, setOrderNotes] = useState('');

  // UI state
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [orderId, setOrderId] = useState('');

  // Selected Wilaya Object
  const selectedWilaya = ALGERIAN_WILAYAS.find((w) => w.code === selectedWilayaCode) || ALGERIAN_WILAYAS[15];

  // Price Calculations
  const { subtotal, promoDiscount, totalAfterDiscount } = calculateCartTotals(cartItems);
  const deliveryFee = totalAfterDiscount > 10000 ? 0 : selectedWilaya.deliveryFee;
  const grandTotal = totalAfterDiscount + deliveryFee;

  // Validate inputs
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!fullName.trim()) {
      newErrors.fullName = language === 'ar' ? 'يرجى إدخال الاسم الكامل' : 'Full Name is required';
    }

    if (!phone.trim()) {
      newErrors.phone = language === 'ar' ? 'يرجى إدخال رقم الهاتف' : 'Phone Number is required';
    } else if (!/^(05|06|07|02|03|04)\d{8}$/.test(phone.replace(/\s+/g, ''))) {
      newErrors.phone =
        language === 'ar'
          ? 'يرجى إدخال رقم هاتف جزائري صحيح (مثال: 0550123456)'
          : 'Please enter a valid Algerian phone number (e.g. 0550123456)';
    }

    if (!commune.trim()) {
      newErrors.commune = language === 'ar' ? 'يرجى إدخال البلدية / المدينة' : 'City / Commune is required';
    }

    if (!address.trim()) {
      newErrors.address = language === 'ar' ? 'يرجى إدخال عنوان التوصيل بالتفصيل' : 'Full Delivery Address is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Generate formatted WhatsApp text message
  const generateWhatsAppMessage = () => {
    const wilayaName =
      language === 'ar'
        ? selectedWilaya.nameAr
        : language === 'fr'
        ? selectedWilaya.nameFr
        : selectedWilaya.nameEn;

    const productsFormatted = cartItems
      .map((item) => {
        const transPerfume = getTranslatedPerfume(item.perfume, language);
        const linePrice = item.price * item.quantity;
        const conc = item.concentration || 'x1';
        const concLabel = conc === 'x2' ? 'x2 (Extra Strong)' : 'x1 (Standard)';
        const bottleName = item.selectedBottle ? (language === 'ar' ? item.selectedBottle.nameAr : item.selectedBottle.name) : 'Standard Bottle';
        return `- ${transPerfume.name} | Bottle: ${bottleName} | Size: ${item.selectedSize} | Concentration: ${concLabel} | Qty: ${item.quantity} | ${linePrice.toLocaleString()} DA`;
      })
      .join('\n');

    const deliveryText = deliveryFee === 0 ? '0 DA (Free)' : `${deliveryFee.toLocaleString()} DA`;
    const notesText = orderNotes.trim() ? orderNotes.trim() : (language === 'ar' ? 'لا يوجد' : 'None');

    return `🛍️ New Order - BNS

👤 Name: ${fullName.trim()}
📞 Phone: ${phone.trim()}
📍 Wilaya: ${wilayaName}
🏙️ City: ${commune.trim()}
🏠 Address: ${address.trim()}

🧴 Products:
${productsFormatted}

Subtotal: ${subtotal.toLocaleString()} DA
${promoDiscount > 0 ? `Promotion Discount (30ML • X2): -${promoDiscount.toLocaleString()} DA\n` : ''}Delivery: ${deliveryText}
Total: ${grandTotal.toLocaleString()} DA

📝 Notes: ${notesText}`;
  };

  const openWhatsApp = () => {
    const msg = generateWhatsAppMessage();
    const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
    window.open(waUrl, '_blank');
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      const formEl = document.getElementById('bns-checkout-form');
      if (formEl) formEl.scrollTop = 0;
      return;
    }

    setIsSubmitting(true);

    const generatedId = `BNS-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderId(generatedId);

    // Redirect to WhatsApp with pre-filled order
    openWhatsApp();

    setTimeout(() => {
      setIsSubmitting(false);
      setOrderConfirmed(true);
      onCheckoutSuccess(); // clears cart state
    }, 400);
  };

  const handleCloseDone = () => {
    setOrderConfirmed(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] overflow-y-auto font-sans" style={{ direction: dir }}>
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Modal Window Container */}
        <div className="min-h-screen px-3 sm:px-6 py-6 sm:py-12 flex items-center justify-center relative z-10 pointer-events-none">
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 20 }}
            transition={{ type: 'spring', damping: 28, stiffness: 260 }}
            className="w-full max-w-5xl bg-[#0d0d0d] border border-[#C8A96A]/30 shadow-[0_25px_70px_rgba(0,0,0,0.95)] overflow-hidden pointer-events-auto relative text-left"
          >
            {/* Header Bar */}
            <div className="p-4 sm:p-6 bg-[#111111] border-b border-[#C8A96A]/20 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#C8A96A]/10 border border-[#C8A96A]/30 flex items-center justify-center text-[#C8A96A]">
                  <ShoppingBag size={16} />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-serif font-normal text-white tracking-wider">
                    {language === 'ar' ? 'إتمام الطلب الملكي - BNS' : 'BNS LUXURY CHECKOUT'}
                  </h3>
                  <p className="text-[10px] text-[#C8A96A] tracking-[0.2em] uppercase font-sans font-medium">
                    {language === 'ar' ? 'الدفع عند الاستلام مع التوصيل السريع' : 'Cash on Delivery • Express Nationwide Shipping'}
                  </p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-black/60 border border-gray-800 text-gray-400 hover:text-[#C8A96A] hover:border-[#C8A96A]/50 flex items-center justify-center cursor-pointer transition-all"
                aria-label="Close Checkout"
              >
                <X size={18} />
              </button>
            </div>

            {/* ORDER CONFIRMED VIEW */}
            {orderConfirmed ? (
              <div className="p-6 sm:p-12 text-center flex flex-col items-center justify-center space-y-6 max-w-xl mx-auto my-8">
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', damping: 15 }}
                  className="w-20 h-20 rounded-full bg-[#C8A96A]/15 border-2 border-[#C8A96A] flex items-center justify-center text-[#C8A96A]"
                >
                  <CheckCircle2 size={48} className="animate-pulse" />
                </motion.div>

                <div className="space-y-2">
                  <span className="text-[10px] uppercase tracking-[0.3em] text-[#C8A96A] font-semibold bg-[#C8A96A]/10 px-3 py-1 border border-[#C8A96A]/20">
                    {language === 'ar' ? 'تم تأكيد طلبك بنجاح' : 'ORDER CONFIRMED'}
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-serif text-white tracking-wide">
                    {language === 'ar' ? 'شكراً لثقتكم بـ BNS' : 'Thank You For Your Order'}
                  </h2>
                  <p className="text-xs text-gray-400 font-mono">
                    {language === 'ar' ? `رقم الطلب: ${orderId}` : `Order Reference: ${orderId}`}
                  </p>
                </div>

                <div className="w-full bg-[#111] p-5 border border-[#C8A96A]/20 text-xs text-gray-300 space-y-2 text-left" style={{ direction: dir }}>
                  <div className="flex justify-between border-b border-gray-800 pb-2">
                    <span className="text-gray-400">{language === 'ar' ? 'العميل:' : 'Customer:'}</span>
                    <span className="text-white font-medium">{fullName}</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-800 pb-2">
                    <span className="text-gray-400">{language === 'ar' ? 'رقم الهاتف:' : 'Phone:'}</span>
                    <span className="text-white font-mono">{phone}</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-800 pb-2">
                    <span className="text-gray-400">{language === 'ar' ? 'الولاية والبلدية:' : 'Location:'}</span>
                    <span className="text-white">{selectedWilaya.code} - {commune}</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-800 pb-2">
                    <span className="text-gray-400">{language === 'ar' ? 'عنوان التوصيل:' : 'Address:'}</span>
                    <span className="text-white">{address}</span>
                  </div>
                  <div className="flex justify-between pt-1 font-semibold text-[#C8A96A]">
                    <span>{language === 'ar' ? 'المبلغ الإجمالي (عند الاستلام):' : 'Total Amount (Cash on Delivery):'}</span>
                    <span className="font-mono text-sm">{grandTotal.toLocaleString()} DA</span>
                  </div>
                </div>

                <div className="p-4 bg-[#C8A96A]/5 border border-[#C8A96A]/15 text-[11px] text-gray-300 flex items-center gap-3 text-left">
                  <Truck size={20} className="text-[#C8A96A] shrink-0" />
                  <p>
                    {language === 'ar'
                      ? 'سيقوم فريقنا بالتواصل معكم عبر الهاتف قبل الشحن لإنهاء التوصيل خلال 24-48 ساعة.'
                      : 'Our team will contact you via phone before dispatch. Express delivery arrives within 24-48 hours.'}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 w-full">
                  <button
                    onClick={openWhatsApp}
                    className="flex-1 py-3.5 bg-[#25D366] hover:bg-[#20bd5a] text-black font-semibold text-xs tracking-wider uppercase transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[0_5px_20px_rgba(37,211,102,0.25)]"
                  >
                    <WhatsAppIcon size={18} />
                    <span>{language === 'ar' ? 'فتح المحادثة على الواتساب' : 'Open WhatsApp Chat'}</span>
                  </button>
                  <button
                    onClick={handleCloseDone}
                    className="flex-1 py-3.5 bg-[#C8A96A] hover:bg-white text-black font-semibold text-xs tracking-wider uppercase transition-all cursor-pointer"
                  >
                    {language === 'ar' ? 'العودة للتسوق' : 'CONTINUE SHOPPING'}
                  </button>
                </div>
              </div>
            ) : cartItems.length === 0 ? (
              /* EMPTY CART CHECKOUT WARNING */
              <div className="p-12 text-center flex flex-col items-center justify-center space-y-4">
                <ShoppingBag size={48} strokeWidth={1} className="text-gray-600" />
                <p className="text-base font-serif text-[#C8A96A]">{language === 'ar' ? 'حقيبة التسوق فارغة' : 'Your Shopping Bag is Empty'}</p>
                <p className="text-xs text-gray-400 max-w-sm">
                  {language === 'ar' ? 'يرجى إضافة عطور إلى الحقيبة أولاً للتمكن من إتمام الطلب.' : 'Please add some perfumes to your bag before checking out.'}
                </p>
                <button
                  onClick={onClose}
                  className="px-8 py-3 bg-[#C8A96A] text-black text-xs font-semibold tracking-widest uppercase hover:bg-white transition-all cursor-pointer mt-4"
                >
                  {language === 'ar' ? 'تصفح التشكيلة' : 'EXPLORE COLLECTION'}
                </button>
              </div>
            ) : (
              /* MAIN CHECKOUT TWO-COLUMN LAYOUT */
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 max-h-[85vh] overflow-y-auto" id="bns-checkout-form">
                
                {/* LEFT COLUMN: CUSTOMER DELIVERY FORM */}
                <form onSubmit={handlePlaceOrder} className="lg:col-span-7 p-5 sm:p-8 space-y-6 border-b lg:border-b-0 lg:border-r border-[#C8A96A]/15">
                  <div className="space-y-1">
                    <h4 className="text-xs uppercase tracking-[0.25em] text-[#C8A96A] font-semibold flex items-center gap-2">
                      <Truck size={14} />
                      <span>{language === 'ar' ? '1. معلومات التوصيل والشحن' : '1. DELIVERY & SHIPPING DETAILS'}</span>
                    </h4>
                    <p className="text-[11px] text-gray-400 font-light">
                      {language === 'ar' ? 'يرجى ملء كافة البيانات لضمان وصول التوصيل الملكي بمدينة ودقة.' : 'Fill in your contact and address details for express nationwide delivery.'}
                    </p>
                  </div>

                  <div className="space-y-4">
                    {/* Full Name */}
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-gray-300 font-medium mb-1.5 flex items-center gap-1.5">
                        <User size={12} className="text-[#C8A96A]" />
                        <span>{language === 'ar' ? 'الاسم الكامل *' : 'Full Name *'}</span>
                      </label>
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder={language === 'ar' ? 'مثال: محمد بن علي' : 'e.g. Mohamed Benali'}
                        className={`w-full bg-[#141414] border ${
                          errors.fullName ? 'border-red-500' : 'border-gray-800 focus:border-[#C8A96A]'
                        } px-3.5 py-3 text-xs text-white placeholder-gray-600 outline-none transition-colors rounded-none`}
                      />
                      {errors.fullName && <p className="text-[10px] text-red-400 mt-1">{errors.fullName}</p>}
                    </div>

                    {/* Phone Number */}
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-gray-300 font-medium mb-1.5 flex items-center gap-1.5">
                        <Phone size={12} className="text-[#C8A96A]" />
                        <span>{language === 'ar' ? 'رقم الهاتف *' : 'Phone Number *'}</span>
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder={language === 'ar' ? '05 / 06 / 07 XX XX XX XX' : '05 / 06 / 07 XX XX XX XX'}
                        className={`w-full bg-[#141414] border ${
                          errors.phone ? 'border-red-500' : 'border-gray-800 focus:border-[#C8A96A]'
                        } px-3.5 py-3 text-xs text-white placeholder-gray-600 outline-none transition-colors rounded-none font-mono`}
                      />
                      {errors.phone && <p className="text-[10px] text-red-400 mt-1">{errors.phone}</p>}
                    </div>

                    {/* Wilaya & Commune Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Wilaya Select */}
                      <div>
                        <label className="block text-[10px] uppercase tracking-wider text-gray-300 font-medium mb-1.5 flex items-center gap-1.5">
                          <MapPin size={12} className="text-[#C8A96A]" />
                          <span>{language === 'ar' ? 'الولاية *' : 'Wilaya (Province) *'}</span>
                        </label>
                        <select
                          value={selectedWilayaCode}
                          onChange={(e) => setSelectedWilayaCode(e.target.value)}
                          className="w-full bg-[#141414] border border-gray-800 focus:border-[#C8A96A] px-3.5 py-3 text-xs text-white outline-none transition-colors rounded-none cursor-pointer"
                        >
                          {ALGERIAN_WILAYAS.map((w) => (
                            <option key={w.code} value={w.code} className="bg-[#141414] text-white">
                              {language === 'ar' ? w.nameAr : language === 'fr' ? w.nameFr : w.nameEn}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* City / Commune */}
                      <div>
                        <label className="block text-[10px] uppercase tracking-wider text-gray-300 font-medium mb-1.5 flex items-center gap-1.5">
                          <Building size={12} className="text-[#C8A96A]" />
                          <span>{language === 'ar' ? 'البلدية / المدينة *' : 'City / Commune *'}</span>
                        </label>
                        <input
                          type="text"
                          value={commune}
                          onChange={(e) => setCommune(e.target.value)}
                          placeholder={language === 'ar' ? 'مثال: باب الزوار / الشراقة' : 'e.g. Bab Ezzouar / Oran Centre'}
                          className={`w-full bg-[#141414] border ${
                            errors.commune ? 'border-red-500' : 'border-gray-800 focus:border-[#C8A96A]'
                          } px-3.5 py-3 text-xs text-white placeholder-gray-600 outline-none transition-colors rounded-none`}
                        />
                        {errors.commune && <p className="text-[10px] text-red-400 mt-1">{errors.commune}</p>}
                      </div>
                    </div>

                    {/* Full Delivery Address */}
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-gray-300 font-medium mb-1.5 flex items-center gap-1.5">
                        <MapPin size={12} className="text-[#C8A96A]" />
                        <span>{language === 'ar' ? 'العنوان الكامل للتوصيل *' : 'Full Delivery Address *'}</span>
                      </label>
                      <textarea
                        rows={2}
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder={
                          language === 'ar'
                            ? 'اسم الشارع، رقم العمارة، الشقة، أو معلم قريب...'
                            : 'Street name, building number, apartment, or nearby landmark...'
                        }
                        className={`w-full bg-[#141414] border ${
                          errors.address ? 'border-red-500' : 'border-gray-800 focus:border-[#C8A96A]'
                        } px-3.5 py-3 text-xs text-white placeholder-gray-600 outline-none transition-colors rounded-none resize-none`}
                      />
                      {errors.address && <p className="text-[10px] text-red-400 mt-1">{errors.address}</p>}
                    </div>

                    {/* Order Notes (Optional) */}
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-gray-400 font-medium mb-1.5 flex items-center gap-1.5">
                        <FileText size={12} className="text-[#C8A96A]" />
                        <span>{language === 'ar' ? 'ملاحظات إضافية (اختياري)' : 'Order Notes (Optional)'}</span>
                      </label>
                      <input
                        type="text"
                        value={orderNotes}
                        onChange={(e) => setOrderNotes(e.target.value)}
                        placeholder={
                          language === 'ar'
                            ? 'أوقات التوصيل المفضلة، تعليمات التغليف...'
                            : 'Preferred delivery hours, gift wrapping note...'
                        }
                        className="w-full bg-[#141414] border border-gray-800 focus:border-[#C8A96A] px-3.5 py-2.5 text-xs text-white placeholder-gray-600 outline-none transition-colors rounded-none"
                      />
                    </div>
                  </div>

                  {/* Payment Method Banner */}
                  <div className="pt-2 border-t border-gray-900 space-y-3">
                    <h5 className="text-[10px] uppercase tracking-[0.2em] text-[#C8A96A] font-semibold flex items-center gap-2">
                      <ShieldCheck size={13} />
                      <span>{language === 'ar' ? '2. تأكيد الطلب والدفع' : '2. ORDER CONFIRMATION & PAYMENT'}</span>
                    </h5>

                    <div className="p-3.5 bg-[#141414] border border-[#25D366]/30 flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#25D366]/15 border border-[#25D366]/40 flex items-center justify-center shrink-0 mt-0.5 text-[#25D366]">
                        <WhatsAppIcon size={16} />
                      </div>
                      <div className="space-y-1 text-left" style={{ direction: dir }}>
                        <p className="text-xs font-semibold text-white">
                          {language === 'ar' ? 'إرسال طلب مباشر عبر الواتساب (الدفع عند الاستلام)' : 'Direct WhatsApp Order (Cash on Delivery)'}
                        </p>
                        <p className="text-[10.5px] text-gray-400 leading-relaxed">
                          {language === 'ar'
                            ? 'عند النقر على إرسال الطلب، سيتولد نص طلب احترافي ويفتح تطبيق الواتساب مباشرة لتأكيد التوصيل دون الحاجة للدفع الإلكتروني.'
                            : 'Clicking Send Order generates a formatted order message and opens WhatsApp directly to confirm dispatch. Payment is strictly Cash on Delivery.'}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Desktop Submit Button */}
                  <div className="hidden lg:block pt-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 bg-gradient-to-r from-[#25D366] via-[#20bd5a] to-[#128C7E] hover:from-white hover:to-white hover:text-black text-black font-semibold text-xs tracking-[0.2em] uppercase transition-all duration-300 flex items-center justify-center gap-2.5 shadow-[0_10px_30px_rgba(37,211,102,0.2)] disabled:opacity-50 cursor-pointer"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center gap-2">
                          <span className="animate-spin h-4 w-4 border-2 border-black border-t-transparent rounded-full" />
                          <span>{language === 'ar' ? 'جاري تحضير الواتساب...' : 'PREPARING WHATSAPP...'}</span>
                        </div>
                      ) : (
                        <>
                          <WhatsAppIcon size={18} />
                          <span>
                            {language === 'ar'
                              ? `إرسال الطلب عبر الواتساب • ${grandTotal.toLocaleString()} د.ج`
                              : `SEND ORDER VIA WHATSAPP • ${grandTotal.toLocaleString()} DA`}
                          </span>
                          <ChevronRight size={16} />
                        </>
                      )}
                    </button>
                  </div>
                </form>

                {/* RIGHT COLUMN: ORDER SUMMARY & BOTTLE SIZES */}
                <div className="lg:col-span-5 p-5 sm:p-8 bg-[#111111] flex flex-col justify-between space-y-6">
                  <div>
                    <div className="flex items-center justify-between pb-3 border-b border-[#C8A96A]/15 mb-4">
                      <h4 className="text-xs uppercase tracking-[0.25em] text-[#C8A96A] font-semibold flex items-center gap-2">
                        <ShoppingBag size={14} />
                        <span>{language === 'ar' ? 'ملخص الطلب' : 'ORDER SUMMARY'}</span>
                      </h4>
                      <span className="text-[10px] text-gray-400 font-mono">
                        {cartItems.reduce((sum, item) => sum + item.quantity, 0)} {language === 'ar' ? 'عناصر' : 'Items'}
                      </span>
                    </div>

                    {/* Items List */}
                    <div className="space-y-4 max-h-[320px] overflow-y-auto pr-1 custom-scrollbar">
                      {cartItems.map((item) => {
                        const transPerfume = getTranslatedPerfume(item.perfume, language);
                        return (
                          <div
                            key={item.id}
                            className="p-3 bg-[#161616] border border-gray-900 flex gap-3.5 items-center relative group"
                          >
                            {/* Product Image */}
                            <div className="w-16 h-16 bg-black border border-gray-800 shrink-0 overflow-hidden relative">
                              <ImageWithFallback
                                perfume={item.perfume}
                                alt={transPerfume.name}
                                className="w-full h-full object-cover"
                              />
                            </div>

                            {/* Details */}
                            <div className="flex-1 min-w-0 space-y-1">
                              <span className="text-[8px] uppercase tracking-widest text-[#C8A96A] font-medium block">
                                {transPerfume.brand}
                              </span>
                              <h5 className="text-xs font-serif text-white truncate">{transPerfume.name}</h5>

                              {/* Size Selector and Concentration in Summary */}
                              <div className="flex flex-wrap items-center gap-2 pt-1">
                                <span className="text-[9px] text-gray-400">{language === 'ar' ? 'الحجم:' : 'Size:'}</span>
                                <select
                                  value={item.selectedSize}
                                  onChange={(e) => {
                                    if (onUpdateSize) {
                                      onUpdateSize(item.id, e.target.value);
                                    }
                                  }}
                                  className="bg-black text-[#C8A96A] border border-gray-800 text-[9.5px] px-1.5 py-0.5 outline-none cursor-pointer"
                                >
                                  {BOTTLE_SIZES.map((sz) => (
                                    <option key={sz} value={sz}>
                                      {sz}
                                    </option>
                                  ))}
                                </select>
                                <span className={`text-[8px] border px-1.5 py-0.2 font-semibold uppercase tracking-wider ${
                                  (item.concentration || 'x1') === 'x2'
                                    ? 'bg-[#C8A96A]/20 text-[#C8A96A] border-[#C8A96A]/40'
                                    : 'bg-gray-900 text-gray-400 border-gray-800'
                                }`}>
                                  {(item.concentration || 'x1') === 'x2' ? 'x2' : 'x1'}
                                </span>
                              </div>

                              {item.selectedBottle && (
                                <div className="flex items-center gap-1 text-[8.5px] text-gray-300 font-sans pt-0.5">
                                  <span className="text-[#C8A96A] font-medium">{language === 'ar' ? 'الزجاجة:' : 'Bottle:'}</span>
                                  <span className="bg-black text-gray-200 border border-gray-800 px-1.5 py-0.5 font-sans font-medium flex items-center gap-1 truncate max-w-[160px]">
                                    <span className="w-2.5 h-2.5 bg-white rounded-full flex items-center justify-center p-0.5 shrink-0">
                                      <img src={item.selectedBottle.image} alt="" className="w-full h-full object-contain" />
                                    </span>
                                    <span className="truncate">{language === 'ar' ? item.selectedBottle.nameAr : item.selectedBottle.name}</span>
                                  </span>
                                </div>
                              )}

                              {/* Quantity Control */}
                              <div className="flex items-center gap-2 pt-1">
                                <button
                                  type="button"
                                  onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                                  className="w-4 h-4 bg-black border border-gray-800 text-gray-400 hover:text-white flex items-center justify-center cursor-pointer"
                                >
                                  <Minus size={9} />
                                </button>
                                <span className="text-xs font-mono text-white">{item.quantity}</span>
                                <button
                                  type="button"
                                  onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                                  className="w-4 h-4 bg-black border border-gray-800 text-gray-400 hover:text-white flex items-center justify-center cursor-pointer"
                                >
                                  <Plus size={9} />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => onRemoveItem(item.id)}
                                  className="text-gray-600 hover:text-red-400 ml-2 cursor-pointer transition-colors"
                                  title="Remove item"
                                >
                                  <Trash2 size={11} />
                                </button>
                              </div>
                            </div>

                            {/* Line Price */}
                            <div className="text-right shrink-0">
                              <span className="text-xs font-mono text-[#C8A96A] font-medium block">
                                {(item.price * item.quantity).toLocaleString()} DA
                              </span>
                              <span className="text-[8.5px] text-gray-500 font-mono">
                                {item.price.toLocaleString()} DA / ea
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Financial Breakdown */}
                  <div className="space-y-3 pt-4 border-t border-gray-800">
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between text-gray-400">
                        <span>{t('subtotal')}</span>
                        <span className="font-mono text-white">{subtotal.toLocaleString()} DA</span>
                      </div>

                      {promoDiscount > 0 && (
                        <div className="flex justify-between text-[#C8A96A] font-medium">
                          <span className="flex items-center gap-1">
                            <Sparkles size={11} className="shrink-0 text-[#C8A96A]" />
                            <span>{language === 'ar' ? 'خصم العرض الترويجي:' : 'Promotion Discount:'}</span>
                          </span>
                          <span className="font-mono text-[#C8A96A]">-{promoDiscount.toLocaleString()} DA</span>
                        </div>
                      )}

                      <div className="flex justify-between text-gray-400">
                        <span>
                          {language === 'ar' ? `شحن إلى (${selectedWilaya.nameAr})` : `Shipping to (${selectedWilaya.nameEn})`}
                        </span>
                        <span className="font-mono text-white">
                          {deliveryFee === 0 ? (
                            <span className="text-[#C8A96A] font-light">{language === 'ar' ? 'مجاني (طلب أكثر من 10,000 د.ج)' : 'FREE (Order > 10,000 DA)'}</span>
                          ) : (
                            `${deliveryFee.toLocaleString()} DA`
                          )}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5 text-[9px] text-[#C8A96A] bg-[#C8A96A]/5 p-2 border border-[#C8A96A]/10">
                        <Sparkles size={12} className="shrink-0" />
                        <span>{language === 'ar' ? 'تغليف هدايا ملكي مجاني مشمول مع كل طلبية' : 'Complimentary signature BNS gift box included'}</span>
                      </div>
                    </div>

                    {/* Grand Total */}
                    <div className="flex justify-between items-end border-t border-gray-800 pt-3">
                      <span className="text-xs uppercase tracking-widest text-gray-300 font-medium">
                        {language === 'ar' ? 'المبلغ الإجمالي:' : 'Grand Total:'}
                      </span>
                      <span className="text-xl font-mono text-[#C8A96A] font-semibold">{grandTotal.toLocaleString()} DA</span>
                    </div>

                    {/* Mobile Submit Button */}
                    <div className="block lg:hidden pt-2">
                      <button
                        type="button"
                        onClick={handlePlaceOrder}
                        disabled={isSubmitting}
                        className="w-full py-3.5 bg-gradient-to-r from-[#25D366] via-[#20bd5a] to-[#128C7E] hover:bg-white text-black font-semibold text-xs tracking-[0.2em] uppercase transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_10px_30px_rgba(37,211,102,0.2)] disabled:opacity-50 cursor-pointer"
                      >
                        {isSubmitting ? (
                          <div className="flex items-center gap-2">
                            <span className="animate-spin h-4 w-4 border-2 border-black border-t-transparent rounded-full" />
                            <span>{language === 'ar' ? 'جاري التحضير...' : 'PROCESSING...'}</span>
                          </div>
                        ) : (
                          <>
                            <WhatsAppIcon size={18} />
                            <span>
                              {language === 'ar'
                                ? `إرسال الطلب عبر الواتساب • ${grandTotal.toLocaleString()} د.ج`
                                : `SEND ORDER VIA WHATSAPP • ${grandTotal.toLocaleString()} DA`}
                            </span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            )}
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
}
