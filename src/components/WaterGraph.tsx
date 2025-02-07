import { useEffect, useState } from "react";
import LineChartExample from "./LineChartExample";
import ButtonGroupComponent from "./ButtonGroup";
import { useWaterMonitoring } from "../states/water-monitoring";
import { ReusableDropdown } from "./DropdownLogic";

interface IWaterData {
  pipa: string;
  volume: string;
}

export default function WaterGraph() {
  const [labels, setLabels] = useState<string[]>([]);
  const [chartData, setChartData] = useState<string[]>([]);
  const [activeMonth, setActiveMonth] = useState<string>("Januari");
  const [activeWeek, setActiveWeek] = useState<string>("Minggu 1");
  const [activeDay, setActiveDay] = useState<string>("Senin");
  const [activeTab, setActiveTab] = useState<number>(0);

  const waterChart = useWaterMonitoring((state) => state.waterChart);

  const day = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"];

  const month = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ]

  const week = [
    "Minggu 1",
    "Minggu 2",
    "Minggu 3",
    "Minggu 4",
  ]


  useEffect(() => {
    // Chart Harian
    if (waterChart && activeTab === 0) {
      setLabels(
        waterChart?.DataPenggunaanHarian?.[activeDay]?.map(
          (item) => item.pipa
        ) || []
      );
      setChartData(
        waterChart?.DataPenggunaanHarian?.[activeDay]?.map(
          (item: IWaterData) => item.volume
        ) || []
      );
    }

    // Chart Mingguan
    if (waterChart && activeTab === 1) {
      setLabels(
        waterChart?.DataPenggunaanMingguan?.[activeWeek]?.map(
          (item) => item.pipa
        ) || []
      );
      setChartData(
        waterChart?.DataPenggunaanMingguan?.[activeWeek]?.map(
          (item: IWaterData) => item.volume
        ) || []
      );
    }

    // Chart Tahunan
    if (waterChart && activeTab === 2) {
      // const bulan = Object.keys(waterChart.DataPenggunaanTahunan)[0];
      setLabels(
        waterChart?.DataPenggunaanTahunan?.Januari?.map((item) => item.pipa) ||
          []
      );
      setChartData(
        waterChart?.DataPenggunaanTahunan[activeMonth]?.map(
          (item: IWaterData) => item.volume
        ) || []
      );
    }
  }, [waterChart, activeMonth, activeTab, activeWeek, activeDay]);

  return (
    <div className="w-[806px] mt-2 mx-auto">
      <div className="flex flex-row justify-between items-center mb-4">
        <div className="flex flex-row justify-center items-center gap-4 mt-4">
          <h1 className="text-primary-500 font-bold text-xl">
            Grafik Penggunaan Air
          </h1>
          <ButtonGroupComponent activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
        <ReusableDropdown
          items={day}
          activeValue={activeDay}
          onSelect={setActiveDay}
          isVisible={activeTab === 0}
        />
        <ReusableDropdown
          items={week}
          activeValue={activeWeek}
          onSelect={setActiveWeek}
          isVisible={activeTab === 1}
        />
        <ReusableDropdown
          items={month}
          activeValue={activeMonth}
          onSelect={setActiveMonth}
          isVisible={activeTab === 2}
        />
      </div>

      <div className="bg-white p-4 rounded-lg shadow-md">
        <LineChartExample
          mapLabels={labels}
          mapData={chartData}
          // timeRange={activeTab === 0 ? activeDay : activeTab === 1 ? activeWeek : activeMonth}
        />
      </div>
    </div>
  );
}
