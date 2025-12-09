import React from "react";

const InProgressPriceDetails = () => {
  return (
    <div className="bg-white rounded-lg shadow p-5">
      <h3 className="text-lg font-semibold text-gray-700 mb-4">Price Details (In Progress)</h3>
      <div className="divide-y divide-gray-200 text-sm text-gray-600">
        <div className="flex justify-between py-2">
          <span>Price (2 Items)</span>
          <span>₹45998</span>
        </div>
        <div className="flex justify-between py-2">
          <span>Discount</span>
          <span className="text-green-500">-₹8000</span>
        </div>
        <div className="flex justify-between py-2">
          <span>Delivery Charges</span>
          <span className="text-green-600">Free</span>
        </div>
        <div className="flex justify-between py-2 font-semibold">
          <span>Total Amount</span>
          <span>₹37998</span>
        </div>
      </div>
      <p className="text-green-600 text-sm mt-2">
        Total saved on this order ₹9000
      </p>
    </div>
  );
};

export default InProgressPriceDetails;
