import React from "react";

const Divider:React.VFC<{className?:string}> = ({className})=>{
  
  return(
    <div className={"w-[290px] sm:w-[400px] md:w-[500px] border-b  border-gray-500 "+className} ></div>
  )
}

export default Divider
