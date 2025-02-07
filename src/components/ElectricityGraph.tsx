import { useEffect, useState } from "react";
import { BarchartExample } from "./BarchartExample";
import { useElectricMonitoring } from "../states/electricity-monitoring";
import ButtonGroupComponent from "./ButtonGroup";
import { ReusableDropdown } from "./DropdownLogic";

export default function ElectricityGraph() {
  const [labels, setLabels] = useState<string[]>([]);
  const [chartData, setChartData] = useState<string[]>([]);
  const [activeMonth, setActiveMonth] = useState<string>("Januari");
  const [activeWeek, setActiveWeek] = useState<string>("Minggu 1");
  const [activeDay, setActiveDay] = useState<string>("Senin");
  const [activeTab, setActiveTab] = useState<number>(0);

  const electricalChart = useElectricMonitoring((state) => state.electricChart);


  console.log("labels", labels);
  console.log("chartData", chartData);
  
  


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
  ];

  const week = ["Minggu 1", "Minggu 2", "Minggu 3", "Minggu 4"];

  useEffect(() => {
    // Chart Harian
    if (electricalChart && activeTab === 0) {
      setLabels(
        electricalChart?.DataBiayaListrikHarian?.[activeDay]?.map(
          (item) => item.Lantai
        ) || []
      );
      setChartData(
        electricalChart?.DataBiayaListrikHarian?.[activeDay]?.map(
          (item) => item.Biaya
        ) || []
      );
    }

    // Chart Mingguan
    if (electricalChart && activeTab === 1) {
      setLabels(
        electricalChart?.DataBiayaListrikMingguan?.[activeWeek]?.map(
          (item) => item.Lantai
        ) || []
      );
      setChartData(
        electricalChart?.DataBiayaListrikMingguan?.[activeWeek]?.map(
          (item) => item.Biaya
        ) || []
      );
    }

    // Chart Tahunan
    if (electricalChart && activeTab === 2) {
      // const bulan = Object.keys(electricalChart.DataPenggunaanTahunan)[0];
      setLabels(
        electricalChart?.DataBiayaListrikTahunan?.[activeMonth]?.map(
          (item) => item.Lantai
        ) || []
      );
      setChartData(
        electricalChart?.DataBiayaListrikTahunan?.[activeMonth]?.map(
          (item) => item.Biaya
        ) || []
      );
    }
  }, [electricalChart, activeMonth, activeTab, activeWeek, activeDay]);

  return (
    <div className="w-[806px] mt-2">
      <div className="flex flex-row justify-between items-center mb-4">
        <div className="flex flex-row justify-center items-center gap-4">
          <h1 className="text-primary-500 font-bold text-xl">
            Grafik Data Biaya Listrik
          </h1>
          <ButtonGroupComponent
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
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
      <div className="w-[1200px] h-[442px] bg-white p-4 rounded-lg shadow-md">
        <BarchartExample mapLabels={labels} mapData={chartData} />
      </div>
    </div>
  );
}
