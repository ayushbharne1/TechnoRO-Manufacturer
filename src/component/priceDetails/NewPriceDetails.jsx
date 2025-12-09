import React from "react";
import { FiPercent } from "react-icons/fi";


const NewPriceDetails = () => {
  return (
    <div className="bg-white rounded-lg shadow p-5">
      <h3 className="text-lg font-semibold text-gray-700 mb-4">
        Price Details
      </h3>

      <div className="divide-y divide-gray-200 text-sm text-gray-600">
        <div className="border-b border-gray-400 border-dotted">
          <div className="flex justify-between py-2">
            <span>Price (1 Items)</span>
            <span>₹24999</span>
          </div>
          <div className="flex justify-between py-2">
            <span>Discount</span>
            <span className="text-green-500">-₹5000</span>
          </div>
          <div className="flex justify-between py-2">
            <span>Platform Fee</span>
            <span>₹1</span>
          </div>
          <div className="flex justify-between py-2">
            <span>Debit Card Off</span>
            <span className="text-green-500">-₹1000</span>
          </div>

          <div className="flex items-center py-2">
            <span>Delivery Charges</span>
            <div className="flex items-center ml-auto">
              <span className="text-gray-400 line-through mr-1">₹100</span>
              <span className="text-green-600">Free</span>
            </div>
          </div>
        </div>

        <div className="flex justify-between py-2 font-semibold text-gray-700 border-b border-gray-400 border-dotted">
          <span>Total Amount</span>
          <span>₹18900</span>
        </div>
      </div>

      <div className="border-b border-gray-400 border-dotted">
        <p className="text-[#8DC9BE] text-sm mt-2 mb-2">
          Total saved on this order ₹710
        </p>
      </div>
      {/* OFFER APPLIED SECTION */}
      <div className="flex  py-2">
        <div className="text-2xl text-teal-600 w-9 h-9 border rounded-full t mr-3 mt-2 bg-blue-300 border-blue-400">
          <FiPercent className="text-lg text-white  ml-2 mt-2" />
        </div>
        <div className="flex flex-col">
          <div>
            {" "}
            <span> 1 Offer Applied on this order</span>
          </div>
          <div>
            <span className="">Debit card off ₹100</span>
          </div>
        </div>
      </div>

      {/* BUTTONS */}
      <div className="flex justify-center gap-4 mt-5">
        <button className="px-16 py-2 border border-blue-300 text-gray-700 rounded-md hover:bg-red-50 transition">
          Reject
        </button>
        <button className="px-16 py-2 bg-[#8DC9BE] text-white rounded-md hover:bg-blue-700 transition">
          Accept
        </button>
      </div>
    </div>
  );
};

export default NewPriceDetails;
