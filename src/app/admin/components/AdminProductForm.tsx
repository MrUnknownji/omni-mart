"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useGlobalData } from "@/app/Context/GlobalData";
import { Product, ProductStatus, Category, Brand } from "@/lib/types";
import Image from "next/image";
import { Camera, X, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";

export default function AdminProductForm({
  productId,
}: {
  productId?: string;
}) {
  const router = useRouter();
  const { products, categories, brands, setProducts } = useGlobalData();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [product, setProduct] = useState<Product>({
    productId: "",
    title: "",
    description: "",
    price: 0,
    salePrice: undefined,
    image: "",
    extraImages: [],
    category: "",
    brand: "",
    stock: 0,
    sku: "",
    rating: 0,
    reviewCount: 0,
    status: ProductStatus.Draft,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  useEffect(() => {
    if (productId) {
      const existingProduct = products.find((p) => p.productId === productId);
      if (existingProduct) {
        setProduct(existingProduct);
      }
    }
  }, [productId, products]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string) => (value: string) => {
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleSwitchChange = (name: string) => (checked: boolean) => {
    setProduct((prev) => ({
      ...prev,
      [name]: checked ? ProductStatus.Active : ProductStatus.Draft,
    }));
  };

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    isMainImage: boolean
  ) => {
    const files = e.target.files;
    if (files) {
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          if (isMainImage) {
            setProduct((prev) => ({ ...prev, image: reader.result as string }));
          } else {
            setProduct((prev) => ({
              ...prev,
              extraImages: [
                ...(prev.extraImages || []),
                reader.result as string,
              ],
            }));
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeExtraImage = (index: number) => {
    setProduct((prev) => ({
      ...prev,
      extraImages: prev.extraImages?.filter((_, i) => i !== index) || [],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      if (productId) {
        setProducts((prev) =>
          prev.map((p) => (p.productId === productId ? product : p))
        );
        setSuccess("Product updated successfully!");
      } else {
        const newProduct = { ...product, productId: Date.now().toString() };
        setProducts((prev) => [...prev, newProduct]);
        setSuccess("Product added successfully!");
      }
      router.push("/admin/products");
    } catch (err) {
      setError("Failed to save product. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>
            {productId ? "Edit Product" : "Add New Product"}
          </CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="title">Product Title</Label>
                <Input
                  id="title"
                  name="title"
                  value={product.title}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sku">SKU</Label>
                <Input
                  id="sku"
                  name="sku"
                  value={product.sku}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={product.description}
                onChange={handleInputChange}
                required
                className="min-h-[100px]"
              />
            </div>

            <Separator />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="price">Price</Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  value={product.price}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="salePrice">Sale Price</Label>
                <Input
                  id="salePrice"
                  name="salePrice"
                  type="number"
                  value={product.salePrice || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="stock">Stock</Label>
                <Input
                  id="stock"
                  name="stock"
                  type="number"
                  value={product.stock}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  name="category"
                  value={product.category}
                  onValueChange={handleSelectChange("category")}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category: Category) => (
                      <SelectItem
                        key={category.categoryId}
                        value={category.categoryId}
                      >
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="brand">Brand</Label>
                <Select
                  name="brand"
                  value={product.brand}
                  onValueChange={handleSelectChange("brand")}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a brand" />
                  </SelectTrigger>
                  <SelectContent>
                    {brands.map((brand: Brand) => (
                      <SelectItem key={brand.brandId} value={brand.brandId}>
                        {brand.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <Label>Product Images</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="mainImage">Main Image</Label>
                  <div className="relative h-48 bg-muted rounded-md overflow-hidden">
                    {product.image ? (
                      <Image
                        src={product.image}
                        alt="Main product image"
                        layout="fill"
                        objectFit="cover"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <Camera className="h-12 w-12 text-muted-foreground" />
                      </div>
                    )}
                    <Input
                      id="mainImage"
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageChange(e, true)}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Extra Images</Label>
                  <div className="grid grid-cols-3 gap-2">
                    {product.extraImages?.map((img, index) => (
                      <div
                        key={index}
                        className="relative h-24 bg-muted rounded-md overflow-hidden"
                      >
                        <Image
                          src={img}
                          alt={`Extra image ${index + 1}`}
                          layout="fill"
                          objectFit="cover"
                        />
                        <Button
                          type="button"
                          onClick={() => removeExtraImage(index)}
                          className="absolute top-1 right-1 p-1"
                          size="icon"
                          variant="destructive"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    <div className="relative h-24 bg-muted rounded-md overflow-hidden flex items-center justify-center">
                      <Plus className="h-8 w-8 text-muted-foreground" />
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageChange(e, false)}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                        multiple
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            <div className="flex items-center space-x-2">
              <Switch
                id="status"
                checked={product.status === ProductStatus.Active}
                onCheckedChange={handleSwitchChange("status")}
              />
              <Label htmlFor="status">Active</Label>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => router.back()}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading
                ? "Saving..."
                : productId
                ? "Update Product"
                : "Add Product"}
            </Button>
          </CardFooter>
        </form>
      </Card>

      {error && (
        <Alert variant="destructive" className="mt-4 max-w-4xl mx-auto">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert className="mt-4 max-w-4xl mx-auto">
          <AlertDescription>{success}</AlertDescription>
        </Alert>
      )}
    </div>
  );
}
