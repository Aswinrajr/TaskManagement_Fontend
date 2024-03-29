import { useState } from "react";
import Tasks from "./Tasks";
import Navbar from "../Navbar/NavBar";

const TaskView = () => {
  const [tasks, setTasks] = useState(Tasks);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

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
    ? tasks.filter((task) => task.status === "Completed").length
    : 0;
  const pendingTasks = tasks
    ? tasks.filter((task) => task.status === "Pending").length
    : 0;

  const handleEditTask = (taskId) => {
    console.log(taskId);
    setTasks();
  };

  const setShowAddTaskForm = () => {};

  const handleDeleteTask = (taskId) => {
    console.log(taskId);
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto mt-8">
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={handleSearch}
          className="w-64 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
        />

        <div className="grid grid-cols-3 gap-4 border border-gray-300 rounded-md mb-4">
          <div className="bg-green-300 p-4 rounded-md">
            <div className="font-semibold text-lg">{completedTasks}</div>
            <div>Completed Tasks</div>
          </div>
          <div className="bg-yellow-300 p-4 rounded-md">
            <div className="font-semibold text-lg">{pendingTasks}</div>
            <div>Pending Tasks</div>
          </div>
          <div className="bg-blue-300 p-4 rounded-md">
            <div className="font-semibold text-lg">{totalTasks}</div>
            <div>Total Tasks</div>
          </div>
        </div>

        <div className="flex justify-end mb-4">
          <button
            onClick={() => setShowAddTaskForm(true)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
          >
            Add Task
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full table-auto border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2">Task Name</th>
                <th className="border border-gray-300 px-4 py-2">Status</th>
                <th className="border border-gray-300 px-4 py-2">Created At</th>
                <th className="border border-gray-300 px-4 py-2">Due Date</th>
                <th className="border border-gray-300 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTasks.map((task) => (
                <tr key={task.id} className="hover:bg-gray-100">
                  <td className="border border-gray-300 px-4 py-2">
                    {task.taskName}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {task.status}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {task.createdAt}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {task.dueDate}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <button
                      onClick={() => handleEditTask(task.id)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-md mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteTask(task.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

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

export default TaskView;
