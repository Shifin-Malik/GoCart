import React from "react";
import NavBar from "../components/NavBar";

function AddToCart() {
  return (
    <div>
      <NavBar />
      <div className="p-4 w-full">
        <div className="flex flex-col lg:flex-row gap-4 h-screen">
          <div className=" bg-zinc-200/30 w-full rounded-2xl p-6 lg:h-full h-1/2">
            <h1 className="text-3xl font-semibold text-secondary">Your Cart</h1>
            <div className="bg-zinc-200/60 h-0.5 w-full mt-4"></div>
            <div className="mt-6 overflow-x-auto">
              <table className="min-w-full table-auto">
                <thead className="text-left">
                  <tr>
                    <th className="text-nowrap pb-6 md:px-4 px-1 text-secondary font-medium">
                      Product Details
                    </th>
                    <th className="pb-6 md:px-4 px-1 text-secondary font-medium">
                      Price
                    </th>
                    <th className="pb-6 md:px-4 px-1 text-secondary font-medium">
                      Quantity
                    </th>
                    <th className="pb-6 md:px-4 px-1 text-secondary font-medium">
                      Subtotal
                    </th>
                  </tr>
                </thead>
              </table>
            </div>
          </div>
          <div className="bg-zinc-200/30 w-full h-screen lg:w-1/2  rounded-2xl p-8 flex flex-col ">
            <h1 className="text-2xl font-bold text-secondary">Order Summary</h1>
            <div className="bg-zinc-200/60 h-0.5 w-full mt-4"></div>
            <div className="mt-2 flex flex-col gap-4">
              <h1 className="text-xl font-bold text-secondary">Items</h1>
              <h1 className="text-xl font-bold text-secondary">Shipping Fee</h1>
              <h1 className="text-xl font-bold text-secondary">Tax (2%)</h1>
              <button className="bg-primary w-60 h-10 rounded-2xl font-semibold text-white">
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddToCart;
