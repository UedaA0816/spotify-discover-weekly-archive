import React from "react";

const Button:React.FC<{onClick?:()=>void,className?:string}> = ({children,onClick,className})=>{
  
  return(
    <button className={"box-border border-2 border-spotify border-solid bg-spotify rounded-full p-1.5 px-4 font-semibold text-sm text-center "+className} onClick={onClick} type="button">{children}</button>
  )
}

export default Button
