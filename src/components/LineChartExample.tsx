import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { returnNumber } from '../utils/formatNumber';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);


export default function LineChartExample({ mapLabels, mapData }: { mapLabels: string[], mapData: string[] }) {
  const numberData = mapData.map((item) => returnNumber(item));

  // Sort mapLabels and mapData based on sorted mapLabels
  const sortedIndices = mapLabels
    .map((label, index) => ({ label, index }))
    .sort((a, b) => a.label.localeCompare(b.label))
    .map(({ index }) => index);

  const sortedLabels = sortedIndices.map(index => mapLabels[index]);
  const sortedData = sortedIndices.map(index => numberData[index]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        // text: `Grafik Penggunaan Air pada ${timeRange}`,
      }
    },
  };
  
  const data = {
    labels: sortedLabels,
    datasets: [
      {
        label: 'Volume (L)',
        data: sortedData,
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };


  return <Line options={options} data={data} />;
}