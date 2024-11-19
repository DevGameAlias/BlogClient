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
import StoryPage from "./pages/storypage.js";
import ScrollToTop from "./components/ScrollToTop";
import BlogListButton from "./components/BlogListButton"; // Make sure this path matches your file structure
import BlogList from "./pages/BlogList";
import StoryCreation from "./components/StoryCreation.js";
import HomePage from "./pages/Home";
import AdminReviewComment from './pages/AdminReviewComment';
import BlogPage from "./pages/BlogPage";
import EventsPage from "./pages/Events.js";
import storyReview from "./components/AdminReviews"
import ProtectedRoute from "./components/ProtectedRoute.js";// Component to protect admin routes
import StoryList from "./components/StoryList.js";

const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<AppLayout />}>


    <Route path="/blogList" element={<ProtectedRoute ><BlogList /></ProtectedRoute>} />   
    <Route path="/blogCreation" element={<ProtectedRoute ><Profile /> </ProtectedRoute>} />
    <Route path="/" element={<HomePage />} />
    <Route path="/blogPage" element={<BlogPage />} />
    <Route path="/about" element={<AboutPage />} />
    <Route path="/login" element={<Login />}/>
    <Route path="/storylist" element={<ProtectedRoute ><StoryList /></ProtectedRoute>}/>
      <Route path="/events" element={<EventsPage />} />
    <Route path="/profile" element={<ProtectedRoute ><Profile /> </ProtectedRoute>} />
    <Route path="/storycreation" element={<StoryCreation />}/>
    <Route path="/adminReviewComment" element={<ProtectedRoute ><AdminReviewComment /></ProtectedRoute>} />
    <Route path="/storyPage" element={<StoryPage />} />
    


  </Route>
));



function App() {
  return (
    <RouterProvider router={router}>
      {/* ScrollToTop should be here to listen for route changes */}
      <ScrollToTop />
    </RouterProvider>
  );
}

export default App;
