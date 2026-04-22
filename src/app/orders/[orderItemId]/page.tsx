"use client";
import { ChevronLeft, Package, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState, use } from "react";
import { Order, OrderItem, OrderStatus } from "@/lib/types";
import { useGlobalData } from "@/app/Context/GlobalData";
import { useRouter } from "next/navigation";
import NavBar from "@/app/components/navbar";
import Footer from "@/app/components/footer";

const statusStyles: Record<string, string> = {
  [OrderStatus.Pending]: "bg-muted/40 text-muted-foreground",
  [OrderStatus.Processing]: "bg-foreground/10 text-foreground",
  [OrderStatus.Shipped]: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  [OrderStatus.Delivered]: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  [OrderStatus.Cancelled]: "bg-destructive/10 text-destructive",
};

export default function OrderDetailPage(
  props: {
    params: Promise<{ orderItemId: string }>;
  }
) {
  const params = use(props.params);
  const [order, setOrder] = useState<Order>({} as Order);
  const { orders, user } = useGlobalData();
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (!orders.length) return;
    const found = orders.find((o) => o.orderId === params.orderItemId);
    if (found) {
      setOrder(found);
    } else {
      router.push("/404");
    }
  }, [orders, router, params.orderItemId]);

  useEffect(() => {
    if (order.items?.length) {
      setOrderItems(order.items);
    }
  }, [order]);

  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-background">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 py-12 lg:py-20">
          <Button
            variant="ghost"
            className="mb-8 hover:bg-transparent hover:text-muted-foreground transition-colors -ml-2"
            onClick={() => router.push("/orders")}
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Orders
          </Button>

          {/* Order Header */}
          <div className="flex items-start justify-between mb-10 pb-4 border-b border-border/40">
            <div>
              <h1 className="text-3xl font-light tracking-tight">
                Order #{order.orderId?.substring(0, 8).toUpperCase()}
              </h1>
              <p className="text-sm text-muted-foreground mt-2">
                Placed on{" "}
                {order.createdAt
                  ? new Date(order.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  : "—"}
              </p>
            </div>
            {order.status && (
              <span
                className={`text-xs font-medium px-3 py-1.5 uppercase tracking-widest ${statusStyles[order.status] ?? "bg-muted/30"}`}
              >
                {order.status}
              </span>
            )}
          </div>

          {/* Info Grid */}
          <div className="grid gap-6 md:grid-cols-2 mb-10">
            <div className="border border-border/40 bg-muted/10 p-6">
              <h3 className="text-xs font-medium tracking-widest uppercase text-muted-foreground mb-4">Shipping Address</h3>
              <address className="not-italic text-sm space-y-1 text-foreground">
                <p className="font-medium">{user.firstName} {user?.lastName}</p>
                <p className="text-muted-foreground">{user?.address?.street}</p>
                <p className="text-muted-foreground">{user?.address?.city}</p>
                <p className="text-muted-foreground">{user?.address?.state}</p>
              </address>
            </div>
            <div className="border border-border/40 bg-muted/10 p-6">
              <h3 className="text-xs font-medium tracking-widest uppercase text-muted-foreground mb-4">Payment Method</h3>
              <div className="flex items-center gap-3">
                <div className="h-9 w-14 bg-foreground text-background flex items-center justify-center text-xs font-bold tracking-widest">
                  VISA
                </div>
                <p className="text-sm text-muted-foreground">Visa ending in 1234</p>
              </div>
            </div>
          </div>

          {/* Items Table */}
          <div className="border border-border/40 bg-muted/10 mb-10">
            <div className="px-6 py-4 border-b border-border/40">
              <h3 className="text-xs font-medium tracking-widest uppercase text-muted-foreground">Order Items</h3>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="pl-6">Product</TableHead>
                  <TableHead className="text-right">Quantity</TableHead>
                  <TableHead className="text-right pr-6">Price</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orderItems?.map((item) => (
                  <TableRow key={item.orderId}>
                    <TableCell className="pl-6 font-medium text-sm">{item.title}</TableCell>
                    <TableCell className="text-right text-sm text-muted-foreground">
                      {item.quantity}
                    </TableCell>
                    <TableCell className="text-right pr-6 text-sm">${item.price}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Totals */}
          <div className="border border-border/40 bg-muted/10 p-6 space-y-3 text-sm mb-10">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span>${order.subtotal}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Shipping</span>
              <span>${order.shipping}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Tax</span>
              <span>${order.tax}</span>
            </div>
            <Separator className="my-2" />
            <div className="flex justify-between font-semibold text-base">
              <span>Total</span>
              <span>${order.total}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-4">
            <Button
              variant="outline"
              className="h-12 px-8 text-xs font-medium tracking-widest uppercase border-border/50 hover:bg-muted/20 transition-colors"
            >
              <Package className="mr-2 h-4 w-4" />
              View Invoice
            </Button>
            <Button className="h-12 px-8 text-xs font-medium tracking-widest uppercase bg-foreground text-background hover:bg-foreground/90 transition-all">
              <Truck className="mr-2 h-4 w-4" />
              Track Order
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
