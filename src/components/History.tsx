

import React, { useCallback, useEffect, useState } from 'react';


import Button from './Button';
import { useDiscoverweeklyAutoArchiveUserQuery, useDiscoverweeklyHistoryQuery } from '@/ducks/api/spotify';
import HistoryList from './HistoryList';
import HistoryShowableList from './HistoryShowableList';


function History() {
  
  const [disabled, setDisabled] = useState(true)

  const {data:autoArchiveUser,isFetching:isFetchingAutoArchiveUser} = useDiscoverweeklyAutoArchiveUserQuery()
  const {data:history,isFetching:isFetchingHistory} = useDiscoverweeklyHistoryQuery()

  
  useEffect(() => {
    
    const enabled = autoArchiveUser?.data?.table?.enabled
    // console.log({enabled})
    setDisabled(enabled === undefined)

  }, [autoArchiveUser])

  return (
    <div className={"w-[290px] sm:w-[400px] md:w-[500px] transition-opacity "+(disabled ? "opacity-50" : "")}>
      <h1 className="mb-4 font-bold text-xl tracking-wider">History</h1>
      {(history?.data?.list == null || history.data.list.length === 0) ? <p>no data</p> : <HistoryShowableList list={history.data.list} /> }
    </div>
  );
}

export default History