"use client";
import { ChevronLeft, Package, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge, BadgeProps } from "@/components/ui/badge";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Order, OrderItem, OrderStatus } from "@/lib/types";
import { useGlobalData } from "@/app/Context/GlobalData";
import { useRouter } from "next/navigation";

export default function OrderDetailPage({
  params,
}: {
  params: { orderItemId: string };
}) {
  const [order, setOrder] = useState<Order>({} as Order);
  const { orders, user } = useGlobalData();
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (!orders.length) return;
    orders.find((order) => order.orderId === params.orderItemId)
      ? setOrder(
          orders.find((order) => order.orderId === params.orderItemId) as Order
        )
      : router.push("/404");

    if (order.items?.length) {
      setOrderItems(order.items);
    }
  }, [orders, router, params.orderItemId, order]);

  return (
    <div className="min-h-screen bg-muted/40 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-4xl">
        <Button
          variant="ghost"
          className="mb-6"
          onClick={() => router.push("/orders")}
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back to Orders
        </Button>
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl">
                  Order #{order.orderId}
                </CardTitle>
                <CardDescription>Placed on May 15, 2024</CardDescription>
              </div>
              <Badge
                variant={
                  order.status === OrderStatus.Processing
                    ? ("secondary" as BadgeProps["variant"])
                    : ("success" as BadgeProps["variant"])
                }
              >
                {order.status}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <h3 className="mb-2 font-semibold">Shipping Address</h3>
                <address className="not-italic text-muted-foreground">
                  {user?.name}
                  <br />
                  {user?.address?.street}
                  <br />
                  {user?.address?.city}
                  <br />
                  {user?.address?.state}
                </address>
              </div>
              <div>
                <h3 className="mb-2 font-semibold">Payment Method</h3>
                <p className="text-muted-foreground">Visa ending in 1234</p>
              </div>
            </div>
            <Separator className="my-6" />
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead className="text-right">Quantity</TableHead>
                  <TableHead className="text-right">Price</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orderItems?.map((item) => (
                  <TableRow key={item.orderId}>
                    <TableCell>{item.title}</TableCell>
                    <TableCell className="text-right">
                      {item.quantity}
                    </TableCell>
                    <TableCell className="text-right">${item.price}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Separator className="my-6" />
            <div className="space-y-2">
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
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>${order.total}</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline">
              <Package className="mr-2 h-4 w-4" />
              View Invoice
            </Button>
            <Button>
              <Truck className="mr-2 h-4 w-4" />
              Track Order
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
