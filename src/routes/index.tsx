import { createBrowserRouter } from "react-router";
import LoginPage from "../pages/LoginPage";
import MainLayout from "../layout/MainLayout";
import WaterMonitoringPage from "../pages/WaterMonitoringPage";
import ElectricMonitoringPage from "../pages/ElectricMonitoringPage";
import SettingsPage from "../pages/SettingsPage";
import DashboardPage from "../pages/DashboardPage";
import UserPage from "../pages/UserPage";
import PengelolaGedungPage from "../pages/PengelolaGedungPage";
import ChangePasswordPage from "../pages/ChangePasswordPage";
import NotFoundPage from "../pages/404";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/dashboard",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: "water-monitor",
        element: <WaterMonitoringPage />,
      },
      {
        path: "electricity-monitor",
        element: <ElectricMonitoringPage />,
      },
      {
        path: "users",
        element: <UserPage />,
      },
      {
        path: "pengelola_gedung",
        element: <PengelolaGedungPage />,
      },
      {
        path: "settings",
        element: <SettingsPage />,
      },
      {
        path: "change-password",
        element: <ChangePasswordPage />,
      },
      {
        path: "*",
        element: <NotFoundPage link="dashboard" />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage className="bg-white" />,
  },
]);

export default routes;
