import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Feed1 from "./Pages/Feed1";
import edit from "./Pages/Edit";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Register />,
  },
  {
    path:"/Login",
    element:<Login/>
  },
  {
    path: "/feed",
    element: <Feed1 />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <RouterProvider router={router} />
);