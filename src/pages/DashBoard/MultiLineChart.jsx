import React, { useState, useRef,useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { FaFileDownload } from "react-icons/fa";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const allLabels = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

const allData = {
  accepted: [120, 190, 130, 150, 120, 130, 170, 180, 110, 150, 120, 140],
  rejected: [102, 103, 110, 115, 108, 112, 106, 107, 109, 111, 113, 115],
};

const BarGraph = () => {
  const chartRef = useRef(null);
  const chartContainerRef = useRef(null);
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
         
        }))
      : [
          {
            accepted:
              allData.accepted[allLabels.indexOf(selectedMonth)] ?? null,
            rejected:
              allData.rejected[allLabels.indexOf(selectedMonth)] ?? null,
           
          },
        ];

  const chartData = {
    labels: filteredLabels,
    datasets: [
      {
        label: "New Users",
        data: filteredData.map((item) => item.accepted),
        backgroundColor: "#5B247A",
        
        borderWidth: 1,
      },
      {
        label: "Customers",
        data: filteredData.map((item) => item.rejected),
        backgroundColor: "#C05DF0",
       
        borderWidth: 1,
      },
      
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Months",
          font: { size: 18 },
        },
        ticks: {
          font: { size: 14 },
        },
      },
      y: {
        title: {
          display: true,
          text: "Numbers",
          font: { size: 18 },
        },
        ticks: {
          font: { size: 14 },
        },
      },
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

    useEffect(() => {
      const handleScroll = () => {
        if (chartContainerRef.current) {
          const scrollLeft = chartContainerRef.current.scrollLeft;
          const monthIndex = Math.round(scrollLeft / 400); // Assuming each chart takes 400px
          setCurrentMonth(monthIndex);
        }
      };
  
      if (chartContainerRef.current) {
        chartContainerRef.current.addEventListener("scroll", handleScroll);
      }
  
      return () => {
        if (chartContainerRef.current) {
          chartContainerRef.current.removeEventListener("scroll", handleScroll);
        }
      };
    }, []);

  return (
    <div className="p-2 w-[700px] h-[570px] bg-gray-100 rounded-xl shadow-md">
      <div className="flex flex-col sm:flex-row items-end justify-end gap-4 mb-4">
        <div className="flex items-center gap-2">
          <label className="text-lg font-semibold text-gray-700">
            Select Month:
          </label>
          <select
            value={selectedMonth}
            onChange={handleMonthChange}
            className="px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
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
          className="bg-slate-200 text-black px-2 py-2 rounded-lg shadow-md transition duration-300 active:scale-95"
        >
          <FaFileDownload size={20} />
        </button>
      </div>

       <div className="flex overflow-x-auto scroll-smooth snap-x snap-mandatory w-[500px] h-[500px] rounded-lg " ref={chartContainerRef}
        style={{ scrollSnapType: "x mandatory", scrollbarWidth: "none", msOverflowStyle: "none" ,width:"600px"}}>
        <div className="w-[800px] flex-shrink-0 snap-start p-2" style={{ width: "1000px" }}> {/* Extended width for scrolling */}
          <Bar ref={chartRef} data={chartData} options={options} />
        </div>
      </div>
    </div>
  );
};

export default BarGraph;
