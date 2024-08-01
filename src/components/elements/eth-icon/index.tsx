import React from "react";

export default function EthIcon({ color }: { color: string }) {
  //   const mainColor = color;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid"
      viewBox="0 0 256 417"
    >
      <path
        fill={color}
        className="top-right"
        d="M127.9611 0L125.1661 9.5 125.1661 285.168 127.9611 287.958 255.9231 212.32z"
      ></path>
      <path
        fill={color}
        className="top-left"
        d="M127.962 0L0 212.32 127.962 287.959 127.962 154.158z"
      ></path>
      <path
        fill={color}
        className="bottom-right"
        d="M127.9611 312.1866L126.3861 314.1066 126.3861 412.3056 127.9611 416.9066 255.9991 236.5866z"
      ></path>
      <path
        fill={color}
        className="bottom-left"
        d="M127.962 416.9052L127.962 312.1852 0 236.5852z"
      ></path>
      <path
        fill={color}
        className="middle-right"
        d="M127.9611 287.9577L255.9211 212.3207 127.9611 154.1587z"
      ></path>
      <path
        fill={color}
        className="middle-left"
        d="M0.0009 212.3208L127.9609 287.9578 127.9609 154.1588z"
      ></path>
    </svg>
  );
}
