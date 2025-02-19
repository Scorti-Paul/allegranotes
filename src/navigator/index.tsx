import { FC } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import LoginPage from "pages/auth/login";
import Register from "../pages/auth/register";
import Layout from "./layout";
// import UserProfile from "pages/main/users/components/userprofile";
import Notes from "pages/main/notes";
import PageNotFound from "pages/pagenotfound";
import Category from "pages/main/category/category";
import Tags from "pages/main/tag/tag";
import CreateNote from "pages/main/notes/components/createnote";
import UpdateNote from "pages/main/notes/components/update";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Notes />,
      },
      {
        path: "/Notes",
        element: <Notes />,
      },
      {
        path: "notes/create-note",
        element: <CreateNote />,
      },
      {
        path: "/categories",
        element: <Category />,
      },
      {
        path: "/tags",
        element: <Tags />,
      },
      {
        path: "/notes/update-note",
        element: <UpdateNote />,
      },
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