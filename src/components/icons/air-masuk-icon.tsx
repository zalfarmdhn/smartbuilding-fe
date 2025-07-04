import { memo } from "react";

interface AirMasukIconProps {
  width?: number;
  height?: number;
  fill?: string;
  className?: string;
}

const AirMasukIcon = memo(
  ({
    width = 30,
    height = 30,
    fill = "white",
    className,
  }: AirMasukIconProps) => {
    return (
      <svg
        width={width}
        height={height}
        viewBox="0 0 30 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        role="img"
        aria-label="Air Masuk">
        <path
          d="M5 17.5C6.7375 17.5 8.475 16.9125 10 15.8375C13.05 17.975 16.95 17.975 20 15.8375C21.525 16.9125 23.2625 17.5 25 17.5H27.5V20H25C23.2875 20 21.575 19.5625 20 18.75C16.875 20.375 13.125 20.375 10 18.75C8.425 19.5625 6.725 20 5 20H2.5V17.5H5ZM10 23.3375C13.05 25.475 16.95 25.475 20 23.3375C21.525 24.4125 23.2625 25 25 25H27.5V27.5H25C23.2875 27.5 21.575 27.0625 20 26.25C16.875 27.875 13.125 27.875 10 26.25C8.425 27.0625 6.725 27.5 5 27.5H2.5V25H5C6.7375 25 8.475 24.4125 10 23.3375ZM7.5 12.5V8.75H13.75V6.25H7.5V2.5L2.5 7.5"
          fill={fill}
        />
      </svg>
    );
  }
);

AirMasukIcon.displayName = "AirMasukIcon";

export default AirMasukIcon;
