import { Dispatch, SetStateAction } from "react";

export interface User {
  userId: string;
  firstName: string;
  lastName?: string;
  email: string;
  password: string;
  profileImage?: string;
  address?: Address;
  phone?: string;
  cartId?: string;
  role: "customer" | "admin";
  pro?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
}

export interface CartItem {
  cartItemId: string;
  productId: string;
  title: string;
  description?: string;
  category?: string;
  brand?: string;
  price: number;
  quantity: number;
  addedAt: Date;
  image: string;
  extraImages?: string[];
}

export interface Product {
  productId: string;
  title: string;
  description: string;
  price: number;
  salePrice?: number;
  image: string;
  category: string;
  brand?: string;
  extraImages?: string[];
  stock: number;
  sku: string; // Added for inventory management
  rating: number;
  reviewCount: number;
  status: ProductStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface Category {
  categoryId: string;
  name: string;
  description?: string;
  image?: string;
  parentCategoryId?: string | null;
}

export interface Brand {
  brandId: string;
  name: string;
  description?: string;
  image?: string;
  website?: string;
}

export interface OrderItem {
  orderItemId: string;
  orderId: string;
  productId: string;
  title: string;
  price: number;
  quantity: number;
  image: string;
  category: string;
  brand?: string;
}

export interface Order {
  orderId: string;
  userId: string;
  status: OrderStatus;
  total: number;
  subtotal: number;
  shipping: number;
  tax: number;
  items: OrderItem[];
  shippingAddress: Address;
  billingAddress: Address;
  paymentMethod: string;
  createdAt: Date;
  updatedAt: Date;
}

export enum OrderStatus {
  Pending = "pending",
  Processing = "processing",
  Shipped = "shipped",
  Delivered = "delivered",
  Cancelled = "cancelled",
}

export enum ProductStatus {
  Active = "active",
  Draft = "draft",
  Archived = "archived",
}

export interface Review {
  reviewId: string;
  productId: string;
  userId: string;
  rating: number;
  comment: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Wishlist {
  wishlistId: string;
  userId: string;
  products: string[];
}

export interface Coupon {
  couponId: string;
  code: string;
  discountType: "percentage" | "fixed";
  discountValue: number;
  minPurchase?: number;
  expirationDate: Date;
  usageLimit?: number;
}

export interface GlobalData {
  user: User;
  cart: CartItem[];
  products: Product[];
  reviews: Review[];
  slideContents: SlideContent[];
}

export interface SlideContent {
  title: string;
  subtitle: string;
  imageSrc: string;
}

export interface GlobalContextType {
  user: User;
  setUser: Dispatch<SetStateAction<User>>;
  cart: CartItem[];
  setCart: Dispatch<SetStateAction<CartItem[]>>;
  products: Product[];
  setProducts: Dispatch<SetStateAction<Product[]>>;
  categories: Category[];
  setCategories: Dispatch<SetStateAction<Category[]>>;
  brands: Brand[];
  setBrands: Dispatch<SetStateAction<Brand[]>>;
  orders: Order[];
  setOrders: Dispatch<SetStateAction<Order[]>>;
  reviews: Review[];
  setReviews: Dispatch<SetStateAction<Review[]>>;
  wishlist: Wishlist | null;
  setWishlist: Dispatch<SetStateAction<Wishlist | null>>;
  coupons: Coupon[];
  setCoupons: Dispatch<SetStateAction<Coupon[]>>;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  slideContents: SlideContent[];
  setSlideContents: Dispatch<SetStateAction<SlideContent[]>>;
  isLoggedIn: boolean;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
}
