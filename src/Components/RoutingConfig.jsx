import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./Modules/Header";
import SideBar from "./Modules/Sidebar";
import Dashboard from "./Modules/Dashboard";
const RoutingConfig = () => {
  const [broken, setBroken] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  sessionStorage?.setItem("broken", broken);
  useEffect(() => {
    const handleResize = () => {
      setBroken(window.innerWidth < 992); // You can adjust the breakpoint
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial check

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <div>
      <div className="d-flex vh-100 overflow-hidden">
        <SideBar broken={broken} showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
        <div className="d-flex flex-column flex-grow-1">
          <Header broken={broken} setShowSidebar={setShowSidebar} />

          <div className="flex-grow-1 overflow-auto main-scroll-area p-3" style={{ background: "#F4F6F8" }}>
            <Routes>
              <Route path="dashboard" element={<Dashboard />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoutingConfig;
