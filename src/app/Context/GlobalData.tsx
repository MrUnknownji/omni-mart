"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";
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
  Address,
  OrderStatus,
  SlideContent,
} from "@/lib/types";

// Define the shape of our global context
interface GlobalContextType {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
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
}

// Create the context
const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

// Dummy data
const dummyAddress: Address = {
  street: "123 Main St",
  city: "Anytown",
  state: "State",
  country: "Country",
  postalCode: "12345",
};

const dummyUser: User = {
  userId: "user1",
  name: "John Doe",
  email: "john@example.com",
  password: "hashedpassword",
  profileImage:
    "https://w0.peakpx.com/wallpaper/502/1004/HD-wallpaper-iron-man-1-avengers-iron-man-marvel-tony-stark.jpg",
  address: dummyAddress,
  phone: "123-456-7890",
  cartId: "cart1",
  role: "customer",
  createdAt: new Date("2023-01-01"),
  updatedAt: new Date("2023-06-15"),
};

const dummyProducts: Product[] = [
  {
    productId: "prod1",
    title: "Smartphone X",
    description: "Latest smartphone with advanced features",
    price: 999.99,
    salePrice: 899.99,
    image: "/images/cms-tEuAQua5a4aZ7fOAiw.webp",
    category: "Electronics",
    brand: "TechBrand",
    extraImages: [
      "/images/GettyImages-1177004878.jpg",
      "/images/grocery_cart.m3-w800-16-9.jpg",
    ],
    stock: 50,
    sku: "TECH-SMART-001",
    rating: 4.5,
    reviewCount: 120,
    createdAt: new Date("2023-03-15"),
    updatedAt: new Date("2023-06-20"),
  },
  {
    productId: "prod2",
    title: "HP Spectre x360",
    description:
      "The new HP Spectre x360 is the latest in HP's line of high-performance laptops. It features a powerful processor, a large battery life, and a sleek design that makes it a great choice for students, professionals, and anyone looking for a reliable and stylish laptop.",
    price: 799,
    image: "/images/GettyImages-1177004878.jpg",
    category: "Laptop",
    brand: "HP",
    stock: 50,
    sku: "HP-SPECTRE-001",
    rating: 4.5,
    reviewCount: 120,
    createdAt: new Date("2023-03-15"),
    updatedAt: new Date("2023-06-20"),
  },
  {
    productId: "prod3",
    title: "Titan 342",
    description:
      "The new Titan 342 is the latest in Sony's line of high-performance laptops. It features a powerful processor, a large battery life, and a sleek design that makes it a great choice for students, professionals, and anyone looking for a reliable and stylish laptop.",
    price: 350,
    image: "/images/GettyImages-1177004878.jpg",
    category: "Laptop",
    brand: "Titan",
    stock: 50,
    sku: "TITAN-342-001",
    rating: 4.5,
    reviewCount: 120,
    createdAt: new Date("2023-03-15"),
    updatedAt: new Date("2023-06-20"),
  },
  // Add more dummy products here
];

const dummyCartItems: CartItem[] = [
  {
    cartItemId: "cartItem1",
    productId: "prod1",
    title: "Smartphone X",
    description: "Latest smartphone with advanced features",
    category: "Electronics",
    brand: "TechBrand",
    price: 999.99,
    quantity: 1,
    addedAt: new Date("2023-06-25"),
    image: "/images/cms-tEuAQua5a4aZ7fOAiw.webp",
    extraImages: [
      "/images/GettyImages-1177004878.jpg",
      "/images/grocery_cart.m3-w800-16-9.jpg",
    ],
  },
  // Add more dummy cart items here
];

const dummyCategories: Category[] = [
  {
    categoryId: "cat1",
    name: "Electronics",
    description: "Electronic devices and accessories",
    image: "/images/cms-tEuAQua5a4aZ7fOAiw.webp",
    parentCategoryId: null,
    // Set parentCategoryId to null for top-level categories
  },
  // Add more dummy categories here
];

const dummyBrands: Brand[] = [
  {
    brandId: "brand1",
    name: "TechBrand",
    description: "Innovative tech products",
    image: "/images/cms-tEuAQua5a4aZ7fOAiw.webp",
    website: "https://techbrand.com",
  },
  // Add more dummy brands here
];

const dummyOrders: Order[] = [
  {
    orderId: "order1",
    userId: "user1",
    status: OrderStatus.Processing,
    total: 999.99,
    subtotal: 899.99,
    shipping: 10,
    tax: 90,
    items: [
      {
        orderItemId: "orderItem1",
        orderId: "order1",
        productId: "prod1",
        title: "Smartphone X",
        price: 999.99,
        quantity: 1,
        image: "/images/cms-tEuAQua5a4aZ7fOAiw.webp",
        category: "Electronics",
        brand: "TechBrand",
      },
    ],
    shippingAddress: dummyAddress,
    billingAddress: dummyAddress,
    paymentMethod: "Credit Card",
    createdAt: new Date("2023-06-25"),
    updatedAt: new Date("2023-06-26"),
  },
  // Add more dummy orders here
];

const dummyReviews: Review[] = [
  {
    reviewId: "review1",
    productId: "prod1",
    userId: "user1",
    rating: 5,
    comment: "Great product! Highly recommended.",
    createdAt: new Date("2023-06-30"),
    updatedAt: new Date("2023-06-30"),
  },
  // Add more dummy reviews here
];

const dummyWishlist: Wishlist = {
  wishlistId: "wishlist1",
  userId: "user1",
  products: ["prod1"],
};

const dummyCoupons: Coupon[] = [
  {
    couponId: "coupon1",
    code: "SUMMER20",
    discountType: "percentage",
    discountValue: 20,
    minPurchase: 100,
    expirationDate: new Date("2023-08-31"),
    usageLimit: 1000,
  },
  // Add more dummy coupons here
];

const dummySlideContents: SlideContent[] = [
  {
    title: "Elevate Your Lifestyle",
    subtitle: "Discover premium products for the discerning shopper",
    imageSrc: "/images/cms-tEuAQua5a4aZ7fOAiw.webp",
  },
  {
    title: "Shop 'Til You Drop",
    subtitle: "Endless choices, unbeatable deals, delivered to your door",
    imageSrc: "/images/GettyImages-1177004878.jpg",
  },
  {
    title: "Your One-Stop Shop",
    subtitle: "From essentials to indulgences, we've got you covered",
    imageSrc: "/images/grocery_cart.m3-w800-16-9.jpg",
  },
];

// Create the provider component
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

// Custom hook to use the global context
export const useGlobalData = () => {
  const context = useContext(GlobalContext);
  if (context === undefined) {
    throw new Error("useGlobalData must be used within a GlobalDataProvider");
  }
  return context;
};
