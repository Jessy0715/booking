
import Login from "./pages/login";
import Register from "./pages/register";
import Admin from "./pages/admin";
import RoomInfo from "./pages/roomInfo";
import RoomReserve from "./pages/roomReserve";
const routes = [
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/admin",
    element: <Admin />,
  },
  {
    path: "/roomInfo",
    element: <RoomInfo />,
    children: [
      {
        path: "roomReserve",
        element: <RoomReserve />,
      },
    ],
  },
  // {
  //   path: "*",
  //   element: <NotFound />,
  //   children: [],
  // },
];

export default routes;