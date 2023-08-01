import React from "react";
import { RotatingLines, ColorRing, Oval, Dna } from "react-loader-spinner";
const Loader = () => {
  return (
    <div className="absolute w-full h-screen top-0 left-0 flex items-center justify-center z-50">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        style={{ margin: "auto", background: "none", display: "block" }}
        width="80px"
        height="80px"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid"
      >
        <circle
          cx="50"
          cy="50"
          r="30"
          stroke="#ffffff"
          strokeWidth="10"
          fill="none"
        ></circle>
        <circle
          cx="50"
          cy="50"
          r="30"
          stroke="gray"
          strokeWidth="8"
          strokeLinecap="round"
          fill="none"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            repeatCount="indefinite"
            dur="1s"
            values="0 50 50;180 50 50;720 50 50"
            keyTimes="0;0.5;1"
          ></animateTransform>
          <animate
            attributeName="stroke-dasharray"
            repeatCount="indefinite"
            dur="1s"
            values="18.84955592153876 169.64600329384882;94.2477796076938 94.24777960769377;18.84955592153876 169.64600329384882"
            keyTimes="0;0.5;1"
          ></animate>
        </circle>
      </svg>
    </div>
  );
};

export default Loader;
<svg
  xmlns="http://www.w3.org/2000/svg"
  xmlnsXlink="http://www.w3.org/1999/xlink"
  style={{ margin: "auto", background: "none", display: "block" }}
  width="100px"
  height="100px"
  viewBox="0 0 100 100"
  preserveAspectRatio="xMidYMid"
>
  <circle
    cx="50"
    cy="50"
    r="30"
    stroke="#ffffff"
    strokeWidth="10"
    fill="none"
  ></circle>
  <circle
    cx="50"
    cy="50"
    r="30"
    stroke="black"
    strokeWidth="8"
    strokeLinecap="round"
    fill="none"
  >
    <animateTransform
      attributeName="transform"
      type="rotate"
      repeatCount="indefinite"
      dur="1s"
      values="0 50 50;180 50 50;720 50 50"
      keyTimes="0;0.5;1"
    ></animateTransform>
    <animate
      attributeName="stroke-dasharray"
      repeatCount="indefinite"
      dur="1s"
      values="18.84955592153876 169.64600329384882;94.2477796076938 94.24777960769377;18.84955592153876 169.64600329384882"
      keyTimes="0;0.5;1"
    ></animate>
  </circle>
</svg>;
