import { IconProps } from "./index";

const ArrowRoundDown = ({
  height,
  width,
  fill = "#000",
  className,
}: IconProps) => {
  return (
    <svg
      className={className}
      width={`${width}px`}
      height={`${height}px`}
      viewBox="-3 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="icomoon-ignore"></g>
      <path
        d="M26.221 16c0-7.243-5.871-13.113-13.113-13.113s-13.113 5.87-13.113 13.113c0 7.242 5.871 13.113 13.113 13.113s13.113-5.871 13.113-13.113zM1.045 16c0-6.652 5.412-12.064 12.064-12.064s12.064 5.412 12.064 12.064c0 6.652-5.411 12.064-12.064 12.064-6.652 0-12.064-5.412-12.064-12.064z"
        fill={fill}
      ></path>
      <path
        d="M18.746 15.204l0.742-0.742-6.379-6.379-6.378 6.379 0.742 0.742 5.112-5.112v12.727h1.049v-12.727z"
        fill={fill}
      ></path>
    </svg>
  );
};

export default ArrowRoundDown;
