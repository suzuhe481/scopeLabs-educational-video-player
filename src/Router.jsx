import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./components/Home/Home";
import UploadVideoPage from "./components/UploadVideoPage/UploadVideoPage";
import VideoPage from "./components/VideoPage/VideoPage";
import EditVideoPage from "./components/EditVideoPage/EditVideoPage";

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
  ]);

  return <RouterProvider router={router} />;
};

export default Router;
