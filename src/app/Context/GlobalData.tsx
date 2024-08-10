"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import {
  User,
  CartItem,
  Product,
  Category,
  Brand,
  Order,
  Review,
  Wishlist,
  Coupon,
  SlideContent,
  GlobalContextType,
} from "@/lib/types";
import {
  dummyUser,
  dummyProducts,
  dummyCartItems,
  dummyCategories,
  dummyBrands,
  dummyOrders,
  dummyReviews,
  dummyWishlist,
  dummyCoupons,
  dummySlideContents,
} from "./Data";

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const GlobalProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(dummyUser);
  const [cart, setCart] = useState<CartItem[]>(dummyCartItems);
  const [products, setProducts] = useState<Product[]>(dummyProducts);
  const [categories, setCategories] = useState<Category[]>(dummyCategories);
  const [brands, setBrands] = useState<Brand[]>(dummyBrands);
  const [orders, setOrders] = useState<Order[]>(dummyOrders);
  const [reviews, setReviews] = useState<Review[]>(dummyReviews);
  const [wishlist, setWishlist] = useState<Wishlist | null>(dummyWishlist);
  const [coupons, setCoupons] = useState<Coupon[]>(dummyCoupons);
  const [slideContents, setSlideContents] =
    useState<SlideContent[]>(dummySlideContents);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Here you would typically fetch data from an API or local storage
    // For now, we're using our dummy data, so we'll just set isLoading to false
    setIsLoading(false);
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        user,
        setUser,
        cart,
        setCart,
        products,
        setProducts,
        categories,
        setCategories,
        brands,
        setBrands,
        orders,
        setOrders,
        reviews,
        setReviews,
        wishlist,
        setWishlist,
        coupons,
        setCoupons,
        isLoading,
        setIsLoading,
        slideContents,
        setSlideContents,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalData = () => {
  const context = useContext(GlobalContext);
  if (context === undefined) {
    throw new Error("useGlobalData must be used within a GlobalDataProvider");
  }
  return context;
};
