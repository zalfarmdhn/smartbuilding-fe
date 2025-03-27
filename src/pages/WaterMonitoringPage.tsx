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

  if (error) {
    return (
      <>
        <Alert color="warning" icon={OctagonAlert}>
          <span className="font-medium">Gagal mengakses data!</span> Tolong coba
          lagi.
        </Alert>
      </>
    );
  }

  if (!waterData.KapasitasToren) {
    return <p>Data not found</p>;
  }

  return (
    <>
      {/* Section Statistik Toren Air */}
      <div className="w-[806px] h-full flex flex-col gap-4 mx-auto">
        <div className="flex items-center gap-2 mx-auto bg-primary-400 rounded-lg p-4 shadow-md my-4">
          <Droplet className="w-8 h-8 text-white" />
          <h1 className="text-white font-bold text-2xl">
            Monitoring Air (Realtime {scheduler} detik)
          </h1>
        </div>
        <hr className="h-px bg-primary-500 border-0 dark:bg-primary-400" />
        <h1 className="text-primary-500 font-bold text-2xl">
          Statistik Toren Air 
        </h1>
        <div className="flex flex-col gap-6">
          {/* Card Toren, mapped by toren amount */}
          {waterData?.KapasitasToren.map((toren, index) => (
            <CardToren
              key={index}
              torenTitle={toren.nama}
              torenPercentage={toren.kapasitas}
              torenCapacity={toren.kapasitas_toren}
              sensorVolume={toren.volume_sensor}
              lastUpdated={toren.created_at}
            />
          ))}
          {/* Data Monitoring Air */}
          <h1 className="text-primary-500 font-bold text-2xl">
            Data Monitoring Air
          </h1>
          <div className="flex flex-row gap-4">
            <CardStatistic
              icon={<AirKeluarIcon />}
              heading="Air Keluar"
              value={waterData.AirKeluar}
            />
            <CardStatistic
              icon={<AirMasukIcon />}
              heading="Air Masuk"
              value={waterData.AirMasuk}
            />
          </div>
        </div>
      </div>
      {/* Section Chart Penggunaan Air */}
      <WaterGraph />
    </>
  );
}
