import React from 'react';
import { useRecoilValue } from 'recoil';
import { userList } from '../../recoil/userAtom';
import Profile from './Profile';

const Left = () => {
  const users = useRecoilValue(userList);

  return (
    <div className=" flex flex-col basis-1/4 h-full  border-2 border-black">
      <Profile />
      <div className="basis-3/5">
        {users.map((u) => (
          <div key={u.id}>{u.name}</div>
        ))}
      </div>
    </div>
  );
};

export default Left;
