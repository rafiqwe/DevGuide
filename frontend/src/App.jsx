import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MainLayout from "./LayOut/MainLayOut";
import Roadmap from "./pages/RoadMap";
import ComingSoon from "./pages/ComingSoon";
import Playlist from "./pages/PlayList";
import Profile from "./pages/Profile";
import WatchLater from "./pages/WatchLater";
import ErrorPage from "./pages/ErrorPage";
import SearchResults from "./pages/SearchResults";
import WatchVideo from "./pages/WatchVideo";
import ProtectedWraper from "./pages/ProtectedWraper";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/roadmap",
          element: <Roadmap />,
        },
        {
          path: "/playlists",
          element: <Playlist />,
        },
        {
          path: "/profile",
          element: (
            <ProtectedWraper>
              <Profile />
            </ProtectedWraper>
          ),
        },
        {
          path: "/watch-later",
          element: <WatchLater />,
        },
        {
          path: "/results",
          element: <SearchResults />,
        },
        {
          path: "/watch/:videoId",
          element: <WatchVideo />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
