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
import BlogListButton from './components/BlogList'; // Make sure this path matches your file structure

const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<AppLayout />}>
    <Route path="blogCreation" element={<Profile />} />
    <Route path="blogList" element={<BlogListButton />} />   
    <Route path="/about" element={<AboutPage />} />
  </Route>
));

function App() {
  return <RouterProvider router={router} />;
}

export default App;