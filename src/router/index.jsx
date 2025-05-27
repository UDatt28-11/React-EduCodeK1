import { createBrowserRouter, RouterProvider } from "react-router-dom";
import FormTodo from "../pages/FormTodo";
import ClientLayout from "../layouts/ClientLayout";
import HomePage from "../pages/HomePage";
import Editform from "../pages/Editform";
import DetailTodo from "../pages/DetailTodo";

const router = createBrowserRouter([
  // * Layout Client
  {
    path: "/",
    element: <ClientLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "/add", element: <FormTodo /> },
      { path: "/edit/:id", element: <Editform /> },
      { path: "/view/:id", element: <DetailTodo /> },
    ],
  },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
