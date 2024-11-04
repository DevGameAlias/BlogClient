import "./App.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import AppLayout from "./appLayout/AppLayout";
import Profile from './pages/Profile'; // Import your Profile component
import AboutPage from "./pages/AboutPage";

// Routes for the main application
// "/blogCreation" renders the Profile component
const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<AppLayout />}>
    <Route path="blogCreation" element={<Profile />} />
    <Route path="blogList" element={<Profile />} />   
    <Route path="/about" element={<AboutPage />} />
  </Route>
));

function App() {
  return <RouterProvider router={router} />;
}

export default App;
