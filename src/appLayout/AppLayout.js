import { NavLink, Outlet } from "react-router-dom";

// This component serves as the main layout for the application, wrapping around other routes and providing a consisten UI
function appLayout(){
    
    return(
        <>
    <span>Test</span>
        <Outlet />
        </>
    )
}
export default appLayout;