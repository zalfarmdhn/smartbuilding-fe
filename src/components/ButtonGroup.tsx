import { Button, CustomFlowbiteTheme } from "flowbite-react";

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
  return (
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
        Tahunan
      </Button>
    </Button.Group>
  );
}
