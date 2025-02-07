import React from 'react';
import { CustomFlowbiteTheme, Dropdown } from 'flowbite-react';

const customTheme: CustomFlowbiteTheme["dropdown"] = {
  "floating": {
    "target": "bg-primary-400 hover:!bg-primary-500 text-white font-medium rounded"
  }
}


interface ReusableDropdownProps {
  items: string[];
  activeValue: string;
  onSelect: (value: string) => void;
  isVisible?: boolean;
  label?: string;
}

export const ReusableDropdown: React.FC<ReusableDropdownProps> = ({
  items,
  activeValue,
  onSelect,
  isVisible = true,
  label,
}) => {
  if (!isVisible) return null;

  return (
    <Dropdown label={label || activeValue} theme={customTheme}>
      {items.map((item, index) => (
        <Dropdown.Item key={index} onClick={() => onSelect(item)}>
          {item}
        </Dropdown.Item>
      ))}
    </Dropdown>
  );
};

// Usage example:
// const [activeDay, setActiveDay] = useState(day[0]);
// <ReusableDropdown 
//   items={day}
//   activeValue={activeDay}
//   onSelect={setActiveDay}
//   isVisible={activeTab === 0}
// />