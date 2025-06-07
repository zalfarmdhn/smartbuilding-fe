import { createBrowserRouter } from "react-router";
import { lazy } from "react";

const LoginPage = lazy(() => import("../pages/LoginPage"));
const MainLayout = lazy(() => import("../layout/MainLayout"));
const WaterMonitoringPage = lazy(() => import("../pages/WaterMonitoringPage"));
const ElectricMonitoringPage = lazy(
  () => import("../pages/ElectricMonitoringPage")
);
const SettingsPage = lazy(() => import("../pages/SettingsPage"));
const DashboardPage = lazy(() => import("../pages/DashboardPage"));
const UserPage = lazy(() => import("../pages/UserPage"));
const PengelolaGedungPage = lazy(() => import("../pages/PengelolaGedungPage"));
const ChangePasswordPage = lazy(() => import("../pages/ChangePasswordPage"));
const NotFoundPage = lazy(() => import("../pages/404"));

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
        path: "pengelola-gedung",
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
