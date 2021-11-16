import React from "react";

const Tooltip: React.FC<{ description: string,className?:string }> = ({ children, description, className }) => {

  return (

    <span className={"relative "+className}>
      <div className="group cursor-pointer relative inline-block text-center">
        { children }
        <div className="opacity-0 bg-black text-white text-center text-xs rounded-lg py-2 absolute z-10 group-hover:opacity-100 px-3 bottom-6 left-2/4 -translate-x-1/2 pointer-events-none whitespace-pre">
          {description}
          <svg className="absolute text-black h-2 w-full left-0 top-full" x="0px" y="0px" viewBox="0 0 255 255" xmlSpace="preserve"><polygon className="fill-current" points="0,0 127.5,127.5 255,0" /></svg>
        </div>
      </div>
    </span>

  )
}

export default Tooltip




