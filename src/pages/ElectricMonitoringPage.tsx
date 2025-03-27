import { useElectricMonitoring } from "../states/electricity-monitoring";
import { formatDate } from "../utils/formatDate";
import CardStatistic from "../components/CardStatistic";
import ElectricalIcon from "../components/icons/electrical-icon";
import RupiahIcon from "../components/icons/rupiah-icon";
import { getSpecificDataListrik } from "../utils/backupData";
import ElectricityGraph from "../components/ElectricityGraph";
import { Alert, Spinner } from "flowbite-react";
import { OctagonAlert, Zap } from "lucide-react";
import { useSettings } from "../states/settings";

export default function ElectricMonitoringPage() {

  const electricData = useElectricMonitoring((state) => state.electricData);
  const loading = useElectricMonitoring((state) => state.loading);
  const error = useElectricMonitoring((state) => state.error);
  const scheduler = useSettings((state) => state.scheduler);

  console.log(`ini listrik data`, electricData);

  if (loading) {
      return (
        <div className="text-center">
          <Spinner aria-label="Center-aligned spinner example" size="xl" />
        </div>
      );
    }

  if(error) {
    return (
      <Alert color="warning" icon={OctagonAlert}>
        <span className="font-medium">Gagal mengakses data!</span> Tolong coba lagi.
      </Alert>
    );
  }


  const totalWatt =
    electricData?.TotalWatt ?? getSpecificDataListrik("TotalWatt");

  return (
    <div className="w-[1200px] h-fit flex flex-col gap-4 mx-auto">
      <div className="flex items-center gap-2 mx-auto bg-primary-400 rounded-lg p-4 shadow-md my-4">
          <Zap className="w-8 h-8 text-white" />
          <h1 className="text-white font-bold text-2xl">
            Monitoring Listrik (Realtime {scheduler} detik)
          </h1>
      </div>
      <hr className="h-px bg-primary-500 border-0 dark:bg-primary-400" />
      <h1 className="text-primary-500 font-bold text-xl">
        Total Penggunaan Listrik
      </h1>
      <div className="flex flex-row gap-6">
        <div className="w-[298px] h-full bg-primary-400 p-4 rounded-lg shadow-md flex">
          <div className="flex flex-col gap-2 items-center justify-center text-white w-full">
            <ElectricalIcon width={`60`} height={`60`} />
            <h1 className="text-2xl font-semibold">Total Watt</h1>
            <h1 className="text-2xl font-bold">{totalWatt}</h1>
            <p className="bg-[#273C97] p-2 rounded-md text-sm">
              Terakhir diupdate :{" "}
              <span className="font-bold">
                {formatDate(
                  electricData?.UpdatedAt ?? getSpecificDataListrik("UpdatedAt")
                )}
              </span>
            </p>
          </div>
        </div>
      </div>
      <div className="w-[1200px] flex flex-col gap-2">
      <h1 className="text-primary-500 font-bold text-xl">
        Biaya Pemakaian Listrik
      </h1>
        {/* Card statistik kolom 1 */}
        <div className="flex flex-row flex-wrap items-start gap-4">
            {electricData.BiayaPemakaian.sort((a, b) => a.Nama.localeCompare(b.Nama)).map((item, index) => (
            <CardStatistic
              key={index}
              className="w-[298px]"
              icon={<RupiahIcon />}
              heading="Biaya Pemakaian"
              subheading={item.Nama}
              value={item.Biaya}
            />
            ))}
        </div>
      </div>
      <div className="w-[1200px] flex flex-col gap-2">
      <h1 className="text-primary-500 font-bold text-xl">
        Daya Listrik
      </h1>
        <div className="flex flex-row flex-wrap gap-4">
            {electricData.TotalDayaListrik.sort((a, b) => a.nama.localeCompare(b.nama)).map((item, index) => (
            <CardStatistic
              key={index}
              className="w-[298px]"
              icon={<ElectricalIcon />}
              heading="Biaya Pemakaian"
              subheading={item.nama}
              value={item.Value}
            />
            ))}
        </div>
      </div>
      {/* Section Grafik Penggunaan Listrik */}
      <ElectricityGraph />
    </div>
  );
}
