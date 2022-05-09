import React from 'react';
import { useRecoilValue } from 'recoil';
import { myName } from '../../recoil/myInfoAtom';

const Profile = () => {
  const name = useRecoilValue(myName);

  return <div className="basis-2/5 border-b-2 border-black">{name}</div>;
};

export default Profile;
