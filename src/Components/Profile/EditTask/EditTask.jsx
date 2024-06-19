import { useEffect, useState } from "react";
import Navbar from "../Navbar/NavBar";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";

const EditTask = () => {
  const baseUrl = import.meta.env.VITE_TASK_MANAGER_BASE_URL

  const navigate = useNavigate()
  const [taskName, setTaskName] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Pending");
  const { taskId } = useParams();
  console.log("Params", taskId);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    let month = (1 + date.getMonth()).toString().padStart(2, "0"); 
    let day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchTask = await axios.get(
          `${baseUrl}/edittask/${taskId}`
        );
        console.log("TaskData edit ", fetchTask.data);

        const taskData = fetchTask.data.task;
        const formattedDueDate = formatDate(taskData.taskDueDate);

        setTaskName(taskData.taskName || "");
        setDueDate(formattedDueDate || "");
        setDescription(taskData.taskDescription || "");
        setStatus(taskData.taskStatus || "Pending");
      } catch (error) {
        console.error("Error fetching task data:", error);
      }
    };
    fetchData();
  }, [taskId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const taskData = {
      taskName,
      dueDate,
      description,
      status,
    };
    try {
      const response = await axios.put(
        `${baseUrl}/updatetask/${taskId}`,
        taskData
      );
      console.log("Update response:", response);
      if(response.status ===200){
        toast.success("Task updated successfully")
        
        setTimeout(() => {
          navigate("/dashboard")
        }, 1500);

        
      }
     
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return (
    <>
      <Navbar />

      <div className="max-w-md mx-auto mt-20">
      <Toaster position="top-center" reverseOrder={false} />
        <form
          onSubmit={handleSubmit}
          className="bg-white p-4 rounded-md shadow-md"
        >
          <h2 className="text-xl font-semibold mb-4">Edit Task</h2>
          <div className="mb-4">
            <label htmlFor="taskName" className="block mb-2 font-semibold">
              Task Name
            </label>
            <input
              type="text"
              id="taskName"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="dueDate" className="block mb-2 font-semibold">
              Due Date
            </label>
            <input
              type="date"
              id="dueDate"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block mb-2 font-semibold">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={4}
            ></textarea>
          </div>
          <div className="mb-4">
            <label htmlFor="status" className="block mb-2 font-semibold">
              Status
            </label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md block mx-auto"
          >
            Update Task
          </button>
        </form>
      </div>
    </>
  );
};

export default EditTask;
