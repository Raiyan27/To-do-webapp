import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./pages/Layout";
import LoginPage from "./pages/LoginPage";
import Home from "./pages/Home";
import { AuthProvider } from "./Auth/AuthContext.js";
import ProtectedRoute from "./Auth/ProtectedRoute.js";
import SignUpPage from "./pages/SignUpPage.js";
import { ToastContainer } from "react-toastify";
import PublicRoute from "./Auth/PublicRoute.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: (
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        ),
      },
      {
        path: "/signup",
        element: (
          <PublicRoute>
            <SignUpPage />
          </PublicRoute>
        ),
      },
      {
        path: "home",
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
    <ToastContainer />
  </StrictMode>
);
