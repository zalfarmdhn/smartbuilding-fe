import { useEffect } from "react";
import { useSettings } from "../states/settings";
import CardStatistic from "../components/CardStatistic";
import {
  BuildingIcon,
  ChartNoAxesColumn,
  RefreshCwIcon,
  Shield,
} from "lucide-react";
import { UserIcon, WaterIcon } from "../components/icons";
import ElectricalIcon from "../components/icons/electrical-icon";
import { useUsers } from "../states/users";
import { ISettings } from "../types/settings";

export default function DashboardPage() {
  const settings = useSettings((state) => state.settings);
  const getSettings = useSettings((state) => state.getSettings);
  const loadingSettings = useSettings((state) => state.loading);
  const dataUser = useSettings((state) => state.dataUser?.data);
  const users = useUsers((state) => state.users);

  useEffect(() => {
    document.title = "Smartbuilding | Dashboard";
  }, []);

  return (
    <div className="flex flex-col gap-4 p-4 mx-auto container">
      <div className="mb-3">
        <h2 className="text-[#273C97] font-bold text-xl md:text-2xl">
          Dashboard Smart Building
        </h2>
        <p className="text-gray-600 mt-1">
          Selamat datang {dataUser?.username}! Pantau seluruh sistem bangunan
          dengan mudah dari satu tempat.
        </p>
      </div>
      {/* Admin Dashboard Section */}
      <div className="grid grid-cols-1 gap-4">
        {/* Section 1 */}
        <section className="col-span-2 md:col-span-1 w-full">
          <div className="flex flex-row items-center gap-2 mb-4">
            <div className="min-w-8 min-h-8 w-8 h-8 sm:w-10 sm:h-10 bg-[#273C97] text-white rounded-lg flex items-center justify-center">
              <Shield className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <h2 className="text-primary-500 font-semibold text-sm sm:text-md md:text-lg">
              Detail Aplikasi
            </h2>
          </div>
          {/* Section 1 - Card */}
          <div className="grid lg:grid-cols-2 sm:grid-cols-1 md:grid-cols-2 gap-3 w-full md:w-fit">
            <CardStatistic
              className="w-full"
              icon={<BuildingIcon />}
              heading="Jumlah Gedung"
              value={
                Array.isArray(settings)
                  ? settings.length.toString()
                  : "Loading..."
              }
            />
            {
              // if the role is admin, show the total users
              dataUser?.role === "admin" && (
                <CardStatistic
                  className="w-full"
                  icon={<UserIcon />}
                  heading="Total Pengguna"
                  value={users ? `${users.length} Pengguna` : "Loading..."}
                />
              )
            }
          </div>
        </section>
        <section className="col-span-2 md:grid md:grid-cols-2 w-full">
          {/* Section Mapping Status Monitoring Bangunan */}
          {settings.map((setting: ISettings, index: number) => {
            // Cek apakah monitorAirStatus dan monitorListrikStatus offline atau online
            const monitorAirStatus =
              setting?.monitoring_status?.[0]?.["monitoring air"] === "online";
            const monitorListrikStatus =
              setting?.monitoring_status?.[1]?.["monitoring listrik"] ===
              "online";

            return (
              <div
                key={index}
                className="col-span-2 md:col-span-1 w-full  md:w-fit rounded-lg my-4">
                <div className="flex flex-row items-center gap-2 mb-4">
                  <div className="min-w-8 min-h-8 w-8 h-8 sm:w-10 sm:h-10 bg-[#273C97] text-white rounded-lg flex items-center justify-center">
                    <ChartNoAxesColumn className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <h2 className="text-primary-500 font-semibold text-sm sm:text-md md:text-lg">
                    Status Monitoring {setting.nama_gedung}
                  </h2>
                </div>
                {/* Section 1 - Card */}
                <div className="grid lg:grid-cols-2 sm:grid-cols-1 md:grid-cols-1 tablet:grid-cols-1 w-full gap-3">
                  <CardStatistic
                    icon={<WaterIcon />}
                    heading="Water Monitoring"
                    className="sm:w-full"
                    value={
                      <div
                        className={`px-3 py-1 my-1 rounded-full text-xs font-medium ${
                          monitorAirStatus
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-gray-100"
                        }`}>
                        {monitorAirStatus ? "Online" : "Offline"}
                      </div>
                    }
                  />
                  <CardStatistic
                    icon={<ElectricalIcon />}
                    heading="Electric Monitoring"
                    className="sm:w-full"
                    value={
                      <div
                        className={`px-3 py-1 my-1 rounded-full text-xs font-medium ${
                          monitorListrikStatus
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-gray-100"
                        }`}>
                        {monitorListrikStatus ? "Online" : "Offline"}
                      </div>
                    }
                  />
                </div>
              </div>
            );
          })}
        </section>
      </div>
      <button
        className="flex flex-row items-center gap-x-2 mr-auto text-xs sm:text-sm text-white bg-primary-400 hover:bg-primary-500 md:px-2 md:py-1 px-4 py-2 rounded-md"
        disabled={loadingSettings}
        onClick={() => {
          getSettings();
        }}>
        <RefreshCwIcon width={15} height={15} />
        {loadingSettings ? "Loading..." : "Refresh Status Monitoring"}
      </button>
      <span className="text-gray-500 text-sm">
        Catatan: refresh status monitoring secara berkala.
      </span>
    </div>
  );
}
