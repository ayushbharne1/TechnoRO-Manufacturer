import React from "react";
import { Line, Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ArcElement,
} from "chart.js";
import { MdArrowForwardIos } from "react-icons/md";
import Dashboard from "../../assets/images/Dashboard.svg";
import { useNavigate } from "react-router-dom";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const StockConsumption = () => {
  const navigate = useNavigate();
  // Order vs Delivery chart
  const orderDeliveryData = {
    labels: Array.from({ length: 31 }, (_, i) => i + 1),
    datasets: [
      {
        label: "Order",
        data: [
          1000, 2000, 1200, 3000, 1500, 4000, 2000, 2500, 3800, 1200, 4700,
          2100,
        ],
        backgroundColor: "rgba(181, 141, 255, 0.4)",
        fill: true,
        borderColor: "rgba(181, 141, 255, 0.6)",
      },
      {
        label: "Delivery",
        data: [
          800, 1200, 900, 2500, 2000, 3500, 1500, 1800, 3200, 1100, 4300, 2000,
        ],
        backgroundColor: "rgba(141, 207, 189, 0.4)",
        fill: true,
        borderColor: "rgba(141, 207, 189, 0.6)",
      },
    ],
  };

  const orderDeliveryOptions = {
    responsive: true,
    plugins: { legend: { position: "bottom" } },
    scales: {
      x: { grid: { display: false } },
      y: { grid: { color: "#f0f0f0" } },
    },
  };

  // Sales Analytics chart
  const salesData = {
    labels: ["2022", "2023", "2024", "2025", "2026"],
    datasets: [
      {
        label: "Sales",
        data: [10, 70, 50, 80, 100],
        borderColor: "#0088FE",
        tension: 0.4,
        pointBackgroundColor: "#0088FE",
      },
      {
        label: "Target",
        data: [5, 60, 40, 90, 95],
        borderColor: "#FFB74D",
        tension: 0.4,
        pointBackgroundColor: "#FFB74D",
      },
    ],
  };

  // Vendor Sales Trend chart
  const vendorData = {
    labels: [
      "Purifier",
      "Spare parts",
      "Air purifier",
      "Softener",
      "Purifier",
      "Purifier",
    ],
    datasets: [
      {
        label: "Sales %",
        data: [70, 85, 60, 95, 80, 90],
        backgroundColor: "rgba(88, 116, 255, 0.8)",
        borderRadius: 6,
      },
    ],
  };

  // Doughnut Chart
  const doughnutData = {
    labels: [],
    datasets: [
      {

        data: [60, 40],
        backgroundColor: ["#2B3695", "#E7E9FF"],
        borderWidth: 0,
        radius: "100%",
        cutout: "65%",
      },
      {

        data: [71, 29],
        backgroundColor: ["#6976EB", "#E7E9FF"],
        borderWidth: 0,
        radius: "90%",
        cutout: "60%",
      },
    ],
  };

  return (
    <div className="p-6 bg-white min-h-screen">
      {/* Breadcrumb */}
      <div className="text-sm text-[#007AFF]  flex items-center  mb-2">
        <span className="text-gray-500 font-medium">
          <img src={Dashboard} onClick={() => navigate("/dashboard")} alt="Dashboard Icon" className="inline w-5 h-5 mr-1 cursor-pointer" />
        </span>
        <MdArrowForwardIos className="text-gray-400 w-5 h-8 mx-1" />
        <span className="text-[#4A90E2] font-medium cursor-pointer">Report and Analytics</span>
      </div>

      <div className="border-b-2 pb-3 mb-4 border-gray-400">
        <h2 className="text-2xl font-semibold ">Stock Consumption</h2>
      </div>

      {/* Top section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Order vs Delivery */}
        <div className="bg-white p-4 rounded-lg shadow-sm col-span-2">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold text-gray-700">
              Order vs Delivery Analytics
            </h3>
            <div className="flex gap-2">
              <select className="border rounded-md px-2 py-1 text-sm">
                <option>2025</option>
              </select>
              <select className="border rounded-md px-2 py-1 text-sm">
                <option>October</option>
              </select>
            </div>
          </div>
          <Line
            data={orderDeliveryData}
            options={orderDeliveryOptions}
            height={100}
          />
        </div>

        {/* Sales Analytics */}
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h3 className="font-semibold text-gray-700 mb-2">Sales Analytics</h3>
          <Line
            data={salesData}
            options={{
              responsive: true,
              plugins: { legend: { display: false } },
            }}
            height={150}
          />
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4">
        {/* Vendor Sales Trend */}
        <div className="bg-white p-4 rounded-lg shadow-sm col-span-2">
          <h3 className="font-semibold text-gray-700 mb-2">
            Vendor Sales trend
          </h3>
          <Bar
            data={vendorData}
            options={{
              indexAxis: "y",
              scales: {
                x: { grid: { display: false } },
                y: { grid: { display: false } },
              },
              plugins: { legend: { display: false } },
            }}
          />
        </div>

        {/* Doughnut Chart */}
        <div className="bg-white p-4 rounded-lg shadow-sm flex flex-col items-center justify-center">
          <Doughnut
            data={doughnutData}
            options={{
              responsive: true,
              plugins: { legend: { display: false } },
            }}
            width={150}
            height={150}
          />

          <div className="mt-4 text-center">
            <p className="text-lg font-semibold text-gray-700">60%</p>
            <p className="text-sm text-gray-500 mb-2">Monthly production</p>
            <p className="text-lg font-semibold text-gray-700">71%</p>
            <p className="text-sm text-gray-500">Yearly production</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockConsumption;
