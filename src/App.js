import "./App.css";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import appLayout from "./appLayout/appLayout";


//creating router 
const  router= createBrowserRouter(createRoutesFromElements((
  <Route path="/" element={<appLayout />} >

  </Route>
)))

function App() {
  return <RouterProvider router={router} />
  

}

export default App;


