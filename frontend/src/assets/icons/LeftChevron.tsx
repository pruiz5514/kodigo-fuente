import * as React from "react"
const LeftChevron = (props:React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={8}
    height={14}
    fill="none"
    {...props}
  >
    <path
      fill="#2B2B2B"
      d="M2.286 7.706a1 1 0 0 1 0-1.419L6.873 1.71A1 1 0 1 0 5.464.29L.877 4.879a2.998 2.998 0 0 0 0 4.237l4.587 4.588a1 1 0 0 0 1.41-1.42L2.285 7.706Z"
    />
  </svg>
)
export default LeftChevron
