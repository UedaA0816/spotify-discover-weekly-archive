

import React, { useCallback, useEffect, useState } from 'react';


import Button from './Button';
import { useDiscoverweeklyAutoArchiveUserQuery, useDiscoverweeklyHistoryQuery } from '@/ducks/api/spotify';
import { WithId } from 'mongodb';
import { AutoArchiveHistory } from '@/types/db/autoArchiveHistory';
import OutLink from './OutLink';
import HistoryList from './HistoryList';
import SubButton from './SubButton';

const SHOWABLE_LIMIT = 3

const TABLE_HEADER_HEIGHT = 36
const TABLE_ROW_HEIGHT = 53.5

function HistoryShowableList({list}:{list:WithId<AutoArchiveHistory>[]}) {
  const [isOpen,setIsOpen] = useState(false)
  const [height,setHeight] = useState("100%")
  const [historyList,setHistoryList] = useState<WithId<AutoArchiveHistory>[]>([])
  

  useEffect(() => {
    const header = TABLE_HEADER_HEIGHT
    const height = list.length === 0 ? 0  : ((isOpen ? list : list.slice(0,SHOWABLE_LIMIT)).length * TABLE_ROW_HEIGHT)
    const row = list.length > 1 ? (height - 1):height

    setHeight(`${header+row}px`)

  }, [isOpen,list])

  useEffect(()=>{
    setHistoryList(list)
  },[])

  useEffect(()=>{

    if(isOpen){
      setHistoryList(list)
    }else{
      setTimeout(()=>{
        setHistoryList(list.slice(0,SHOWABLE_LIMIT))
      },500)
    }
    
  },[isOpen,list])

  if(list.length <= SHOWABLE_LIMIT) return (
    <HistoryList list={list}></HistoryList>
  );

  return (
    <>
      <HistoryList 
      list={historyList} 
      style={isOpen ? {}:{"boxShadow":"inset 0 -40px 25px -25px rgba(30, 215, 96,40%)"}}
      height={height}
      ></HistoryList>
      
      <div className="text-center mt-4">
        <SubButton onClick={()=>setIsOpen(!isOpen)}>{isOpen?"Hide":"Show more"}</SubButton>
      </div>
      
    </>
  );
}

export default HistoryShowableList