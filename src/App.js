import "./App.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import AppLayout from "./appLayout/AppLayout";
import Profile from './pages/Profile';
import AboutPage from "./pages/AboutPage";
import BlogListButton from './pages/BlogListButton'; // Make sure this path matches your file structure
import HomePage from './pages/Home';
import BlogPage from "./pages/BlogPage";

const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<AppLayout />}>
    <Route path="/blogCreation" element={<Profile />} />
    <Route path="/blogList" element={<BlogListButton />} />   
    <Route path="/about" element={<AboutPage />} />
    <Route path="/homePage" element={<HomePage />} />
    <Route path="/blogPage" element={<BlogPage />} />
  </Route>
));

function App() {
  return <RouterProvider router={router} />;
}

export default App;