import { useWaterMonitoring } from "../states/water-monitoring";
import WaterGraph from "../components/WaterGraph";
import { CardToren } from "../components/CardToren";
import CardStatistic from "../components/CardStatistic";
import AirKeluarIcon from "../components/icons/air-keluar-icon";
import AirMasukIcon from "../components/icons/air-masuk-icon";
import { Alert, Spinner } from "flowbite-react";
import { Droplet, OctagonAlert } from "lucide-react";
import { useSettings } from "../states/settings";

export default function WaterMonitoringPage() {
  // const [loading, setIsLoading] = useState(true);

  const waterData = useWaterMonitoring((state) => state.waterData);
  const loading = useWaterMonitoring((state) => state.loading);
  const error = useWaterMonitoring((state) => state.error);
  const scheduler = useSettings((state) => state.scheduler);

  console.log(`ini air data`, waterData);
  console.log(`ini loading`, loading);

  if (loading) {
    return (
      <div className="text-center">
        <Spinner aria-label="Center-aligned spinner example" size="xl" />
      </div>
    );
  }

  // if (!waterData.KapasitasToren) {
  //   return <p>Data not found</p>;
  // }

  return (    <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-6 max-w-4xl">
      {/* Warning */}
      {error && (
        <Alert color="warning" icon={OctagonAlert}>
          <span className="font-medium">Gagal mengakses data!</span> Tolong coba
          lagi.
        </Alert>
      )}
      {/* Header */}
      <div className="flex flex-wrap items-center justify-center bg-primary-400 rounded-lg p-3 sm:p-4 shadow-md mb-4">
        <Droplet className="w-6 h-6 sm:w-8 sm:h-8 text-white mr-2" />
        <h1 className="text-white font-bold text-lg sm:text-xl md:text-2xl">
          Monitoring Air (Realtime {scheduler} detik)
        </h1>
      </div>
      {!waterData.KapasitasToren && (
        <Alert color="warning" icon={OctagonAlert} className="mb-4">
          <span className="font-medium">Server gagal mengakses data!</span> Mohon menunggu dan tolong coba lagi.
        </Alert>
      )}      
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

      {/* Data Monitoring Air */}      <section className="mt-6">
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
