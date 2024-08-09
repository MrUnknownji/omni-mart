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
    <div>
      <NavBar
        isSearch={true}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      <main className="w-screen">
        <Carousel />
        <h2 className="font-semi-bold ml-[5vw] mt-12 text-3xl">
          Welcome, {user?.name}
        </h2>
        <div className="grid grid-cols-3 gap-4 mt-4 w-[90%] mx-auto">
          {filteredProducts.map((product) => (
            <ProductCard key={product.productId} product={product} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
