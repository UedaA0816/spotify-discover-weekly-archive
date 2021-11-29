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

type ArchiveForm = {
  playlistName: string;
  playlistIdOrUrl: string;
  isUrl:boolean;
};

function Archive() {
  const { register, watch, setValue, handleSubmit, formState: { errors } , } = useForm<ArchiveForm>({defaultValues:{playlistName:"Discover Weekly {date}"}});

  const {data:autoArchiveUser,isFetching:isFetchingAutoArchiveUser} = useDiscoverweeklyAutoArchiveUserQuery()

  useEffect(() => {
    
    if(autoArchiveUser?.data?.table){
      const {playlistId,playlistName} = autoArchiveUser.data.table

      setValue("playlistIdOrUrl",playlistId)
      setValue("playlistName",playlistName)
      setValue("isUrl",false)

    }
    
  }, [autoArchiveUser])

  const [discoverweeklyAutoArchive,{isLoading:isLoadingAutoArchive,isError:isErrorAutoArchive,isSuccess:isSuccessAutoArchive}] = useDiscoverweeklyAutoArchiveMutation()

  const handleArchive = (data:ArchiveForm) => {
    console.log(data)

    const {playlistName,playlistIdOrUrl,isUrl} = data
    const param = {
      playlistName,
      ...(!isUrl ? {playlistId:playlistIdOrUrl} : {}),
      ...(isUrl ? {playlistIdUrl:playlistIdOrUrl} : {})
    }
    
    discoverweeklyAutoArchive({...param,enabled:true,isNotRegistered:(autoArchiveUser?.data?.table == null)})
  } 

  const playlistNameTooltip = `
  If you want to include the date in the name, write {date}.
  ex) "mylist {date}" => "mylist 2021/01/01" 
  `
  const playlistIdOrUrlTooltip = `
  In the case of playlistID : {22_charas_playlist_id_}
  In the case of playlistURL : playlist > share > copy link
  `

  return (
    <div className="w-[290px] sm:w-[400px] md:w-[500px]">
      <h1 className="mb-4 font-bold text-xl tracking-wider">ARCHIVE <OutLink className=" text-xs ms:text-sm sm:ml-8 md:ml-32 " href="https://open.spotify.com/genre/discover-page" icon>Open Spotify Web Player</OutLink></h1>
      <form className="px-2">
        <div className="mb-6">
          <label htmlFor="playlistName" className="text-sm font-medium text-gray-100 block mb-2">Create playlist name 
            <Tooltip description={playlistNameTooltip} className="ml-3">
              <TooltipIcon />
            </Tooltip>
          </label>
          <input type="text" id="playlistName" className="bg-gray-50 border-2 border-gray-300 text-gray-900 sm:text-sm rounded-lg outline-none focus-visible:ring-spotify focus-visible:border-spotify block w-full p-2.5" placeholder="Discover Weekly {date}" {...register("playlistName",{required:true})} />
        </div>
        <div className="mb-3">
          <label htmlFor="playlistId" className="text-sm font-medium text-gray-100 block mb-2">Your playlist ID or URL
            <Tooltip description={playlistIdOrUrlTooltip} className="ml-3">
              <TooltipIcon />
            </Tooltip>
          </label>
          <input type="text" id="playlistId" className="bg-gray-50 border-2 border-gray-300 text-gray-900 sm:text-sm rounded-lg outline-none focus-visible:ring-spotify focus-visible:border-spotify block w-full p-2.5" placeholder="0123456789012345678901" {...register("playlistIdOrUrl",{required:true})} />
        </div>
        <div className="flex items-start mb-6">
          <div className="flex items-center h-5">
            <input id="isUrl" aria-describedby="it is url" type="checkbox" className="bg-gray-50 border-gray-300 focus:ring-3 focus-visible:ring-spotify h-4 w-4 rounded" {...register("isUrl")} />
          </div>
          <div className="text-sm ml-3">
            <label htmlFor="isUrl" className="font-medium text-gray-100">it is URL</label>
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
          >
            {(autoArchiveUser?.data?.table == null) ? "Register" : "Update"} 
          </PendingButton>
        </div>
      </form>
    </div>
  );
}

export default Archive