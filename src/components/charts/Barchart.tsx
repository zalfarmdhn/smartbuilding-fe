import { useMemo, useRef, useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { returnNumber } from "../../utils/formatNumber";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface ElectricDataPoint {
  nama?: string;
  Value?: string;
  Nama?: string;
  Biaya?: string;
}

interface ChartProps {
  periodData: {
    [key: string]: ElectricDataPoint[];
  };
  activePeriod: string;
  chartType: 'daily' | 'weekly' | 'monthly' | 'yearly';
  dataType: 'biaya' | 'penggunaan';
}

export default function Barchart({
  periodData,
  activePeriod,
  chartType,
  dataType,
}: ChartProps) {
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

  // Process the data for the chart
  const { labels, datasets } = useMemo(() => {
    // Define standard orders for different time periods
    const monthOrder = [
      'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
      'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
    ];
    
    const weekOrder = ['Minggu 1', 'Minggu 2', 'Minggu 3', 'Minggu 4', 'Minggu 5'];
    
    const dayOrder = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'];
    
    // Debug: Log the data being processed
    console.log('ChartType:', chartType);
    console.log('PeriodData:', periodData);
    console.log('DataType:', dataType);
    
    // Handle different chart types
    if (chartType === 'monthly' || chartType === 'weekly' || chartType === 'daily') {
      // Get all available time periods from the data
      const allPeriods = Object.keys(periodData);
      
      console.log('Available periods:', allPeriods);
      
      if (allPeriods.length === 0) {
        console.log('No periods found in data');
        return { labels: [], datasets: [] };
      }
      
      // Sort periods based on the chart type
      let sortedPeriods;
      if (chartType === 'monthly') {
        sortedPeriods = allPeriods.sort((a, b) => {
          return monthOrder.indexOf(a) - monthOrder.indexOf(b);
        });
      } else if (chartType === 'weekly') {
        sortedPeriods = allPeriods.sort((a, b) => {
          return weekOrder.indexOf(a) - weekOrder.indexOf(b);
        });
      } else { // daily
        sortedPeriods = allPeriods.sort((a, b) => {
          return dayOrder.indexOf(a) - dayOrder.indexOf(b);
        });
      }
      
      console.log('Sorted periods:', sortedPeriods);
      
      // Get all unique items across all periods
      const allItems = new Set<string>();
      sortedPeriods.forEach(period => {
        const periodItems = periodData[period] || [];
        console.log(`Items for period ${period}:`, periodItems);
        
        periodItems.forEach((item: ElectricDataPoint) => {
          // Use the appropriate field based on data type
          if (dataType === 'biaya' && item.Nama) {
            allItems.add(item.Nama);
          } else if (dataType === 'penggunaan' && item.nama) {
            allItems.add(item.nama);
          }
        });
      });
      
      console.log('All unique items:', Array.from(allItems));
      
      // Create datasets for each item
      const itemDatasets = Array.from(allItems).map((itemName, index) => {
        // Generate a color based on the index
        const hue = (index * 137) % 360; // Use golden ratio to spread colors
        
        // Get data for this item across all periods
        const data = sortedPeriods.map(period => {
          const periodItems = periodData[period] || [];
          let itemData;
          
          if (dataType === 'biaya') {
            itemData = periodItems.find(item => item.Nama === itemName);
            const value = itemData ? returnNumber(itemData.Biaya || '0') : 0;
            console.log(`Value for ${itemName} in ${period} (biaya):`, value);
            return value;
          } else { // penggunaan
            itemData = periodItems.find(item => item.nama === itemName);
            const value = itemData ? returnNumber(itemData.Value || '0') : 0;
            console.log(`Value for ${itemName} in ${period} (penggunaan):`, value);
            return value;
          }
        });
        
        return {
          label: itemName,
          data,
          borderColor: `hsl(${hue}, 70%, 50%)`,
          backgroundColor: `hsla(${hue}, 70%, 50%, 0.5)`,
          tension: 0.3, // Add some curve to the lines
        };
      });
      
      console.log('Generated datasets:', itemDatasets);
      
      return {
        labels: sortedPeriods,
        datasets: itemDatasets,
      };
    } else if (chartType === 'yearly') {
      // For yearly view, we handle it differently
      // Get all available years
      const allYears = Object.keys(periodData);
      
      console.log('Available years:', allYears);
      
      if (allYears.length === 0) {
        console.log('No years found in data');
        return { labels: [], datasets: [] };
      }
      
      // Get all unique items across all years
      const allItems = new Set<string>();
      allYears.forEach(year => {
        const yearItems = periodData[year] || [];
        console.log(`Items for year ${year}:`, yearItems);
        
        yearItems.forEach((item: ElectricDataPoint) => {
          // Use the appropriate field based on data type
          if (dataType === 'biaya' && item.Nama) {
            allItems.add(item.Nama);
          } else if (dataType === 'penggunaan' && item.nama) {
            allItems.add(item.nama);
          }
        });
      });
      
      console.log('All unique items for yearly view:', Array.from(allItems));
      
      // Create datasets for each item
      const itemDatasets = Array.from(allItems).map((itemName, index) => {
        // Generate a color based on the index
        const hue = (index * 137) % 360; // Use golden ratio to spread colors
        
        // Get data for this item across all years
        const data = allYears.map(year => {
          const yearItems = periodData[year] || [];
          let itemData;
          
          if (dataType === 'biaya') {
            itemData = yearItems.find(item => item.Nama === itemName);
            const value = itemData ? returnNumber(itemData.Biaya || '0') : 0;
            console.log(`Value for ${itemName} in ${year} (biaya):`, value);
            return value;
          } else { // penggunaan
            itemData = yearItems.find(item => item.nama === itemName);
            const value = itemData ? returnNumber(itemData.Value || '0') : 0;
            console.log(`Value for ${itemName} in ${year} (penggunaan):`, value);
            return value;
          }
        });
        
        return {
          label: itemName,
          data,
          borderColor: `hsl(${hue}, 70%, 50%)`,
          backgroundColor: `hsla(${hue}, 70%, 50%, 0.5)`,
          tension: 0.3, // Add some curve to the lines
        };
      });
      
      console.log('Generated datasets for yearly view:', itemDatasets);
      
      return {
        labels: allYears,
        datasets: itemDatasets,
      };
    } else {
      return { labels: [], datasets: [] };
    }
  }, [periodData, activePeriod, chartType, dataType]);

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
          text: `Grafik ${dataType === 'biaya' ? 'Biaya Listrik' : 'Penggunaan Listrik'} (${getChartTypeTitle(chartType)})`,
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
          callbacks: {
            label: function(context: any) {
              const label = context.dataset.label || '';
              const value = context.parsed.y;
              if (dataType === 'biaya') {
                return `${label}: Rp ${value.toLocaleString()}`;
              } else {
                return `${label}: ${value} W`;
              }
            }
          }
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
            callback: function(value: any) {
              if (dataType === 'biaya') {
                return `Rp ${value.toLocaleString()}`;
              } else {
                return `${value} W`;
              }
            }
          },
          title: {
            display: true,
            text: dataType === 'biaya' ? 'Biaya (Rp)' : 'Daya (Watt)',
            font: {
              size: chartWidth < 400 ? 10 : 12,
            }
          }
        },
      },
    }),
    [chartWidth, chartType, dataType]
  );

  // Helper function to get chart type title
  function getChartTypeTitle(type: 'daily' | 'weekly' | 'monthly' | 'yearly') {
    switch(type) {
      case 'daily': return 'Harian';
      case 'weekly': return 'Mingguan';
      case 'monthly': return 'Bulanan';
      case 'yearly': return 'Tahunan';
      default: return '';
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
      <Bar options={options} data={data} />
    </div>
  );
}
