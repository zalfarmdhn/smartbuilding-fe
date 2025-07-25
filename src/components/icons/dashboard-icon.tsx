import { memo } from "react";

interface DashboardIconProps {
  width?: number;
  height?: number;
  fill?: string;
  className?: string;
}

const DashboardIcon = memo(
  ({
    width = 22,
    height = 21,
    fill = "currentColor",
    className = "w-5 h-5 text-white transition duration-75 dark:text-gray-400 group-hover:text-white dark:group-hover:text-white",
  }: DashboardIconProps) => {
    return (
      <svg
        width={width}
        height={height}
        className={className}
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill={fill}
        viewBox="0 0 22 21"
        role="img"
        aria-label="Dashboard">
        <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
        <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
      </svg>
    );
  }
);

DashboardIcon.displayName = "DashboardIcon";

export default DashboardIcon;
