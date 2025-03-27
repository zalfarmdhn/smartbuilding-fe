import { Link, useNavigate } from "react-router";
import { useState } from "react";
import {
  DashboardIcon,
  HamburgerIcon,
  LightningIcon,
  SettingsIcon,
  UserIcon,
  WaterIcon,
} from "./icons";
// import { removeToken } from "../utils/tokenHandler";
import { useSettings } from "../states/settings";
import { CustomFlowbiteTheme, Sidebar } from "flowbite-react";
import { ISettings } from "../types/settings";
import { getDataRole, getDataSetting, removeAllData } from "../utils/backupData";
import { BuildingIcon } from "lucide-react";

export default function SidebarComponent() {
  const [userPopup, setUserPopup] = useState<boolean>(false);
  const [openSidebar, setOpenSidebar] = useState<boolean>(false);
  const [selectedBuildingId, setSelectedBuildingId] = useState<number | null>(
    null
  );
  const navigate = useNavigate();

  const customTheme: CustomFlowbiteTheme["sidebar"] = {
    "root": {
      "inner": "h-full overflow-y-auto overflow-x-hidden rounded bg-[#1776d6]",
    },
    "collapse": {
      "button": "group flex w-full items-center rounded-lg p-2 text-base font-normal text-gray-900 transition duration-75 hover:bg-[#3791eb] dark:text-white dark:hover:bg-gray-700 ",
      "list": "space-y-2 py-2"
    },
    "item": {
      "base": "flex items-center justify-center rounded-lg p-2 text-base font-normal text-gray-900 hover:bg-[#3791eb] text-white",
    }
  }

  const setIdBangunanState = useSettings((state) => state.setIdBangunanState);
  const settings = useSettings((state) => state.settings) ?? getDataSetting();  
  const role = getDataRole();
  console.log(`ini role user`, role);

  const buildings = [
    {
      name: "Dashboard",
      items: [
        {
          name: "Dashboard",
          icon: <DashboardIcon />,
          href: "/",
        },
      ],
    },
    ...(settings?.map((building: ISettings) => ({
      id: building.id,
      name: building.nama_gedung,
      items: [
        {
          name: "Monitoring Air",
          icon: <WaterIcon />,
          href: "/water-monitor",
        },
        {
          name: "Monitoring Listrik",
          icon: <LightningIcon />,
          href: "/electricity-monitor",
        },
      ],
    })) || [])
  ];

  const sidebarItems = [
    {
      title: "Kelola",
      items: [
        {
          name: "Pengguna",
          icon: <UserIcon />,
          href: "/users",
        },
        {
          name: "Settings",
          icon: <SettingsIcon />,
          href: "/settings",
        },
      ],
    },
  ];

  // Types
  interface BuildingItem {
    name: string;
    icon: JSX.Element;
    href: string;
  }

  const handleBuildingSelect = (buildingId: number) => {
    if(selectedBuildingId === buildingId) return;
    setSelectedBuildingId(buildingId);
    setIdBangunanState(buildingId);
  };

  const handleLogout = () => {
    removeAllData();
    navigate("/login");
  };

  return (
    <>
      <nav className="fixed top-0 z-50 w-full border-b 0 bg-white dark:border-gray-700">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start rtl:justify-end">
              <button
                onClick={() => setOpenSidebar(!openSidebar)}
                aria-controls="logo-sidebar"
                type="button"
                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden focus:outline-none dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                <span className="sr-only">Open sidebar</span>
                <HamburgerIcon />
              </button>
              <Link to="/" className="flex ms-1 md:me-24">
                <img
                  src="/logo.svg"
                  alt="Smartbuilding"
                  className="mx-auto h-8 w-auto"
                />
                <span className="self-center ml-2 text-[#273C97] text-xl font-semibold sm:text-md whitespace-nowrap dark:text-white">
                  Smartbuilding
                </span>
              </Link>
            </div>
            <div className="flex items-center">
              <div className="flex items-center ms-3">
                <div>
                  <button
                    type="button"
                    className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                    onClick={() => setUserPopup(!userPopup)}>
                    <span className="sr-only">Open user menu</span>
                    <img
                      className="w-8 h-8 rounded-full"
                      src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                      alt="user photo"
                    />
                  </button>
                </div>
                <div
                  className={`z-50 absolute right-0 top-full mt-2 w-48 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600 ${
                    userPopup ? "visible" : "hidden"
                  }`}
                  id="dropdown-user">
                  <ul className="py-1" role="none">
                    <li>
                      <a
                        onClick={handleLogout}
                        className="block px-4 py-2 text-sm text-red-500 hover:bg-gray-300 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                        role="menuitem">
                        Sign out
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <aside
        id="logo-sidebar"
        className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform bg-[#1776d6] ${
          !openSidebar ? "-translate-x-full" : "translate-x-0"
        } bg-[#1776d6] border-r border-gray-200 sm:translate-x-0`}
        aria-label="Sidebar">
        <Sidebar theme={customTheme} className="h-full px-3 pb-4 overflow-y-auto bg-[#1776d6] text-white">
          <Sidebar.Items className="bg-[#1776d6]">
            <Sidebar.ItemGroup>
              {buildings.map((building, index) => (
                <div key={building.id ?? index}>
                  {building.name === "Dashboard" ? (
                  // Dashboard section
                  building.items.map((item: BuildingItem, itemIndex: number) => (
                    <Sidebar.Item
                    key={itemIndex}
                    as={Link}
                    to={item.href}
                    icon={() => item.icon}
                    onClick={() => setOpenSidebar(!openSidebar)}
                    className={`
                      ${window.location.pathname === item.href
                      ? "bg-[#489aeb] "
                      : ""}`
                    }>
                    {item.name}
                    </Sidebar.Item>
                  ))
                  ) : (
                  // Building sections with collapsible menu
                  <Sidebar.Collapse
                    icon={() => <BuildingIcon />}
                    label={building.name}
                    className="text-white"
                    >
                    {building.items.map((item: BuildingItem, itemIndex: number) => (
                    <Sidebar.Item
                      key={itemIndex}
                      as={Link}
                      to={item.href}
                      icon={() => item.icon}
                      onClick={() => {
                      handleBuildingSelect(building.id ?? 1);
                      setOpenSidebar(!openSidebar);
                      }}
                      className={
                      window.location.pathname === item.href &&
                      selectedBuildingId === building.id
                        && "bg-[#3791eb]"
                      }>
                      {item.name}
                    </Sidebar.Item>
                    ))}
                  </Sidebar.Collapse>
                  )}
                </div>
              ))}
            </Sidebar.ItemGroup>
            <Sidebar.ItemGroup>
              {/* Management section */}
              {(role === "admin" || role === "manajement") && 
              sidebarItems.map((section, sectionKey) => (
                <div key={sectionKey}>
                  <Sidebar.Collapse
                    icon={() => <SettingsIcon />}
                    label={section.title}
                    className="text-white">
                    {section.items.map((item, itemIndex) => (
                      <Sidebar.Item
                        key={itemIndex}
                        as={Link}
                        to={item.href}
                        icon={() => item.icon}
                        onClick={() => setOpenSidebar(!openSidebar)}
                        className={
                          window.location.pathname === item.href
                            ? "bg-[#489aeb]"
                            : ""
                        }>
                        {item.name}
                      </Sidebar.Item>
                    ))}
                  </Sidebar.Collapse>
                </div>
              ))}
            </Sidebar.ItemGroup>
          </Sidebar.Items>
        </Sidebar>
      </aside>
    </>
  );
}
