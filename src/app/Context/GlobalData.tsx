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
import Cookies from "js-cookie";
import { USER_API_URL } from "../API/API_DATA";
import useApi from "../API/useApi";

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const GlobalProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User>(dummyUser);
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
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { request } = useApi();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = Cookies.get("loginToken");
      if (token) {
        if (token === "dummy_user_token") {
          setIsLoggedIn(true);
          setUser(dummyUser);
          return;
        }
        try {
          setIsLoading(true);
          const userData = await request<User>(USER_API_URL, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUser(userData);
          setIsLoggedIn(true);
        } catch (err) {
          console.error("Failed to fetch user data:", err);
          if (err instanceof Error) {
            console.error("Error message:", err.message);
          }
          Cookies.remove("loginToken");
          setIsLoggedIn(false);
          setUser(dummyUser);
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoggedIn(false);
        setUser(dummyUser);
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [request]);

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
        isLoggedIn,
        setIsLoggedIn,
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
