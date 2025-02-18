import { FC } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import LoginPage from "pages/auth/login";
import Register from "../pages/auth/register";
// import Dashboard from "../pages/main/dashboard";
import Layout from "./layout";
// import Settings from "../pages/main/settings";
// import UpdateUser from "pages/main/users/components/updateuser";
// import UserProfile from "pages/main/users/components/userprofile";
// import CreateNote from "pages/main/note/components/createnote";
// import UpdateNote from "pages/main/note/components/updatenote";
import Notes from "pages/main/notes";
import PageNotFound from "pages/pagenotfound";
// import ForgotPassword from "pages/auth/forgot";
// import ResetPassword from "pages/auth/reset";
// import Category from "pages/main/category/category";
// import Tag from "pages/main/tag/tag";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      // {
      //   path: "/",
      //   element: <Dashboard />,
      // },
      // {
      //   path: "/dashboard",
      //   element: <Dashboard />,
      // },
      {
        path: "notes",
        element: <Notes />,
      },
      // {
      //   path: "createnote",
      //   element: <CreateNote />,
      // },
      // {
      //   path: "/note/update-note",
      //   element: <UpdateProduce />,
      // },
      // {
      //   path: "users/update-user",
      //   element: <UpdateUser />,
      // },
      // {
      //   path: "users/user/profile",
      //   element: <UserProfile />,
      // },
      // {
      //   path: "settings",
      //   element: <Settings />,
      // },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
], {
  future: {
    v7_relativeSplatPath: true,
  },
});

const Navigator: FC = () => {
  return <RouterProvider router={router} />;
};

export default Navigator;