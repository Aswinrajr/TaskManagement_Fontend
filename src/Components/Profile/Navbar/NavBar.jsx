

const Navbar = () => {
  const userName = "Aswin"
  const onLogout = ()=>{
    
  }
  return (
    <nav className="bg-gray-800 p-4 flex justify-between items-center">
      <div className="text-white font-bold text-xl">Task Manager</div>
      <div className="flex items-center space-x-4">
        {userName && <div className="text-white mr-4">{userName}</div>}
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
