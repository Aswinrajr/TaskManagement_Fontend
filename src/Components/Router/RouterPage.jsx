import { createBrowserRouter } from "react-router-dom";
import Login from "../Login/Login";
import Signup from "../Signup/Signup";
import TaskView from "../Profile/Takview/TaskView";
import AddTask from "../Profile/Addtask/AddTask";

const routerPage = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path:"/signup",
    element:<Signup/>
  },
  {
    path:"/dashboard",
    element:<TaskView/>
  },
  {
    path:"/addtask",
    element:<AddTask/>
  }

]);

export default routerPage;
