"use client";
import { useEffect, useState } from "react";
import { User, Mail, Phone, MapPin, CreditCard, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import NavBar from "../components/navbar";
import Link from "next/link";
import { useGlobalData } from "../Context/GlobalData";
import { User as UserType } from "@/lib/types";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const { user } = useGlobalData();
  const [profileData, setProfileData] = useState<UserType>();
  const { orders } = useGlobalData();
  const router = useRouter();

  useEffect(() => {
    user != null
      ? setProfileData({ ...user })
      : setProfileData({
          userId: "user-34i3o",
          name: "John Doe",
          email: "john@example.com",
          password: "password",
          phone: "123-456-7890",
          address: {
            street: "123 Main St",
            city: "Anytown",
            state: "State",
            country: "Country",
            postalCode: "12345",
          },
          profileImage: "https://example.com/profile.jpg",
          role: "customer",
          createdAt: new Date("2023-01-01"),
          updatedAt: new Date("2023-06-15"),
        });
  }, [user]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // Here you would typically send the updated data to your backend
    setIsEditing(false);
  };

  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-muted/40 p-4 sm:p-6 lg:p-8">
        <div className="mx-auto max-w-4xl">
          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="payments">Payments</TabsTrigger>
            </TabsList>
            <TabsContent value="profile">
              <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage
                      src={profileData?.profileImage}
                      alt="User Avatar"
                    />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-2xl">
                      {profileData?.name}
                    </CardTitle>
                    <CardDescription>
                      Manage your account details
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit}>
                    <div className="grid gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="name">Name</Label>
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-muted-foreground" />
                          <Input
                            id="name"
                            name="name"
                            value={profileData?.name}
                            disabled={!isEditing}
                          />
                        </div>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={profileData?.email}
                            disabled={!isEditing}
                          />
                        </div>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="phone">Phone</Label>
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-muted-foreground" />
                          <Input
                            id="phone"
                            name="phone"
                            value={profileData?.phone}
                            disabled={!isEditing}
                          />
                        </div>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="address">Address</Label>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <Input
                            id="address"
                            name="address"
                            value={profileData?.address?.city}
                            disabled={!isEditing}
                          />
                        </div>
                      </div>
                    </div>
                  </form>
                </CardContent>
                <CardFooter className="flex justify-between">
                  {isEditing ? (
                    <>
                      <Button
                        variant="outline"
                        onClick={() => setIsEditing(false)}
                      >
                        Cancel
                      </Button>
                      <Button onClick={handleSubmit}>Save Changes</Button>
                    </>
                  ) : (
                    <Button onClick={() => setIsEditing(true)}>
                      Edit Profile
                    </Button>
                  )}
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="orders">
              <Card>
                <CardHeader>
                  <CardTitle>Order History</CardTitle>
                  <CardDescription>View your recent orders</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Package className="h-4 w-4" />
                            <span>Order #{order.orderId}</span>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            asChild
                            onClick={() =>
                              router.push(`/orders/${order.orderId}`)
                            }
                          >
                            View Details
                          </Button>
                        </div>
                        <Separator />
                      </>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => router.push("/orders")}
                  >
                    View All Orders
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="payments">
              <Card>
                <CardHeader>
                  <CardTitle>Payment Methods</CardTitle>
                  <CardDescription>Manage your payment options</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* This is where you'd map through the user's payment methods */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CreditCard className="h-4 w-4" />
                        <span>Visa ending in 1234</span>
                      </div>
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CreditCard className="h-4 w-4" />
                        <span>Mastercard ending in 5678</span>
                      </div>
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </div>
                    {/* More payment method items would go here */}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Add New Payment Method</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}
