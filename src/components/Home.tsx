import { useCheckLoginQuery } from '@/ducks/api/spotify';
import React from 'react';
import Archive from './Archive';
import LoadingSpinner from './LoadingSpinner';

function Home() {

  const  { data, error, isLoading } = useCheckLoginQuery()
   
  return (
    <div className="flex flex-col justify-center items-center py-8 gap-6 min-h-full">
      {isLoading ? <LoadingSpinner /> : error ? "error:ログインし直してください" : (
        <>
          <Archive />
        </>
      )}
    </div>
  );
}

export default  Home