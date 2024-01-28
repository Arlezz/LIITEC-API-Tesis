"use client"
import { Line } from "react-chartjs-2";
import { getFormattedDate } from "@/utils/dateFormatter";
import { capitalizeText } from "@/utils/capitalize";
import { colorMap } from "@/utils/colorMap";



import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function LineChart({ variable, data }) {

  const label = capitalizeText(variable.variable);
  const unit = variable.unit;

  const timestamps = data?.map((entry) => entry.timestamp) || [];
  const values = data?.map((entry) => entry.value) || [];  

  const { backgroundColor, borderColor, pointBorderColor } = colorMap[label] || colorMap.Default;

  const myData = {
    type: "line",
    labels: timestamps,
    datasets: [
      {
        label: label,
        data: values,
        tension: 0.3,
        fill: true,
        backgroundColor: backgroundColor,
        borderColor: borderColor,
        pointRadius: 5,
        pointBorderColor: pointBorderColor,
        pointBackgroundColor: "#fff",
      },
    ],
  };

  const myOptions = {
    type: "line",
    responsive: true,
    aspectRatio: 1.5,
    scales: {
        x: {
            reverse: true,
            ticks: {
                callback: function(value, index, ticks) {
                    return index % 4 === 0 ? getFormattedDate(this.getLabelForValue(value)).split(" ")[1] : '';
                },
                align : 'start'
            },
            title: {
                display: true,
                text: "Date",
                font: {
                  size: 15,
                  weight: 'bold',
                },
            }
        },
        y: {
            reverse: false,
            // title: {
            //     display: true,
            //     text: label+" ("+unit+")",
            //     font: {
            //       size: 15,
            //       weight: 'bold',
            //     },
            //     padding: {top: 0, left: 0, right: 0, bottom: 15}
            // }
        }
    }, 
    plugins: {
        legend: {
          display: false,
        },
        title: {
            display: true,
            text: label+" ("+unit+")",
            font: {
              size: 15,
              weight: 'bold',
            },
            padding: {top: 0, left: 0, right: 0, bottom: 15}
        }
    }     
  }

  return <Line data={myData} className="w-full" options={myOptions} />;
}
