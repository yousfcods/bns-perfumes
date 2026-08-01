import { CartItem } from '../types';

export interface CartTotals {
  subtotal: number;
  eligible30mlX2Count: number;
  discountGroups: number;
  promoDiscount: number;
  totalAfterDiscount: number;
}

/**
 * Calculates cart totals including automatic promotional discount for 30ML + X2 concentration perfumes.
 * Promotion: Every complete set of 4 eligible 30ML X2 perfumes receives a 2,000 DA discount.
 */
export function calculateCartTotals(cartItems: CartItem[]): CartTotals {
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // Count total quantity of eligible perfumes (30ML size AND X2 concentration)
  const eligible30mlX2Count = cartItems.reduce((count, item) => {
    const is30ml = item.selectedSize.trim().toLowerCase() === '30ml';
    const isX2 = (item.concentration || 'x1') === 'x2';
    if (is30ml && isX2) {
      return count + item.quantity;
    }
    return count;
  }, 0);

  // Apply 2,000 DA discount for every complete set of 4 eligible perfumes
  const discountGroups = Math.floor(eligible30mlX2Count / 4);
  const promoDiscount = discountGroups * 2000;

  const totalAfterDiscount = Math.max(0, subtotal - promoDiscount);

  return {
    subtotal,
    eligible30mlX2Count,
    discountGroups,
    promoDiscount,
    totalAfterDiscount,
  };
}
