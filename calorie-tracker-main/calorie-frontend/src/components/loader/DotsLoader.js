import React from "react";
import { ThreeDots } from "react-loader-spinner";

const DotsLoader = () => {
  return (
    <ThreeDots
      height="30"
      width="30"
      radius="10"
      color="black"
      visible={true}
    />
  );
};

export default DotsLoader;
