interface ElectricalIconProps {
  width?: string;
  height?: string;
  className?: string;
}

const ElectricalIcon = ({width = '20', height = '20', className}: ElectricalIconProps) => {
  return (
    <svg
      width={`${width}`}
      height={`${height}`}
      className={`${className}`}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.39913 2.5C6.53413 2.19583 6.83497 2 7.1683 2H13.8158C14.4408 2 14.8483 2.65833 14.5683 3.21833L12.6775 7H15.4758C16.2258 7 16.6008 7.90667 16.0708 8.43667L6.10997 18.3975C5.48163 19.0258 4.43497 18.3792 4.71663 17.5367L6.83997 11.1667H3.84163C3.70142 11.1667 3.56343 11.1316 3.4402 11.0647C3.31696 10.9979 3.21239 10.9013 3.13598 10.7837C3.05956 10.6661 3.01373 10.5314 3.00264 10.3916C2.99155 10.2518 3.01555 10.1115 3.07247 9.98333L6.39913 2.5Z"
        fill="white"
      />
    </svg>
  );
};

export default ElectricalIcon;
