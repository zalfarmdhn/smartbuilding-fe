import { useState } from "react";
import Linechart from "./charts/Linechart";
import ButtonGroupComponent from "./ButtonGroup";
import { useWaterMonitoring } from "../states/water-monitoring";

export default function WaterGraph() {
  const [activeTab, setActiveTab] = useState<number>(0); // Default to daily
  // const error = useWaterMonitoring((state) => state.error);
  const waterChart = useWaterMonitoring((state) => state.waterChart);
  // Determine which data and period to use based on active tab
  const getChartData = () => {
    switch (activeTab) {
      case 0: // Daily
        return {
          periodData: waterChart?.DataPenggunaanHarian || {},
          chartType: "daily" as const,
        };
      case 1: // Weekly
        return {
          periodData: waterChart?.DataPenggunaanMingguan || {},
          chartType: "weekly" as const,
        };
      case 2: // Monthly
        // Untuk tampilan bulanan, kita menggunakan data dari DataPenggunaanBulanan
        return {
          periodData: waterChart?.DataPenggunaanBulanan || {},
          chartType: "monthly" as const,
        };
      case 3: // Yearly
        // Untuk tampilan tahunan, kita menggunakan DataPenggunaanTahunan
        return {
          periodData: waterChart?.DataPenggunaanTahunan || {},
          chartType: "yearly" as const,
        };
      default:
        return {
          periodData: {},
          chartType: "weekly" as const,
        };
    }
  };

  return (
    <div className="w-full max-w-[806px] mt-2 sm:px-0">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4 sm:gap-0">
        <div className="flex flex-col sm:flex-row justify-center items-start sm:items-center gap-4 mt-4">
          <h1 className="text-primary-500 font-bold text-xl">
            Grafik Penggunaan Air
          </h1>
          <ButtonGroupComponent
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        </div>
        {/* Dropdown untuk memilih periode spesifik telah dihapus */}
      </div>

      <div className="bg-white p-2 sm:p-4 rounded-lg shadow-md overflow-x-auto">
        <div className="min-h-[300px] md:min-h-[400px] w-full">
          <Linechart {...getChartData()} />
        </div>
        {/* {error && <p className="text-red-500 mb-2">{error}</p>} */}
      </div>
    </div>
  );
}