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
    <div className={`flex mx-auto h-[110px] bg-primary-400 rounded-lg shadow-md p-6 ${className ?? "w-[250px]"}`}>
      <div className="flex flex-row items-center space-x-4">
        <div className="w-12 h-12 bg-[#273C97] rounded-lg flex items-center justify-center">
          {icon}
        </div>
        <div className="flex flex-col">
          <h1 className="text-md font-semibold text-white">{heading}</h1>
          <h2 className="text-xs text-primary-200">{subheading}</h2>
          <div className="flex flex-row items-center space-x-2">
            <h4 className="text-2xl font-bold text-white">{value}</h4>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
