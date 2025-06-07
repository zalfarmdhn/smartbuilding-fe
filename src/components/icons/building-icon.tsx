import { memo } from "react";

interface BuildingIconProps {
  width?: number;
  height?: number;
  fill?: string;
  className?: string;
}

const BuildingIcon = memo(
  ({
    width = 16,
    height = 16,
    fill = "#fff",
    className = "w-5 h-5",
  }: BuildingIconProps) => {
    return (
      <svg
        width={width}
        height={height}
        viewBox="0 0 16 16"
        className={className}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        stroke={fill}
        role="img"
        aria-label="Building">
        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          strokeLinecap="round"
          strokeLinejoin="round"></g>
        <g id="SVGRepo_iconCarrier">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M14 0H2V16H6V12H10V16H14V0ZM5 3H7V5H5V3ZM7 7H5V9H7V7ZM9 3H11V5H9V3ZM11 7H9V9H11V7Z"
            fill={fill}></path>
        </g>
      </svg>
    );
  }
);

BuildingIcon.displayName = "BuildingIcon";

export default BuildingIcon;
