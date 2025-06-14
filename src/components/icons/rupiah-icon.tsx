import { memo } from "react";

interface RupiahIconProps {
  width?: number;
  height?: number;
  fill?: string;
  className?: string;
}

const RupiahIcon = memo(
  ({ width = 20, height = 20, fill = "white", className }: RupiahIconProps) => {
    return (
      <svg
        width={width}
        height={height}
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        role="img"
        aria-label="Rupiah">
        <path
          d="M0 2.5C0 1.80859 0.558594 1.25 1.25 1.25H4.375C7.48047 1.25 10 3.76953 10 6.875C10 9.17188 8.625 11.1445 6.65234 12.0195L8.66016 17.0352C8.91797 17.6758 8.60547 18.4023 7.96484 18.6602C7.32422 18.918 6.59766 18.6055 6.33984 17.9648L4.15234 12.5H2.5V17.5C2.5 18.1914 1.94141 18.75 1.25 18.75C0.558594 18.75 0 18.1914 0 17.5V2.5ZM2.5 10H4.375C6.10156 10 7.5 8.60156 7.5 6.875C7.5 5.14844 6.10156 3.75 4.375 3.75H2.5V10ZM12.5 6.25H15.625C18.043 6.25 20 8.20703 20 10.625C20 13.043 18.043 15 15.625 15H13.75V18.75C13.75 19.4414 13.1914 20 12.5 20C11.8086 20 11.25 19.4414 11.25 18.75V7.5C11.25 6.80859 11.8086 6.25 12.5 6.25ZM15.625 12.5C16.6602 12.5 17.5 11.6602 17.5 10.625C17.5 9.58984 16.6602 8.75 15.625 8.75H13.75V12.5H15.625Z"
          fill={fill}
        />
      </svg>
    );
  }
);

RupiahIcon.displayName = "RupiahIcon";

export default RupiahIcon;
