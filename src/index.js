import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import Root from './routers/Root';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
  }
]);

const root = ReactDOM.createRoot(document.querySelector(".Main"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

