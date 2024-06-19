import { useEffect, useState } from "react";
import Navbar from "../Navbar/NavBar";
import SearchBar from "./SearchBar";
import TaskList from "./TaskList";
import TaskSummary from "./TaskSummary";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

const TaskViews = () => {
  const baseUrl = import.meta.env.VITE_BASE_URL

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseUrl}/getalltask`);
        setTasks(response.data.tasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    fetchData();
  }, []);
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const user = localStorage.getItem("user");
  if (!user) return <Navigate to="/" />;

  const tasksPerPage = 3;
  const totalTasks = tasks ? tasks.length : 0;
  const totalPages = Math.ceil(totalTasks / tasksPerPage);

  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = tasks
    ? tasks.slice(indexOfFirstTask, indexOfLastTask)
    : [];

  const handleChangePage = (page) => setCurrentPage(page);

  const handleSearch = (e) => setSearchTerm(e.target.value);

  const filteredTasks = currentTasks.filter((task) =>
    task.taskName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const completedTasks = tasks
    ? tasks.filter((task) => task.taskStatus === "Completed").length
    : 0;
  const pendingTasks = tasks
    ? tasks.filter((task) => task.taskStatus === "Pending").length
    : 0;

  const handleEditTask = async (taskId) => {
    console.log(taskId);
    navigate(`/edittask/${taskId}`);
  };

  const handleDeleteTask = async (taskId) => {
    try {
      console.log(taskId);
      const response = await axios.put(
        `${baseUrl}/softdelete/${taskId}`
      );
      console.log(response);

      const updatedTasks = tasks.filter((task) => task._id !== taskId);

      setTasks(updatedTasks);
      console.log(updatedTasks);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto mt-8">
        <SearchBar searchTerm={searchTerm} handleSearch={handleSearch} />

        <TaskSummary
          completedTasks={completedTasks}
          pendingTasks={pendingTasks}
          totalTasks={totalTasks}
        />

        <div className="flex justify-end mb-4">
          <button
            onClick={() => navigate("/addtask")}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
          >
            Add Task
          </button>
        </div>

        <TaskList
          filteredTasks={filteredTasks}
          handleEditTask={handleEditTask}
          handleDeleteTask={handleDeleteTask}
        />

        <div className="flex justify-end mt-4">
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => handleChangePage(index + 1)}
              className={`mx-1 py-1 px-3 rounded-md ${
                currentPage === index + 1
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default TaskViews;
