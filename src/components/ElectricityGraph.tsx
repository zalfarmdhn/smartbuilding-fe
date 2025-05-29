import { useState } from "react";
import Barchart from "./charts/Barchart";
import { useElectricMonitoring } from "../states/electricity-monitoring";
import ButtonGroup from "./ButtonGroup";

type DataType = 'biaya' | 'penggunaan';

export default function ElectricityGraph() {
  const [dataType, setDataType] = useState<DataType>("biaya"); // Default to biaya
  const [activeTab, setActiveTab] = useState<number>(2); // Default to monthly view

  const electricalChart = useElectricMonitoring((state) => state.electricChart);
  // const error = useElectricMonitoring((state) => state.error);

  const getChartData = () => {
    if (dataType === "biaya") {
      switch (activeTab) {
        case 0: // Daily
          return {
            periodData: electricalChart?.DataBiayaListrikHarian || {},
            activePeriod: "",
            chartType: "daily" as const,
            dataType: "biaya" as const,
          };
        case 1: // Weekly
          return {
            periodData: electricalChart?.DataBiayaListrikMingguan || {},
            activePeriod: "",
            chartType: "weekly" as const,
            dataType: "biaya" as const,
          };
        case 2: // Monthly
          return {
            periodData: electricalChart?.DataBiayaListrikBulanan || {},
            activePeriod: "",
            chartType: "monthly" as const,
            dataType: "biaya" as const,
          };
        case 3: // Yearly
          return {
            periodData: electricalChart?.DataBiayaListrikTahunan || {},
            activePeriod: "",
            chartType: "yearly" as const,
            dataType: "biaya" as const,
          };
        default:
          return {
            periodData: electricalChart?.DataBiayaListrikBulanan || {},
            activePeriod: "",
            chartType: "monthly" as const,
            dataType: "biaya" as const,
          };
      }
    } else {
      // penggunaan
      switch (activeTab) {
        case 0: // Daily
          return {
            periodData: electricalChart?.DataPenggunaanListrikHarian || {},
            activePeriod: "",
            chartType: "daily" as const,
            dataType: "penggunaan" as const,
          };
        case 1: // Weekly
          return {
            periodData: electricalChart?.DataPenggunaanListrikMingguan || {},
            activePeriod: "",
            chartType: "weekly" as const,
            dataType: "penggunaan" as const,
          };
        case 2: // Monthly
          return {
            periodData: electricalChart?.DataPenggunaanListrikBulanan || {},
            activePeriod: "",
            chartType: "monthly" as const,
            dataType: "penggunaan" as const,
          };
        case 3: // Yearly
          return {
            periodData: electricalChart?.DataPenggunaanListrikTahunan || {},
            activePeriod: "",
            chartType: "yearly" as const,
            dataType: "penggunaan" as const,
          };
        default:
          return {
            periodData: electricalChart?.DataPenggunaanListrikBulanan || {},
            activePeriod: "",
            chartType: "monthly" as const,
            dataType: "penggunaan" as const,
          };
      }
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">
          {dataType === "biaya" ? "Biaya Listrik" : "Penggunaan Listrik"}
        </h2>
        <div className="flex space-x-2">
          <button
            onClick={() => setDataType("biaya")}
            className={`px-3 py-1 text-sm font-medium rounded ${
              dataType === "biaya"
                ? "bg-primary-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}>
            Biaya
          </button>
          <button
            onClick={() => setDataType("penggunaan")}
            className={`px-3 py-1 text-sm font-medium rounded ${
              dataType === "penggunaan"
                ? "bg-primary-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}>
            Penggunaan
          </button>
        </div>
      </div>

      <div className="mb-4">
        <ButtonGroup activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>

      <div className="mt-4">
        <Barchart {...getChartData()} />
      </div>
      {/* {error && <p className="text-red-500 mb-2">{error}</p>} */}
    </div>
  );
}