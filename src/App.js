import "./App.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

// Imports of pages and components
import AppLayout from "./appLayout/AppLayout";
import Profile from "./pages/Profile";
import AboutPage from "./pages/AboutPage";
import Login from "./components/Login";

import BlogListButton from './components/BlogListButton'; // Make sure this path matches your file structure
import BlogList from './pages/BlogList';
import StoryCreation from "./components/StoryCreation.js";
import HomePage from "./pages/Home";

import BlogPage from "./pages/BlogPage";

import StoryList from './components/StoryList'; // Import the new StoryList component
import StoryDelete from "./pages/DeleteStory2";
import EventsPage from "./pages/Events.js";
import ProtectedRoute from "./components/ProtectedRoute.js";// Component to protect admin routes
const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<AppLayout />}>


    <Route path="/blogList" element={<BlogList />} />   
    <Route path="/blogCreation" element={<ProtectedRoute ><Profile /> </ProtectedRoute>} />
    <Route path="/homePage" element={<HomePage />} />
    <Route path="/blogPage" element={<BlogPage />} />
    <Route path="/about" element={<AboutPage />} />
    <Route path="/login" element={<Login />}/>
    <Route path="/storylist" element={<StoryList />}/>
      <Route path="/events" element={<EventsPage />} />
    <Route path="/profile" element={<ProtectedRoute ><Profile /> </ProtectedRoute>} />
    <Route path="/storycreation" element={<StoryCreation />}/>


  </Route>
));


function App() {
  return <RouterProvider router={router} />;
}

export default App;
