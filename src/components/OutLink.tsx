import React from "react";

const OutLink:React.FC<{className?:string,href:string}> = ({children,className,href})=>{
  
  return(
    <a className={"hover:text-spotify "+className} href={href} rel="noopener noreferrer" target="_blank">{children}</a>
  )
}

export default OutLink
