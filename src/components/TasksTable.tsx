import { useTasks } from "@hooks/useTasks";
import { useTaskStore } from "@store/useTaskStore";
import { useQuery } from "@tanstack/react-query";
import { statusMap } from "@utils/types";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const TasksTable = () => {
  const navigate = useNavigate();
  const { fetchTasks, deleteTask } = useTasks(); // from hook
  // upon query my tasks state is updated in custom hook defined  and i can get my tasks friom my store as follows

  const {
    data: alltasks,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["tasks"],
    queryFn: fetchTasks,
  });
  const { tasks } = useTaskStore();
  // if data is not recived yet
  // show some loader to enhance user experience
  if (isLoading) {
    return <div>loading</div>;
  }
  const handleEdit = (id: number) => {
    navigate(`/editTask/${id}`);
    console.log("Edit clicked for task", id);
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteTask(id);
      toast.info("Task deleted");
    } catch (err) {
      console.log(err);
    }
  };
  console.log("tasksss", alltasks, tasks);
  const handleAddTask = () => {
    navigate("/addTask");
  };
  return (
    <div className="flex gap-4 p-6 overflow-x-auto h-[90vh] ">
      <div>
        <button
          onClick={handleAddTask}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded shadow-md transition duration-200"
        >
          + Add Task
        </button>
      </div>

      {["To Do", "In Progress", "Done"].map((status) => (
        <div
          key={status}
          className="w-[300px] bg-gray-100 rounded-xl p-4 shadow"
        >
          <h2 className="text-xl font-semibold mb-4">{status}</h2>
          <div className="flex flex-col gap-3">
            {tasks
              .filter((task) => task.status === statusMap[status])
              .map((task) => (
                <div
                  key={task.id}
                  className="bg-white p-3 rounded shadow hover:shadow-lg transition flex flex-col justify-between"
                >
                  <div>
                    <h3 className="font-medium">{task.title}</h3>
                    <div className="text-sm text-gray-500">
                      {task.assignee?.name}
                    </div>
                    <div className="text-xs text-gray-400">
                      {/* Due: {format(task.dueDate, "MMM dd")} */}
                    </div>
                    <span
                      className={`text-xs px-2 py-1 rounded-full mt-1 inline-block 
      ${
        task.priority === "High"
          ? "bg-red-100 text-red-600"
          : task.priority === "Medium"
          ? "bg-yellow-100 text-yellow-600"
          : "bg-green-100 text-green-600"
      }`}
                    >
                      {task.priority}
                    </span>
                  </div>

                  <div className="flex justify-between mt-3">
                    <button
                      className="text-xs text-blue-600 hover:underline"
                      onClick={() => handleEdit(task.id)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-xs text-red-600 hover:underline"
                      onClick={() => handleDelete(task.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TasksTable;
