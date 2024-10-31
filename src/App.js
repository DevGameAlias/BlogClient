import "./App.css";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import AppLayout from "./appLayout/AppLayout";
import Profile from './pages/Profile'; // Import your Profile component


//Routes for the main application
// "/blogCreation" renders the Profile component
const  router= createBrowserRouter(createRoutesFromElements((
  <Route path="/" element={<AppLayout />} >
     <Route path="blogCreation" element={<Profile />} /> 

  </Route>
)))

function App() {
  return <RouterProvider router={router} />
   

}

export default App;


