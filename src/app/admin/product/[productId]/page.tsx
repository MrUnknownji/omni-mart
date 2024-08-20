"use client";
import React, { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  ArrowLeft,
  Edit,
  Trash,
  Archive,
  Package,
  DollarSign,
  BarChart3,
  Star,
  X,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ProductStatus } from "@/lib/types";
import { useGlobalData } from "@/app/Context/GlobalData";

// Dummy data for sales chart
const salesData = [
  { month: "Jan", sales: 40 },
  { month: "Feb", sales: 30 },
  { month: "Mar", sales: 45 },
  { month: "Apr", sales: 50 },
  { month: "May", sales: 35 },
  { month: "Jun", sales: 60 },
];

const ProductInfoPage = () => {
  const router = useRouter();
  const params = useParams();
  const { products } = useGlobalData();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const productId = params?.productId as string;
  const product = products.find((p) => p.productId === productId);

  if (!product) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Card className="w-[300px]">
          <CardHeader>
            <CardTitle>Product Not Found</CardTitle>
          </CardHeader>
          <CardContent>
            <p>The requested product could not be found.</p>
          </CardContent>
          <CardFooter>
            <Button onClick={() => router.back()}>Go Back</Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  const handleEdit = () => {
    router.push(`/admin/product/${product.productId}/edit`);
  };

  const handleDelete = () => {
    console.log("Delete product:", product.productId);
  };

  const handleArchive = () => {
    console.log("Archive product:", product.productId);
  };

  const formatDate = (date: Date) => {
    return date.toISOString().split("T")[0];
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <Button variant="ghost" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Products
        </Button>
        <h1 className="text-3xl font-bold">{product.title}</h1>
      </div>

      <Separator />
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Product Details</CardTitle>
            <CardDescription>{product.description}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2 sm:col-span-1">
                <Dialog>
                  <DialogTrigger asChild>
                    <div className="aspect-square relative cursor-pointer overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                      <Image
                        src={product.image}
                        alt={product.title}
                        layout="fill"
                        objectFit="cover"
                        className="transform hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </DialogTrigger>
                  <DialogContent className="p-0 overflow-hidden w-[800px] h-[600px] max-w-[90vw] max-h-[90vh]">
                    <div className="relative w-full h-full">
                      <Image
                        src={selectedImage || product.image}
                        alt={product.title}
                        layout="fill"
                        objectFit="contain"
                      />
                      <DialogTrigger asChild>
                        <Button
                          className="absolute top-2 right-2 z-10"
                          variant="secondary"
                          size="icon"
                          onClick={() => setSelectedImage(null)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
              {product.extraImages && product.extraImages.length > 0 ? (
                <div className="col-span-2 sm:col-span-1 grid grid-cols-3 gap-2">
                  {product.extraImages.map((img, index) => (
                    <Dialog key={index}>
                      <DialogTrigger asChild>
                        <div
                          className="aspect-square relative cursor-pointer overflow-hidden rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
                          onClick={() => setSelectedImage(img)}
                        >
                          <Image
                            src={img}
                            alt={`${product.title} - ${index + 1}`}
                            layout="fill"
                            objectFit="cover"
                            className="transform hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      </DialogTrigger>
                      <DialogContent className="p-0 overflow-hidden w-[800px] h-[600px] max-w-[90vw] max-h-[90vh]">
                        <div className="relative w-full h-full">
                          <Image
                            src={img}
                            alt={`${product.title} - ${index + 1}`}
                            layout="fill"
                            objectFit="contain"
                          />
                        </div>
                        <DialogTrigger asChild>
                          <Button
                            className="absolute top-2 right-2 z-10"
                            variant="secondary"
                            size="icon"
                            onClick={() => setSelectedImage(null)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                      </DialogContent>
                    </Dialog>
                  ))}
                </div>
              ) : (
                <div className="col-span-2 sm:col-span-1 space-y-4">
                  <div className="flex items-center space-x-2">
                    <DollarSign className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Price</p>
                      <p className="text-2xl font-bold">
                        ${product.price.toFixed(2)}
                      </p>
                      {product.salePrice && (
                        <p className="text-sm text-muted-foreground line-through">
                          ${product.salePrice.toFixed(2)}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Package className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Stock</p>
                      <p className="text-2xl font-bold">{product.stock}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <BarChart3 className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">SKU</p>
                      <p className="text-lg">{product.sku}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Star className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Status</p>
                      <Badge
                        variant={
                          product.status === ProductStatus.Active
                            ? "default"
                            : "secondary"
                        }
                      >
                        {product.status}
                      </Badge>
                    </div>
                  </div>
                </div>
              )}
            </div>
            {product.extraImages && product.extraImages.length > 0 && (
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <DollarSign className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Price</p>
                    <p className="text-2xl font-bold">
                      ${product.price.toFixed(2)}
                    </p>
                    {product.salePrice && (
                      <p className="text-sm text-muted-foreground line-through">
                        ${product.salePrice.toFixed(2)}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Package className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Stock</p>
                    <p className="text-2xl font-bold">{product.stock}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <BarChart3 className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">SKU</p>
                    <p className="text-lg">{product.sku}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Star className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Status</p>
                    <Badge
                      variant={
                        product.status === ProductStatus.Active
                          ? "default"
                          : "secondary"
                      }
                    >
                      {product.status}
                    </Badge>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter>
            <div className="flex justify-between w-full space-x-4">
              <Button onClick={handleEdit} className="flex-1">
                <Edit className="mr-2 h-4 w-4" /> Edit
              </Button>
              <Button
                variant="secondary"
                onClick={handleArchive}
                className="flex-1"
              >
                <Archive className="mr-2 h-4 w-4" /> Archive
              </Button>
              <Button
                variant="destructive"
                onClick={handleDelete}
                className="flex-1"
              >
                <Trash className="mr-2 h-4 w-4" /> Delete
              </Button>
            </div>
          </CardFooter>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Product Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="sales">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="sales">Sales</TabsTrigger>
                  <TabsTrigger value="reviews">Reviews</TabsTrigger>
                </TabsList>
                <TabsContent value="sales" className="space-y-4">
                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={salesData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="sales" stroke="#8884d8" />
                    </LineChart>
                  </ResponsiveContainer>
                </TabsContent>
                <TabsContent value="reviews">
                  <div className="flex items-center justify-between">
                    <div className="text-center">
                      <p className="text-2xl font-bold">
                        {product.rating.toFixed(1)}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Average Rating
                      </p>
                    </div>
                    <Separator orientation="vertical" className="h-12" />
                    <div className="text-center">
                      <p className="text-2xl font-bold">
                        {product.reviewCount}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Total Reviews
                      </p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Additional Information</CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="divide-y divide-gray-100">
                <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6">Category</dt>
                  <dd className="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0">
                    {product.category}
                  </dd>
                </div>
                <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6">Brand</dt>
                  <dd className="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0">
                    {product.brand}
                  </dd>
                </div>
                <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6">Created At</dt>
                  <dd className="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0">
                    {formatDate(product.createdAt)}
                  </dd>
                </div>
                <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6">
                    Last Updated
                  </dt>
                  <dd className="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0">
                    {formatDate(product.updatedAt)}
                  </dd>
                </div>
              </dl>
            </CardContent>
          </Card>
        </div>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Package className="mr-2 h-5 w-5" />
            Manage Inventory
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-lg font-semibold">Current Stock Level</p>
              <p className="text-3xl font-bold">{product.stock}</p>
            </div>
            <div>
              {product.stock < 10 ? (
                <Alert variant="destructive" className="max-w-md">
                  <AlertTitle>Low Stock Alert</AlertTitle>
                  <AlertDescription>
                    Stock level is critically low. Consider restocking soon.
                  </AlertDescription>
                </Alert>
              ) : product.stock < 50 ? (
                <Alert variant="destructive" className="max-w-md">
                  <AlertTitle>Stock Warning</AlertTitle>
                  <AlertDescription>
                    Stock level is getting low. Plan for restocking.
                  </AlertDescription>
                </Alert>
              ) : (
                <Alert variant="default" className="max-w-md">
                  <AlertTitle>Stock Status</AlertTitle>
                  <AlertDescription>
                    Current stock level is sufficient.
                  </AlertDescription>
                </Alert>
              )}
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full">Update Stock Level</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ProductInfoPage;
