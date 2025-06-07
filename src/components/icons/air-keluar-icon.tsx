import { memo } from "react";

interface AirKeluarIconProps {
  width?: number;
  height?: number;
  fill?: string;
  className?: string;
}

const AirKeluarIcon = memo(
  ({
    width = 29,
    height = 30,
    fill = "white",
    className,
  }: AirKeluarIconProps) => {
    return (
      <svg
        width={width}
        height={height}
        viewBox="0 0 29 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        role="img"
        aria-label="Air Keluar">
        <path
          d="M24.1668 17.5C22.4872 17.5 20.8077 16.9125 19.3335 15.8375C16.3852 17.975 12.6152 17.975 9.66683 15.8375C8.19266 16.9125 6.51308 17.5 4.8335 17.5H2.41683V20H4.8335C6.48891 20 8.14433 19.5625 9.66683 18.75C12.6877 20.375 16.3127 20.375 19.3335 18.75C20.856 19.5625 22.4993 20 24.1668 20H26.5835V17.5H24.1668ZM19.3335 23.3375C16.3852 25.475 12.6152 25.475 9.66683 23.3375C8.19266 24.4125 6.51308 25 4.8335 25H2.41683V27.5H4.8335C6.48891 27.5 8.14433 27.0625 9.66683 26.25C12.6877 27.875 16.3127 27.875 19.3335 26.25C20.856 27.0625 22.4993 27.5 24.1668 27.5H26.5835V25H24.1668C22.4872 25 20.8077 24.4125 19.3335 23.3375ZM21.7502 12.5V8.75H15.7085V6.25H21.7502V2.5L26.5835 7.5"
          fill={fill}
        />
      </svg>
    );
  }
);

AirKeluarIcon.displayName = "AirKeluarIcon";

export default AirKeluarIcon;
