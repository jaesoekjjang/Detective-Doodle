import React from 'react';
import { useRecoilValue } from 'recoil';
import { playerListAtom } from '../../recoil/playerAtom';
import Profile from './Profile';

const Left = () => {
  const players = useRecoilValue(playerListAtom);
  console.log(players);
  return (
    <div className=" flex flex-col basis-1/4 h-full  border-2 border-black">
      <Profile />
      <div className="basis-3/5">
        {players.map((player) => (
          <div key={player.id}>{player.name}</div>
        ))}
      </div>
    </div>
  );
};

export default Left;
