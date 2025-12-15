import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProductById } from "../../../redux/productSlice";
import { motion } from "framer-motion";
import { FaRupeeSign } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { MdArrowForwardIos } from "react-icons/md";
import productImg from "../../../assets/images/product.png";
import Dashboard from "../../../assets/images/Dashboard.svg";

const ProductDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { productDetail, isLoading } = useSelector((state) => state.product);

  useEffect(() => {
    if (id) dispatch(getProductById(id));
  }, [dispatch, id]);

  const product = productDetail ?? {
    name: "Prefilter RO Service Kit Pre-filter Housing Bowl",
    subtitle:
      "+ 2 Pcs. Spun Filter + SS Inlet Ball Valveflon 1/4\" + 3 Meter RO Pipe + 2 Ro Tap + 1/4\" Connector For Water Purifier, Solid Filter Cartridge",
    price: 899,
    warranty: "NA",
    discount: "10% OFF",
    image: productImg,
  };

  return (
    <motion.div
      className="p-4 bg-white min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >

      {/* Breadcrumb */}
      <div className="flex items-center text-sm text-gray-500 mb-2">
        <span className="text-gray-500 font-medium">
          <img src={Dashboard} onClick={() => navigate("/dashboard")} alt="Dashboard Icon" className="inline w-5 h-5 mr-1" />
        </span>
        <MdArrowForwardIos className="text-gray-400 w-5 h-8 mx-1" />
        <span
          onClick={() => navigate("/product-list")}
          className="text-gray-900 cursor-pointer"
        >
          Product Management
        </span> 
        <MdArrowForwardIos className="text-gray-400 w-5 h-8 mx-1" />
        <span className="text-blue-600 font-medium cursor-pointer">
          Product Details
        </span>
      </div>


      {/* Title */}
      <h1 className="text-2xl font-semibold mb-2">
        Product Details
      </h1>

      <div className="border-b-2 border-gray-400 mb-2 mt-4"></div>

      {/* Main Container */}
      <div className="bg-white  p-2 flex flex-col md:flex-row gap-4">

        <div className="w-full md:w-1/2 relative">
          <div className="relative rounded-lg overflow-hidden">

            <img
              src={product?.images?.length ? product.images[0] : product.image}
              alt="Product"
              className="w-[400px] h-[370px] object-cover rounded-lg shadow-md"
            />
          </div>
        </div>

        {/* Right Section (Details) */}
        <div className="w-full md:w-1/2 space-y-4">
          <h2 className="text-lg md:text-xl font-semibold text-gray-800 leading-snug">
            {product?.name}
          </h2>
          <p className="text-gray-600 text-sm">{product?.subtitle || product?.description}</p>

          <div className="flex items-center gap-3 text-sm">
            <span className="text-gray-600">Brand:</span>
            <strong className="text-gray-800">{product?.brand}</strong>
            {product?.isFeatured && (
              <span className="ml-3 bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-md text-sm">Featured</span>
            )}
          </div>

          <div className="flex items-center gap-4 text-sm">
            <div className="text-gray-600">Color: <strong className="text-gray-800">{product?.color || '-'}</strong></div>
            <div className="text-gray-600">Stock: <strong className="text-gray-800">{product?.stock ?? '-'}</strong></div>
            <div className="text-gray-600">Status: <strong className="text-gray-800">{product?.stockStatus ?? '-'}</strong></div>
          </div>

          {/* Price and Warranty */}
          <div className="flex items-center text-[#263138] text-sm font-normal">
            <span className="flex items-center text-[#7EC1B1] text-lg font-medium">
              <FaRupeeSign className="mr-1" />
              {product?.discountedPrice ?? product?.price}
            </span>
            <span className="ml-3">
              • Warranty: <span className="text-[#3A953A]">{product?.warrantyPeriod || product?.warranty || "NA"}</span>
            </span>
            {product?.discountPercent > 0 && (
              <span className="ml-3 text-sm text-gray-600">({product.discountPercent}% off)</span>
            )}
          </div>

          {/* Description */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Description</h3>
            <hr className="border-gray-200 mb-3" />
            <ul className="list-disc pl-5 text-sm text-gray-600 space-y-2">
                {(() => {
                  const offersDisplay = product?.offers ? (Array.isArray(product.offers) ? product.offers.join(', ') : product.offers) : null;
                  return offersDisplay ? <li>Offers: {offersDisplay}</li> : null;
                })()}
              {product?.rating !== undefined && (
                <li>Rating: {product.rating} ({product.reviews} reviews)</li>
              )}
              {/* <li>
                Lorem ipsum dolor sit amet consectetur. Netus bibendum duis
                lorem ullamcorper id. Amet mattis eu fringilla nibh interdum.
              </li>
              <li>
                Pharetra sit in risus felis dictum enim suspendisse sodales.
                Lobortis aliquam morbi tortor aliquet pretium eu.
              </li>
              <li>
                Eget sed ultrices mauris aliquam sed senectus quam sed
                imperdiet. Arcu enim est facilisis consectetur.
              </li>
              <li>
                Eget sed ultrices mauris aliquam sed senectus quam sed
                imperdiet. Arcu enim est facilisis consectetur.
              </li>
              <li>
                Eget sed ultrices mauris aliquam sed senectus quam sed
                imperdiet. Arcu enim est facilisis consectetur.
              </li>
              <li>
                Eget sed ultrices mauris aliquam sed senectus quam sed
                imperdiet. Arcu enim est facilisis consectetur.
              </li> */}

            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductDetails;
