import React from 'react';
import OutLink from './OutLink';

function Welcome() {
  
  
  return (
    <div className="flex flex-col justify-center items-center py-8 min-h-full">
      <div className="flex flex-col justify-center items-center min-h-[50vh]">
        <p className="text-3xl font-semibold tracking-wide break-words">DiscoverWeeklyのプレイリスト自動保存サービス</p>
        <p className="text-xl mt-4">まずはログインしましょう</p>
      </div>

      <div className="mt-20">
        <OutLink href="https://uedaa0816.github.io/">Contact us</OutLink>
        <OutLink className="ml-4" href="https://github.com/UedaA0816/spotify-discover-weekly-archive">Welcome PR</OutLink>
      </div>
    </div>
  );
}

export default  Welcome