import { NavLink, Outlet } from "react-router-dom";
import React from "react";
// Imports
import NavBar from "../pages/NavBar";
import ScrollToTop from "../components/ScrollToTop";

// This component serves as the main layout for the application, wrapping around other routes and providing a consisten UI
function AppLayout() {
  return (
    <>
    {/* ScrollToTop Component to handle scrolling */}
      <ScrollToTop />

      {/*NavBar Component  */}
      <NavBar />
      
      <Outlet />
    </>
  );
}
export default AppLayout;
