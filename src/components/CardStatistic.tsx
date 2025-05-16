interface CardStatisticProps {
  className?: string;
  icon: React.ReactNode;
  heading: string;
  subheading?: string;
  value: string;
}

export default function CardStatistic({
  className,
  icon,
  heading,
  subheading,
  value,
}: CardStatisticProps) {
  return (
    <div
      className={`flex h-auto min-h-[110px] bg-primary-400 rounded-lg shadow-md p-4 sm:p-6 ${
        className ?? "w-full sm:w-[230px]"
      }`}>
      <div className="flex flex-row items-center space-x-2 sm:space-x-4 w-full">
        <div className="min-w-10 min-h-10 w-10 h-10 sm:w-12 sm:h-12 bg-[#273C97] rounded-lg flex items-center justify-center">
          {icon}
        </div>
        <div className="flex flex-col">
          <h1 className="text-xs sm:text-sm font-semibold text-white">
            {heading}
          </h1>
          {subheading && (
            <h2 className="text-xs text-gray-300">{subheading}</h2>
          )}
          <div className="flex flex-row items-center space-x-2">
            <h4 className="text-lg sm:text-2xl font-bold text-white break-words">
              {value}
            </h4>
            {/* <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span> */}
          </div>
        </div>
      </div>
    </div>
  );
}
