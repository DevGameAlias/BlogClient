import { NavLink, Outlet } from "react-router-dom";

// Imports
import NavBar from "../pages/NavBar";

// This component serves as the main layout for the application, wrapping around other routes and providing a consisten UI
function appLayout() {
  return (
    <>
      {/*NavBar Component  */}
      <NavBar />
      
      <Outlet />
    </>
  );
}
export default appLayout;
