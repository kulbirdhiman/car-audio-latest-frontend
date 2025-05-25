"use client";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { GetStats, GetSalesChart } from "@/store/actions/admin/dashbord";
import dayjs from "dayjs";

// Dynamically import ApexCharts
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const Dashboard = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [data, setData] = useState<any>(null);
  const [chartdata, setChartdata] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [showCustomModal, setShowCustomModal] = useState(false);

  const [chartType, setChartType] = useState<"bar" | "line" | "area" | "pie">(
    "bar"
  );

  const [customStart, setCustomStart] = useState<string>(
    dayjs().subtract(7, "day").format("YYYY-MM-DD")
  );
  const [customEnd, setCustomEnd] = useState<string>(
    dayjs().format("YYYY-MM-DD")
  );

  const fetchStats = async (params: Record<string, any>) => {
    try {
      setLoading(true);
      const res = await dispatch(GetStats(params)).unwrap();
      if (res.success) {
        setData(res.data.result);
      }
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setLoading(false);
    }
  };

  const fecthCharts = async (params: Record<string, any>) => {
    try {
      setLoading(true);
      const res = await dispatch(GetSalesChart(params)).unwrap();
      if (res.success) {
        setChartdata(res.data);
      }
    } catch (error) {
      console.error("Error fetching chart:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats({ last_month: true });
    fecthCharts({ last_seven_days: true });
  }, []);

  const totalSales = data?.totalSales ?? 0;
  const avgSale = Number((totalSales / (data?.days || 1)).toFixed(2));

  const stats = {
    totalUsers: data?.totalUsers ?? 0,
    totalSales: totalSales,
    totalOrders: data?.totalOrders ?? 0,
    lastMonthSales: avgSale,
  };

  const chartOptions = {
    chart: {
      type: chartType,
      toolbar: { show: true },
    },
    xaxis: {
      categories: chartdata?.result?.dates ?? [],
    },
  };

  const chartSeries = [
    {
      name: "Sales",
      data: chartdata?.result?.sales ?? [],
    },
  ];

  const handleDateRangeClick = (range: Record<string, boolean>) => {
    fetchStats(range);
    fecthCharts(range);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Dashboard</h1>

      {/* Buttons */}
      <div className="flex gap-3 justify-center mb-6 overflow-x-auto whitespace">
        <button
          disabled={loading}
          onClick={() => handleDateRangeClick({ this_year: true })}
          className="btn"
        >
          This Year
        </button>
        <button
          disabled={loading}
          onClick={() => handleDateRangeClick({ this_month: true })}
          className="btn"
        >
          This Month
        </button>
        <button
          disabled={loading}
          onClick={() => handleDateRangeClick({ last_month: true })}
          className="btn"
        >
          Last Month
        </button>
        <button
          disabled={loading}
          onClick={() => handleDateRangeClick({ last_seven_days: true })}
          className="btn"
        >
          Last 7 Days
        </button>
        <button
          disabled={loading}
          onClick={() => handleDateRangeClick({ today: true })}
          className="btn"
        >
          Today
        </button>
        <button
          disabled={loading}
          onClick={() => setShowCustomModal(true)}
          className="btn"
        >
          Custom
        </button>
      </div>

      {/* Custom Modal */}
      {showCustomModal && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-md flex flex-col md:flex-row gap-3 items-center">
            <label className="font-semibold">Custom Range:</label>
            <input
              type="date"
              value={customStart}
              max={customEnd}
              onChange={(e) => setCustomStart(e.target.value)}
              className="p-2 border rounded"
            />
            <span>to</span>
            <input
              type="date"
              value={customEnd}
              min={customStart}
              onChange={(e) => setCustomEnd(e.target.value)}
              className="p-2 border rounded"
            />
            <button
              disabled={loading || !customStart || !customEnd}
              onClick={() => {
                const startISO = new Date(customStart).toISOString();
                const endISO = new Date(customEnd).toISOString();
                fetchStats({
                  custom: true,
                  start_date: startISO,
                  end_date: endISO,
                });
                fecthCharts({
                  custom: true,
                  start_date: startISO,
                  end_date: endISO,
                });
                setShowCustomModal(false);
              }}
              className="btn"
            >
              Fetch
            </button>
            <button
              onClick={() => setShowCustomModal(false)}
              className="ml-2 text-red-500 font-semibold"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Loading */}
      {loading && (
        <p className="text-center mb-6 text-indigo-600 font-semibold">
          Loading stats...
        </p>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        {Object.entries(stats).map(([key, value]) => (
          <div
            key={key}
            className="bg-white p-6 rounded-lg shadow-md text-center"
          >
            <h2 className="text-lg font-semibold capitalize text-gray-600">
              {key.replace(/([A-Z])/g, " $1").trim()}
            </h2>
            <p className="text-3xl font-bold text-indigo-600 mt-2">
              {typeof value === "number" ? value.toLocaleString() : value}
            </p>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="p-6 bg-white rounded-lg shadow-md mb-10">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Sales Overview</h2>
          <select
            className="p-2 border rounded-md"
            value={chartType}
            onChange={(e) =>
              setChartType(e.target.value as "bar" | "line" | "area" | "pie")
            }
          >
            <option value="bar">Bar Chart</option>
            <option value="line">Line Chart</option>
            <option value="area">Area Chart</option>
            {/* <option value="pie">Pie Chart</option> */}
          </select>
        </div>
        <Chart
          key={chartType} // 👈 Force re-render on chart type change
          options={chartOptions}
          series={chartSeries}
          type={chartType}
          height={350}
        />
      </div>

      <style jsx>{`
        .btn {
          background-color: #4f46e5;
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 0.375rem;
          font-weight: 600;
          transition: background-color 0.2s;
        }
        .btn:hover:not(:disabled) {
          background-color: #4338ca;
          cursor: pointer;
        }
        .btn:disabled {
          background-color: #a5b4fc;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
};

export default Dashboard;
