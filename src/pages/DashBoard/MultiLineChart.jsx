import React, { useState, useRef } from "react";
import { Line } from "react-chartjs-2";
import { FaFileDownload } from "react-icons/fa";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import zoomPlugin from "chartjs-plugin-zoom";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  zoomPlugin
);

const allLabels = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const allData = {
  accepted: [12, 19, 3, 5, 2, 3, 7, 8, 10, 15, 12, 14],
  rejected: [2, 3, 10, 15, 8, 12, 6, 7, 9, 11, 13, 15],
  total: [14, 22, 13, 20, 10, 15, 13, 15, 19, 26, 25, 29],
};

const LineGraph = () => {
  const chartRef = useRef(null);
  const [zoomed, setZoomed] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState("All");

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  const filteredLabels = selectedMonth === "All" ? allLabels : [selectedMonth];

  const filteredData =
    selectedMonth === "All"
      ? allLabels.map((_, index) => ({
          accepted: allData.accepted[index] ?? null,
          rejected: allData.rejected[index] ?? null,
          total: allData.total[index] ?? null,
        }))
      : [
          {
            accepted:
              allData.accepted[allLabels.indexOf(selectedMonth)] ?? null,
            rejected:
              allData.rejected[allLabels.indexOf(selectedMonth)] ?? null,
            total: allData.total[allLabels.indexOf(selectedMonth)] ?? null,
          },
        ];

  const chartData = {
    labels: filteredLabels,
    datasets: [
      {
        label: "Offer Accepted",
        data: filteredData.map((item) => item.accepted),
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 5,
      },
      {
        label: "Offer Rejected",
        data: filteredData.map((item) => item.rejected),
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 5,
      },
      {
        label: "Total Offers Filed",
        data: filteredData.map((item) => item.total),
        borderColor: "rgba(153, 102, 255, 1)",
        backgroundColor: "rgba(153, 102, 255, 0.2)",
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 5,
      },
    ],
  };

  //   const handleDoubleClick = (event) => {
  //     const chart = chartRef.current;
  //     if (!chart) return;

  //     const elements = chart.getElementsAtEventForMode(
  //       event,
  //       "nearest",
  //       { intersect: true },
  //       false
  //     );

  //     if (elements.length > 0) {
  //       const index = elements[0].index;
  //       const month = labels[index];

  //       if (zoomed) {
  //         chart.resetZoom();
  //         setZoomed(false);
  //         setSelectedMonth("All"); // Reset selection
  //       } else {
  //         chart.zoomScale("x", {
  //           min: index - 0.5,
  //           max: index + 0.5,
  //         });
  //         setZoomed(true);
  //         setSelectedMonth(month); // Update selected month
  //       }
  //     }
  //   };

  const options = {
    responsive: true,
  maintainAspectRatio: false, 
    plugins: {
      legend: {
        position: "top",
      },
      zoom: {
        pan: {
          enabled: true,
          mode: "x",
        },
        zoom: {
          wheel: {
            enabled: true,
          },
          pinch: {
            enabled: true,
          },
          mode: "x",
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Months",
          font: { size: 20 },
        },

        offset: true,
        ticks: {
          autoSkip: false,
          maxRotation: 0,
          minRotation: 0,
          font: { size: 15 },
        },
      },
      y: {
        title: {
          display: true,
          text: "Number of Offers",
          font: { size: 20 },
        },
        ticks: {
          font: { size: 15 },
        },
      },
    },
    interaction: {
      mode: "index",
      intersect: false,
    },
  };

  const downloadChart = () => {
    const chartInstance = chartRef.current;
    if (chartInstance) {
      const url = chartInstance.toBase64Image();
      const link = document.createElement("a");
      link.href = url;
      link.download = "offer_status_chart.png";
      link.click();
    }
  };

  return (
    <div style={{ width: "1100px", height: "400px" }}>
      <div className="flex flex-col sm:flex-row items-end justify-end gap-4 mb-4">
        <div className="flex items-center gap-2">
          <label className="text-lg font-semibold text-gray-700">
            Select Month:
          </label>
          <select
            value={selectedMonth}
            onChange={handleMonthChange}
            className="px-3 py-2 border border-gray-300 no-scrollbar rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          >
            <option value="All">All</option>
            {allLabels.map((month) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </select>
        </div>
        <button
          onClick={downloadChart}
          className=" bg-slate-200 text-black px-2 py-2 rounded-lg shadow-md  transition duration-300 active:scale-95"
        >
          <FaFileDownload size={20} />
        </button>
      </div>

      <div style={{ width:"1100px", height: "450px",margin: "auto", textAlign: "center" }}>
        <Line ref={chartRef} data={chartData} options={options} />
      </div>
    </div>
  );
};

export default LineGraph;
