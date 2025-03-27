import { createBrowserRouter } from "react-router";
import LoginPage from "../pages/LoginPage";
import MainLayout from "../layout/MainLayout";
import WaterMonitoringPage from "../pages/WaterMonitoringPage";
import ElectricMonitoringPage from "../pages/ElectricMonitoringPage";
import SettingsPage from "../pages/SettingsPage";

const routes = createBrowserRouter([
  {
    path: "/login",
    element: (<LoginPage />),
  },
  {
    path: "/",
    element: (<MainLayout />),
    children: [
      {
        index: true,
        element: (<h1>Dashboard</h1>)
      },
      {
        path:"/water-monitor",
        element: (<WaterMonitoringPage />)
      },
      {
        path: "/electricity-monitor",
        element: (<ElectricMonitoringPage />)
      },
      {
        path: "/users",
        element: (<h1>User</h1>)
      },
      {
        path: "/settings",
        element: (<SettingsPage />)
      },
      {
        path: "*",
        element: (<h1>404 - Page Not Found</h1>)
      },
      
    ]
  }
]);

export default routes;