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
  TooltipItem,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { returnNumber } from "../../utils/formatNumber";
import {
  BULAN_CONSTANT,
  HARI_CONSTANT,
  MINGGU_CONSTANT,
} from "../../utils/dateConstants";
import { DISTINCT_HSL_COLORS } from "../../utils/hslColors";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface WaterDataPoint {
  pipa: string;
  volume: string;
}

interface ChartProps {
  periodData: {
    [key: string]: WaterDataPoint[];
  };
  chartType: "daily" | "weekly" | "monthly" | "yearly";
}

export default function Linechart({ periodData, chartType }: ChartProps) {
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

  // Function to generate a consistent color based on item name
  const getItemColorByName = (itemName: string) => {
    let hash = 0;
    for (let i = 0; i < itemName.length; i++) {
      const char = itemName.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash |= 0; // Convert to 32bit integer
    }
    const index = Math.abs(hash) % DISTINCT_HSL_COLORS.length;
    return DISTINCT_HSL_COLORS[index];
  };

  // Process the data for the chart
  const { labels, datasets } = useMemo(() => {
    // Handle different chart types
    if (
      chartType === "monthly" ||
      chartType === "weekly" ||
      chartType === "daily"
    ) {
      // Get all available time periods from the data
      const allPeriods = Object.keys(periodData);

      if (allPeriods.length === 0) {
        return { labels: [], datasets: [] };
      }

      // Sort periods based on the chart type
      let sortedPeriods;
      if (chartType === "monthly") {
        sortedPeriods = allPeriods.sort((a, b) => {
          return MINGGU_CONSTANT.indexOf(a) - MINGGU_CONSTANT.indexOf(b);
        });
      } else if (chartType === "weekly") {
        sortedPeriods = allPeriods.sort((a, b) => {
          return HARI_CONSTANT.indexOf(a) - HARI_CONSTANT.indexOf(b);
        });
      } else {
        // daily
        sortedPeriods = [...allPeriods];
      }

      // Get all unique pipe names across all periods
      const allPipes = new Set<string>();
      sortedPeriods.forEach((period) => {
        const periodItems = periodData[period] || [];
        periodItems.forEach((item: WaterDataPoint) => {
          allPipes.add(item.pipa);
        });
      });

      // Create datasets for each pipe
      const pipeDatasets = Array.from(allPipes).map((pipeName) => {
        // Select a color from the predefined list based on the item name
        const colorParams = getItemColorByName(pipeName);
        const borderColor = `hsl(${colorParams.h}, ${colorParams.s}%, ${colorParams.l}%)`;
        const backgroundColor = `hsla(${colorParams.h}, ${colorParams.s}%, ${colorParams.l}%, 0.5)`;

        // Get data for this pipe across all periods
        const data = sortedPeriods.map((period) => {
          const periodItems = periodData[period] || [];
          const pipeData = periodItems.find((item) => item.pipa === pipeName);
          return pipeData ? returnNumber(pipeData.volume) : 0;
        });

        return {
          label: pipeName,
          data,
          borderColor: borderColor,
          backgroundColor: backgroundColor,
          tension: 0.3, // Add some curve to the lines
        };
      });

      return {
        labels: sortedPeriods,
        datasets: pipeDatasets,
      };
    } else if (chartType === "yearly") {
      // For yearly view, we handle it differently
      // Get all available years from the data
      const allYears = Object.keys(periodData);

      const sortedPeriods = allYears.sort((a, b) => {
        return BULAN_CONSTANT.indexOf(a) - BULAN_CONSTANT.indexOf(b);
      });

      console.log("Available years for yearly chart:", allYears);
      console.log("Period data for yearly chart:", periodData);

      if (sortedPeriods.length === 0) {
        console.log("No years found in data");
        return { labels: [], datasets: [] };
      }

      // Get all unique pipe names across all years
      const allPipes = new Set<string>();
      sortedPeriods.forEach((year) => {
        const yearItems = periodData[year] || [];
        console.log(`Items for year ${year}:`, yearItems);

        yearItems.forEach((item: WaterDataPoint) => {
          allPipes.add(item.pipa);
        });
      });

      // Create datasets for each pipe
      const pipeDatasets = Array.from(allPipes).map((pipeName) => {
        // Select a color from the predefined list based on the item name
        const colorParams = getItemColorByName(pipeName);
        const borderColor = `hsl(${colorParams.h}, ${colorParams.s}%, ${colorParams.l}%)`;
        const backgroundColor = `hsla(${colorParams.h}, ${colorParams.s}%, ${colorParams.l}%, 0.5)`;

        // Get data for this pipe across all years
        const data = allYears.map((year) => {
          const yearItems = periodData[year] || [];
          const pipeData = yearItems.find((item) => item.pipa === pipeName);
          const value = pipeData ? returnNumber(pipeData.volume) : 0;
          console.log(`Value for ${pipeName} in ${year}:`, value);
          return value;
        });

        return {
          label: pipeName,
          data,
          borderColor: borderColor,
          backgroundColor: backgroundColor,
          tension: 0.3, // Add some curve to the lines
        };
      });

      console.log("Generated datasets for yearly view:", pipeDatasets);

      return {
        labels: allYears,
        datasets: pipeDatasets,
      };
    } else {
      return { labels: [], datasets: [] };
    }
  }, [periodData, chartType]);
  // Adjust options based on screen size
  const options = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        mode: "index" as const,
        intersect: false,
      },
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
          text: `Grafik Penggunaan Air (${getChartTypeTitle(chartType)})`,
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
          title: function (context: TooltipItem<"line">[]) {
            return context[0].label;
          },
          label: function (context: TooltipItem<"line">) {
            const label = context.dataset.label || "";
            const value = context.parsed.y;
            return `${label}: ${value} L`;
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
            callback: function (value: string | number) {
              const numValue =
                typeof value === "string" ? parseFloat(value) : value;
              return `${numValue} L`;
            },
          },
          title: {
            display: true,
            text: "Volume (L)",
            font: {
              size: chartWidth < 400 ? 10 : 12,
            },
          },
        },
      },
    }),
    [chartWidth, chartType]
  );

  // Helper function to get chart type title
  function getChartTypeTitle(type: "daily" | "weekly" | "monthly" | "yearly") {
    switch (type) {
      case "daily":
        return "Harian";
      case "weekly":
        return "Mingguan";
      case "monthly":
        return "Bulanan";
      case "yearly":
        return "Tahunan";
      default:
        return "";
    }
  }

  const data = {
    labels,
    datasets,
  };

  return (
    <div
      ref={chartRef}
      style={{ width: "100%", height: chartWidth < 400 ? "300px" : "400px" }}>
      <Line options={options} data={data} />
    </div>
  );
}
