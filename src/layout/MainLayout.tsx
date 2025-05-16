import { Outlet, ScrollRestoration, useNavigate } from "react-router";
import SidebarComponent from "../components/SidebarComponent";
import { useEffect, useState } from "react";
import { hasToken } from "../utils/tokenHandler";
import { useWaterMonitoring } from "../states/water-monitoring";
import { useElectricMonitoring } from "../states/electricity-monitoring";
import { formatSeconds } from "../utils/formatSeconds";
import { useSettings } from "../states/settings";

/**
 * TODO :
 * - Buatlah handle function jika server API sedang error, ambil dari localStorage
 * - Ubah auth agar mengecek /me untuk mendapatkan data user
 * - Handle expire token belum ada
 * - Responsive belum ada
 */
export default function MainLayout() {
  const [loading, setLoading] = useState<boolean>(true);
  const getWaterData = useWaterMonitoring((state) => state.getWaterData);
  const getElectricData = useElectricMonitoring(
    (state) => state.getElectricData
  );
  const navigate = useNavigate();
  const getSettings = useSettings((state) => state.getSettings);
  const getMe = useSettings((state) => state.setCurrentUser);
  const scheduler = useSettings((state) => state.scheduler);
  console.log(`ini scheduler`, scheduler);

  // Render pertama untuk inital data pada mount
  useEffect(() => {
    const initialFetch = async () => {
      await Promise.all([
        getWaterData(),
        getElectricData(),
        getSettings(),
        getMe(),
      ]);
      setLoading(false);
    };

    initialFetch();
  }, [getSettings, getWaterData, getElectricData, getMe]);

  // useEffect kedua untuk fetch data setiap interval sekian detik
  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([getWaterData(), getElectricData()]);
    };

    const interval = setInterval(fetchData, formatSeconds(scheduler || 30000));
    return () => clearInterval(interval);
  }, [getWaterData, getElectricData, scheduler, navigate]);

  useEffect(() => {
    // kalau user gaada token direct ke halaman login (bukan expire token)
    if (!hasToken()) {
      navigate("/login");
      return;
    }

    setLoading(false);
  }, [navigate]);

  if (loading) {
    return <p>Loading main layout...I</p>;
  }

  return (
    <>
      <SidebarComponent />
      <div className="p-4 pt-16 sm:ml-64 bg-[#E9EDEF] min-h-screen">
        <Outlet />
        <ScrollRestoration />
      </div>
    </>
  );
}
