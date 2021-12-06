

import React, { useCallback, useEffect, useState } from 'react';


import Button from './Button';
import { useDiscoverweeklyAutoArchiveUserQuery, useDiscoverweeklyHistoryQuery } from '@/ducks/api/spotify';
import { WithId } from 'mongodb';
import { AutoArchiveHistory } from '@/types/db/autoArchiveHistory';
import OutLink from './OutLink';


function HistoryList({style,height="100%",list}:{style?:React.CSSProperties,height?:number|string,list:WithId<AutoArchiveHistory>[]}) {
  

  return (
    <div className=" overflow-y-hidden transition-all duration-500" style={{...{height},...style}}>
      <table className={"table-auto border-collapse"} width="100%">
        <thead>
          <tr className="text-sm font-medium text-gray-700 text-left">
            <th className="px-2 sm:px-4 py-2 bg-gray-200 rounded-l-lg" >Id</th>
            <th className="px-2 sm:px-4 py-2 bg-gray-200" >Week</th>
            <th className="px-2 sm:px-4 py-2 bg-gray-200 rounded-r-lg" >Result</th>
          </tr>
        </thead>
        <tbody className="text-sm font-normal text-gray-100">
          {list.map(v=>(  
            <tr key={v._id.toString()} className="hover:bg-gray-700 transition-colors border-b border-gray-400 last:border-none py-10">
              <td className="px-2 sm:px-4 py-4">{v.playlistId && <OutLink href={"https://open.spotify.com/playlist/"+v.playlistId}>{v.playlistId}</OutLink>}</td>
              <td className="px-2 sm:px-4 py-4">{v.week}</td>
              <td className="px-2 sm:px-4 py-4">{v.success ? "成功" : "失敗"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default HistoryList