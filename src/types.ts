export type CategoryId = 'canapes' | 'hot' | 'desserts' | 'drinks';

export interface Category {
  id: CategoryId;
  name: string;
  description: string;
}

export interface Dish {
  id: string;
  name: string;
  category: CategoryId;
  description: string;
  portionSize: string;
  tags: string[];
  isChefSpecial?: boolean;
  isPopular?: boolean;
  imageUrl: string;
  fallbackEmoji: string;
  isActive?: boolean; // Can be toggled on/off by Chef/Admin for today's buffet
}

export interface Partner {
  id: string;
  name: string;
  type: string; // e.g., 'Beynəlxalq Tədbir', 'Ticarət Mərkəzi', 'Aviaşirkət'
  year?: string;
  highlight?: string;
  logoUrl?: string; // Image / logo URL
}

export interface TrayItem {
  dish: Dish;
  quantity: number;
}

export interface OrderDetails {
  customerName: string;
  phone: string;
  eventDate: string;
  guestCount: number | '';
  eventType: string;
  address: string;
  notes: string;
}

export interface FlyingAnimation {
  id: number;
  dish: Dish;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
}
