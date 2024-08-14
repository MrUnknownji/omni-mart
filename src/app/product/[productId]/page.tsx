"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  ChevronLeft,
  Minus,
  Plus,
  ShoppingCart,
  Star,
  X,
  Check,
} from "lucide-react";
import { useGlobalData } from "@/app/Context/GlobalData";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CartItem, Product } from "@/lib/types";
import Footer from "../../components/footer";
import NavBar from "../../components/navbar";

// Mock reviews data (you would typically fetch this from an API)
export default function EnhancedProductDetail({
  params,
}: {
  params: { productId: string };
}) {
  const router = useRouter();
  const { toast } = useToast();
  const { products, setCart, reviews, isLoggedIn } = useGlobalData();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [userRating, setUserRating] = useState(0);
  const [userReview, setUserReview] = useState("");
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [product, setProduct] = useState<Product>({} as Product);

  // For demo purposes, use the first product from the context
  useEffect(() => {
    if (!products.length) return;
    products.find((product) => product.productId === params.productId)
      ? setProduct(
          products.find(
            (product) => product.productId === params.productId
          ) as Product
        )
      : router.push("/404");
  }, [products, params.productId, router]);

  // Mock function to check if user has bought the product
  const userHasBoughtProduct = true; // In a real app, this would be determined by checking order history

  // Mock function to generate multiple images (in a real scenario, these would come from the product data)
  const productImages = product.extraImages
    ? [product.image, ...product.extraImages]
    : [product.image];

  const handleQuantityChange = (change: number) => {
    setQuantity((prev) => Math.max(1, prev + change));
  };

  const handleAddToCart = () => {
    const newItem: CartItem = {
      cartItemId: product.productId,
      productId: product.productId,
      title: product.title,
      description: product.description,
      price: product.price,
      quantity: quantity,
      category: product.category,
      addedAt: new Date(),
      image: product.image,
    };

    setCart((prevCart: CartItem[]) => {
      const existingItemIndex = prevCart.findIndex(
        (item) => item.productId === product.productId
      );

      if (existingItemIndex > -1) {
        // If the item already exists in the cart, update its quantity
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex].quantity += quantity;
        return updatedCart;
      } else {
        // If it's a new item, add it to the cart
        return [...prevCart, newItem];
      }
    });

    toast({
      title: "Added to Cart",
      description: `${quantity} ${
        quantity > 1 ? "items" : "item"
      } added to your cart.`,
    });
  };

  const handleBuyNow = () => {
    if (isLoggedIn) {
      handleAddToCart();
      router.push("/checkout");
      return;
    }
    router.push("/login");
  };

  const handleSubmitReview = () => {
    // In a real app, you would send this data to your backend
    console.log("Submitting review:", {
      rating: userRating,
      comment: userReview,
    });
    toast({
      title: "Review Submitted",
      description: "Thank you for your feedback!",
    });
    setShowReviewForm(false);
    setUserRating(0);
    setUserReview("");
  };

  return (
    <>
      <NavBar />
      <div className="container mx-auto px-4 py-8">
        <Button variant="ghost" className="mb-4" onClick={() => router.back()}>
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <Card className="overflow-hidden">
          <CardContent className="p-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="flex flex-col items-center">
                <Carousel className="w-full max-w-md mx-auto h-full flex items-center justify-center">
                  <CarouselContent>
                    {productImages.map((image, index) => (
                      <CarouselItem key={index} className="flex justify-center">
                        <Image
                          src={image}
                          alt={`${product.title} - View ${index + 1}`}
                          width={400}
                          height={400}
                          className="h-auto max-w-full rounded-lg object-cover cursor-pointer"
                          onClick={() => setSelectedImage(image)}
                        />
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <div className="flex justify-center mt-4">
                    <CarouselPrevious />
                    <CarouselNext />
                  </div>
                </Carousel>
              </div>
              <div className="flex flex-col justify-between">
                <div>
                  <h1 className="mb-2 text-3xl font-bold">{product.title}</h1>
                  <p className="mb-4 text-2xl font-semibold text-primary">
                    ${product.price?.toFixed(2)}
                  </p>
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < Math.round(4.5)
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                    <span className="ml-2 text-sm text-muted-foreground">
                      (4.5 out of 5 stars, 123 reviews)
                    </span>
                  </div>
                  <Separator className="my-4" />
                  <p className="mb-4 text-muted-foreground">
                    {product.description}
                  </p>
                  <div className="mb-4">
                    <span className="font-semibold">Category:</span>{" "}
                    {product.category}
                  </div>
                  <div className="mb-4">
                    <span className="font-semibold">Brand:</span>{" "}
                    {product.brand}
                  </div>
                  <div className="mb-4">
                    <span className="font-semibold">Availability:</span>
                    <span className="ml-2 inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                      <Check className="mr-1 h-3 w-3" /> In Stock
                    </span>
                  </div>
                  <Alert className="mb-4">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Free Shipping</AlertTitle>
                    <AlertDescription>
                      Orders over $50 qualify for free shipping.
                    </AlertDescription>
                  </Alert>
                </div>
                <div>
                  <div className="mb-4 flex items-center">
                    <span className="mr-4 font-semibold">Quantity:</span>
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => handleQuantityChange(-1)}
                      disabled={quantity <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="mx-4 text-xl font-semibold">
                      {quantity}
                    </span>
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => handleQuantityChange(1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex gap-4">
                    <Button
                      className="flex-1"
                      disabled={!isLoggedIn}
                      onClick={handleAddToCart}
                    >
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Add to Cart
                    </Button>
                    <Button
                      className="flex-1"
                      variant="secondary"
                      onClick={handleBuyNow}
                    >
                      Buy Now
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-8">
          <CardContent className="p-6">
            <Tabs defaultValue="description">
              <TabsList>
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="specifications">Specifications</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>
              <TabsContent value="description">
                <h2 className="text-2xl font-bold mb-4">Product Description</h2>
                <p>{product.description}</p>
                {/* Add more detailed description here */}
              </TabsContent>
              <TabsContent value="specifications">
                <h2 className="text-2xl font-bold mb-4">Specifications</h2>
                <ul className="list-disc pl-5">
                  <li>Specification 1</li>
                  <li>Specification 2</li>
                  <li>Specification 3</li>
                  {/* Add more specifications */}
                </ul>
              </TabsContent>
              <TabsContent value="reviews">
                <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>
                <div className="mb-6">
                  <div className="flex items-center mb-2">
                    <span className="text-3xl font-bold mr-2">4.5</span>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${
                            i < Math.round(4.5)
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-muted-foreground">
                      Based on 123 reviews
                    </span>
                  </div>
                  <div className="space-y-1">
                    {[5, 4, 3, 2, 1].map((rating) => (
                      <div key={rating} className="flex items-center">
                        <span className="text-sm mr-2">{rating} star</span>
                        <Progress
                          value={rating * 20}
                          className="w-full max-w-xs"
                        />
                        <span className="text-sm ml-2">{rating * 20}%</span>
                      </div>
                    ))}
                  </div>
                </div>
                {userHasBoughtProduct && !showReviewForm && (
                  <Button
                    onClick={() => setShowReviewForm(true)}
                    className="mb-4"
                  >
                    Write a Review
                  </Button>
                )}
                {showReviewForm && (
                  <Card className="mb-6">
                    <CardContent className="p-4">
                      <h3 className="text-lg font-semibold mb-2">
                        Write Your Review
                      </h3>
                      <div className="mb-4">
                        <Label htmlFor="rating">Your Rating</Label>
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`h-6 w-6 cursor-pointer ${
                                star <= userRating
                                  ? "text-yellow-400 fill-yellow-400"
                                  : "text-gray-300"
                              }`}
                              onClick={() => setUserRating(star)}
                            />
                          ))}
                        </div>
                      </div>
                      <div className="mb-4">
                        <Label htmlFor="review">Your Review</Label>
                        <Textarea
                          id="review"
                          placeholder="Write your review here..."
                          value={userReview}
                          onChange={(e) => setUserReview(e.target.value)}
                        />
                      </div>
                      <Button onClick={handleSubmitReview}>
                        Submit Review
                      </Button>
                    </CardContent>
                  </Card>
                )}
                {reviews.map((review) => (
                  <div key={review.reviewId} className="mb-4">
                    <div className="flex items-center mb-2">
                      <Avatar className="h-10 w-10 mr-2">
                        <AvatarImage
                          src={`https://api.dicebear.com/6.x/initials/svg?seed=${review.reviewId}`}
                          alt={review.reviewId /* review author name*/}
                        />
                        <AvatarFallback>{/* review author */}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold">{/* review author */}</p>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < review.rating
                                  ? "text-yellow-400 fill-yellow-400"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-muted-foreground">{review.comment}</p>
                    <Separator className="my-4" />
                  </div>
                ))}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Dialog
          open={!!selectedImage}
          onOpenChange={() => setSelectedImage(null)}
        >
          <DialogTitle>Product Image</DialogTitle>
          <DialogContent className="max-w-3xl">
            <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </DialogClose>
            {selectedImage && (
              <Image
                src={selectedImage}
                alt="Product image"
                width={800}
                height={800}
                className="w-full h-auto object-contain"
              />
            )}
          </DialogContent>
        </Dialog>
      </div>
      <Footer />
    </>
  );
}
