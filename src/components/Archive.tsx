import axios from 'axios';
import React from 'react';
import Button from './Button';

function Archive() {
  const handleArchive = () => {
    const param = {
      playlistName:"DiscoverWeekly {date}",
      // playlistId:"37i9dQZEVXcSupRFuEvSif",
      playlistIdUrl:"https://open.spotify.com/playlist/37i9dQZEVXcSupRFuEvSif?si=7d8ea39d1c594e2e",
    }
    axios.post("/api/user/discoverweekly/archive",param)
  }
  return (
    <div className="w-[300px]">
      <Button onClick={handleArchive}>archive</Button>
    </div>
  );
}

export default  Archive