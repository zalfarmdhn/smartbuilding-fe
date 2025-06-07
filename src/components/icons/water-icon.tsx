import { memo } from "react";

interface WaterIconProps {
  width?: number;
  height?: number;
  fill?: string;
  className?: string;
}

const WaterIcon = memo(
  ({ width = 24, height = 25, fill = "white", className }: WaterIconProps) => {
    return (
      <svg
        width={width}
        height={height}
        className={className}
        viewBox="0 0 24 25"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Water">
        <path
          d="M12 20.5C10.4087 20.5 8.88258 19.8679 7.75736 18.7426C6.63214 17.6174 6 16.0913 6 14.5C6 10.5 12 3.75 12 3.75C12 3.75 18 10.5 18 14.5C18 16.0913 17.3679 17.6174 16.2426 18.7426C15.1174 19.8679 13.5913 20.5 12 20.5Z"
          fill={fill}
        />
      </svg>
    );
  }
);

WaterIcon.displayName = "WaterIcon";

export default WaterIcon;
