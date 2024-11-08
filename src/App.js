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
import Login from "./components/Login";
import BlogListButton from './components/BlogListButton'; // Make sure this path matches your file structure
import BlogList from './pages/BlogList';
import HomePage from './pages/Home';
import BlogPage from "./pages/BlogPage";
import StoryList from './components/StoryList'; // Import the new StoryList component


const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<AppLayout />}>
    <Route path="/blogCreation" element={<Profile />} />
    <Route path="/blogList" element={<BlogList />} />   
    <Route path="/about" element={<AboutPage />} />
    <Route path="/homePage" element={<HomePage />} />
    <Route path="/blogPage" element={<BlogPage />} />
    <Route path="about" element={<AboutPage />} />
    <Route path="login" element={<Login />}/>
    <Route path="storylist" element={<StoryList />}/>


  </Route>
));

function App() {

  return <RouterProvider router={router} />
  

}

export default App;