import { Outlet, ScrollRestoration, useNavigate } from "react-router";
import SidebarComponent from "../components/SidebarComponent";
import { useEffect, useState } from "react";
import { hasToken } from "../utils/tokenHandler";
import { useWaterMonitoring } from "../states/water-monitoring";
import { useElectricMonitoring } from "../states/electricity-monitoring";
import { formatSeconds } from "../utils/formatSeconds";
import { useSettings } from "../states/settings";
import { Toaster } from "react-hot-toast";
import { useUsers } from "../states/users";

/**
 * TODO :
 * - Handle error berbeda jika token expired 401 Unauthorized (DONE)
 * - Handle error jika API dari server tidak merespon
 * - Fix try catch double di state dan service, utamakan hanya di service saja
 */
export default function MainLayout() {
  const [loading, setLoading] = useState<boolean>(true);
  const getWaterData = useWaterMonitoring((state) => state.getWaterData);
  const getElectricData = useElectricMonitoring(
    (state) => state.getElectricData
  );

  const errorUserData = useSettings((state) => state.errorMe);
  const navigate = useNavigate();
  const getSettings = useSettings((state) => state.getSettings);
  const getUsers = useUsers((state) => state.getUsers);
  const getMe = useSettings((state) => state.getCurrentUser);
  const scheduler = useSettings((state) => state.scheduler);
  console.log("ini error", errorUserData);

  // Render pertama untuk inital data pada mount
  useEffect(() => {
    const initialFetch = async () => {
      await Promise.all([
        getWaterData(),
        getElectricData(),
        getSettings(),
        getUsers(),
        getMe(),
      ]);
      setLoading(false);
    };

    initialFetch();
  }, [getSettings, getWaterData, getUsers, getElectricData, getMe]);

  // useEffect kedua untuk fetch data setiap interval sekian detik
  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([getWaterData(), getElectricData()]);
    };

    const interval = setInterval(fetchData, formatSeconds(scheduler || 30000));
    return () => clearInterval(interval);
  }, [getWaterData, getElectricData, scheduler, navigate]);

  useEffect(() => {
    if (!hasToken() || errorUserData) {
      navigate("/login");
      return;
    }

    setLoading(false);
  }, [navigate, errorUserData]);

  if (loading) {
    return <p>Loading main layout...</p>;
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
