import { memo } from "react";

interface HamburgerIconProps {
  width?: number;
  height?: number;
  fill?: string;
  className?: string;
}

const HamburgerIcon = memo(
  ({
    width = 20,
    height = 20,
    fill = "currentColor",
    className = "w-6 h-6",
  }: HamburgerIconProps) => {
    return (
      <svg
        width={width}
        height={height}
        className={className}
        aria-hidden="true"
        fill={fill}
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Menu">
        <path
          clipRule="evenodd"
          fillRule="evenodd"
          d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
        />
      </svg>
    );
  }
);

HamburgerIcon.displayName = "HamburgerIcon";

export default HamburgerIcon;
