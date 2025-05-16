import { useMemo, useRef, useEffect, useState } from "react";
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
import { Line } from "react-chartjs-2";
import { returnNumber } from "../utils/formatNumber";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function LineChartExample({
  mapLabels,
  mapData,
}: {
  mapLabels: string[];
  mapData: string[];
}) {
  const chartRef = useRef<HTMLDivElement>(null);
  const [chartWidth, setChartWidth] = useState(0);

  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      if (chartRef.current) {
        setChartWidth(chartRef.current.offsetWidth);
      }
    };

    // Set initial size
    handleResize();

    // Add resize listener
    window.addEventListener("resize", handleResize);

    // Clean up
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Convert string values to numbers
  const numberData = mapData.map((item) => returnNumber(item));

  // Memoize the sorted data
  const { sortedLabels, sortedValues } = useMemo(() => {
    // Create an array of objects with label and value pairs
    const combinedData = mapLabels.map((label, index) => ({
      label: label,
      value: numberData[index],
    }));

    // Sort the combined data alphabetically by label
    const sortedCombined = combinedData.sort((a, b) =>
      a.label.localeCompare(b.label)
    );

    // Extract the sorted labels and values
    const sortedLabels = sortedCombined.map((item) => item.label);
    const sortedValues = sortedCombined.map((item) => item.value);

    return { sortedLabels, sortedValues };
  }, [mapLabels, numberData]);

  // Adjust options based on screen size
  const options = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: chartWidth < 600 ? ("bottom" as const) : ("top" as const),
          labels: {
            boxWidth: chartWidth < 400 ? 10 : 20,
            font: {
              size: chartWidth < 400 ? 10 : 12,
            },
          },
        },
        title: {
          display: true,
          text: "Grafik Penggunaan Air",
          font: {
            size: chartWidth < 400 ? 14 : 16,
          },
        },
        tooltip: {
          titleFont: {
            size: chartWidth < 400 ? 12 : 14,
          },
          bodyFont: {
            size: chartWidth < 400 ? 11 : 13,
          },
        },
      },
      scales: {
        x: {
          ticks: {
            font: {
              size: chartWidth < 400 ? 10 : 12,
            },
            maxRotation: chartWidth < 600 ? 90 : 0,
            minRotation: chartWidth < 600 ? 45 : 0,
          },
        },
        y: {
          ticks: {
            font: {
              size: chartWidth < 400 ? 10 : 12,
            },
          },
        },
      },
    }),
    [chartWidth]
  );

  const data = {
    labels: sortedLabels,
    datasets: [
      {
        label: "Volume (L)",
        data: sortedValues,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  return (
    <div
      ref={chartRef}
      style={{ width: "100%", height: chartWidth < 400 ? "300px" : "400px" }}>
      <Line options={options} data={data} />
    </div>
  );
}
