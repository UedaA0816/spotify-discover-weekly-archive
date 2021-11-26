import React, { ReactNode, useState } from "react";
import Button from "./Button";
import LoadingSpinner from "./LoadingSpinner";

type PendingButtonProps = {
  onClick?:()=>void,
  className?:string,
  isLoading:boolean,
  isError:boolean,
  isSuccess:boolean,
  loadingElement?:ReactNode,
  errorElement:ReactNode,
  successElement:ReactNode,
  disabledReady?:boolean,
}

const PendingButton:React.FC<PendingButtonProps> = ({children,onClick,className,isLoading,isError,isSuccess,loadingElement = <LoadingSpinner size={20} />,successElement,errorElement,disabledReady = false})=>{
  const [isReadySubmit, setIsReadySubmit] = useState(true)

  return(
    <Button
      onClick={
        isReadySubmit ? () => {
          onClick()
          setIsReadySubmit(false)
        } : () => { if (!disabledReady) setIsReadySubmit(true) }
      }
      className={" "+className}
    >
      {isReadySubmit ? children :
        isLoading ? loadingElement :
          isError ? errorElement :
            isSuccess ? successElement : ""
      }
    </Button>
  )
}

export default PendingButton
