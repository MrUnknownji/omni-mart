import {
  Address,
  Brand,
  CartItem,
  Category,
  Coupon,
  Order,
  OrderStatus,
  Product,
  ProductStatus,
  Review,
  SlideContent,
  User,
  Wishlist,
} from "@/lib/types";

export const dummyAddress: Address = {
  street: "123 Main St",
  city: "Anytown",
  state: "State",
  country: "Country",
  postalCode: "12345",
};

export const dummyUser: User = {
  userId: "user1",
  firstName: "John",
  lastName: "Doe",
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

export const dummyProducts: Product[] = [
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
    status: ProductStatus.Active,
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
    status: ProductStatus.Archived,
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
    status: ProductStatus.Draft,
    createdAt: new Date("2023-03-15"),
    updatedAt: new Date("2023-06-20"),
  },
  {
    productId: "prod4",
    title: "Apple Watch Series 7",
    description:
      "The new Apple Watch Series 7 is the latest in Apple's line of high-performance smartwatches. It features a powerful processor, a large battery life, and a sleek design that makes it a great choice for fitness enthusiasts, professionals, and anyone looking for a reliable and stylish smartwatch.",
    price: 499,
    image: "/images/GettyImages-1177004878.jpg",
    category: "Smartwatch",
    brand: "Apple",
    stock: 50,
    sku: "APPLE-WATCH-001",
    rating: 4.5,
    reviewCount: 120,
    status: ProductStatus.Active,
    createdAt: new Date("2023-03-15"),
    updatedAt: new Date("2023-06-20"),
  },
  {
    productId: "prod5",
    title: "Sony Playstation 5",
    description:
      "The new Sony Playstation 5 is the latest in Sony's line of high-performance gaming consoles. It features a powerful processor, a large battery life, and a sleek design that makes it a great choice for gamers, professionals, and anyone looking for a reliable and stylish gaming console.",
    price: 499,
    image: "/images/GettyImages-1177004878.jpg",
    category: "Gaming Console",
    brand: "Sony",
    stock: 50,
    sku: "SONY-PLAYSTATION-001",
    rating: 4.5,
    reviewCount: 120,
    status: ProductStatus.Active,
    createdAt: new Date("2023-03-15"),
    updatedAt: new Date("2023-06-20"),
  },
  {
    productId: "prod6",
    title: "Apple iPhone 14",
    description:
      "The new Apple iPhone 14 is the latest in Apple's line of high-performance smartphones. It features a powerful processor, a large battery life, and a sleek design that makes it a great choice for tech enthusiasts, professionals, and anyone looking for a reliable and stylish smartphone.",
    price: 999,
    image: "/images/GettyImages-1177004878.jpg",
    category: "Smartphone",
    brand: "Apple",
    stock: 50,
    sku: "APPLE-IPHONE-001",
    rating: 4.5,
    reviewCount: 120,
    status: ProductStatus.Active,
    createdAt: new Date("2023-03-15"),
    updatedAt: new Date("2023-06-20"),
  },
];

export const dummyCartItems: CartItem[] = [
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
  {
    cartItemId: "cartItem2",
    productId: "prod4",
    title: "Apple Watch Series 7",
    description: "Latest Apple Watch Series 7",
    category: "Smartwatch",
    brand: "Apple",
    price: 499,
    quantity: 1,
    addedAt: new Date("2023-06-25"),
    image: "/images/GettyImages-1177004878.jpg",
    extraImages: [
      "/images/GettyImages-1177004878.jpg",
      "/images/grocery_cart.m3-w800-16-9.jpg",
    ],
  },
  {
    cartItemId: "cartItem3",
    productId: "prod5",
    title: "Sony Playstation 5",
    description: "Latest Sony Playstation 5",
    category: "Gaming Console",
    brand: "Sony",
    price: 499,
    quantity: 1,
    addedAt: new Date("2023-06-25"),
    image: "/images/GettyImages-1177004878.jpg",
    extraImages: [
      "/images/GettyImages-1177004878.jpg",
      "/images/grocery_cart.m3-w800-16-9.jpg",
    ],
  },
];

export const dummyCategories: Category[] = [
  {
    categoryId: "cat1",
    name: "Electronics",
    description: "Electronic devices and accessories",
    image: "/images/cms-tEuAQua5a4aZ7fOAiw.webp",
    parentCategoryId: null,
  },
  {
    categoryId: "cat2",
    name: "Smartwatch",
    description: "Smartwatches and accessories",
    image: "/images/cms-tEuAQua5a4aZ7fOAiw.webp",
    parentCategoryId: "cat1",
  },
  {
    categoryId: "cat3",
    name: "Gaming Console",
    description: "Gaming consoles and accessories",
    image: "/images/cms-tEuAQua5a4aZ7fOAiw.webp",
    parentCategoryId: "cat1",
  },
];

export const dummyBrands: Brand[] = [
  {
    brandId: "brand1",
    name: "TechBrand",
    description: "Innovative tech products",
    image: "/images/cms-tEuAQua5a4aZ7fOAiw.webp",
    website: "https://techbrand.com",
  },
  {
    brandId: "brand2",
    name: "Apple",
    description: "Innovative tech products",
    image: "/images/cms-tEuAQua5a4aZ7fOAiw.webp",
    website: "https://apple.com",
  },
  {
    brandId: "brand3",
    name: "Sony",
    description: "Innovative tech products",
    image: "/images/cms-tEuAQua5a4aZ7fOAiw.webp",
    website: "https://sony.com",
  },
  {
    brandId: "brand4",
    name: "HP",
    description: "Innovative tech products",
    image: "/images/cms-tEuAQua5a4aZ7fOAiw.webp",
    website: "https://hp.com",
  },
];

export const dummyOrders: Order[] = [
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
  {
    orderId: "order2",
    userId: "user1",
    status: OrderStatus.Processing,
    total: 999.99,
    subtotal: 899.99,
    shipping: 10,
    tax: 90,
    items: [
      {
        orderItemId: "orderItem2",
        orderId: "order2",
        productId: "prod2",
        title: "HP Spectre x360",
        price: 799,
        quantity: 1,
        image: "/images/cms-tEuAQua5a4aZ7fOAiw.webp",
        category: "Laptop",
        brand: "HP",
      },
      {
        orderItemId: "orderItem3",
        orderId: "order2",
        productId: "prod3",
        title: "Titan 342",
        price: 350,
        quantity: 1,
        image: "/images/cms-tEuAQua5a4aZ7fOAiw.webp",
        category: "Laptop",
        brand: "Titan",
      },
      {
        orderItemId: "orderItem4",
        orderId: "order2",
        productId: "prod4",
        title: "Apple Watch Series 7",
        price: 499,
        quantity: 1,
        image: "/images/GettyImages-1177004878.jpg",
        category: "Smartwatch",
        brand: "Apple",
      },
      {
        orderItemId: "orderItem5",
        orderId: "order2",
        productId: "prod5",
        title: "Sony Playstation 5",
        price: 499,
        quantity: 1,
        image: "/images/GettyImages-1177004878.jpg",
        category: "Gaming Console",
        brand: "Sony",
      },
    ],
    shippingAddress: dummyAddress,
    billingAddress: dummyAddress,
    paymentMethod: "Credit Card",
    createdAt: new Date("2023-06-25"),
    updatedAt: new Date("2023-06-26"),
  },
];

export const dummyReviews: Review[] = [
  {
    reviewId: "review1",
    productId: "prod1",
    userId: "user1",
    rating: 5,
    comment: "Great product! Highly recommended.",
    createdAt: new Date("2023-06-30"),
    updatedAt: new Date("2023-06-30"),
  },
  {
    reviewId: "review2",
    productId: "prod1",
    userId: "user1",
    rating: 1,
    comment: "Okay product. Not recommended.",
    createdAt: new Date("2023-06-30"),
    updatedAt: new Date("2023-06-30"),
  },
  {
    reviewId: "review3",
    productId: "prod2",
    userId: "user1",
    rating: 4,
    comment: "Great product! Highly recommended.",
    createdAt: new Date("2023-06-30"),
    updatedAt: new Date("2023-06-30"),
  },
  {
    reviewId: "review4",
    productId: "prod1",
    userId: "user1",
    rating: 3,
    comment: "Design is good. Quality is okay. You can try it.",
    createdAt: new Date("2023-06-30"),
    updatedAt: new Date("2023-06-30"),
  },
  {
    reviewId: "review5",
    productId: "prod1",
    userId: "user1",
    rating: 3,
    comment: "It is okay. You can try it.",
    createdAt: new Date("2023-06-30"),
    updatedAt: new Date("2023-06-30"),
  },
  {
    reviewId: "review6",
    productId: "prod2",
    userId: "user1",
    rating: 5,
    comment: "Damn, that Product is awesome! You should buy it.",
    createdAt: new Date("2023-06-30"),
    updatedAt: new Date("2023-06-30"),
  },
];

export const dummyWishlist: Wishlist = {
  wishlistId: "wishlist1",
  userId: "user1",
  products: ["prod1", "prod3"],
};

export const dummyCoupons: Coupon[] = [
  {
    couponId: "coupon1",
    code: "SUMMER20",
    discountType: "percentage",
    discountValue: 20,
    minPurchase: 100,
    expirationDate: new Date("2023-08-31"),
    usageLimit: 1000,
  },
  {
    couponId: "coupon2",
    code: "WINTER20",
    discountType: "percentage",
    discountValue: 20,
    minPurchase: 100,
    expirationDate: new Date("2023-08-31"),
    usageLimit: 1000,
  },
];

export const dummySlideContents: SlideContent[] = [
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
