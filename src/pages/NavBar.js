import { NavLink } from "react-router-dom";
// NavBar component for site navigation
const NavBar = () => {
  return (
    // NavBar container with background and shadow
    <nav className="bg-white shadow-md">
      {/* Centers content and adds horizontal padding */}
      <div className="container mx-auto px-4">
        {/* Flexbox layout */}
        <div className="flex justify-between items-center py-4 boreder-b border-gray-3002">
          <div className="text-xl font-bold">
            {/* TODO name of website or icon would go here */}
            <NavLink to="/">Title or Icon</NavLink>
          </div>
          {/* Space between navigation link */}
          <div className="space-x-4">
            {/* TODO update navbar with proper links once available */}
            <NavLink to="/" className="text-gray-700 hover:text-blue-500">
              Home
            </NavLink>
            <NavLink to="/" className="text-gray-700 hover:text-blue-500">
              About
            </NavLink>
            <NavLink to="/" className="text-gray-700 hover:text-blue-500">
              Blog
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
