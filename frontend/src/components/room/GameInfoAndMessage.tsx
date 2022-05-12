import React, { memo } from 'react';
import { useRecoilValue } from 'recoil';
import { roomUserListAtom } from '../../recoil/userAtom';

const GameInfoAndMessage = () => {
  const userList = useRecoilValue(roomUserListAtom);

  console.log(userList);
  return (
    <div className=" flex flex-col w-64 gap-4">
      <div className="w-full h-1/2 border-[1px] border-black">
        {userList.map((user) => (
          <div>{user.name}</div>
        ))}
      </div>
      <div className="w-full h-1/2 border-[1px] border-black">위</div>
    </div>
  );
};

export default memo(GameInfoAndMessage);
