import "./App.css";
import Profile from "./pages/Profile";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";


import AppLayout from "./appLayout/AppLayout";
// import Login from './components/Login';


//Routes for the main application
const  router= createBrowserRouter(createRoutesFromElements((
  <Route path="/" element={<AppLayout />} >
  <Route path ="/short-stories" element = {<Profile />} />
  {/* <Route path ="/login" element = {<Login />} /> */}
  </Route>
)))

function App() {
  return <RouterProvider router={router} />
  
}

export default App;


