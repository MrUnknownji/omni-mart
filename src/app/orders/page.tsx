"use client";
import { useState } from "react";
import { Package, Search, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import NavBar from "../components/navbar";
import Footer from "../components/footer";
import { useGlobalData } from "../Context/GlobalData";
import { OrderStatus } from "@/lib/types";
import { useRouter } from "next/navigation";

const statusStyles: Record<string, string> = {
  [OrderStatus.Pending]: "bg-muted/40 text-muted-foreground",
  [OrderStatus.Processing]: "bg-foreground/10 text-foreground",
  [OrderStatus.Shipped]: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  [OrderStatus.Delivered]: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  [OrderStatus.Cancelled]: "bg-destructive/10 text-destructive",
};

export default function AllOrdersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const { orders } = useGlobalData();
  const router = useRouter();

  const filteredOrders = orders.filter(
    (order) =>
      order.orderId.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (statusFilter === "all" || order.status === statusFilter)
  );

  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-background">
        <div className="max-w-5xl mx-auto px-6 lg:px-12 py-12 lg:py-20">
          <div className="mb-10 pb-4 border-b border-border/40">
            <h1 className="text-3xl font-light tracking-tight">Your Orders</h1>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search by order ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-11 h-11 bg-muted/20 border-border/40 focus-visible:ring-1 focus-visible:ring-foreground/20 text-sm"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px] h-11 bg-muted/20 border-border/40 text-sm">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="Processing">Processing</SelectItem>
                <SelectItem value="Shipped">Shipped</SelectItem>
                <SelectItem value="Delivered">Delivered</SelectItem>
                <SelectItem value="Returned">Returned</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Orders List */}
          <div className="space-y-3">
            {filteredOrders.length === 0 ? (
              <div className="py-20 text-center border border-border/40">
                <Package className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No orders found.</p>
              </div>
            ) : (
              filteredOrders.map((order) => (
                <div
                  key={order.orderId}
                  className="group flex items-center justify-between p-6 bg-muted/10 border border-border/40 hover:border-foreground/20 transition-colors cursor-pointer"
                  onClick={() => router.push(`/orders/${order.orderId}`)}
                >
                  <div className="flex items-center gap-5">
                    <div className="h-12 w-12 bg-muted/30 flex items-center justify-center text-muted-foreground shrink-0">
                      <Package className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-medium tracking-wide text-sm">
                        Order #{order.orderId.substring(0, 8).toUpperCase()}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-1">
                        {new Date(order.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right hidden sm:block">
                      <p className="font-medium text-sm">${order.total.toFixed(2)}</p>
                      <span
                        className={`mt-1 inline-block text-xs font-medium px-2 py-0.5 uppercase tracking-wider ${statusStyles[order.status] ?? "bg-muted/30"}`}
                      >
                        {order.status}
                      </span>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
