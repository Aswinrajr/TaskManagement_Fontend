import { useState } from "react";
import Navbar from "../Navbar/NavBar";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AddTask = () => {
  const [taskName, setTaskName] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Pending");
  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_BASE_URL


  const handleSubmit = async (e) => {
    e.preventDefault();

    setTaskName("");
    setDueDate("");
    setDescription("");
    setStatus("Pending");
    const taskData = {
      taskName,
      dueDate,
      description,
      status,
    };
    const response = await axios.post(
      `${baseUrl}/addtask`,
      taskData
    );
    console.log("response");
    try{
      if (response.status === 201) {
        console.log("Task created successfull");
        toast.success(response.data.message);
        setTimeout(() => {
          navigate("/dashboard");
        }, 1500);
      }

    }catch(err){
      console.log("Error in ading task",err)
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
          <h2 className="text-xl font-semibold mb-4">Add New Task</h2>
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
            Add Task
          </button>
        </form>
      </div>
    </>
  );
};

export default AddTask;
