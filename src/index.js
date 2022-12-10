import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import Root from './routers/Root';
import Home, {loader as loaderHome}  from './routers/Home';
import CountriDetail, {loader as loaderCountriDetail} from './components/CountriDetail';

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

