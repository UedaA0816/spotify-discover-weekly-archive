import React from "react";

const Subbutton:React.FC<{onClick?:()=>void}> = ({children,onClick})=>{
  
  return(
    <button className=" box-border border-2 border-spotify border-solid rounded-full p-1.5 px-4 font-semibold text-sm" onClick={onClick}>{children}</button>
  )
}

export default Subbutton
