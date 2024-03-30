import { useDispatch } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { logoutUser } from "../../Features/userAuth";

const Navbar = () => {
  const dispath = useDispatch();
  const navigate = useNavigate();
  const userName = localStorage.getItem("user");
  console.log("Navbar user",userName)
  const email = JSON.parse(userName);
  const name = email.user;
  console.log(name);
  if (!name) return <Navigate to="/" />;


  if (!name.length > 0) return <Navigate to="/" />;

  const onLogout = () => {
    dispath(logoutUser());
    navigate("/");
  };
  return (
    <nav className="bg-gray-800 p-4 flex justify-between items-center">
      
      <div className="text-white font-bold text-xl">Task Manager</div>
      <div className="flex items-center space-x-4">
        {userName && <div className="text-white mr-4">{name}</div>}
        <button
          onClick={onLogout}
          className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
