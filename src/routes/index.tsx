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

const routes = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: "/water-monitor",
        element: <WaterMonitoringPage />,
      },
      {
        path: "/electricity-monitor",
        element: <ElectricMonitoringPage />,
      },
      {
        path: "/users",
        element: <UserPage />,
      },
      {
        path: "/pengelola_gedung",
        element: <PengelolaGedungPage />,
      },
      {
        path: "/settings",
        element: <SettingsPage />,
      },
      {
        path: "/change-password",
        element: <ChangePasswordPage />,
      },
      {
        path: "*",
        element: <h1>404 - Page Not Found</h1>,
      },
    ],
  },
]);

export default routes;