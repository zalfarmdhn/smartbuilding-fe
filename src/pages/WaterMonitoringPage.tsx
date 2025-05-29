import { useWaterMonitoring } from "../states/water-monitoring";
import WaterGraph from "../components/WaterGraph";
import { CardToren } from "../components/CardToren";
import CardStatistic from "../components/CardStatistic";
import AirKeluarIcon from "../components/icons/air-keluar-icon";
import AirMasukIcon from "../components/icons/air-masuk-icon";
import { Alert, Spinner } from "flowbite-react";
import { ClockIcon, Droplet } from "lucide-react";
import { useSettings } from "../states/settings";
import { useEffect } from "react";
import { returnFullDate } from "../utils/formatDate";

export default function WaterMonitoringPage() {
  // const [loading, setIsLoading] = useState(true);

  const waterData = useWaterMonitoring((state) => state.waterData);
  const loading = useWaterMonitoring((state) => state.loading);
  const error = useWaterMonitoring((state) => state.error);
  const scheduler = useSettings((state) => state.scheduler);

  useEffect(() => {
    document.title = "Smartbuilding | Monitoring Air";
  }, []);

  console.log(`ini air data`, waterData);
  console.log(`ini loading`, loading);

  if (loading) {
    return (
      <div className="text-center">
        <Spinner aria-label="Center-aligned spinner example" size="xl" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-6 max-w-4xl">
      {/* Warning */}
      {error && (
        <div className="flex flex-col gap-2 my-4">
          <Alert color="failure">
            <div className="flex flex-row gap-2 items-center">
              <span className="font-medium text-white">
                Gagal mengakses data terbaru! Menggunakan data backup.
              </span>
              <button
                onClick={() => window.location.reload()}
                className="px-3 py-1 bg-red-700 text-white rounded hover:bg-red-800 transition-colors flex items-center gap-2">
                {/* Refresh Icon */}
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                Refresh
              </button>
            </div>
          </Alert>
        </div>
      )}
      {/* Header */}
      <div className="flex flex-wrap items-center justify-center bg-primary-400 rounded-lg p-3 sm:p-4 shadow-md mb-4">
        <Droplet className="w-6 h-6 sm:w-8 sm:h-8 text-white mr-2" />
        <h1 className="text-white font-bold text-lg sm:text-xl md:text-2xl">
          Monitoring Air {waterData.namaGedung || "Gedung"}
          <br />
          {!error && <span>(Realtime {scheduler} detik)</span>}
        </h1>
      </div>
      {/* Statistik Toren Air */}
      <section>
        <h2 className="text-primary-500 font-bold text-lg sm:text-xl md:text-2xl mb-3 sm:mb-4">
          Statistik Toren Air
        </h2>
        <div className="space-y-3 sm:space-y-4">
          {waterData?.KapasitasToren?.map((toren, index) => (
            <CardToren
              key={index}
              torenTitle={toren.nama}
              torenPercentage={toren.kapasitas}
              torenCapacity={toren.kapasitas_toren}
              sensorVolume={toren.volume_sensor}
              lastUpdated={toren.created_at}
            />
          ))}
        </div>
      </section>
      {/* Informasi Pembaruan */}
      <section className="mt-6">
        <h2 className="text-primary-500 font-bold text-xl md:text-2xl mb-4">
          Informasi Pembaharuan
        </h2>
        <div className="bg-primary-400 rounded-lg shadow-md p-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <ClockIcon className="text-[#273C97]" />
              </div>
              <div>
                <h3 className="font-semibold text-white">
                  Terakhir Diperbarui
                </h3>
                <p className="text-sm text-white">
                  {waterData?.UpdatedAt
                    ? `${returnFullDate(waterData.UpdatedAt)}, ${new Date(
                        waterData.UpdatedAt
                      ).toLocaleTimeString()}`
                    : "Data tidak tersedia"}
                </p>
              </div>
            </div>
            <div className="text-right">
              <span
                className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                  error
                    ? "bg-red-100 text-gray-100"
                    : "bg-green-100 text-green-800"
                }`}>
                {error ? "Offline" : "Online"}
              </span>
            </div>
          </div>
        </div>
      </section>
      {/* Data Monitoring Air */}{" "}
      <section className="mt-6">
        <h2 className="text-primary-500 font-bold text-xl md:text-2xl mb-4">
          Data Monitoring Air
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <CardStatistic
            icon={<AirKeluarIcon />}
            heading="Air Keluar"
            value={waterData.AirKeluar}
            className="w-full"
          />
          <CardStatistic
            icon={<AirMasukIcon />}
            heading="Air Masuk"
            value={waterData.AirMasuk}
            className="w-full"
          />
        </div>
      </section>
      {/* Water Usage Graph */}
      <WaterGraph />
    </div>
  );
}
