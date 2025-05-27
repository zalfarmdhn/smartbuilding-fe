import { Button, CustomFlowbiteTheme } from "flowbite-react";
import { useState } from "react";

const customTheme: CustomFlowbiteTheme["buttonGroup"] = {
  base: "inline-flex border border-primary-500 rounded-md",
  position: {
    none: "",
    start: "rounded-r-none focus:ring-2",
    middle: "rounded-none border-l-0 pl-0 focus:ring-2",
    end: "rounded-l-none border-l-0 pl-0 focus:ring-2",
  },
};

export default function ButtonGroupComponent({
  activeTab,
  setActiveTab,
}: {
  activeTab: number;
  setActiveTab: (value: number) => void;
}) {
  const [showDropdown, setShowDropdown] = useState(false);
  return (
    <div className="relative">
      {/* Mobile dropdown */}
      <div className="md:hidden">
        <Button
          className="w-full bg-primary-500 text-white hover:bg-primary-600"
          onClick={() => setShowDropdown(!showDropdown)}>
          {["Harian", "Mingguan", "Bulanan", "Tahunan"][activeTab]}
          <svg
            className="w-4 h-4 ml-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </Button>
        {showDropdown && (
          <div className="absolute top-full left-0 w-full bg-white border border-gray-200 rounded-md shadow-lg z-10 mt-1">
            {["Harian", "Mingguan", "Bulanan", "Tahunan"].map(
              (label, index) => (
                <button
                  key={index}
                  className={`w-full text-left px-4 py-2 hover:bg-gray-100 ${
                    activeTab === index
                      ? "bg-primary-50 text-primary-600"
                      : "text-gray-700"
                  }`}
                  onClick={() => {
                    setActiveTab(index);
                    setShowDropdown(false);
                  }}>
                  {label}
                </button>
              )
            )}
          </div>
        )}
      </div>

      {/* Desktop button group */}
      <div className="hidden md:block">
        <Button.Group theme={customTheme}>
          <Button
            className={`hover:!bg-secondary-100 ${
              activeTab === 0
                ? "bg-primary-500 text-white hover:bg-primary-500"
                : "text-primary-500 bg-transparent "
            }`}
            onClick={() => setActiveTab(0)}>
            Harian
          </Button>
          <Button
            className={`hover:!bg-secondary-100 ${
              activeTab === 1
                ? "bg-primary-500 text-white hover:bg-primary-500"
                : "text-primary-500 bg-transparent "
            }`}
            onClick={() => setActiveTab(1)}>
            Mingguan
          </Button>
          <Button
            className={`hover:!bg-secondary-100 ${
              activeTab === 2
                ? "bg-primary-500 text-white"
                : "text-primary-500 bg-transparent"
            }`}
            onClick={() => setActiveTab(2)}>
            Bulanan
          </Button>
          <Button
            className={`hover:!bg-secondary-100 ${
              activeTab === 3
                ? "bg-primary-500 text-white"
                : "text-primary-500 bg-transparent"
            }`}
            onClick={() => setActiveTab(3)}>
            Tahunan
          </Button>
        </Button.Group>
      </div>
    </div>
  );
}
