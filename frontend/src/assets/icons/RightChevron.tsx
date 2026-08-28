import * as React from "react";

interface RightChevronProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
}

const RightChevron = ({ size = 14, ...props }: RightChevronProps) => {
  const aspectRatio = 8 / 14;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size * aspectRatio}
      height={size}
      viewBox="0 0 8 14"
      fill="none"
      {...props}
    >
      <path
        fill="#2B2B2B"
        d="M4.883 6.286a1 1 0 0 1 0 1.42L.296 12.281a1 1 0 1 0 1.409 1.42l4.587-4.588a2.998 2.998 0 0 0 0-4.237L1.705.29a1 1 0 0 0-1.41 1.419l4.588 4.577Z"
      />
    </svg>
  );
};

export default RightChevron;
