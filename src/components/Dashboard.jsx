import { LineChart, Users, Box, Package } from "lucide-react";

const Dashboard = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard icon={<Users />} title="Users" count="1,245" />
        <StatCard icon={<Box />} title="Categories" count="32" />
        <StatCard icon={<Package />} title="Products" count="128" />
        <StatCard icon={<LineChart />} title="Sales" count="$45,032" />
      </div>
    </div>
  );
};

const StatCard = ({ icon, title, count }) => (
  <div className="bg-white p-5 rounded-xl shadow-md flex items-center space-x-4">
    <div className="p-3 bg-primary text-white rounded-full">{icon}</div>
    <div>
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="text-gray-500 text-lg">{count}</p>
    </div>
  </div>
);

export default Dashboard;

