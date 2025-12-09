import React from "react";
import {
  FaDownload,
  FaCartPlus,
  FaCheck,
  FaArrowUp,
  FaArrowDown,
  
} from "react-icons/fa";
import { TotalProductIcon , PendingShipmentIcon ,TotalOrderRecievedIcon , OrderCompletedIcon ,OrderInProgressIcon} from "../../assets/icons/Dashboardicons";



const icons = {
  factory: TotalProductIcon, 
  download: TotalOrderRecievedIcon,
  cart: PendingShipmentIcon,
  check: OrderCompletedIcon,
  user : OrderInProgressIcon
};

export default function StatsCard({ title, value, icon, percent, trend }) {
  const Icon = icons[icon];
  const TrendIcon = trend === "up" ? FaArrowUp : FaArrowDown;
  const trendColor = trend === "up" ? "text-green-500" : "text-red-500";

  return (
    <div className="bg-[#F5F5F5] p-4 rounded-[16px] flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <h3 className="text-xl font-bold">{value}</h3>
        <p className={`text-sm flex items-center ${trendColor}`}>
          <TrendIcon className="mr-1" />
          {percent}% from past month
        </p>
      </div>
      {Icon && <Icon className="text-3xl text-gray-400" />}
    </div>
  );
}
