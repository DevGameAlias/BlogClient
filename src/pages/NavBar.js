import { NavLink } from "react-router-dom";
// NavBar component for site navigation
const NavBar = () => {
  return (
    // NavBar container with background and shadow
    <nav className="bg-yellow-950 shadow-md">
      {/* Centers content and adds horizontal padding */}
      <div className="container mx-auto px-4">
        {/* Flexbox layout */}
        <div className="flex justify-between items-center py-4 ">
          <div className="font-serif text-xl text-orange-100 font-bold">
            {/* Name of website */}
            <h2>Mike Ninness</h2>
          </div>
          {/* Space between navigation links */}
          <div className="space-x-4">
            <NavLink to="/" className="text-orange-100 hover:text-blue-500">
              Home
            </NavLink>
            <NavLink to="/about" className="text-orange-100 hover:text-blue-500">
              About
            </NavLink>
            <NavLink to="/blogPage" className="text-orange-100 hover:text-blue-500">
              Blog
            </NavLink>
            <NavLink to="/storylist" className="text-orange-100 hover:text-blue-500">
              Story List
            </NavLink>
            <NavLink to="/events" className="text-orange-100 hover:text-blue-500">
              Events
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
