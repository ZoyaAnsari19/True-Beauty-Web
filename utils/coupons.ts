export type Coupon = {
  code: string;
  description?: string;
  /** Flat discount amount in rupees */
  discountAmount: number;
  /** Minimum cart total (on eligible items) required */
  minCartTotal: number;
  /** ISO date string (inclusive) */
  startDate: string;
  /** ISO date string (inclusive) */
  expiryDate: string;
  /** Only these product categories are eligible (by `Product.category`) */
  applicableCategories: string[];
  /** If true, products where originalPrice > price are excluded from discount calculations */
  excludeDiscountedProducts: boolean;
  /** Max total redemptions across all users (0 or undefined = unlimited) */
  usageLimit?: number;
  /** Max redemptions per user (default 1 for your use-case) */
  perUserLimit: number;
  /** If false, cannot be combined with other coupons (we only support one anyway) */
  combinable: boolean;
  /** If false, coupon is disabled */
  active: boolean;
};

export type CouponUsageSummary = {
  totalUsed: number;
  perUser: Record<string, number>;
};

export type CouponUsageStore = Record<string, CouponUsageSummary>;

const USAGE_STORAGE_KEY = 'tb_coupon_usage';

// Reusable display/config values for the default coupon used across the app
export const DEFAULT_COUPON_CODE = 'TRUEPREMIUM200';
export const DEFAULT_COUPON_DISCOUNT = 200;
export const DEFAULT_COUPON_MIN_CART_TOTAL = 2000;
// Minimum single-product price at which we want to *show*
// coupon messaging on product cards / detail pages.
// (Actual applicability at checkout is still based on
// DEFAULT_COUPON_MIN_CART_TOTAL and full validation.)
export const DEFAULT_COUPON_PRODUCT_MIN_PRICE = 1000;

// Default "premium" categories for the sample coupon (can be adjusted in admin)
export const DEFAULT_PREMIUM_CATEGORIES = ['skincare', 'makeup', 'haircare', 'fragrance', 'jewellery', 'gifting'];

// Seed example coupon that follows your spec: flat ₹200 off, min ₹2000
export const DEFAULT_COUPONS: Coupon[] = [
  {
    code: DEFAULT_COUPON_CODE,
    description: '₹200 OFF on premium categories for orders above ₹2000',
    discountAmount: DEFAULT_COUPON_DISCOUNT,
    minCartTotal: DEFAULT_COUPON_MIN_CART_TOTAL,
    startDate: new Date().toISOString().slice(0, 10),
    // 30 days validity by default
    expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
    applicableCategories: DEFAULT_PREMIUM_CATEGORIES,
    excludeDiscountedProducts: true,
    usageLimit: 0,
    perUserLimit: 1,
    combinable: false,
    active: true,
  },
];

export type MinimalCartItem = {
  id: number;
  price: number;
  quantity?: number;
};

export type MinimalProduct = {
  id: number;
  category: string;
  price: number;
  originalPrice: number;
};

export type CouponValidationResult =
  | { ok: true; coupon: Coupon; discount: number; eligibleTotal: number }
  | { ok: false; code: string; errorCode: string; message: string };

export function getStoredCoupons(): Coupon[] {
  if (typeof window === 'undefined') return DEFAULT_COUPONS;
  try {
    const raw = localStorage.getItem('tb_coupons');
    if (!raw) return DEFAULT_COUPONS;
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return DEFAULT_COUPONS;
    return parsed;
  } catch {
    return DEFAULT_COUPONS;
  }
}

export function saveCoupons(list: Coupon[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem('tb_coupons', JSON.stringify(list));
}

export function getCouponByCode(code: string): Coupon | undefined {
  const normalized = code.trim().toUpperCase();
  return getStoredCoupons().find((c) => c.code.toUpperCase() === normalized);
}

export function getCouponUsageStore(): CouponUsageStore {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(USAGE_STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch {
    return {};
  }
}

export function saveCouponUsageStore(store: CouponUsageStore) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(USAGE_STORAGE_KEY, JSON.stringify(store));
}

export function getUserIdForCouponUsage(user: any | null): string | null {
  if (!user) return null;
  return user.id?.toString() || user.email || user.phone || null;
}

export function getCouponUsageForUser(code: string, userId: string | null): number {
  if (!userId) return 0;
  const store = getCouponUsageStore();
  const entry = store[code.toUpperCase()];
  if (!entry) return 0;
  return entry.perUser[userId] || 0;
}

export function canUserUseCoupon(coupon: Coupon, userId: string | null): { ok: boolean; reason?: string } {
  if (!userId) {
    return { ok: false, reason: 'Please login to use this coupon.' };
  }
  const store = getCouponUsageStore();
  const key = coupon.code.toUpperCase();
  const entry = store[key];
  const alreadyUsedByUser = entry?.perUser?.[userId] || 0;

  if (alreadyUsedByUser >= (coupon.perUserLimit || 1)) {
    return { ok: false, reason: 'You have already used this coupon.' };
  }

  if (coupon.usageLimit && entry?.totalUsed >= coupon.usageLimit) {
    return { ok: false, reason: 'This coupon has reached its usage limit.' };
  }

  return { ok: true };
}

export function recordCouponUsage(coupon: Coupon, userId: string | null) {
  if (!userId) return;
  const store = getCouponUsageStore();
  const key = coupon.code.toUpperCase();
  const current: CouponUsageSummary = store[key] || { totalUsed: 0, perUser: {} };
  const userCount = current.perUser[userId] || 0;
  current.perUser[userId] = userCount + 1;
  current.totalUsed += 1;
  store[key] = current;
  saveCouponUsageStore(store);
}

export function computeEligibleTotal(
  cartItems: MinimalCartItem[],
  findProductById: (id: number) => MinimalProduct | null,
  coupon: Coupon,
): { totalEligible: number; hasEligibleItems: boolean } {
  let total = 0;
  let hasEligible = false;

  for (const item of cartItems) {
    const product = findProductById(item.id);
    if (!product) continue;
    const qty = item.quantity || 1;

    const isInCategory = coupon.applicableCategories.includes(product.category);
    const isDiscounted = product.originalPrice > product.price;

    if (!isInCategory) continue;
    if (coupon.excludeDiscountedProducts && isDiscounted) continue;

    hasEligible = true;
    total += item.price * qty;
  }

  return { totalEligible: total, hasEligibleItems: hasEligible };
}

export function validateCoupon(
  code: string,
  cartItems: MinimalCartItem[],
  findProductById: (id: number) => MinimalProduct | null,
  user: any | null,
  now: Date = new Date(),
): CouponValidationResult {
  const trimmed = code.trim();
  if (!trimmed) {
    return { ok: false, code, errorCode: 'EMPTY', message: 'Please enter a coupon code.' };
  }

  const coupon = getCouponByCode(trimmed);
  if (!coupon) {
    return { ok: false, code, errorCode: 'NOT_FOUND', message: 'Coupon code is invalid.' };
  }

  if (!coupon.active) {
    return { ok: false, code: coupon.code, errorCode: 'DISABLED', message: 'This coupon is currently not active.' };
  }

  const todayStr = now.toISOString().slice(0, 10);
  if (todayStr < coupon.startDate) {
    return { ok: false, code: coupon.code, errorCode: 'NOT_STARTED', message: 'This coupon is not yet active.' };
  }
  if (todayStr > coupon.expiryDate) {
    return { ok: false, code: coupon.code, errorCode: 'EXPIRED', message: 'This coupon has expired.' };
  }

  const userId = getUserIdForCouponUsage(user);
  const canUse = canUserUseCoupon(coupon, userId);
  if (!canUse.ok) {
    return { ok: false, code: coupon.code, errorCode: 'USER_LIMIT', message: canUse.reason || 'You are not eligible for this coupon.' };
  }

  const { totalEligible, hasEligibleItems } = computeEligibleTotal(cartItems, findProductById, coupon);

  if (!hasEligibleItems) {
    return {
      ok: false,
      code: coupon.code,
      errorCode: 'NO_ELIGIBLE_ITEMS',
      message: 'This coupon is only valid on selected premium categories and non-discounted products.',
    };
  }

  if (totalEligible < coupon.minCartTotal) {
    return {
      ok: false,
      code: coupon.code,
      errorCode: 'MIN_AMOUNT',
      message: `Minimum eligible cart value of ₹${coupon.minCartTotal} is required for this coupon.`,
    };
  }

  const discount = Math.min(coupon.discountAmount, totalEligible);

  return {
    ok: true,
    coupon,
    discount,
    eligibleTotal: totalEligible,
  };
}

/**
 * Utility: returns true when a product is considered "discounted" for coupon logic.
 * We treat any case where originalPrice > price as discounted.
 */
export function isProductDiscounted(product: { price: number; originalPrice: number }): boolean {
  return product.originalPrice > product.price;
}

/**
 * Utility: shared coupon‑eligibility logic for product UI (cards / PDP).
 * A product is eligible for the default coupon messaging when:
 * - Its price is strictly greater than DEFAULT_COUPON_PRODUCT_MIN_PRICE (₹1000)
 * - We do NOT care whether it is already discounted or not.
 *
 * Note: the actual application of coupons at checkout still uses full
 * validation (categories, cart total, minCartTotal = ₹2000, etc.) via validateCoupon.
 */
export function isDefaultCouponEligibleProduct(
  product: { price: number; originalPrice: number },
): boolean {
  return product.price > DEFAULT_COUPON_PRODUCT_MIN_PRICE;
}

