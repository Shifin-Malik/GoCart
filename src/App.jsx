import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ProductDetails from "./components/Product/ProductDetails";
import Cart from "./pages/Cart";
import ProductPage from "./pages/ProductPage";
import NavBar from "./components/NavBar";
import Support from "./pages/Support";
import OrderHistory from "./pages/OrderHistory";

function App() {
  return (
    <div className="">
      <NavBar />
      <Routes>
        <Route path="/GoCart" element={<Home />} />
        <Route path="/GoCart/cart" element={<Cart />} />
        <Route path="/GoCart/support" element={<Support />} />
        <Route path="/GoCart/product" element={<ProductPage />} />
        <Route path="/GoCart/orderPlace" element={<OrderHistory />} />
        <Route path="/GoCart/product/:id" element={<ProductDetails />} />
        <Route path="*" element={<h2>Page Not Found</h2>} />
      </Routes>
    </div>
  );
}

export default App;
