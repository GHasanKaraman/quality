import { Link } from "react-router";

const Dashboard = () => {
  return (
    <main className="flex-1 p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <Link to="/dashboard/users">Users</Link>
      <p>Welcome to the dashboard!</p>
      {/* Add more dashboard content here */}
    </main>
  );
};
export default Dashboard;
