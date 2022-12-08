import React from "react";
import EmptyIcon from "../assets/empty.jpeg";

const Empty = () => {
  return (
    <div className="bg-white w-full h-full pb-8 flex flex-col items-center justify-center ">
      <img
        src={EmptyIcon}
        alt="empty-img"
        className=" w-1/3 h-40 object-contain"
      />
      <h3 className="text-lg mt-6 text-gray-400 ">no items on list</h3>
    </div>
  );
};

export default Empty;
