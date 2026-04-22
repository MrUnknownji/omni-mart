"use client";
import { useState } from "react";
import Carousel from "./components/carousel";
import Footer from "./components/footer";
import NavBar from "./components/navbar";
import ProductCard from "./components/product-card";
import { useGlobalData } from "./Context/GlobalData";

export default function Home() {
  const { products, user, isLoggedIn } = useGlobalData();
  const [searchTerm, setSearchTerm] = useState("");
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <NavBar
        isSearch={true}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      <main className="flex-grow w-full">
        {/* Full width premium carousel */}
        <div className="w-full mb-16 lg:mb-24">
          <Carousel />
        </div>
        
        <div className="max-w-7xl mx-auto px-6 lg:px-12 mb-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-border/40 pb-6">
            <div>
              <p className="text-sm font-semibold tracking-widest text-muted-foreground uppercase mb-2">The Collection</p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-tight">
                {isLoggedIn ? `Curated for ${user.firstName}` : "New Arrivals"}
              </h2>
            </div>
            <p className="text-muted-foreground text-sm tracking-wide hidden md:block uppercase mt-4 md:mt-0">
              {filteredProducts.length} Pieces Available
            </p>
          </div>
          
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-16">
              {filteredProducts.map((product) => (
                <ProductCard key={product.productId} product={product} />
              ))}
            </div>
          ) : (
            <div className="py-24 text-center">
              <p className="text-muted-foreground text-lg font-light tracking-wide">No pieces match your search criteria.</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
