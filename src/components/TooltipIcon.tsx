import React from "react";

const TooltipIcon: React.VFC<{ className?: string }> = ({ className }) => {

  return (
    <span className={" relative m-auto text-lg leading-none "+(className || "")}>◯
      <span className=" absolute text-xs left-[7.5px]">i</span>
    </span>
  )
}

export default TooltipIcon




