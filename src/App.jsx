import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Product from "./components/Product/Product";

function App() {
  return (
    <Routes>
      <Route path="/GoCart" element={<Home />} />
      <Route path="/product/:id" element={<Product />} />
    </Routes>
  );
}

export default App;
