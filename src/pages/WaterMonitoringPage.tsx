import { useWaterMonitoring } from "../states/water-monitoring";
import WaterGraph from "../components/WaterGraph";
import { CardToren } from "../components/CardToren";
import CardStatistic from "../components/CardStatistic";
import AirKeluarIcon from "../components/icons/air-keluar-icon";
import AirMasukIcon from "../components/icons/air-masuk-icon";
import { Spinner } from "flowbite-react";
import { Droplet } from "lucide-react";
import { useSettings } from "../states/settings";
import { useEffect } from "react";

export default function WaterMonitoringPage() {
  const waterData = useWaterMonitoring((state) => state.waterData);
  const loading = useWaterMonitoring((state) => state.loading);
  const error = useWaterMonitoring((state) => state.error);
  const scheduler = useSettings((state) => state.scheduler);

  useEffect(() => {
    document.title = "Smartbuilding | Monitoring Air";
  }, []);

  if (loading) {
    return (
      <div className="text-center">
        <Spinner aria-label="Center-aligned spinner example" size="xl" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-6 max-w-4xl">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-center bg-primary-400 rounded-lg p-3 sm:p-4 shadow-md mb-4">
        <Droplet className="w-6 h-6 sm:w-8 sm:h-8 text-white mr-2" />
        <h1 className="text-white font-bold text-lg sm:text-xl md:text-2xl">
          Monitoring Air {waterData.nama_gedung || "Gedung"}
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
          {waterData?.kapasitasToren?.map((toren) => (
            <CardToren
              key={toren.nama}
              torenTitle={toren.nama}
              torenPercentage={toren.kapasitas}
              torenCapacity={toren.kapasitas_toren}
              sensorVolume={toren.volume_sensor}
              lastUpdated={toren.created_at}
            />
          ))}
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
