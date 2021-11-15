import React from "react";

const Button:React.FC<{onClick:()=>void}> = ({children,onClick})=>{
  
  return(
    <button className="box-border border-2 border-spotify border-solid bg-spotify rounded-full p-1.5 px-4 font-semibold text-sm" onClick={onClick}>{children}</button>
  )
}

export default Button
