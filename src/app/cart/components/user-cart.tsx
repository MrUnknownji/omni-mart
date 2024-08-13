"use client";
import { Copy, ListFilter, Minus, Plus, Trash } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
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
import { useEffect, useState } from "react";
import { CartItem } from "@/lib/types";
import { useRouter } from "next/navigation";

export function UserCart({ searchTerm }: { searchTerm: string }) {
  const { cart, setCart, user } = useGlobalData();
  const [cartItems, setCartItems] = useState(cart);
  const [sortBy, setSortBy] = useState("name");
  const [activeTab, setActiveTab] = useState("all");
  const [filteredCartItems, setFilteredCartItems] = useState(cartItems);

  const router = useRouter();

  const handleQuantityChange = (index: number, change: number) => {
    const updatedCart = cartItems.map((item, i) =>
      i === index ? { ...item, quantity: item.quantity + change } : item
    );
    setCartItems(updatedCart);
    setCart(updatedCart);
  };

  const calculateSubtotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const shipping = 5.0;
  const taxRate = 0.1;

  const calculateTax = () => {
    return calculateSubtotal() * taxRate;
  };

  const handleDeleteItem = (index: number) => {
    const updatedCart = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedCart);
    setCart(updatedCart);
  };

  const sortCartItemsBy = (option: string) => {
    switch (option) {
      case "name":
        return (a: CartItem, b: CartItem) => a.title.localeCompare(b.title);
      case "price":
        return (a: CartItem, b: CartItem) => a.price - b.price;
      case "date":
        return (a: CartItem, b: CartItem) =>
          b.addedAt.getTime() - a.addedAt.getTime();
      default:
        return (a: CartItem, b: CartItem) => a.title.localeCompare(b.title);
    }
  };

  useEffect(() => {
    setFilteredCartItems(filteredCartItems.sort(sortCartItemsBy(sortBy)));
  }, [sortBy, filteredCartItems]);

  useEffect(() => {
    const isValidTab = (item: CartItem) => {
      const now = Date.now();
      if (activeTab === "week") {
        const diff = now - item.addedAt.getTime();
        const days = diff / (1000 * 60 * 60 * 24);
        return days <= 7;
      } else if (activeTab === "month") {
        const diff = now - item.addedAt.getTime();
        const days = diff / (1000 * 60 * 60 * 24);
        return days <= 30;
      } else {
        return true;
      }
    };
    setFilteredCartItems(
      cartItems.filter(
        (item) =>
          isValidTab(item) &&
          item.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, activeTab, cartItems]);

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <div className="flex flex-col sm:gap-4 sm:py-4">
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
          <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
            <Tabs
              defaultValue={activeTab}
              onValueChange={(value) => setActiveTab(value)}
            >
              <div className="flex items-center">
                <TabsList>
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="month">Month</TabsTrigger>
                  <TabsTrigger value="week">Week</TabsTrigger>
                </TabsList>
                <div className="ml-auto flex items-center gap-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-7 gap-1 text-sm"
                      >
                        <ListFilter className="h-3.5 w-3.5" />
                        <span className="sr-only sm:not-sr-only">Sort by</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Sort by</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuRadioGroup
                        value={sortBy}
                        onValueChange={(value) => setSortBy(value)}
                      >
                        <DropdownMenuRadioItem value="name">
                          Name
                        </DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="price">
                          Price
                        </DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="date">
                          Date
                        </DropdownMenuRadioItem>
                      </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              <TabsContent value={activeTab}>
                <Card x-chunk="dashboard-05-chunk-3">
                  <CardHeader className="px-7">
                    <CardTitle>Items</CardTitle>
                    <CardDescription>
                      Items you have added to your cart.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Product</TableHead>
                          <TableHead className="hidden sm:table-cell">
                            Category
                          </TableHead>
                          <TableHead className="hidden sm:table-cell">
                            Price/Item
                          </TableHead>
                          <TableHead className="hidden md:table-cell">
                            Quantity
                          </TableHead>
                          <TableHead className="text-right">Total</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredCartItems.map((item, index) => (
                          <TableRow key={index}>
                            <TableCell>
                              <div className="font-medium">{item.title}</div>
                              <div className="hidden text-sm text-muted-foreground md:inline">
                                {item.brand}
                              </div>
                            </TableCell>
                            <TableCell className="hidden sm:table-cell">
                              {item.category}
                            </TableCell>
                            <TableCell className="hidden sm:table-cell">
                              <Badge className="text-xs" variant="secondary">
                                ${item.price.toFixed(2)}
                              </Badge>
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                              <div className="flex items-center gap-2">
                                <Button
                                  size="icon"
                                  variant="outline"
                                  className="h-6 w-6"
                                  onClick={() =>
                                    handleQuantityChange(index, -1)
                                  }
                                  disabled={item.quantity <= 1}
                                >
                                  <Minus className="h-3.5 w-3.5" />
                                </Button>
                                {item.quantity}
                                <Button
                                  size="icon"
                                  variant="outline"
                                  className="h-6 w-6"
                                  onClick={() => handleQuantityChange(index, 1)}
                                >
                                  <Plus className="h-3.5 w-3.5" />
                                </Button>
                              </div>
                            </TableCell>
                            <TableCell className="text-right">
                              ${(item.price * item.quantity).toFixed(2)}
                            </TableCell>
                            <TableCell className="text-right">
                              <Button
                                size="icon"
                                variant="ghost"
                                onClick={() => handleDeleteItem(index)}
                              >
                                <Trash className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
          <div>
            <Card className="overflow-hidden" x-chunk="dashboard-05-chunk-4">
              <CardHeader className="flex flex-row items-start bg-muted/50">
                <div className="grid gap-0.5">
                  <CardTitle className="group flex items-center gap-2 text-lg">
                    Order
                    <Button
                      size="icon"
                      variant="outline"
                      className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
                    >
                      <Copy className="h-3 w-3" />
                      <span className="sr-only">Copy Order ID</span>
                    </Button>
                  </CardTitle>
                  <CardDescription>
                    Arrive on: November 23, 2023
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="p-6 text-sm">
                <div className="grid gap-3">
                  <div className="font-semibold">Order Details</div>
                  <ul className="grid gap-3">
                    {cartItems.map((item, index) => (
                      <li
                        key={index}
                        className="flex items-center justify-between"
                      >
                        <span className="text-muted-foreground">
                          {item.title} x <span>{item.quantity}</span>
                        </span>
                        <span>${(item.price * item.quantity).toFixed(2)}</span>
                      </li>
                    ))}
                  </ul>
                  <Separator className="my-2" />
                  <ul className="grid gap-3">
                    <li className="flex items-center justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>${calculateSubtotal().toFixed(2)}</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="text-muted-foreground">Shipping</span>
                      <span>${shipping.toFixed(2)}</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="text-muted-foreground">Tax</span>
                      <span>${calculateTax().toFixed(2)}</span>
                    </li>
                    <li className="flex items-center justify-between font-semibold">
                      <span className="text-muted-foreground">Total</span>
                      <span>
                        $
                        {(
                          calculateSubtotal() +
                          shipping +
                          calculateTax()
                        ).toFixed(2)}
                      </span>
                    </li>
                  </ul>
                </div>
                <Separator className="my-4" />
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-3">
                    <div className="font-semibold">Shipping Information</div>
                    <address className="grid gap-0.5 not-italic text-muted-foreground">
                      <span>{user.firstName + " " + user?.lastName}</span>
                      <span>{user?.address?.city}</span>
                    </address>
                  </div>
                  <div className="grid auto-rows-max gap-3">
                    <div className="font-semibold">Billing Information</div>
                    <div className="text-muted-foreground">
                      Same as shipping address
                    </div>
                  </div>
                </div>
                <Separator className="my-4" />
                <div className="grid gap-3">
                  <div className="font-semibold">Customer Information</div>
                  <dl className="grid gap-3">
                    <div className="flex items-center justify-between">
                      <dt className="text-muted-foreground">Customer</dt>
                      <dd>{user.firstName + " " + user?.lastName}</dd>
                    </div>
                    <div className="flex items-center justify-between">
                      <dt className="text-muted-foreground">Email</dt>
                      <dd>
                        <a href={`mailto:${user?.email}`}>{user?.email}</a>
                      </dd>
                    </div>
                    <div className="flex items-center justify-between">
                      <dt className="text-muted-foreground">Phone</dt>
                      <dd>
                        <a href={`tel:${user?.phone}`}>{user?.phone}</a>
                      </dd>
                    </div>
                  </dl>
                </div>
                <Separator className="my-4" />
                <div className="grid gap-3">
                  <Button
                    size="sm"
                    variant="default"
                    className="w-full text-sm"
                    onClick={() => router.push("/checkout")}
                  >
                    Checkout
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
