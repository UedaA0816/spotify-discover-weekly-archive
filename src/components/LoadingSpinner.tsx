import React from "react";

const LoadingSpinner: React.VFC = () => {

  return (
    <div
      className="
      loader
      ease-linear
      rounded-full
      border-8 border-t-8 border-gray-200
      h-28
      w-28
      animate-spin
    "
      style={{
        borderTopColor: "#1ed760",
      }}
    ></div>
  )
}

export default LoadingSpinner
