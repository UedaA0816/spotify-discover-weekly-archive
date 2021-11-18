import React from "react";

const LoadingSpinner: React.VFC<{size?:number}> = ({size = 112}) => {

  return (
    <div
      className="
      loader
      ease-linear
      rounded-full
      border-8 border-t-8 border-gray-200
      animate-spin
    "
      style={{
        borderTopColor: "#1ed760",
        height:size,
        width:size
      }}
    ></div>
  )
}

export default LoadingSpinner
