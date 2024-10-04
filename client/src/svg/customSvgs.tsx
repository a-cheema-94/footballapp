import React from "react";

type Props = {};

const CustomSvgs = (props: Props) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10">
      <path
        stroke="rgba(0, 0, 0, 1)"
        strokeWidth="1"
        strokeLinecap="round"
        d="M2 2.5 h6 M2 5 h6 M2 7.5 h6"
      />
    </svg>
  );
};

export default CustomSvgs
