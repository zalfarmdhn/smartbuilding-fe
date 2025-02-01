import { Link } from "react-router";
import { useState } from "react";
import { DashboardIcon, HamburgerIcon, LightningIcon, SettingsIcon, UserIcon, WaterIcon } from './icons';
import { removeToken } from "../utils/tokenHandler";


export default function Sidebar() {
  const [userPopup, setUserPopup] = useState<boolean>(false);
  const [openSidebar, setOpenSidebar] = useState<boolean>(false);

  const sidebarItems = [
    {
      title: "Dashboard",
      items: [
        {
          name: "Dashboard",
          icon: <DashboardIcon />,
          href: "/",
        },
        {
          name: "Level Toren Air",
          icon: <WaterIcon />,
          href: "/water-monitor",
        },
        {
          name: "Arus Listrik",
          icon: <LightningIcon />,
          href: "/electricity-monitor",
        },
      ],
    },
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

  const handleLogout = () => {
    removeToken();

    window.location.href = '/login';
  }

  return (
    <>
      <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
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
                  className={`z-50 absolute right-0 top-full mt-2 w-48 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600 ${userPopup ? "visible" : "hidden"}`}
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
        className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform ${
          !openSidebar ? '-translate-x-full' : 'translate-x-0'
        } bg-[#1776d6] border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700`}
        aria-label="Sidebar">
        <div className="h-full px-3 pb-4 overflow-y-auto bg-[#1776d6] text-white dark:bg-gray-800">
          <ul className="space-y-2 font-normal">
            {sidebarItems.map((section, index) => (
              <div className="flex flex-col gap-2" key={index}>
                <p className="text-white/75 font-semibold">
                  {section.title}
                </p>
                {section.items.map((item, itemIndex) => (
                  <li key={itemIndex}>
                    <Link
                      to={item.href}
                      onClick={() => setOpenSidebar(!openSidebar)}
                      className={`flex items-center p-2 text-white rounded-lg dark:text-white hover:bg-[#489aeb] dark:hover:bg-gray-700 group transition ease-in-out ${
                        window.location.pathname === item.href ? 'bg-[#489aeb]' : ''
                      }`}>
                      {item.icon}
                      <span className="flex-1 ms-3 whitespace-nowrap">{item.name}</span>
                    </Link>
                  </li>
                ))}
              </div>
            ))}
          </ul>
        </div>
      </aside>
    </>
  );
}
