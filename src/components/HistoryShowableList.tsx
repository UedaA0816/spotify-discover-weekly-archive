

import React, { useCallback, useEffect, useState } from 'react';


import Button from './Button';
import { useDiscoverweeklyAutoArchiveUserQuery, useDiscoverweeklyHistoryQuery } from '@/ducks/api/spotify';
import { WithId } from 'mongodb';
import { AutoArchiveHistory } from '@/types/db/autoArchiveHistory';
import OutLink from './OutLink';
import HistoryList from './HistoryList';
import SubButton from './SubButton';

const SHOWABLE_LIMIT = 3

function HistoryShowableList({list}:{list:WithId<AutoArchiveHistory>[]}) {
  const [isOpen,setIsOpen] = useState(false)
  if(list.length <= SHOWABLE_LIMIT) return (
    <HistoryList list={list}></HistoryList>
  );

  return (
    <>
      <HistoryList list={isOpen ? list : list.slice(0,SHOWABLE_LIMIT)} style={isOpen ? {}:{"boxShadow":"inset 0 -40px 25px -25px rgba(30, 215, 96,40%)"}}></HistoryList>
      
      <div className="text-center mt-4">
        <SubButton onClick={()=>setIsOpen(!isOpen)}>{isOpen?"Hide":"Show more"}</SubButton>
      </div>
      
    </>
  );
}

export default HistoryShowableList