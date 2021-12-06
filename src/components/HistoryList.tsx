

import React, { useCallback, useEffect, useState } from 'react';


import Button from './Button';
import { useDiscoverweeklyAutoArchiveUserQuery, useDiscoverweeklyHistoryQuery } from '@/ducks/api/spotify';
import { WithId } from 'mongodb';
import { AutoArchiveHistory } from '@/types/db/autoArchiveHistory';
import OutLink from './OutLink';


function HistoryList({list}:{list:WithId<AutoArchiveHistory>[]}) {
  

  return (
    // <table classNameName="w-full">
    //   <thead>
    //     <tr>
    //       <th>week</th>
    //       <th>result</th>
    //       <th>id</th>
    //     </tr>
    //   </thead>
    //   <tbody>
    //     {list.map(v=>(
    //       <tr key={v._id.toString()} classNameName="overflow-scroll">
    //         <td>{v.week}</td>
    //         <td>{v.success ? "成功":"失敗"}</td>
    //         <td>{v.playlistId}</td>
    //       </tr>
    //     ))}
    //   </tbody>
    // </table>
    <table className="table-auto border-collapse w-full">
      <thead>
        <tr className="text-sm font-medium text-gray-700 text-left">
          <th className="px-4 py-2 bg-gray-200 rounded-l-lg" >Id</th>
          <th className="px-4 py-2 bg-gray-200" >Week</th>
          <th className="px-4 py-2 bg-gray-200 rounded-r-lg" >Result</th>
        </tr>
      </thead>
      <tbody className="text-sm font-normal text-gray-100">
        {list.map(v=>(  
          <tr key={v._id.toString()} className="hover:bg-gray-700 transition-colors border-b border-gray-200 py-10">
            <td className="px-4 py-4">{<OutLink href={"https://open.spotify.com/playlist/"+v.playlistId}>{v.playlistId}</OutLink>}</td>
            <td className="px-4 py-4">{v.week}</td>
            <td className="px-4 py-4">{v.success ? "成功" : "失敗"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default HistoryList