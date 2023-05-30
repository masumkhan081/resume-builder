import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
//
import Provider from "./context/Provider";
import ErrorPage from "./pages/ErrorPage";
import LandingPage from "./pages/LandingPage";
import Header from "./pages/partials/Header";
import LoginPage from "./pages/LoginPage";
import AboutPage from "./pages/AboutPage";
import Page1 from "./pages/Page1";
import Page2 from "./pages/Page2";
import Page3 from "./pages/Page3";
import ResumePage from "./pages/ResumePage";

//
const root = ReactDOM.createRoot(document.getElementById("root"));
//
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Header />
        <Outlet />
      </>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <LandingPage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "about",
        element: <AboutPage />,
      },
      {
        path: "resume",
        element: <ResumePage />,
      },
      {
        path: "resume-page-1",
        element: <Page1 />,
      },
      {
        path: "resume-page-2",
        element: <Page2 />,
      },
      {
        path: "resume-page-3",
        element: <Page3 />,
      },
    ],
  },
]);
//
root.render(
  <Provider>
    <RouterProvider router={router} />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
