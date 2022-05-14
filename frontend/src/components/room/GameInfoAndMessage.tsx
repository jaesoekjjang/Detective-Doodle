import React, { memo } from 'react';
import { useRecoilValue } from 'recoil';
import { roomPlayerListAtom } from '../../recoil/playerAtom';

const GameInfoAndMessage = () => {
  const playerList = useRecoilValue(roomPlayerListAtom);

  return (
    <div className=" flex flex-col w-64 gap-4">
      <div className="w-full h-1/2 border-[1px] border-black">
        {playerList.map((player) => (
          <div>{player.name}</div>
        ))}
      </div>
      <div className="w-full h-1/2 border-[1px] border-black">위</div>
    </div>
  );
};

export default memo(GameInfoAndMessage);
