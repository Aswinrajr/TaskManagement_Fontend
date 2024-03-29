
import PropTypes from "prop-types";
const TaskSummary = ({ completedTasks, pendingTasks, totalTasks }) => {
  return (
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
  );
};

TaskSummary.propTypes = {
  completedTasks: PropTypes.number.isRequired,
  pendingTasks: PropTypes.number.isRequired,
  totalTasks: PropTypes.number.isRequired,
};

export default TaskSummary;
