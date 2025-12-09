import React from "react";

const DeliveredPriceDetails = () => {
  return (
    <div className="bg-white rounded-lg shadow p-5">
      <h3 className="text-lg font-semibold text-gray-700 mb-4">Price Details (Delivered)</h3>
      <div className="divide-y divide-gray-200 text-sm text-gray-600">
        <div className="flex justify-between py-2">
          <span>Price (3 Items)</span>
          <span>₹57999</span>
        </div>
        <div className="flex justify-between py-2">
          <span>Discount</span>
          <span className="text-green-500">-₹10000</span>
        </div>
        <div className="flex justify-between py-2">
          <span>Delivery Charges</span>
          <span className="text-green-600">Free</span>
        </div>
        <div className="flex justify-between py-2 font-semibold">
          <span>Total Amount</span>
          <span>₹47999</span>
        </div>
      </div>
      <p className="text-green-600 text-sm mt-2">
        Total saved on this order ₹11000
      </p>
    </div>
  );
};

export default DeliveredPriceDetails;
