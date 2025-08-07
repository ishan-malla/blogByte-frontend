import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { store } from "./store/store.tsx";
import { Provider } from "react-redux";
import Landing from "./pages/Landing.tsx";
import Login from "./pages/Login.tsx";
import Register from "./pages/Register.tsx";
import Home from "./pages/Home.tsx";
import BlogPost from "./pages/BlogPost.tsx";
import AdminDashboard from "./pages/Dashboard.tsx";
import AdminRoute from "./components/AdminRoute.tsx";
import Logout from "./components/Logout.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children: [
      { index: true, element: <Landing /> },
      { path: "about", element: <App /> },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/home",
        element: <Home></Home>,
      },
      {
        path: "/post",
        element: <BlogPost></BlogPost>,
      },
      // Protected admin routes
      {
        path: "/admin/dashboard",
        element: (
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        ),
      },
      // You can add more admin routes here
      {
        path: "/admin/users",
        element: (
          <AdminRoute>
            {/* Add your admin users component here */}
            <div>Admin Users Management</div>
          </AdminRoute>
        ),
      },
      {
        path: "/admin/posts",
        element: (
          <AdminRoute>
            {/* Add your admin posts component here */}
            <div>Admin Posts Management</div>
          </AdminRoute>
        ),
      },
      {
        path: "/logout",
        element: <Logout />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}></RouterProvider>
    </Provider>
  </StrictMode>
);
