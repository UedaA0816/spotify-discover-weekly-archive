
import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import debounce from 'lodash.debounce'

import Button from './Button';
import Tooltip from './Tooltip';
import TooltipIcon from './TooltipIcon';
import OutLink from './OutLink';
import { useDiscoverweeklyAutoArchiveMutation, useDiscoverweeklyAutoArchiveUserQuery } from '@/ducks/api/spotify';
import PendingButton from './PendingButton';

type StatusForm = {
  enabled:boolean
}

function Status() {
  const { register, setValue, handleSubmit, formState: { errors } , } = useForm<StatusForm>({defaultValues:{enabled:false}});

  const [disabled, setDisabled] = useState(true)

  const {data:autoArchiveUser,isFetching:isFetchingAutoArchiveUser} = useDiscoverweeklyAutoArchiveUserQuery()
  const [discoverweeklyAutoArchive,{isLoading:isLoadingAutoArchive,isError:isErrorAutoArchive,isSuccess:isSuccessAutoArchive}] = useDiscoverweeklyAutoArchiveMutation()

  useEffect(() => {
    
    const enabled = autoArchiveUser?.data?.table?.enabled
    // console.log({enabled})
    setDisabled(enabled === undefined)
    if(enabled !== undefined){
      setValue("enabled",enabled)
    }
  }, [autoArchiveUser])


  const handleArchive = (data:StatusForm) => {
    console.log(data)
    
    if(!disabled)discoverweeklyAutoArchive({enabled:data.enabled})
  } 

  return (
    <div className={"w-[290px] sm:w-[400px] md:w-[500px] transition-opacity "+(disabled ? "opacity-50" : "")}>
      <h1 className="mb-4 font-bold text-xl tracking-wider">Status</h1>
      <form className="px-2">
        <div className="flex items-start mb-6">
          <div className="flex items-center h-5">
            <input id="isEnabled" aria-describedby="is Enabled" type="checkbox" disabled={disabled} className="bg-gray-50 border-gray-300 focus:ring-3 focus-visible:ring-spotify h-4 w-4 rounded" {...register("enabled")} />
          </div>
          <div className="text-sm ml-3">
            <label htmlFor="isEnabled" className="font-medium text-gray-100">Enabled</label>
          </div>
        </div>
        <div className=" flex justify-end gap-4">
          <PendingButton 
            onClick={handleSubmit(handleArchive)}
            className=" w-32"
            isLoading={isLoadingAutoArchive}
            isError={isErrorAutoArchive}
            isSuccess={isSuccessAutoArchive}
            errorElement={"Error!"}
            successElement={"Success!"}
            disabled={disabled}
          >
            Update
          </PendingButton>
        </div>
      </form>
    </div>
  );
}

export default Status