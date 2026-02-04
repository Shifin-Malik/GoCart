import React, { lazy, Suspense, useContext } from "react";
import { Route, Routes, useLocation, matchPath } from "react-router-dom";
import Home from "./pages/Home";
import ProductDetails from "./components/Product/ProductDetails";
import Cart from "./pages/Cart";
import ProductPage from "./pages/ProductPage";
import NavBar from "./components/NavBar";
import Support from "./pages/Support";
import NotFound from "./pages/NotFound";
import AdminLayout from "./admin/layout/AdminLayout";
import AdminDashboard from "./admin/pages/AdminDashboard";
import AdminOrders from "./admin/pages/AdminOrders";
import AdminUsers from "./admin/pages/AdminUsers";
import AdminProducts from "./admin/pages/AdminProducts";
import ProtectedAdminRoute from "./utils/ProtectedAdminRoute";
import { AppContextData } from "./context/AppContext";
import Wishlist from "./pages/Wishlist";

const LazyOrderHistory = lazy(() => import("./pages/OrderHistory"));

function App() {
  const location = useLocation();
  const { user } = useContext(AppContextData);

  const isAdminRoute = location.pathname.startsWith("/GoCart/admin");

  const validRoutes = [
    "/GoCart",
    "/GoCart/support",
    "/GoCart/product",
    "/GoCart/orderPlace",
    "/GoCart/product/:id",
    "/GoCart/cart",
  ];

  const isValidRoute = validRoutes.some((path) =>
    matchPath({ path, end: true }, location.pathname)
  );

  const hideNavbar = isAdminRoute || !isValidRoute;

  return (
    <div>
      {!hideNavbar && <NavBar />}
      <Suspense fallback={<div className="text-center mt-10">Loading...</div>}>
        <Routes>
          <Route path="/GoCart" element={<Home />} />
          <Route path="/GoCart/support" element={<Support />} />
          <Route path="/GoCart/product" element={<ProductPage />} />
          <Route path="/GoCart/orderPlace" element={<LazyOrderHistory />} />
          <Route path="/GoCart/product/:id" element={<ProductDetails />} />
          <Route path="/GoCart/cart" element={<Cart />} />
          <Route path="/GoCart/wishlist" element={<Wishlist />} />

        

          {user?.role === "admin" && (
            <Route
              path="/GoCart/admin"
              element={
                <ProtectedAdminRoute>
                  <AdminLayout />
                </ProtectedAdminRoute>
              }
            >
              <Route index element={<AdminDashboard />} />
              <Route path="products" element={<AdminProducts />} />
              <Route path="orders" element={<AdminOrders />} />
              <Route path="users" element={<AdminUsers />} />
            </Route>
          )}

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </div>
  );
};

export default App;
