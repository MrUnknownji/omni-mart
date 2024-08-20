"use client";

import { useState } from "react";
import { Trash2, ShoppingCart, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";

interface WishlistItem {
  id: number;
  name: string;
  price: number;
  image: string;
}

const initialWishlist: WishlistItem[] = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 129.99,
    image: "https://placehold.co/200x200?text=Headphones",
  },
  {
    id: 2,
    name: "Smartwatch",
    price: 199.99,
    image: "https://placehold.co/200x200?text=Smartwatch",
  },
  {
    id: 3,
    name: "Portable Charger",
    price: 49.99,
    image: "https://placehold.co/200x200?text=Charger",
  },
  {
    id: 4,
    name: "Bluetooth Speaker",
    price: 79.99,
    image: "https://placehold.co/200x200?text=Speaker",
  },
];

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState<WishlistItem[]>(initialWishlist);

  const removeFromWishlist = (id: number) => {
    setWishlist(wishlist.filter((item) => item.id !== id));
  };

  const getTotalPrice = () => {
    return wishlist.reduce((total, item) => total + item.price, 0).toFixed(2);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Wishlist</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {wishlist.map((item) => (
          <Card key={item.id} className="flex flex-col">
            <CardContent className="p-4">
              <div className="aspect-square relative mb-4">
                <Image
                  src={item.image}
                  alt={item.name}
                  className="object-cover rounded-md"
                  layout="fill"
                />
                <Badge className="absolute top-2 right-2">
                  <Heart className="w-4 h-4 mr-1" />
                  Wishlist
                </Badge>
              </div>
              <h3 className="text-lg font-semibold mb-2">{item.name}</h3>
              <p className="text-xl font-bold">${item.price.toFixed(2)}</p>
            </CardContent>
            <CardFooter className="flex justify-between mt-auto p-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => removeFromWishlist(item.id)}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Remove
              </Button>
              <Button size="sm">
                <ShoppingCart className="w-4 h-4 mr-2" />
                Add to Cart
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {wishlist.length > 0 ? (
        <div className="mt-12">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-4">Wishlist Summary</h2>
              <div className="flex justify-between items-center mb-4">
                <span>Total Items:</span>
                <span className="font-bold">{wishlist.length}</span>
              </div>
              <div className="flex justify-between items-center mb-6">
                <span>Total Value:</span>
                <span className="font-bold text-xl">${getTotalPrice()}</span>
              </div>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select action" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="add-all">Add All to Cart</SelectItem>
                  <SelectItem value="share">Share Wishlist</SelectItem>
                  <SelectItem value="clear">Clear Wishlist</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="text-center mt-12">
          <p className="text-xl">Your wishlist is empty.</p>
          <Button className="mt-4">Start Shopping</Button>
        </div>
      )}
    </div>
  );
}
