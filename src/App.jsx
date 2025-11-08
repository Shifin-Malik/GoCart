import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ProductDetails from "./components/Product/ProductDetails";
import Cart from "./pages/Cart";
import ProductPage from "./pages/ProductPage";
import NavBar from "./components/NavBar";
import Support from "./pages/Support";

const LazyOrderHistory = lazy(() => import("./pages/OrderHistory"));

function App() {
  return (
    <div>
      <NavBar />
      <Suspense fallback={<div className="text-center mt-10">Loading...</div>}>
        <Routes>
          <Route path="/GoCart" element={<Home />} />
          <Route path="/GoCart/cart" element={<Cart />} />
          <Route path="/GoCart/support" element={<Support />} />
          <Route path="/GoCart/product" element={<ProductPage />} />
          <Route path="/GoCart/orderPlace" element={<LazyOrderHistory />} />
          <Route path="/GoCart/product/:id" element={<ProductDetails />} />
          <Route path="*" element={<h2>Page Not Found</h2>} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
