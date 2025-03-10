import React, { useRef, useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ActivityBar = () => {
  const chartContainerRef = useRef(null);
  const [currentMonth, setCurrentMonth] = useState(0);

  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  const recruitersData = [80, 90, 100, 85, 95, 110, 120, 130, 125, 140, 145, 150];
  const candidatesData = [200, 220, 210, 230, 240, 250, 260, 270, 280, 290, 300, 310];

  // Chart data
  const generateChartData = (index) => ({
    labels: [months[index]],
    datasets: [
      {
        label: "Recruiters",
        data: [recruitersData[index]],
        backgroundColor: "#5B247A",
        borderRadius: 10,
      },
      {
        label: "Candidates",
        data: [candidatesData[index]],
        backgroundColor: "#C05DF0",
        borderRadius: 10,
      },
    ],
  });

  const options = {
    indexAxis: "y",
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: true, position: "top" },
      tooltip: { enabled: true },
    },
    scales: {
      x: { beginAtZero: true, ticks: { font: { size: 14 } } },
      y: { ticks: { font: { size: 14 } } },
    },
  };

  // Auto-detect scrolling position
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
    <div className="p-2 w-[400px] h-[570px] bg-gray-100 rounded-xl shadow-md">
      <h2 className="font-bold text-lg mb-2">Active Users - {months[currentMonth]}</h2>
      
      <div
        className="flex overflow-x-auto scroll-smooth snap-x snap-mandatory w-[370px] h-[500px] rounded-lg"
        ref={chartContainerRef}
        style={{ scrollSnapType: "x mandatory", scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {months.map((month, index) => (
          <div
            key={index}
            className="w-[370px] flex-shrink-0 snap-start p-2"
          >
            <Bar data={generateChartData(index)} options={options} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityBar;
