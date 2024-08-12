"use client";
import { useState } from "react";
import Carousel from "./components/carousel";
import Footer from "./components/footer";
import NavBar from "./components/navbar";
import ProductCard from "./components/product-card";
import { useGlobalData } from "./Context/GlobalData";

export default function Home() {
  const { products, user } = useGlobalData();
  const [searchTerm, setSearchTerm] = useState("");
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar
        isSearch={true}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      <main className="flex-grow w-full px-4 sm:px-6 lg:px-8">
        <Carousel />
        <h2 className="font-semibold mt-8 mb-6 text-2xl sm:text-3xl lg:text-4xl">
          Welcome, {user.firstName + " " + user?.lastName}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.productId} product={product} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
