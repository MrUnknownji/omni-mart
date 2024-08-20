"use client";
import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { File, MoreHorizontal, PlusCircle, Search } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGlobalData } from "@/app/Context/GlobalData";
import { ProductStatus } from "@/lib/types";

const ITEMS_PER_PAGE = 10;

export default function AdminProducts() {
  const router = useRouter();
  const { products } = useGlobalData();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesTab =
        activeTab === "all" ||
        (activeTab === "active" && product.status === ProductStatus.Active) ||
        (activeTab === "draft" && product.status === ProductStatus.Draft) ||
        (activeTab === "archived" && product.status === ProductStatus.Archived);
      return matchesSearch && matchesTab;
    });
  }, [products, searchTerm, activeTab]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );
  const formatDate = (date: Date) => {
    return date.toISOString().split("T")[0];
  };
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleProductClick = (productId: string) => {
    router.push(`/admin/product/${productId}`);
  };

  return (
    <div className="flex min-h-screen w-full flex-col">
      <div className="flex flex-col gap-4">
        <header className="sticky top-0 z-30 flex flex-col sm:flex-row items-center gap-4 border-b bg-background px-4 py-2 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6 justify-between">
          <div className="w-full sm:w-auto relative flex-1 md:grow-0">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <Button size="sm" variant="outline" className="h-8 gap-1">
              <File className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Export
              </span>
            </Button>
            <Button
              size="sm"
              className="h-8 gap-1"
              onClick={() => router.push("/admin/product/add")}
            >
              <PlusCircle className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Add Product
              </span>
            </Button>
          </div>
        </header>
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <TabsList className="w-full sm:w-auto">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="draft">Draft</TabsTrigger>
                <TabsTrigger value="archived">Archived</TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value={activeTab}>
              <Card>
                <CardHeader>
                  <CardTitle>Products</CardTitle>
                  <CardDescription>
                    Manage your products and view their sales performance.
                  </CardDescription>
                </CardHeader>
                <CardContent className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="hidden w-[100px] sm:table-cell">
                          <span className="sr-only">Image</span>
                        </TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="hidden md:table-cell">
                          Price
                        </TableHead>
                        <TableHead className="hidden md:table-cell">
                          Stock
                        </TableHead>
                        <TableHead className="hidden md:table-cell">
                          Created at
                        </TableHead>
                        <TableHead>
                          <span className="sr-only">Actions</span>
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paginatedProducts.map((product) => (
                        <TableRow
                          key={product.productId}
                          className="cursor-pointer"
                        >
                          <TableCell
                            className="hidden sm:table-cell"
                            onClick={() =>
                              handleProductClick(product.productId)
                            }
                          >
                            <Image
                              alt={product.title}
                              className="aspect-square rounded-md object-cover"
                              height="64"
                              src={product.image}
                              width="64"
                            />
                          </TableCell>
                          <TableCell
                            className="font-medium"
                            onClick={() =>
                              handleProductClick(product.productId)
                            }
                          >
                            {product.title}
                          </TableCell>
                          <TableCell
                            onClick={() =>
                              handleProductClick(product.productId)
                            }
                          >
                            <Badge
                              variant={
                                product.status == ProductStatus.Draft
                                  ? "outline"
                                  : product.status == ProductStatus.Archived
                                  ? "destructive"
                                  : "default"
                              }
                            >
                              {product.status}
                            </Badge>
                          </TableCell>
                          <TableCell
                            className="hidden md:table-cell"
                            onClick={() =>
                              handleProductClick(product.productId)
                            }
                          >
                            ${product.price.toFixed(2)}
                          </TableCell>
                          <TableCell
                            className="hidden md:table-cell"
                            onClick={() =>
                              handleProductClick(product.productId)
                            }
                          >
                            {product.stock}
                          </TableCell>
                          <TableCell
                            className="hidden md:table-cell"
                            onClick={() =>
                              handleProductClick(product.productId)
                            }
                          >
                            {formatDate(product.createdAt)}
                          </TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  aria-haspopup="true"
                                  size="icon"
                                  variant="ghost"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <MoreHorizontal className="h-4 w-4" />
                                  <span className="sr-only">Toggle menu</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem
                                  onClick={() =>
                                    router.push(
                                      `/admin/product/${product.productId}/edit`
                                    )
                                  }
                                >
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem>Delete</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
                <CardFooter className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-xs text-muted-foreground">
                    Showing{" "}
                    <strong>
                      {(currentPage - 1) * ITEMS_PER_PAGE + 1}-
                      {Math.min(
                        currentPage * ITEMS_PER_PAGE,
                        filteredProducts.length
                      )}
                    </strong>{" "}
                    of <strong>{filteredProducts.length}</strong> products
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                    >
                      Previous
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                    >
                      Next
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
}
