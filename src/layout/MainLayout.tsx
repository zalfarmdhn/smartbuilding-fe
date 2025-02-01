import { Outlet, ScrollRestoration, useNavigate } from "react-router";
import Sidebar from "../components/Sidebar";
import { useEffect, useState } from "react";
import { hasToken } from "../utils/tokenHandler";
import { useWaterMonitoring } from "../states/water-monitoring";
import { useElectricMonitoring } from "../states/electricity-monitoring";

export default function MainLayout() {
  const getWaterData = useWaterMonitoring((state) => state.getWaterData);
  const getElectricData = useElectricMonitoring((state) => state.getElecticData);


  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Fetch data on mount
    getWaterData();
    getElectricData();
    
    // Set interval to fetch every 30 secs
    const fetchData = () => {
      getWaterData();
      getElectricData();
    };
    const interval = setInterval(fetchData, 28000);
    return () => clearInterval(interval);
  }, [getWaterData, getElectricData]);

  useEffect(() => {
    if (hasToken()) {
      // Ganti loading state ke false jika user ada token
      setLoading(false);
      // Merubah title website
      document.title = "Smart Building Dashboard";
    } else {
      if ( window.location.pathname !== "/login" ) navigate("/login");
    }
  }, [setLoading, navigate]);

  if (loading) {
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
