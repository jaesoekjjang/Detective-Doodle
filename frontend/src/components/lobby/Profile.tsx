import React from 'react';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { playerName } from '../../recoil/playerAtom';

const Profile = () => {
  const [nameInputValue, setNameInputValue] = useState('');
  const [name, setName] = useRecoilState(playerName);

  return (
    <div className="basis-2/5 border-b-2 border-black">
      <input
        type="text"
        onChange={(e) => setNameInputValue(e.currentTarget.value)}
        placeholder="이름을 입력하세요"
        name="name"
        value={nameInputValue}
        className="lobby-button w-3/4 outline-none"
      />
      <button className="lobby-button" onClick={() => setName(nameInputValue)}>
        저장
      </button>
    </div>
  );
};

export default Profile;
