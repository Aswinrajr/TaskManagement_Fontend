import { createBrowserRouter } from "react-router-dom";
import Login from "../Login/Login";
import Signup from "../Signup/Signup";

import AddTask from "../Profile/Addtask/AddTask";
import TaskViews from "../Profile/Takview/TaskViews";
import EditTask from "../Profile/EditTask/EditTask";

const routerPage = createBrowserRouter([
  {
    path: "/dashboard",
    element: <TaskViews />,
  },
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/addtask",
    element: <AddTask />,
  },
  {
    path: "/edittask/:taskId",
    element: <EditTask />,
  },
]);

export default routerPage;
