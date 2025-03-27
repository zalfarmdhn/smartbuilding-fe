import { useMemo } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { returnNumber } from '../utils/formatNumber';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export function BarchartExample({ mapLabels, mapData }: { mapLabels: string[], mapData: string[] }) {
  console.log('Original Labels:', mapLabels);
  console.log('Original Data:', mapData);

  // Convert string values to numbers
  const numberData = mapData.map(item => returnNumber(item));
  
  // Memoize the sorted data
  const { sortedLabels, sortedValues } = useMemo(() => {
    // Create an array of objects with label and value pairs
    const combinedData = mapLabels.map((label, index) => ({
      label: label,
      value: numberData[index]
    }));
    
    // Sort the combined data alphabetically by label
    const sortedCombined = combinedData.sort((a, b) => a.label.localeCompare(b.label));
    
    // Extract the sorted labels and values
    const sortedLabels = sortedCombined.map(item => item.label);
    const sortedValues = sortedCombined.map(item => item.value);
    
    return { sortedLabels, sortedValues };
  }, [mapLabels, numberData]);
  
  console.log('Sorted Labels:', sortedLabels);
  console.log('Sorted Values:', sortedValues);
  
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Biaya Listrik per Kategori'
      },
    },
  };
  
  const data = {
    labels: sortedLabels,
    datasets: [
      {
        label: 'Biaya Listrik (Rp)',
        data: sortedValues,
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  return <Bar options={options} data={data} />;
}