import { useState } from "react";
import { useElectricMonitoring } from "../states/electricity-monitoring"
import { formatDate } from "../utils/formatDate";
import CardStatistic from "../components/CardStatistic";
import ElectricalIcon from "../components/icons/electrical-icon";
import RupiahIcon from "../components/icons/rupiah-icon";
import { getDataListrik, getSpecificDataListrik } from "../utils/backupData";

export default function ElectricMonitoringPage() {
  const [loading, setIsLoading] = useState(true);
  
  const electricData = useElectricMonitoring((state) => state.electricData);

  if (loading) {
      if (electricData) {
        setIsLoading(false)
      } else if(getDataListrik()) {
        setIsLoading(false);
      };
      return <p>Loading...</p>;
    }

  return (
    <div className="w-[1200px] h-[442px] flex flex-col gap-4">
      <h1 className="text-primary-500 font-bold text-xl">
        Statistik Penggunaan Listrik
      </h1>
      {/* Card Statistik utama */}
      {/* Card Toren */}
      <div className="flex flex-row gap-6">
      <div className="w-[298px] h-full bg-primary-400 p-4 rounded-lg shadow-md flex">
        <div className="flex flex-col gap-2 items-center justify-center text-white w-full">
          <ElectricalIcon width={`60`} height={`60`} />
          <h1 className="text-2xl font-semibold">Total Watt</h1>
          <h1 className="text-2xl font-bold">{electricData?.TotalWatt ?? getSpecificDataListrik("TotalWatt")}</h1>
          <p className="bg-[#273C97] p-2 rounded-md text-sm">Terakhir diupdate : <span className="font-bold">{formatDate(electricData?.UpdatedAt ?? getSpecificDataListrik("UpdatedAt"))}</span></p>
        </div>
      </div>
        {/* Card statistik kolom 1 */}
        <div className="h-[354px] flex flex-col gap-4">
          <CardStatistic
            className="w-[298px]"
            icon={<ElectricalIcon />}
            heading="Daya Listrik"
            subheading="Lantai 1"
            value={electricData?.TotalDayaListrikLT1 ?? getSpecificDataListrik("TotalDayaListrikLT1")} />
          <CardStatistic
            className="w-[298px]"
            icon={<ElectricalIcon />}
            heading="Daya Listrik" 
            subheading="Lantai 2"
            value={electricData?.TotalDayaListrikLT2 ?? getSpecificDataListrik("TotalDayaListrikLT2")} />
          <CardStatistic
            className="w-[298px]"
            icon={<ElectricalIcon />}
            heading="Daya Listrik"
            subheading="Lantai 3"
            value={electricData?.TotalDayaListrikLT3 ?? getSpecificDataListrik("TotalDayaListrikLT3")} />
        </div>
        {/* Card statistik kolom 2 */}
        <div className="h-[354px] flex flex-col gap-4">
          <CardStatistic
            className="w-[298px]"
            icon={<ElectricalIcon />}
            heading="Daya Listrik"
            subheading="Lantai 4"
            value={electricData?.TotalDayaListrikLT4 ?? getSpecificDataListrik("TotalDayaListrikLT4")} />
          <CardStatistic
            className="w-[298px]"
            icon={<ElectricalIcon />}
            heading="Biaya Pemakaian"
            subheading="Lantai 1"
            value={electricData?.BiayaPemakaianLT1 ?? getSpecificDataListrik("BiayaPemakaianLT1")} />
          <CardStatistic
            className="w-[298px]"
            icon={<RupiahIcon />}   
            heading="Biaya Pemakaian"
            subheading="Lantai 2"
            value={electricData?.BiayaPemakaianLT2 ?? getSpecificDataListrik("BiayaPemakaianLT2")} />
        </div>
        {/* Card statistik kolom 3 */}
        <div className="h-[354px] flex flex-col gap-4">
          <CardStatistic
            className="w-[298px]"
            icon={<RupiahIcon />}
            heading="Biaya Pemakaian"
            subheading="Lantai 3"
            value={electricData?.BiayaPemakaianLT3 ?? getSpecificDataListrik("BiayaPemakaianLT3")} />
          <CardStatistic
            className="w-[298px]"
            icon={<RupiahIcon />}
            heading="Biaya Pemakaian"
            subheading="Lantai 4"
            value={electricData?.BiayaPemakaianLT4 ?? getSpecificDataListrik("BiayaPemakaianLT4")} />
        </div>
      </div>
    </div>
  )
}
