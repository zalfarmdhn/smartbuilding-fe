import { memo } from "react";

interface IndicatorAirIconProps {
  width?: number;
  height?: number;
  fill?: string;
  stroke?: string;
  className?: string;
}

const IndicatorAirIcon = memo(
  ({
    width = 30,
    height = 30,
    fill = "white",
    stroke = "white",
    className,
  }: IndicatorAirIconProps) => {
    return (
      <svg
        width={width}
        height={height}
        viewBox="0 0 30 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        role="img"
        aria-label="Air Indicator">
        <path
          d="M15 27.5C20.1775 27.5 24.375 23.3025 24.375 18.125C24.375 9.375 15 2.5 15 2.5C15 2.5 5.625 9.375 5.625 18.125C5.625 23.3025 9.8225 27.5 15 27.5Z"
          stroke={stroke}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M5.625 18.125C5.625 23.3025 9.8225 27.5 15 27.5C20.1775 27.5 24.375 23.3025 24.375 18.125C24.375 18.125 18.75 20 15 18.125C11.25 16.25 5.625 18.125 5.625 18.125Z"
          fill={fill}
          stroke={stroke}
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
);

IndicatorAirIcon.displayName = "IndicatorAirIcon";

export default IndicatorAirIcon;
