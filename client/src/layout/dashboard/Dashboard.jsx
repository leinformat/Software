import { Sidebar } from "../partials/sidebar/Sidebar";
import { Header } from "../partials/header/Header";
import { Footer } from "../partials/footer/Footer";
import { Outlet } from "react-router-dom";

export const Dashboard = () => {
  return (
    <div className="grid grid-cols-[260px_auto] bg-gray-100">

      {/* Sidebar */}
      <div className="bg-white border-r border-gray-200 fixed h-full w-[260px] p-5">
        <Sidebar />
      </div>

      {/* Main content */}
      <div className="ml-[260px] relative">
        {/* Header */}
        <div className="sticky top-5 bg-gray-100/50 w-[calc(100%-10px)] mx-auto p-3 rounded-xl backdrop-blur-md opacity-90">
          <Header />
        </div>

        {/* Content */}
        <div className="min-h-screen p-12">
          <Outlet />
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};