import { memo } from "react";

interface LightningIconProps {
  width?: number;
  height?: number;
  fill?: string;
  className?: string;
}

const LightningIcon = memo(
  ({
    width = 24,
    height = 24,
    fill = "white",
    className,
  }: LightningIconProps) => {
    return (
      <svg
        width={width}
        height={height}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        role="img"
        aria-label="Lightning">
        <path
          d="M13.493 3.65894C13.5277 3.39538 13.4775 3.12763 13.3497 2.89458C13.2218 2.66152 13.023 2.47529 12.782 2.36294C12.5343 2.24667 12.2541 2.21898 11.9883 2.28451C11.7226 2.35003 11.4874 2.5048 11.322 2.72294L3.51805 12.7359C3.37641 12.9183 3.28675 13.1357 3.25858 13.3649C3.23041 13.5941 3.26478 13.8267 3.35805 14.0379C3.53005 14.4309 3.92805 14.7789 4.47405 14.7789H11.156L10.506 20.3409C10.4714 20.6045 10.5216 20.8722 10.6494 21.1053C10.7773 21.3384 10.9761 21.5246 11.217 21.6369C11.4648 21.7532 11.745 21.7809 12.0108 21.7154C12.2765 21.6498 12.5117 21.4951 12.677 21.2769L20.48 11.2639C20.6217 11.0815 20.7114 10.8642 20.7395 10.635C20.7677 10.4058 20.7333 10.1732 20.64 9.96194C20.5466 9.74302 20.3911 9.55623 20.1929 9.42456C19.9946 9.2929 19.7621 9.22212 19.524 9.22094H12.842L13.493 3.65894Z"
          fill={fill}
        />
      </svg>
    );
  }
);

LightningIcon.displayName = "LightningIcon";

export default LightningIcon;
