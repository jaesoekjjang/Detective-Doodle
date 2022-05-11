import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { myName } from '../../recoil/myInfoAtom';
import useLocalStorage from '../hooks/useLocalStorage';

const index = () => {
  const name = useRecoilValue(myName);
  const [nameInputValue, setNameInputValue] = useState(name);

  const [, setToken] = useLocalStorage('token');
  const navigate = useNavigate();

  const handleClickButton = () => {
    setToken(name);
    navigate('/lobby', { replace: true });
  };

  return (
    <div className="relative flex flex-col items-center gap-4 w-1/2 top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]">
      <div className="flex justify-center items-center">
        <input
          type="text"
          onChange={(e) => setNameInputValue(e.currentTarget.value)}
          placeholder="이름을 입력하세요"
          name="name"
          value={nameInputValue}
          className="lobby-button w-3/4 outline-none"
        />
      </div>
      <button type="button" onClick={handleClickButton}>
        로그인
      </button>
    </div>
  );
};

export default index;
