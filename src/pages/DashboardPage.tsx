import { useEffect } from "react";
import { useSettings } from "../states/settings";
import CardStatistic from "../components/CardStatistic";
import { BuildingIcon, ChartNoAxesColumn, Shield } from "lucide-react";
import { useWaterMonitoring } from "../states/water-monitoring";
import { useElectricMonitoring } from "../states/electricity-monitoring";
import { UserIcon, WaterIcon } from "../components/icons";
import ElectricalIcon from "../components/icons/electrical-icon";

export default function DashboardPage() {
  const settings = useSettings((state) => state.settings);
  const userName = useSettings((state) => state.dataUser?.data?.username);
  const monitorAir = useWaterMonitoring((state) => state.waterData);
  const monitorListrik = useElectricMonitoring((state) => state.electricData);

  useEffect(() => {
    document.title = "Smartbuilding | Dashboard";
  }, []);

  return (
    <div className="flex flex-col gap-4 p-4 container">
      <div className="mb-3">
        <h2 className="text-[#273C97] font-bold text-xl md:text-2xl">
          Dashboard Smart Building
        </h2>
        <p className="text-gray-600 mt-1">
          Selamat datang {userName}! Pantau seluruh sistem bangunan dengan mudah
          dari satu tempat.
        </p>
      </div>
      {/* Admin Dashboard Section */}
      <div className="grid grid-cols-2 gap-4">
        {/* Section 1 */}
        <section className="col-span-2 md:col-span-1 w-full">
          <div className="flex flex-row items-center gap-2 mb-4">
            <div className="min-w-8 min-h-8 w-8 h-8 sm:w-10 sm:h-10 bg-[#273C97] text-white rounded-lg flex items-center justify-center">
              <Shield className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <h2 className="text-primary-500 font-semibold text-sm sm:text-md md:text-lg">
              Admin Dashboard
            </h2>
          </div>
          {/* Section 1 - Card */}
          <div className="grid lg:grid-cols-2 sm:grid-cols-1 md:grid-cols-1 gap-3 w-full md:w-fit">
            <CardStatistic
              icon={<BuildingIcon />}
              heading="Jumlah Gedung"
              value={
                Array.isArray(settings)
                  ? settings.length.toString()
                  : "Loading..."
              }
            />
            {/* TODO : Integrasi total pengguna */}
            <CardStatistic
              icon={<UserIcon />}
              heading="Total Pengguna"
              value="20"
            />
          </div>
        </section>
        {/* Section 2 */}
        <section className="col-span-2 md:col-span-1 w-full">
          <div className="flex flex-row items-center gap-2 mb-4">
            <div className="min-w-8 min-h-8 w-8 h-8 sm:w-10 sm:h-10 bg-[#273C97] text-white rounded-lg flex items-center justify-center">
              <ChartNoAxesColumn className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <h2 className="text-primary-500 font-semibold text-sm sm:text-md md:text-lg">
              Status Monitoring
            </h2>
          </div>
          {/* Section 2 - Card  */}
          <div className="grid lg:grid-cols-2 sm:grid-cols-1 md:grid-cols-1 gap-3 w-full md:w-fit">
            <CardStatistic
              icon={<WaterIcon />}
              heading="Water Monitoring"
              value={monitorAir ? "Online" : "Offline"}
            />
            <CardStatistic
              icon={<ElectricalIcon />}
              heading="Electric Monitoring"
              value={monitorListrik ? "Online" : "Offline"}
            />
          </div>
        </section>
      </div>
    </div>
  );
}
