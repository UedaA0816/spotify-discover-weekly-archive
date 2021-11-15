import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import Button from './Button';

type FormData = {
  playlistName: string;
  playlistIdOrUrl: string;
  isUrl:boolean;
};

function Archive() {
  const { register, setValue, handleSubmit, formState: { errors } } = useForm<FormData>({defaultValues:{playlistName:"DiscoverWeekly {date}"}});

  const handleArchive = (data:FormData) => {
    console.log(data)
    const {playlistName,playlistIdOrUrl,isUrl} = data
    const param = {
      playlistName,
      ...(!isUrl ? {playlistId:playlistIdOrUrl} : {}),
      ...(isUrl ? {playlistIdUrl:playlistIdOrUrl} : {})
    }
    // const param = {
    //   playlistName: "DiscoverWeekly {date}",
    //   // playlistId:"37i9dQZEVXcSupRFuEvSif",
    //   playlistIdUrl: "https://open.spotify.com/playlist/37i9dQZEVXcSupRFuEvSif?si=7d8ea39d1c594e2e",
    // }
    axios.post("/api/user/discoverweekly/archive", param)
  }
  return (
    <div className="w-[300px] sm:w-[400px]">
      <form onSubmit={handleSubmit(handleArchive)}>
        <div className="mb-6">
          <label htmlFor="playlistName" className="text-sm font-medium text-gray-100 block mb-2">Your playlist name</label>
          <input type="text" id="playlistName" className="bg-gray-50 border-2 border-gray-300 text-gray-900 sm:text-sm rounded-lg outline-none focus-visible:ring-spotify focus-visible:border-spotify block w-full p-2.5" placeholder="DiscoverWeekly {date}" {...register("playlistName",{required:true})} />
        </div>
        <div className="mb-3">
          <label htmlFor="playlistId" className="text-sm font-medium text-gray-100 block mb-2">Your playlist ID or URL</label>
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
          <Button>Archive</Button>
        </div>
      </form>
    </div>
  );
}

export default Archive