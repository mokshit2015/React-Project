import React from "react";
import { Oval } from "react-loader-spinner";

const FullScreenLoader = () => {
  return (
    <div className="full-screen__loader">
      <Oval
        height={150}
        width={150}
        color="#fff"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel="oval-loading"
        secondaryColor="#5b8c51"
        strokeWidth={2}
        strokeWidthSecondary={2}
      />
      {/* <Loader type="Oval" color="#fff" height="150" width="150" /> */}
    </div>
  );
};

export default FullScreenLoader;
