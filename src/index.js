import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider} from "react-router-dom";
import Home, {loader as loaderHome}  from './routers/Home';
import CountriDetail, {loader as loaderCountriDetail} from './routers/CountriDetail';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    loader: loaderHome,
  },
  {
    path: "/:countriName",
    element: <CountriDetail />,
    loader: loaderCountriDetail,
  },
]);

const root = ReactDOM.createRoot(document.querySelector(".Main"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

