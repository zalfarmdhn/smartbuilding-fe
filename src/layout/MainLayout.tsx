import { Outlet, ScrollRestoration, useNavigate } from "react-router";
import Sidebar from "../components/Sidebar";
import { useEffect, useState } from "react";
import { hasToken } from "../utils/tokenHandler";
import { useWaterMonitoring } from "../states/water-monitoring";
import { useElectricMonitoring } from "../states/electricity-monitoring";
import { getSettings } from "../services/settings";
import { formatSeconds } from "../utils/formatSeconds";

export default function MainLayout() {
  const getWaterData = useWaterMonitoring((state) => state.getWaterData);
  const getElectricData = useElectricMonitoring((state) => state.getElecticData);
  const error = useWaterMonitoring((state) => state.error);

  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(true);
  const [scheduler, setScheduler] = useState<number>(30000);

  console.log(`tampilan error ${error}`);

  useEffect(() => {
    // Fetch data on mount
    getWaterData();
    getElectricData();
    
    // Set interval to fetch every 30 secs
    const fetchData = async () => {
      await Promise.all([
        getWaterData(),
        getElectricData()
      ]);
    };

    const initializeScheduler = async () => {
      const settings = await getSettings();
      setScheduler(settings.scheduler);
    };

    initializeScheduler();


    if(error) {
      navigate("/login");
      return;
    }
    
    const interval = setInterval(fetchData, formatSeconds(scheduler));
    return () => clearInterval(interval);
  }, [getWaterData, getElectricData, navigate, error, scheduler]);

  useEffect(() => {
    if (hasToken() && !error) {
      // Ganti loading state ke false jika user ada token
      setLoading(false);
      // Merubah title website
      document.title = "Smart Building Dashboard";
    } else {
      if (window.location.pathname !== "/login") {
        setLoading(false);
        navigate("/login");
      }
    }
  }, [error, navigate]);

  if (loading || error) {
    return (
      <p>Loading...</p>
    );
  }

  return (
    <>
      <Sidebar />
      <div className="p-4 pt-16 sm:ml-64 bg-[#E9EDEF] min-h-dvh">
        <Outlet />
        <ScrollRestoration />
      </div>
    </>
  );
}
