import { Link, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import {
  DashboardIcon,
  HamburgerIcon,
  LightningIcon,
  SettingsIcon,
  UserIcon,
  WaterIcon,
} from "./icons";
import { useSettings } from "../states/settings";
import { ISettings } from "../types/settings";
import { getDataSetting } from "../utils/backupData";
import { BuildingIcon, ChevronDown, ChevronRight } from "lucide-react";
import ControlIcon from "./icons/control-icon";
import { useAuth } from "../hooks/useAuth";

export default function SidebarComponent() {
  const [userPopup, setUserPopup] = useState<boolean>(false);
  const [openSidebar, setOpenSidebar] = useState<boolean>(false);
  const [selectedBuildingId, setSelectedBuildingId] = useState<number | null>(
    null
  );
  const [expandedSections, setExpandedSections] = useState<{
    [key: string]: boolean;
  }>({});
  const { logout } = useAuth();
  const navigate = useNavigate();
  const setIdBangunanState = useSettings((state) => state.setIdBangunanState);
  const settings = useSettings((state) => state.settings) ?? getDataSetting();
  const userData = useSettings((state) => state.dataUser);

  // Data remains the same
  const buildings = [
    {
      id: null,
      name: "Dashboard",
      items: [
        {
          name: "Dashboard",
          icon: <DashboardIcon />,
          href: "/dashboard",
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
          href: "/dashboard/water-monitor",
        },
        {
          name: "Monitoring Listrik",
          icon: <LightningIcon />,
          href: "/dashboard/electricity-monitor",
        },
      ],
    })) || []),
  ];

  const sidebarItems = [
    {
      title: "Kelola",
      items: [
        {
          name: "Pengguna",
          icon: <UserIcon />,
          href: "/dashboard/users",
        },
        {
          name: "Pengelola Gedung",
          icon: <BuildingIcon className="w-5 h-5" />,
          href: "/dashboard/pengelola-gedung",
        },
        {
          name: "Settings",
          icon: <SettingsIcon />,
          href: "/dashboard/settings",
        },
      ],
    },
  ];

  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener("popstate", handleLocationChange);
    return () => {
      window.removeEventListener("popstate", handleLocationChange);
    };
  }, []);

  const toggleSection = (sectionKey: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionKey]: !prev[sectionKey],
    }));
  };

  const handleBuildingSelect = (buildingId: number) => {
    if (selectedBuildingId === buildingId) return;
    setSelectedBuildingId(buildingId);
    setIdBangunanState(buildingId);
  };

  const handleLogout = () => {
    logout();
  };

  const isActiveRoute = (href: string) => {
    return currentPath === href;
  };
  return (
    <>
      {/* Top Navigation */}
      <nav className="fixed top-0 z-50 w-full tablet:mr-64 border-b bg-white dark:border-gray-700">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start rtl:justify-end">
              {/* Hamburger Icon: Hidden on tablet and larger screens */}
              <button
                onClick={() => setOpenSidebar(!openSidebar)}
                aria-controls="logo-sidebar"
                type="button"
                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg tablet:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                <span className="sr-only">Open sidebar</span>
                <HamburgerIcon />
              </button>
              <Link rel="preload" to="/" className="flex ms-1">
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
              <div className="ms-3">
                <div>
                  <button
                    type="button"
                    className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                    onClick={() => setUserPopup(!userPopup)}>
                    <span className="sr-only">Open user menu</span>
                    <img
                      width={32}
                      height={32}
                      className="rounded-full"
                      src={`https://ui-avatars.com/api/?name=${userData?.data.username}&background=random`}
                      alt="user photo"
                      loading="lazy"
                    />
                  </button>
                </div>
                {userPopup && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setUserPopup(false)}
                    />
                    <div
                      className="absolute right-0 z-50 w-48 mt-2 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow top-full dark:bg-gray-700 dark:divide-gray-600"
                      id="dropdown-user">
                      <ul className="py-1" role="none">
                        <li>
                          <a
                            onClick={() => {
                              navigate("/dashboard/change-password");
                              setUserPopup(false);
                            }}
                            className="block px-4 py-2 text-sm text-gray-600 cursor-pointer hover:bg-gray-300 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                            role="menuitem">
                            Ganti Password
                          </a>
                        </li>
                      </ul>
                      <ul className="py-1" role="none">
                        <li>
                          <a
                            onClick={handleLogout}
                            className="block px-4 py-2 text-sm text-red-500 cursor-pointer hover:bg-gray-300 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                            role="menuitem">
                            Keluar
                          </a>
                        </li>
                      </ul>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Sidebar Overlay for mobile/tablet */}
      {openSidebar && (
        <div
          className="fixed inset-0 z-30 bg-black bg-opacity-50"
          onClick={() => setOpenSidebar(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        id="logo-sidebar"
        className={`fixed top-0 left-0 z-40 w-64 h-screen pt-16 tablet:pt-12 bg-[#1776d6] transition-transform duration-300 ease-in-out
          ${openSidebar ? "translate-x-0" : "-translate-x-full"}
          tablet:translate-x-0`}
        aria-label="Sidebar">
        <div className="h-full px-3 pb-4 overflow-y-auto bg-[#1776d6]">
          <div className="space-y-2 font-medium">
            {/* Buildings Section */}
            <div className="pt-4">
              {buildings.map((building, index) => (
                <div key={building.id ?? index} className="mb-2">
                  {building.name === "Dashboard" ? (
                    building.items.map((item, itemIndex) => (
                      <Link
                        key={itemIndex}
                        to={item.href}
                        onClick={() => {
                          setOpenSidebar(false);
                          // For reactive highlighting
                          setTimeout(() => setCurrentPath(item.href), 0);
                        }}
                        className={`flex items-center p-2 text-white rounded-lg hover:bg-[#3791eb] transition-colors duration-200 ${
                          isActiveRoute(item.href) ? "bg-[#489aeb]" : ""
                        }`}>
                        <span className="w-5 h-5">{item.icon}</span>
                        <span className="ml-3">{item.name}</span>
                      </Link>
                    ))
                  ) : (
                    <div>
                      <button
                        onClick={() => toggleSection(`building-${building.id}`)}
                        className="flex items-center w-full p-2 text-white rounded-lg hover:bg-[#3791eb] transition-colors duration-200">
                        <BuildingIcon className="w-5 h-5" />
                        <span className="flex-1 ml-3 text-left whitespace-nowrap">
                          {building.name}
                        </span>
                        {expandedSections[`building-${building.id}`] ? (
                          <ChevronDown className="w-4 h-4" />
                        ) : (
                          <ChevronRight className="w-4 h-4" />
                        )}
                      </button>

                      {expandedSections[`building-${building.id}`] && (
                        <div className="mt-1 ml-6 space-y-1">
                          {building.items.map((item, itemIndex) => (
                            <Link
                              key={itemIndex}
                              to={item.href}
                              onClick={() => {
                                handleBuildingSelect(building.id ?? 1);
                                setOpenSidebar(false);
                                // For reactive highlighting
                                setTimeout(() => setCurrentPath(item.href), 0);
                              }}
                              className={`flex items-center p-2 text-white rounded-lg hover:bg-[#3791eb] transition-colors duration-200 ${
                                isActiveRoute(item.href) &&
                                selectedBuildingId === building.id
                                  ? "bg-[#3791eb]"
                                  : ""
                              }`}>
                              <span className="w-5 h-5">{item.icon}</span>
                              <span className="ml-3">{item.name}</span>
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Management Section */}
            {(userData?.data.role === "admin" ||
              userData?.data.role === "manajement") && (
              <div className="pt-4 border-t border-[#3791eb]">
                {sidebarItems.map((section, sectionIndex) => (
                  <div key={sectionIndex} className="mb-2">
                    <button
                      onClick={() =>
                        toggleSection(`management-${sectionIndex}`)
                      }
                      className="flex items-center w-full p-2 text-white rounded-lg hover:bg-[#3791eb] transition-colors duration-200">
                      <ControlIcon />
                      <span className="flex-1 ml-3 text-left whitespace-nowrap">
                        {section.title}
                      </span>
                      {expandedSections[`management-${sectionIndex}`] ? (
                        <ChevronDown className="w-4 h-4" />
                      ) : (
                        <ChevronRight className="w-4 h-4" />
                      )}
                    </button>

                    {expandedSections[`management-${sectionIndex}`] && (
                      <div className="mt-1 ml-6 space-y-1">
                        {section.items.map((item, itemIndex) => (
                          <Link
                            key={itemIndex}
                            to={item.href}
                            onClick={() => {
                              setOpenSidebar(false);
                              // For reactive highlighting
                              setTimeout(() => setCurrentPath(item.href), 0);
                            }}
                            className={`flex items-center p-2 text-white rounded-lg hover:bg-[#3791eb] transition-colors duration-200 ${
                              isActiveRoute(item.href) ? "bg-[#489aeb]" : ""
                            }`}>
                            <span className="w-5 h-5">{item.icon}</span>
                            <span className="ml-3">{item.name}</span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}
