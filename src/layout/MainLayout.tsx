import { Outlet, ScrollRestoration } from "react-router";
import SidebarComponent from "../components/SidebarComponent";
import { useEffect, useState } from "react";
import { useWaterMonitoring } from "../states/water-monitoring";
import { useElectricMonitoring } from "../states/electricity-monitoring";
import { formatSeconds } from "../utils/formatSeconds";
import { useSettings } from "../states/settings";
import { Toaster } from "react-hot-toast";
import { useUsers } from "../states/users";
import { useAuth as useAuthHook } from "../hooks/useAuth";
import { Spinner } from "flowbite-react";

export default function MainLayout() {
  const [loading, setLoading] = useState<boolean>(true);
  // validasi apakah user sudah login atau belum
  const { isLoggedIn, isLoading: authLoading } = useAuthHook();
  const getWaterData = useWaterMonitoring((state) => state.getWaterData);
  const getElectricData = useElectricMonitoring(
    (state) => state.getElectricData
  );

  const getSettings = useSettings((state) => state.getSettings);
  const getUsers = useUsers((state) => state.getUsers);
  const getMe = useSettings((state) => state.getCurrentUser);
  const scheduler = useSettings((state) => state.scheduler);

  // Render sekali untuk inital data pada mount
  useEffect(() => {
    const initialFetch = async () => {
      await Promise.all([getSettings(), getUsers(), getMe()]);
      setLoading(false);
    };

    initialFetch();
  }, [getSettings, getUsers, getMe]);

  // useEffect kedua untuk fetch data setiap interval sekian detik
  useEffect(() => {
    const fetchData = async () => {
      try {
        await Promise.all([getWaterData(), getElectricData()]);
      } catch (error) {
        console.error("Failed to fetch monitoring data:", error);
      }
    };

    fetchData(); // fetch once immediately

    const interval = setInterval(fetchData, formatSeconds(scheduler || 30000));
    return () => clearInterval(interval);
  }, [getWaterData, getElectricData, scheduler]);

  // Tampilkan loading ketika auth sedang dicek atau data awal sedang diambil
  if (authLoading || loading || !isLoggedIn) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-lg border flex items-center space-x-3">
          <Spinner
            size="sm"
            aria-label="Loading spinner"
            className="me-3"
            light
          />
          <span className="text-gray-700 font-medium">Memuat halaman</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <SidebarComponent />
      <div className="p-4 pt-16 sm:ml-64 bg-[#E9EDEF] min-h-screen">
        <div>
          <Toaster />
        </div>
        <Outlet />
        <ScrollRestoration />
      </div>
    </>
  );
}
