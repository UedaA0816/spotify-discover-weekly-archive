import React from "react";

const LoadingSpinner: React.VFC<{size?:number}> = ({size = 112}) => {

  return (
    <div
      className="
      loader
      ease-linear
      rounded-full
      border-gray-200
      animate-spin
      m-auto
    "
      style={{
        borderTopColor: "#1ed760",
        borderWidth:(size * 0.0715),
        height:size,
        width:size
      }}
    ></div>
  )
}

export default LoadingSpinner
