import { useCheckLoginQuery } from '@/ducks/api/spotify';
import React from 'react';
import Archive from './Archive';
import Divider from './Divider';
import History from './History';
import LoadingSpinner from './LoadingSpinner';
import Status from './Status';

function Home() {

  const  { data, error, isLoading } = useCheckLoginQuery()
   
  return (
    <div className="flex flex-col justify-center items-center py-8 gap-12 min-h-full">
      {isLoading ? <LoadingSpinner /> : error ? "error:ログインし直してください" : (
        <>
          <Status />
          <Divider />
          <Archive />
          <Divider />
          <History />
        </>
      )}
    </div>
  );
}

export default  Home