import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Layout from "./layouts/Layout";
import Dashboard from "./pages/dashboard/Dashboard";

// Auth Pages
import LoginPage from "./pages/login/Login";
import RegisterPage from "./pages/login/RegisterPage";
import ForgotPasswordForm from "./pages/login/ForgotPassword";
import VerifyOtp from "./pages/login/VerifyOtp";
import ResetPassword from "./pages/login/ResetPassword";

// Security
import ProtectedRoute from "./protectedRoute/ProtectedRoute";

// Product Management
import ProductList from "./pages/productmanagement/product/ProductList";
import AddProduct from "./pages/productmanagement/product/AddProduct";
import ProductDetails from "./pages/productmanagement/product/ProductDetails";
import EditProduct from "./pages/productmanagement/product/EditProduct";
import InventoryManagement from "./pages/productmanagement/inventoryManagement/InventoryManagement";
import ProductionManagement from "./pages/productmanagement/productionManagement/ProductionManagement";
import ProductTracking from "./pages/productmanagement/productionManagement/ProductTracking";
import CreateNewBatch from "./pages/productmanagement/productionManagement/CreateNewBatch";
import UpdateBatchTracking from "./pages/productmanagement/productionManagement/UpdateBatchTracking";
import BatchTracking from "./pages/productmanagement/productionManagement/BatchTracking";

// Orders
import OrderList from "./pages/ordermanagement/OrderList";
import OrderDetails from "./pages/ordermanagement/OrderDetails";
import InvoicePage from "./pages/ordermanagement/InvoicePage";

// Notifications & Profile
import Notifications from "./pages/notification/Notifications";
import Feedback from "./pages/notification/Feedback";
import Profile from "./pages/other/profile/Profile";
import EditProfile from "./pages/other/profile/EditProfile";

// Reports
import StockConsumption from "./pages/report/StockConsumption";

// Help & Support
import HelpSupport from "./pages/other/help-support/HelpSupport";
import QueryDetails from "./pages/other/help-support/QueryDetails";
import QueryChat from "./pages/other/help-support/QueryChat";
import StartNewChat from "./pages/other/help-support/StartNewChat";
import Feedbacks from "./pages/other/help-support/Feedbacks";

// Toast
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer position="top-center" autoClose={1500} />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordForm />} />
        <Route path="/verifyOtp" element={<VerifyOtp />} />
        <Route path="/resetpassword" element={<ResetPassword />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />

            {/* Product */}
            <Route path="/product-list" element={<ProductList />} />
            <Route path="/add-product" element={<AddProduct />} />
            <Route path="/product-detail/:id" element={<ProductDetails />} />
            <Route path="/product-edit/:id" element={<EditProduct />} />

            {/* Inventory / Production */}
            <Route
              path="/inventory-management"
              element={<InventoryManagement />}
            />
            <Route
              path="/production-management"
              element={<ProductionManagement />}
            />
            <Route
              path="/product-tracking/:id"
              element={<ProductTracking />}
            />
            <Route path="/create-new-batch" element={<CreateNewBatch />} />
            <Route path="/update-batch/:id" element={<UpdateBatchTracking />} />
            <Route path="/batch-tracking" element={<BatchTracking />} />

            {/* Orders */}
            <Route path="/order-management" element={<OrderList />} />
            <Route path="/order-details/:id" element={<OrderDetails />} />
            <Route path="/invoice/:id" element={<InvoicePage />} />

            {/* Reports */}
            <Route path="/reports" element={<StockConsumption />} />

            {/* Other */}
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/edit-profile" element={<EditProfile />} />

            {/* Help */}
            <Route path="/help-support" element={<HelpSupport />} />
            <Route path="/query-details/:id" element={<QueryDetails />} />
            <Route path="/chat" element={<QueryChat />} />
            <Route path="/start-chat" element={<StartNewChat />} />
            <Route path="/feedbacks" element={<Feedbacks />} />
          </Route>
        </Route>

        {/* Fallback */}
        <Route path="*" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
