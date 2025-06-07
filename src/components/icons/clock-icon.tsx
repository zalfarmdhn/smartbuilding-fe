import { memo } from "react";

interface ClockIconProps {
  width?: number;
  height?: number;
  fill?: string;
  className?: string;
}

const ClockIcon = memo(
  ({ width = 30, height = 30, fill = "white", className }: ClockIconProps) => {
    return (
      <svg
        width={width}
        height={height}
        viewBox="0 0 30 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        role="img"
        aria-label="Clock">
        <path
          d="M15 2.5C21.9037 2.5 27.5 8.09625 27.5 15C27.5 21.9037 21.9037 27.5 15 27.5C8.09625 27.5 2.5 21.9037 2.5 15C2.5 8.09625 8.09625 2.5 15 2.5ZM15 7.5C14.6685 7.5 14.3505 7.6317 14.1161 7.86612C13.8817 8.10054 13.75 8.41848 13.75 8.75V15C13.7501 15.3315 13.8818 15.6494 14.1162 15.8837L17.8662 19.6337C18.102 19.8614 18.4178 19.9874 18.7455 19.9846C19.0732 19.9817 19.3868 19.8503 19.6185 19.6185C19.8503 19.3868 19.9817 19.0732 19.9846 18.7455C19.9874 18.4178 19.8614 18.102 19.6337 17.8662L16.25 14.4825V8.75C16.25 8.41848 16.1183 8.10054 15.8839 7.86612C15.6495 7.6317 15.3315 7.5 15 7.5Z"
          fill={fill}
        />
      </svg>
    );
  }
);

ClockIcon.displayName = "ClockIcon";

export default ClockIcon;
