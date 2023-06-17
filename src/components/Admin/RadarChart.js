import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { Radar } from "react-chartjs-2";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const RadarChart = () => {
  const [locations, setLocations] = useState([]);
  useEffect(() => {
    fetch("http://127.0.0.1:3000//top_5_locations_by_price_per_kg", {
      method: "GET",
      headers: {
        Accepts: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setLocations(data);
      });
  }, []);

  const data = {
    labels: ["Uasin Gishu", "Kiambu", "Nairobi", "Nakuru", "Kisumu"],
    datasets: [
      {
        label: "Average Price per kg that farmers are selling their crops for",
        data: ["200", "300", "400", "500", "600"],
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Average Price per kg that farmers are selling their crops for per county",
      },
    },
  };

  return <Radar data={data} options={options} />;
};

export default RadarChart;
