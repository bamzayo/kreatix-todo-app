import React from "react";

const Toast = ({ toast }) => {
  return (
    <div
      className={`p-4 w-full m-auto text-white text-center ${
        toast.type === "error" ? "bg-red-400" : "bg-green-400"
      } `}
    >
      {toast.msg}
    </div>
  );
};

export default Toast;
