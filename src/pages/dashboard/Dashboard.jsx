import StatsCard from "./StatsCard";
import RevenueChart from "./RevenueChart";
import StockTable from "./StockTable";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js";
import { useRef, useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight, FaSmile } from "react-icons/fa"; // FaSmile import check

ChartJS.register(ArcElement, Tooltip);

export default function Dashboard() {
  const [satisfactionValue, setSatisfactionValue] = useState(85); // Value updated to 85 for image match
  const scrollRef = useRef(null);
  const [showArrows, setShowArrows] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  useEffect(() => {
    const checkScroll = () => {
      if (!scrollRef.current) return;
      setShowArrows(
        scrollRef.current.scrollWidth > scrollRef.current.clientWidth
      );
    };

    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, []);

  useEffect(() => {
    updateScrollButtons();
    const el = scrollRef.current;
    if (!el) return;

    el.addEventListener("scroll", updateScrollButtons);
    window.addEventListener("resize", updateScrollButtons);

    return () => {
      el.removeEventListener("scroll", updateScrollButtons);
      window.removeEventListener("resize", updateScrollButtons);
    };
  }, []);

  const updateScrollButtons = () => {
    const el = scrollRef.current;
    if (!el) return;

    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth);
  };

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -250, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 250, behavior: "smooth" });
  };

  const data = {
    datasets: [
      {
        data: [satisfactionValue, 100 - satisfactionValue],
        backgroundColor: ["#7EC1B1", "#E5E7EB"],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    rotation: -90,
    circumference: 180,
    cutout: "92%", 
    plugins: { tooltip: false },
    maintainAspectRatio: false, 
  };

  const containerWidth = 240; 
  const containerHeight = 144; 

  
  const outerRadius = 95;
  const innerRadius = outerRadius * 0.75;
  const radiusArc = (outerRadius + innerRadius) / 2;

  
  const startAngle = Math.PI; 
  const endAngle = Math.PI * 2; 
  const angleValue =
    startAngle + ((endAngle - startAngle) * satisfactionValue) / 100;

  
  const centerX = containerWidth / 2;
  const centerY = containerHeight; 

  
  const dotX = centerX + radiusArc * Math.cos(angleValue);
  const dotY = centerY + radiusArc * Math.sin(angleValue);

  return (
    <div className="space-y-6 p-4 bg-[#FFFFFF]">
      <div className="relative">
        {canScrollLeft && (
          <button
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white shadow-md p-2 rounded-full z-10 hidden md:block"
          >
            <FaChevronLeft size={18} />
          </button>
        )}

        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto pb-2 scrollbar-hidden scroll-smooth"
        >
          <div className="flex-shrink-0 min-w-[250px]">
            <StatsCard
              title="Total Product Manufacturer"
              value="3590"
              icon="factory"
              percent="2.4"
              trend="up"
            />
          </div>
          <div className="flex-shrink-0 min-w-[250px]">
            <StatsCard
              title="Total Orders Received"
              value="58,934"
              icon="download"
              percent="2.6"
              trend="up"
            />
          </div>
          <div className="flex-shrink-0 min-w-[250px]">
            <StatsCard
              title="Pending Shipment"
              value="1,484"
              icon="cart"
              percent="3.5"
              trend="down"
            />
          </div>
          <div className="flex-shrink-0 min-w-[250px]">
            <StatsCard
              title="Orders Completed"
              value="94,89,94"
              icon="check"
              percent="3.5"
              trend="down"
            />
          </div>
          <div className="flex-shrink-0 min-w-[250px]">
            <StatsCard
              title="Orders in Progress"
              value="94,89,948"
              icon="user"
              percent="3.5"
              trend="down"
            />
          </div>
        </div>
        

        {canScrollRight && (
          <button
            onClick={scrollRight}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow-md p-2 rounded-full z-10 hidden md:block"
          >
            <FaChevronRight size={18} />
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-[#F5F5F5] rounded-[9.19px] shadow p-4">
          <RevenueChart />
        </div>

        {/* ---  CUSTOMER SATISFACTION SECTION --- */}
        <div className="bg-[#F8F8F8] rounded-xl p-6 flex flex-col items-center shadow-sm">
          <p className="text-[18px] font-semibold text-[#25282B] w-full text-left mb-6">
            Customer Satisfaction
          </p>

          <div className="relative w-72 h-34 flex justify-center items-center">
            <Doughnut data={data} options={options} />

            
            <div className="absolute top-0 left-1/2 -translate-x-1/2 pt-14 flex flex-col items-center">
                <FaSmile size={25} className="text-[#7EC1B1] mb-2" />
                <p className="text-[28px] font-bold text-[#25282B]">
                    {satisfactionValue}%
                </p>
            </div>
            
            
            <div
              className="absolute w-5 h-5 bg-[#7EC1B1] rounded-full border-4 border-white shadow-md transition-all duration-500"
              style={{
                left: dotX,
                top: dotY,
                transform: "translate(-50%, -50%)",
                
                opacity: 0, 
              }}
            />
          </div>

          <p className="text-base text-[#525252] text-center max-w-[180px] leading-snug mt-4">
            Customers are satisfied with the services
          </p>
        </div>
        {/* ----------------------------------------------- */}

      </div>

      <StockTable />
    </div>
  );
}