import React from "react";
import Lottie, { useLottie } from "lottie-react";
import animationData from '../svgs/SuccesSvg.json'

const SuccessMsg = () => {
  return (
    <>
      <Lottie animationData={animationData} loop={true} />
    </>
  );
};

export default SuccessMsg;
