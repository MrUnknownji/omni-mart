"use client";
import { useState } from "react";
import { User, Mail, Phone, MapPin, CreditCard, Package, Settings, LogOut, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import NavBar from "../components/navbar";
import { useGlobalData } from "../Context/GlobalData";
import { useRouter } from "next/navigation";
import { dummyUser } from "../Context/Data";
import Footer from "../components/footer";

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState<"profile" | "orders" | "payments" | "preferences">("profile");
  const [showAddPayment, setShowAddPayment] = useState(false);
  const [newCard, setNewCard] = useState({ number: "", expiry: "", cvv: "", name: "" });
  const { user, orders, setIsLoggedIn } = useGlobalData();
  const router = useRouter();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setIsEditing(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    router.push("/");
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <NavBar />
      <main className="flex-grow w-full max-w-7xl mx-auto px-6 lg:px-12 py-12 lg:py-20">
        
        <div className="flex flex-col lg:flex-row gap-16">
          {/* Sidebar */}
          <aside className="w-full lg:w-64 shrink-0">
            <div className="flex items-center gap-4 mb-10">
              <Avatar className="h-16 w-16 border-border/40">
                <AvatarImage
                  src={user?.profileImage ?? dummyUser.profileImage}
                  alt="User Avatar"
                />
                <AvatarFallback className="bg-muted/50 text-foreground">
                  {user?.firstName?.[0]}{user?.lastName?.[0]}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-xl font-medium tracking-tight">
                  {user?.firstName} {user?.lastName}
                </h2>
                <p className="text-sm text-muted-foreground">{user?.email}</p>
              </div>
            </div>

            <nav className="flex flex-col gap-2">
              <Button 
                variant="ghost" 
                className={`w-full justify-start h-12 text-sm tracking-wide ${activeTab === 'profile' ? 'bg-muted/30 font-medium' : 'text-muted-foreground hover:bg-muted/20'}`}
                onClick={() => setActiveTab("profile")}
              >
                <User className="mr-3 h-4 w-4" /> Account Details
              </Button>
              <Button 
                variant="ghost" 
                className={`w-full justify-start h-12 text-sm tracking-wide ${activeTab === 'orders' ? 'bg-muted/30 font-medium' : 'text-muted-foreground hover:bg-muted/20'}`}
                onClick={() => setActiveTab("orders")}
              >
                <Package className="mr-3 h-4 w-4" /> Order History
              </Button>
              <Button 
                variant="ghost" 
                className={`w-full justify-start h-12 text-sm tracking-wide ${activeTab === 'payments' ? 'bg-muted/30 font-medium' : 'text-muted-foreground hover:bg-muted/20'}`}
                onClick={() => setActiveTab("payments")}
              >
                <CreditCard className="mr-3 h-4 w-4" /> Payment Methods
              </Button>
              
              <Separator className="my-4 border-border/40" />
              
              <Button 
                variant="ghost" 
                className={`w-full justify-start h-12 text-sm tracking-wide ${activeTab === 'preferences' ? 'bg-muted/30 font-medium' : 'text-muted-foreground hover:bg-muted/20'}`}
                onClick={() => setActiveTab("preferences")}
              >
                <Settings className="mr-3 h-4 w-4" /> Preferences
              </Button>
              <Button 
                variant="ghost" 
                className="w-full justify-start h-12 text-sm tracking-wide text-destructive hover:bg-destructive/10 hover:text-destructive"
                onClick={handleLogout}
              >
                <LogOut className="mr-3 h-4 w-4" /> Sign Out
              </Button>
            </nav>
          </aside>

          {/* Main Content */}
          <div className="flex-1 max-w-3xl">
            {activeTab === "profile" && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center justify-between mb-8 pb-4 border-b border-border/40">
                  <h1 className="text-2xl font-light tracking-tight">Account Details</h1>
                  <Button 
                    variant="outline" 
                    className="h-9 px-4 text-xs font-medium tracking-widest uppercase border-border/50 hover:bg-muted/20 transition-colors"
                    onClick={() => setIsEditing(!isEditing)}
                  >
                    {isEditing ? "Cancel" : "Edit Details"}
                  </Button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <Label htmlFor="firstName" className="text-xs font-medium tracking-widest uppercase text-muted-foreground">First Name</Label>
                      <Input
                        id="firstName"
                        value={user?.firstName}
                        disabled={!isEditing}
                        className="h-12 bg-muted/20 border-border/40 focus-visible:ring-1 focus-visible:ring-foreground/20 transition-all text-sm"
                      />
                    </div>
                    <div className="space-y-3">
                      <Label htmlFor="lastName" className="text-xs font-medium tracking-widest uppercase text-muted-foreground">Last Name</Label>
                      <Input
                        id="lastName"
                        value={user?.lastName || ""}
                        disabled={!isEditing}
                        className="h-12 bg-muted/20 border-border/40 focus-visible:ring-1 focus-visible:ring-foreground/20 transition-all text-sm"
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="email" className="text-xs font-medium tracking-widest uppercase text-muted-foreground">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={user?.email}
                      disabled={!isEditing}
                      className="h-12 bg-muted/20 border-border/40 focus-visible:ring-1 focus-visible:ring-foreground/20 transition-all text-sm"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="phone" className="text-xs font-medium tracking-widest uppercase text-muted-foreground">Phone Number</Label>
                    <Input
                      id="phone"
                      value={user?.phone || ""}
                      disabled={!isEditing}
                      className="h-12 bg-muted/20 border-border/40 focus-visible:ring-1 focus-visible:ring-foreground/20 transition-all text-sm"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="address" className="text-xs font-medium tracking-widest uppercase text-muted-foreground">Default Shipping City</Label>
                    <Input
                      id="address"
                      value={user?.address?.city || ""}
                      disabled={!isEditing}
                      className="h-12 bg-muted/20 border-border/40 focus-visible:ring-1 focus-visible:ring-foreground/20 transition-all text-sm"
                    />
                  </div>

                  {isEditing && (
                    <div className="pt-6">
                      <Button type="submit" className="h-12 px-8 text-sm font-medium tracking-widest uppercase bg-foreground text-background hover:bg-foreground/90 transition-all">
                        Save Changes
                      </Button>
                    </div>
                  )}
                </form>
              </div>
            )}

            {activeTab === "orders" && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center justify-between mb-8 pb-4 border-b border-border/40">
                  <h1 className="text-2xl font-light tracking-tight">Order History</h1>
                </div>

                <div className="space-y-6">
                  {orders.length === 0 ? (
                    <p className="text-muted-foreground">You have no recent orders.</p>
                  ) : (
                    orders.map((order) => (
                      <div key={order.orderId} className="group flex items-center justify-between p-6 bg-muted/10 border border-border/40 hover:border-foreground/20 transition-colors cursor-pointer" onClick={() => router.push(`/orders/${order.orderId}`)}>
                        <div className="flex items-center gap-4">
                          <div className="h-12 w-12 bg-muted/30 flex items-center justify-center text-muted-foreground">
                            <Package className="h-5 w-5" />
                          </div>
                          <div>
                            <h3 className="font-medium tracking-wide">Order #{order.orderId.substring(0, 8).toUpperCase()}</h3>
                            <p className="text-sm text-muted-foreground mt-1">{new Date(order.createdAt).toLocaleDateString()}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-6">
                          <div className="text-right hidden sm:block">
                            <p className="font-medium">${order.total.toFixed(2)}</p>
                            <p className="text-sm text-muted-foreground mt-1 capitalize">{order.status}</p>
                          </div>
                          <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {activeTab === "payments" && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center justify-between mb-8 pb-4 border-b border-border/40">
                  <h1 className="text-2xl font-light tracking-tight">Payment Methods</h1>
                  <Button 
                    variant="outline" 
                    className="h-9 px-4 text-xs font-medium tracking-widest uppercase border-border/50 hover:bg-muted/20 transition-colors"
                    onClick={() => setShowAddPayment(!showAddPayment)}
                  >
                    {showAddPayment ? "Cancel" : "Add New"}
                  </Button>
                </div>

                <div className="space-y-4">
                  {showAddPayment && (
                    <div className="border border-border/40 bg-muted/10 p-6 space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
                      <h3 className="text-sm font-medium tracking-widest uppercase text-muted-foreground">Add Payment Method</h3>
                      <div className="space-y-3">
                        <div className="space-y-2">
                          <Label htmlFor="card-name" className="text-xs font-medium tracking-widest uppercase text-muted-foreground">Name on Card</Label>
                          <Input id="card-name" placeholder="John Doe" value={newCard.name} onChange={(e) => setNewCard({...newCard, name: e.target.value})} className="h-11 bg-muted/20 border-border/40 focus-visible:ring-1 focus-visible:ring-foreground/20 text-sm" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="card-number" className="text-xs font-medium tracking-widest uppercase text-muted-foreground">Card Number</Label>
                          <Input id="card-number" placeholder="1234 5678 9012 3456" value={newCard.number} onChange={(e) => setNewCard({...newCard, number: e.target.value})} className="h-11 bg-muted/20 border-border/40 focus-visible:ring-1 focus-visible:ring-foreground/20 text-sm font-mono" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="card-expiry" className="text-xs font-medium tracking-widest uppercase text-muted-foreground">Expiry Date</Label>
                            <Input id="card-expiry" placeholder="MM/YY" value={newCard.expiry} onChange={(e) => setNewCard({...newCard, expiry: e.target.value})} className="h-11 bg-muted/20 border-border/40 focus-visible:ring-1 focus-visible:ring-foreground/20 text-sm" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="card-cvv" className="text-xs font-medium tracking-widest uppercase text-muted-foreground">CVV</Label>
                            <Input id="card-cvv" placeholder="123" value={newCard.cvv} onChange={(e) => setNewCard({...newCard, cvv: e.target.value})} className="h-11 bg-muted/20 border-border/40 focus-visible:ring-1 focus-visible:ring-foreground/20 text-sm" />
                          </div>
                        </div>
                        <Button className="h-11 px-8 text-sm font-medium tracking-widest uppercase bg-foreground text-background hover:bg-foreground/90 transition-all" onClick={() => setShowAddPayment(false)}>
                          Save Card
                        </Button>
                      </div>
                    </div>
                  )}
                  <div className="flex items-center justify-between p-6 border border-border/40 bg-muted/10">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-16 bg-foreground text-background flex items-center justify-center text-xs font-bold tracking-widest">
                        VISA
                      </div>
                      <div>
                        <p className="font-medium tracking-wide">Visa ending in 1234</p>
                        <p className="text-sm text-muted-foreground mt-1">Expires 12/25</p>
                      </div>
                    </div>
                    <Button variant="ghost" className="text-muted-foreground hover:text-foreground hover:bg-transparent">
                      Remove
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between p-6 border border-border/40 bg-muted/10">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-16 bg-muted text-foreground flex items-center justify-center text-xs font-bold tracking-widest">
                        MC
                      </div>
                      <div>
                        <p className="font-medium tracking-wide">Mastercard ending in 5678</p>
                        <p className="text-sm text-muted-foreground mt-1">Expires 08/24</p>
                      </div>
                    </div>
                    <Button variant="ghost" className="text-muted-foreground hover:text-foreground hover:bg-transparent">
                      Remove
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "preferences" && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center justify-between mb-8 pb-4 border-b border-border/40">
                  <h1 className="text-2xl font-light tracking-tight">Preferences</h1>
                </div>

                <div className="space-y-8">
                  <div>
                    <h2 className="text-xs font-medium tracking-widest uppercase text-muted-foreground mb-4">Notifications</h2>
                    <div className="space-y-4">
                      {[
                        { label: "Order Updates", desc: "Receive emails when your order status changes" },
                        { label: "Promotions & Offers", desc: "Be the first to know about sales and exclusive deals" },
                        { label: "New Arrivals", desc: "Get notified when new products are added" },
                      ].map((item) => (
                        <div key={item.label} className="flex items-center justify-between p-4 border border-border/40 bg-muted/10">
                          <div>
                            <p className="font-medium text-sm tracking-wide">{item.label}</p>
                            <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
                          </div>
                          <input type="checkbox" defaultChecked className="h-4 w-4 accent-foreground" />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h2 className="text-xs font-medium tracking-widest uppercase text-muted-foreground mb-4">Display</h2>
                    <div className="space-y-4">
                      {[
                        { label: "Currency", value: "USD — US Dollar" },
                        { label: "Language", value: "English (US)" },
                        { label: "Region", value: "United States" },
                      ].map((item) => (
                        <div key={item.label} className="flex items-center justify-between p-4 border border-border/40 bg-muted/10">
                          <p className="text-sm text-muted-foreground tracking-wide uppercase text-xs font-medium">{item.label}</p>
                          <p className="text-sm font-medium">{item.value}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2">
                    <Button className="h-12 px-8 text-sm font-medium tracking-widest uppercase bg-foreground text-background hover:bg-foreground/90 transition-all">
                      Save Preferences
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
