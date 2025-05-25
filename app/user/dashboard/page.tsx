"use client"; // Required for Next.js App Router
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";

// Dynamically import ApexCharts (Prevents SSR Issues)
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const UserDashboard = () => {
  const user = {
    name: "karan dhiman",
    purchases: 12,
    totalSpent: 4500,
    activeOrders: 3,
    lastYearSpent: 15000,
    lastMonthSpent: 1200,
    thisMonthSpent: 1200,
    orders: [
      { id: "ORD001", product: "Laptop", amount: 1200, status: "Completed" },
      { id: "ORD002", product: "Smartphone", amount: 800, status: "Pending" },
      { id: "ORD003", product: "Headphones", amount: 150, status: "Shipped" },
    ],
  };
  
  // User-specific stats
  const userStats = {
    totalPurchases: user.purchases || 0,
    totalSpent: user.totalSpent || 0,
    activeOrders: user.activeOrders || 0,
    lastYearSpent: user.lastYearSpent || 0,
    lastMonthSpent: user.lastMonthSpent || 0,
    thisMonthSpent: user.lastMonthSpent || 0,
  };

  // Chart Data
  const chartOptions: ApexOptions = {
    chart: {
      type: "bar",
      toolbar: { show: false },
    },
    xaxis: {
      categories: Object.keys(userStats).map((key) => key.replace(/([A-Z])/g, " $1")),
    },
  };

  const chartSeries = [
    {
      name: "User Stats",
      data: Object.values(userStats),
    },
  ];

  return (
    <div className="p-6 text-black bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">Welcome, {user.name}</h1>

      {/* User Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Object.entries(userStats).map(([key, value]) => (
          <div key={key} className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold capitalize text-gray-600">
              {key.replace(/([A-Z])/g, " $1")}
            </h2>
            <p className="text-3xl font-bold text-indigo-600 mt-2">
              {value.toLocaleString()}
            </p>
          </div>
        ))}
      </div>

      {/* Chart Section */}
      <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">User Spending Overview</h2>
        <Chart options={chartOptions} series={chartSeries} type="bar" height={350} />
      </div>

      {/* Recent Orders Table */}
      <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
        <table className="w-full border-collapse border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 border">Order ID</th>
              <th className="p-3 border">Product</th>
              <th className="p-3 border">Amount</th>
              <th className="p-3 border">Status</th>
            </tr>
          </thead>
          <tbody>
            {user.orders?.map((order) => (
              <tr key={order.id} className="text-center">
                <td className="p-3 border">{order.id}</td>
                <td className="p-3 border">{order.product}</td>
                <td className="p-3 border">${order.amount}</td>
                <td
                  className={`p-3 border ${
                    order.status === "Completed"
                      ? "text-green-600"
                      : order.status === "Pending"
                      ? "text-yellow-600"
                      : "text-blue-600"
                  }`}
                >
                  {order.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserDashboard;
