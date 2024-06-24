import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./components/Home/Home";
import UploadVideoPage from "./components/UploadVideoPage/UploadVideoPage";
import VideoPage from "./components/VideoPage/VideoPage";
import EditVideoPage from "./components/EditVideoPage/EditVideoPage";
import SearchUserPage from "./components/SearchUserPage/SearchUserPage";
import ErrorPage from "./components/ErrorPage/ErrorPage";

const Router = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/video/:id",
      element: <VideoPage />,
    },
    {
      path: "/upload",
      element: <UploadVideoPage />,
    },
    {
      path: "/edit/video/:id",
      element: <EditVideoPage />,
    },
    {
      path: "/search/:id",
      element: <SearchUserPage />,
    },
    {
      path: "*",
      element: <ErrorPage />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;
