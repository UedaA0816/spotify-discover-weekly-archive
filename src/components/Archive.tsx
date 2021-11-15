import axios from 'axios';
import React from 'react';
import Button from './Button';

function Archive() {
  const handleArchive = () => {
    const param = {
      playlistName: "DiscoverWeekly {date}",
      // playlistId:"37i9dQZEVXcSupRFuEvSif",
      playlistIdUrl: "https://open.spotify.com/playlist/37i9dQZEVXcSupRFuEvSif?si=7d8ea39d1c594e2e",
    }
    axios.post("/api/user/discoverweekly/archive", param)
  }
  return (
    <div className="w-[300px] sm:w-[400px]">
      <form>
        <div className="mb-6">
          <label htmlFor="password" className="text-sm font-medium text-gray-100 block mb-2">Your playlist name</label>
          <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-spotify focus:border-spotify block w-full p-2.5" placeholder="DiscoverWeekly {date}" />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="text-sm font-medium text-gray-100 block mb-2">Your playlist ID or URL</label>
          <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-spotify focus:border-spotify block w-full p-2.5" placeholder="0123456789012345678901" />
        </div>
        <div className="flex items-start mb-6">
          <div className="flex items-center h-5">
            <input aria-describedby="it is url" type="checkbox" className="bg-gray-50 border-gray-300 focus:ring-3 focus:ring-spotify h-4 w-4 rounded" />
          </div>
          <div className="text-sm ml-3">
            <label htmlFor="it is url" className="font-medium text-gray-100">it is URL</label>
          </div>
        </div>
        <div className="text-right">
          <Button onClick={handleArchive}>Archive</Button>
        </div>
      </form>
    </div>
  );
}

export default Archive