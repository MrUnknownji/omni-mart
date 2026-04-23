"use client";
import React from "react";
import Footer from "../components/footer";
import { Dashboard } from "./components/dashboard";
import Recommendations from "../components/recommendations";

const Cart = () => {
  return (
    <>
      <Dashboard />
      <Recommendations title="Complete the Look" />
      <Footer />
    </>
  );
};

export default Cart;
