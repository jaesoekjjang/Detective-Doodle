import React from 'react';
import { useRecoilValue } from 'recoil';
import { meAtom } from '../../recoil/playerAtom';

const Profile = () => {
  const me = useRecoilValue(meAtom);

  return <div className="basis-2/5 border-b-2 border-black">{me.name}</div>;
};

export default Profile;
