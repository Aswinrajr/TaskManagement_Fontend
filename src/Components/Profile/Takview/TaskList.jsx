import PropTypes from "prop-types";

const TaskList = ({ filteredTasks, handleEditTask, handleDeleteTask }) => {
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
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
            <tr key={task._id} className="hover:bg-gray-100">
              <td className="border border-gray-300 px-4 py-2">
                {task.taskName}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {task.taskStatus}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {formatDate(task.taskCreatedAt)}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {formatDate(task.taskDueDate)}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <button
                  onClick={() => handleEditTask(task._id)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-md mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteTask(task._id)}
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
  );
};

TaskList.propTypes = {
  filteredTasks: PropTypes.array.isRequired,
  handleEditTask: PropTypes.func.isRequired,
  handleDeleteTask: PropTypes.func.isRequired,
};

export default TaskList;
