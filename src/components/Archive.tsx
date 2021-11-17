import { setData } from '@/ducks/archiveForm/actions';
import { useArchiveFormState } from '@/ducks/archiveForm/selector';
import { ArchiveFormData } from '@/ducks/archiveForm/slice';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import debounce from 'lodash.debounce'

import Button from './Button';
import Tooltip from './Tooltip';
import TooltipIcon from './TooltipIcon';


function Archive() {
  const { register, watch, setValue, handleSubmit, formState: { errors } , } = useForm<ArchiveFormData>({defaultValues:{playlistName:"DiscoverWeekly {date}"}});

  const data = useArchiveFormState()
  const dispatch = useDispatch()

  const [initData, setInitData] = useState(false)

  useEffect(() => {
    
    if(data !== null && !initData) {
      setValue("isUrl",data.isUrl)
      setValue("playlistIdOrUrl",data.playlistIdOrUrl)
      setValue("playlistName",data.playlistName)
      setInitData(true)
    }
    
  }, [data,initData])

  const updateDormData = debounce((data:ArchiveFormData)=>dispatch(setData(data)),1000)

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      console.log(value, name, type)
      if(type === "change") updateDormData((value as any))
    });
    return () => subscription.unsubscribe();
  }, [watch])

  const handleArchive = (isAutoArchive:boolean) => (data:ArchiveFormData) => {
    console.log(data)

    const {playlistName,playlistIdOrUrl,isUrl} = data
    const param = {
      playlistName,
      ...(!isUrl ? {playlistId:playlistIdOrUrl} : {}),
      ...(isUrl ? {playlistIdUrl:playlistIdOrUrl} : {})
    }
    if(!isAutoArchive){
      // const param = {
      //   playlistName: "DiscoverWeekly {date}",
      //   // playlistId:"37i9dQZEVXcSupRFuEvSif",
      //   playlistIdUrl: "https://open.spotify.com/playlist/37i9dQZEVXcSupRFuEvSif?si=7d8ea39d1c594e2e",
      // }
      axios.post("/api/user/discoverweekly/archive", param)
    }else{
      alert("it is feature")
    }
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
    <div className="w-[300px] sm:w-[400px]">
      <h1 className="mb-4 font-bold text-xl tracking-wider">ARCHIVE</h1>
      <form className="px-2">
        <div className="mb-6">
          <label htmlFor="playlistName" className="text-sm font-medium text-gray-100 block mb-2">Your playlist name 
            <Tooltip description={playlistNameTooltip} className="ml-3">
              <TooltipIcon />
            </Tooltip>
          </label>
          <input type="text" id="playlistName" className="bg-gray-50 border-2 border-gray-300 text-gray-900 sm:text-sm rounded-lg outline-none focus-visible:ring-spotify focus-visible:border-spotify block w-full p-2.5" placeholder="DiscoverWeekly {date}" {...register("playlistName",{required:true})} />
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
        <div className="text-right">
          <Button className="mr-4" onClick={handleSubmit(handleArchive(true))}>Auto Archive</Button>
          <Button onClick={handleSubmit(handleArchive(false))}>Archive</Button>
        </div>
      </form>
    </div>
  );
}

export default Archive