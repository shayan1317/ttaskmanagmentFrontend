import TasksTable from "@components/TasksTable";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h2 className="text-2xl font-semibold mt-10 mb-4">All Tasks</h2>
      <div className="w-full max-w-4xl mb-6 flex flex-wrap items-center justify-between gap-4">
        {/*filter for  search Iput */}
        <input
          type="text"
          placeholder="Search tasks..."
          className="w-full sm:w-1/2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* filter for status */}
        <select className="w-full sm:w-1/4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option value="">All Statuses</option>
          <option value="TODO">To Do</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="DONE">Done</option>
        </select>

        {/* filter for prority */}
        <select className="w-full sm:w-1/4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option value="">All Priorities</option>
          <option value="LOW">Low</option>
          <option value="MEDIUM">Medium</option>
          <option value="HIGH">High</option>
        </select>
      </div>
      <TasksTable />
    </div>
  );
};

export default Home;
