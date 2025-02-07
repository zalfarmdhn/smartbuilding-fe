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

// mapLabels : ['Lantai 1', 'Lantai 2', 'Lantai 3', 'Lantai 4']
// mapData : ["Rp. 28943", "Rp. 28943", "Rp. 28943", "Rp. 28943"]

export function BarchartExample({ mapLabels, mapData }: { mapLabels: string[], mapData: string[] }) {
  const numberData = mapData.map((item) => returnNumber(item));

  const sorted = mapLabels.sort();
  const lantaiLabels = sorted.map((item) => (`Lantai ${item}`))

  

  // // Sort mapLabels and mapData based on sorted mapLabels
  // const sortedIndices = mapLabels
  //   .map((label, index) => ({ label, index }))
  //   .sort((a, b) => a.label.localeCompare(b.label))
  //   .map(({ index }) => index);

  // const sortedLabels = sortedIndices.map(index => mapLabels[index]);
  // const sortedData = sortedIndices.map(index => numberData[index]);
  
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
      },
    },
  };
  
  const data = {
    labels: lantaiLabels,
    datasets: [
      {
        label: 'Biaya Listrik (Rp)',
        data: numberData,
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  return <Bar options={options} data={data} />;
}
