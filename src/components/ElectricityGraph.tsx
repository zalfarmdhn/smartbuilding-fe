import { useEffect, useState } from "react";
import { BarchartExample } from "./BarchartExample";
import { useElectricMonitoring } from "../states/electricity-monitoring";
import ButtonGroupComponent from "./ButtonGroup";
import { ReusableDropdown } from "./DropdownLogic";

type DayType = "Senin" | "Selasa" | "Rabu" | "Kamis" | "Jumat" | "Sabtu" | "Minggu";
type WeekType = "Minggu 1" | "Minggu 2" | "Minggu 3" | "Minggu 4";
type MonthType = "Januari" | "Februari" | "Maret" | "April" | "Mei" | "Juni" | "Juli" | "Agustus" | "September" | "Oktober" | "November" | "Desember";

export default function ElectricityGraph() {
  const [labels, setLabels] = useState<string[]>([]);
  const [chartData, setChartData] = useState<string[]>([]);
  const [activeMonth, setActiveMonth] = useState<MonthType>("Januari");
  const [activeWeek, setActiveWeek] = useState<WeekType>("Minggu 1");
  const [activeDay, setActiveDay] = useState<DayType>("Senin");
  const [activeTab, setActiveTab] = useState<number>(0);

  const electricalChart = useElectricMonitoring((state) => state.electricChart);

  console.log(`data chart`, electricalChart.DataBiayaListrikMingguan);
  
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
          (item) => item.Nama
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
          (item) => item.Nama
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
          (item) => item.Nama
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
    <div className="mt-2">
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
          onSelect={(value) => setActiveDay(value as DayType)}
          isVisible={activeTab === 0}
        />
        <ReusableDropdown
          items={week}
          activeValue={activeWeek}
          onSelect={(value) => setActiveWeek(value as WeekType)}
          isVisible={activeTab === 1}
        />
        <ReusableDropdown
          items={month}
          activeValue={activeMonth}
          onSelect={(value) => setActiveMonth(value as MonthType)}
          isVisible={activeTab === 2}
        />
      </div>
      <div className="w-[900px] h-[442px] bg-white p-4 rounded-lg shadow-md mx-auto">
        <BarchartExample mapLabels={labels} mapData={chartData} />
      </div>
    </div>
  );
}
