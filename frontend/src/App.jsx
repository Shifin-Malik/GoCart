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
    "/",
    "/support",
    "/product",
    "/orderPlace",
    "/product/:id",
    "/cart",
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
          <Route path="/" element={<Home />} />
          <Route path="/support" element={<Support />} />
          <Route path="/product" element={<ProductPage />} />
          <Route path="/orderPlace" element={<LazyOrderHistory />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />

        

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
