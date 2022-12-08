import React from "react";
import loader from "../assets/loader.gif";

const Loader = () => {
  return (
    <div className=" w-20 h-20 overflow-hidden rounded-full mx-auto mt-6 ">
      <img className="w-full object-cover h-full" alt="gif" src={loader} />
    </div>
  );
};

export default Loader;
