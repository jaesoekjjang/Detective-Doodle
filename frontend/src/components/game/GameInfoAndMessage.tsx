import React, { memo } from 'react';
import { useRecoilValue } from 'recoil';
import { currentRoomAtom } from '../../recoil/roomAtom';

const GameInfoAndMessage = () => {
  const room = useRecoilValue(currentRoomAtom);

  return (
    <div className=" left-full flex flex-col w-64 h-full gap-4">
      <div className="w-full h-1/2 border-[1px] border-black">
        {room.players.map((player) => (
          <div key={player.id}>{player.name}</div>
        ))}
      </div>
      <div className="w-full h-1/2 border-[1px] border-black">위</div>
    </div>
  );
};

export default memo(GameInfoAndMessage);
