import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux"; // <--- 1. Import Hook
import { logout } from "../../redux/authSlice"; // <--- 2. Import Action

import {
  Dashboard,
  ProductIcon,
  InventoryIcon,
  ProductionIcon,
  OrderIcon,
  ReportIcon,
  ProfileIcon,
  HelpIcon,
  LogoutIcon,
} from "../../assets/icons/AllIcons";

const Sidebar = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch(); // <--- 3. Initialize Hooks
  const navigate = useNavigate();

  // --- LOGOUT LOGIC ---
  const handleLogout = () => {
    dispatch(logout()); // Clear Token
    navigate("/");      // Go to Login
  };

  const sections = [
    {
      title: "Product Management",
      items: [
        { path: "/product-list", label: "Product List", icon: ProductIcon },
        { path: "/inventory-management", label: "Inventory Management", icon: InventoryIcon },
        { path: "/production-management", label: "Production Management", icon: ProductionIcon },
      ],
    },
    {
      title: "Order Management",
      items: [
        { path: "/order-management", label: "Order Management", icon: OrderIcon },
      ],
    },
    {
      title: "Report and Analytics",
      items: [
        { path: "/reports", label: "Report and Analytics", icon: ReportIcon },
      ],
    },
    {
      title: "Other",
      items: [
        { path: "/help-support", label: "Help & Support", icon: HelpIcon },
        { path: "/profile", label: "Profile", icon: ProfileIcon },
        { path: "#", label: "Logout", icon: LogoutIcon, isLogout: true }, 
      ],
    },
  ];

  return (
        <aside className="bg-[#FFFFFF] w-64 min-h-full border-r border-gray-200 flex flex-col py-6 shadow-sm border-t">      <div>
        {/* Dashboard Link (Kept as is) */}
        <div className="px-6 mb-6">
          <Link
            to="/dashboard"
            className={`flex items-center gap-3 text-[15px] rounded-md px-3 py-2 transition-all ${
              pathname === "/dashboard"
                ? "bg-[#7EC1B1] text-white font-medium"
                : "text-[#7EC1B1]"
            }`}
          >
            <Dashboard className="text-current w-5 h-5" />
            Dashboard
          </Link>
        </div>

        {/* Menu Sections */}
        {sections.map((section) => (
          <div key={section.title} className="px-4 mb-6">
            <h3 className="text-[13px] font-semibold text-[#263138] uppercase mb-2 tracking-wide">
              {section.title}
            </h3>
            <ul className="space-y-1">
              {section.items.map((item) => {
                const Icon = item.icon;

                // --- SPECIAL CASE: LOGOUT BUTTON ---
                if (item.isLogout) {
                  return (
                    <li key={item.label}>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 text-[14px] px-3 py-2 rounded-md transition-all text-red-500 hover:bg-red-50 hover:text-red-600"
                      >
                        <Icon className="text-current w-5 h-5" />
                        {item.label}
                      </button>
                    </li>
                  );
                }

                // --- STANDARD LINK ---
                return (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className={`flex items-center gap-3 text-[14px] px-3 py-2 rounded-md transition-all ${
                        pathname === item.path
                          ? "bg-[#7EC1B1] text-white font-medium"
                          : "text-[#7EC1B1] hover:bg-gray-50"
                      }`}
                    >
                      <Icon className="text-current w-5 h-5" />
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;