import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";

const monthData = [
  { name: "Jan", value: 80, color: "#d896ff" },
  { name: "Feb", value: 120, color: "#8a2be2" },
  { name: "Mar", value: 160, color: "#7b5aff" },
  { name: "Apr", value: 220, color: "#005eff" },
];

const categoryData = [
  { name: "Active Offer prediction", value: 50 },
  { name: "Candidate tracking", value: 300 },
  { name: "Job offers released", value: 89 },
  { name: "Ghosting notification", value: 58 },
];

const DashboardGraphs = () => {
return (
    <div className="f w-full flex justify-center gap-6 pt-6">
        {/* Left Chart - Next 4 Months Projections */}
        <div className="border-2 border-gray-200 rounded-lg p-4 bg-gray-100 shadow-lg w-1/2">
            <h3 className="font-bold text-lg mb-2">Next 4 months projections</h3>

            {/* Custom Legend for Months and Colors */}
            <div className="flex justify-center gap-4 mb-4">
                {monthData.map((month, index) => (
                    <div key={index} className="flex items-center gap-2">
                        <div
                            className="w-4 h-4 rounded-full"
                            style={{ backgroundColor: month.color }}
                        />
                        <span>{month.name}</span>
                    </div>
                ))}
            </div>

            <ResponsiveContainer width="100%" height={250}>
                <BarChart data={monthData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    {/* Single Bar with custom shape for dynamic colors */}
                    <Bar
                        dataKey="value"
                        name="Projections"
                        barSize={50} // Increased bar thickness
                        shape={(props) => {
                            const { x, y, width, height, index } = props;
                            const fillColor = monthData[index].color; // Get color from data
                            return (
                                <rect
                                    x={x}
                                    y={y}
                                    width={width}
                                    height={height}
                                    fill={fillColor} // Set dynamic color
                                />
                            );
                        }}
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>

        {/* Right Chart - Categories Overview */}
        <div className="border-2 border-gray-300 rounded-lg p-4 bg-gray-100 shadow-lg w-1/2">
            <ResponsiveContainer width="100%" height={350}>
                <BarChart layout="vertical" data={categoryData}>
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" width={100} />
                    <Tooltip />
                    <Bar dataKey="value" fill="#5B247A" barSize={40} /> {/* Increased bar thickness */}
                </BarChart>
            </ResponsiveContainer>
        </div>
    </div>
);
};

export default DashboardGraphs;