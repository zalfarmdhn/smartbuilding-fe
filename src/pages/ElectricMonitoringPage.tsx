import { useElectricMonitoring } from "../states/electricity-monitoring";
import { formatDate } from "../utils/formatDate";
import CardStatistic from "../components/CardStatistic";
import ElectricalIcon from "../components/icons/electrical-icon";
import RupiahIcon from "../components/icons/rupiah-icon";
import { getSpecificDataListrik } from "../utils/backupData";
import ElectricityGraph from "../components/ElectricityGraph";
import { Alert, Spinner } from "flowbite-react";
import { ClockIcon, OctagonAlert, Zap } from "lucide-react";
import { useSettings } from "../states/settings";
import { useEffect } from "react";

export default function ElectricMonitoringPage() {
  const electricData = useElectricMonitoring((state) => state.electricData);
  const loading = useElectricMonitoring((state) => state.loading);
  const error = useElectricMonitoring((state) => state.error);
  const scheduler = useSettings((state) => state.scheduler);

  useEffect(() => {
    document.title = "Smartbuilding | Monitoring Listrik";
  }, []);

  // TODO : ambil data di localStorage jika API dari home assistant masih error

  console.log(`ini listrik data`, electricData);

  if (loading) {
    return (
      <div className="text-center">
        <Spinner aria-label="Center-aligned spinner example" size="xl" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert color="warning" icon={OctagonAlert}>
        <span className="font-medium">Gagal mengakses data!</span> Tolong coba
        lagi.
      </Alert>
    );
  }

  const totalWatt =
    electricData?.TotalWatt ?? getSpecificDataListrik("TotalWatt");
  return (
    <div className="w-full max-w-[1200px] h-fit flex flex-col gap-4 mx-auto px-4 md:px-6">
      <div className="flex items-center gap-2 mx-auto bg-primary-400 rounded-lg p-4 shadow-md my-4 w-full">
        <Zap className="w-6 h-6 md:w-8 md:h-8 text-white" />
        <h1 className="text-white font-bold text-lg md:text-2xl">
          Monitoring Listrik (Realtime {scheduler} detik)
        </h1>
      </div>
      <hr className="h-px bg-primary-500 border-0 dark:bg-primary-400" />
      {!electricData.TotalDayaListrik && (
        <Alert color="warning" icon={OctagonAlert}>
          <span className="font-medium">Server gagal mengakses data!</span>{" "}
          Mohon menunggu dan tolong coba lagi.
        </Alert>
      )}
      <h1 className="text-primary-500 font-bold text-xl">
        Total Penggunaan Listrik
      </h1>{" "}
      <div className="flex flex-row gap-4 md:gap-6">
        <div className="w-full sm:w-[280px] md:w-[298px] h-full bg-primary-400 p-3 md:p-4 rounded-lg shadow-md flex">
          <div className="flex flex-col gap-2 items-center justify-center text-white w-full">
            <ElectricalIcon
              width={`40`}
              height={`40`}
              className="md:w-[60px] md:h-[60px]"
            />
            <h1 className="text-xl md:text-2xl font-semibold">Total Watt</h1>
            <h1 className="text-xl md:text-2xl font-bold">{totalWatt}</h1>
            {electricData.TotalDayaListrik && (
              <p className="flex flex-row gap-x-1 items-center bg-[#273C97] p-2 rounded-md text-xs md:text-sm">
                <span className="font-bold">
                  <ClockIcon className="w-5 h-5" />
                </span>
                Terakhir diupdate :{" "}
                <span className="font-bold">
                  {formatDate(
                    electricData?.UpdatedAt ??
                      getSpecificDataListrik("UpdatedAt")
                  )}
                </span>
              </p>
            )}
          </div>
        </div>
      </div>{" "}
      <div className="w-full flex flex-col gap-2">
        <h1 className="text-primary-500 font-bold text-lg md:text-xl">
          Biaya Pemakaian Listrik
        </h1>
        {/* Card statistik kolom 1 */}
        <div className="flex flex-row flex-wrap items-start gap-3 md:gap-4">
          {electricData.BiayaPemakaian &&
            electricData.BiayaPemakaian.sort((a, b) =>
              a.Nama.localeCompare(b.Nama)
            ).map((item, index) => (
              <CardStatistic
                key={index}
                className="w-full sm:w-[calc(50%-8px)] md:w-[calc(33.33%-12px)] lg:w-[298px]"
                icon={<RupiahIcon />}
                heading="Biaya Pemakaian"
                subheading={item.Nama}
                value={item.Biaya}
              />
            ))}
        </div>
      </div>{" "}
      <div className="w-full flex flex-col gap-2">
        <h1 className="text-primary-500 font-bold text-lg md:text-xl">
          Daya Listrik
        </h1>
        <div className="flex flex-row flex-wrap gap-3 md:gap-4">
          {electricData.TotalDayaListrik &&
            electricData.TotalDayaListrik.sort((a, b) =>
              a.nama.localeCompare(b.nama)
            ).map((item, index) => (
              <CardStatistic
                key={index}
                className="w-full sm:w-[calc(50%-8px)] md:w-[calc(33.33%-12px)] lg:w-[298px]"
                icon={<ElectricalIcon />}
                heading={`Pemakaian Daya ${item.nama}`}
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
