import { NextSeo } from 'next-seo';
import React from 'react';
import OutLink from './OutLink';

function Welcome() {
  
  
  return (
    <>
      <NextSeo
        title="Welcome"
      />
      <div className="flex flex-col justify-center items-center py-8 min-h-full">
        <div className="flex flex-col justify-center items-center min-h-[50vh]">
          <p className="text-3xl font-semibold text-spotify tracking-wide break-words">DiscoverWeeklyのプレイリスト自動保存サービス</p>
          <p className="text-xl text-gray-0 mt-4">まずはログインしましょう</p>
        </div>

        <div className="mt-20 flex gap-4">
          <div className="w-28 text-center">
            <OutLink href="https://uedaa0816.github.io/">Contact us</OutLink>
          </div>
          <div className="w-28 text-center">
            <OutLink href="https://github.com/UedaA0816/spotify-discover-weekly-archive">Welcome PR</OutLink>
          </div>
        </div>
      </div>
    </>
  );
}

export default  Welcome