import * as React from "react";
const CloseIcon = (props:React.SVGProps<SVGSVGElement>) => (
  <svg
    width={29}
    height={29}
    viewBox="0 0 29 29"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M14.5135 26.5582C21.1807 26.5582 26.5856 21.1534 26.5856 14.4861C26.5856 7.81891 21.1807 2.41406 14.5135 2.41406C7.84626 2.41406 2.44141 7.81891 2.44141 14.4861C2.44141 21.1534 7.84626 26.5582 14.5135 26.5582Z"
      stroke="black"
      strokeWidth={1.5}
    />
    <path
      d="M17.5316 11.4678L11.4956 17.5038M11.4956 11.4678L17.5316 17.5038"
      stroke="black"
      strokeWidth={1.5}
      strokeLinecap="round"
    />
  </svg>
);
export default CloseIcon;
