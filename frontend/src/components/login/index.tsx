import React, { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { tokenAtom } from '../../recoil/authAtom';
import { meAtom } from '../../recoil/playerAtom';

const KEY = 'detective-doodle-token';
const VALUE = 'auth';

const index = () => {
  const [nameInputValue, setNameInputValue] = useState('');

  const [token, setToken] = useRecoilState(tokenAtom);
  const setMe = useSetRecoilState(meAtom);

  const navigate = useNavigate();

  useEffect(() => {
    if (token) navigate('/lobby');
  }, []);

  const handleClickButton = () => {
    // TODO 로그인 함수를 별도로 분리한 뒤 백엔드와 연결하는 실제 로직 구현.
    localStorage.setItem(KEY, VALUE);
    setToken(VALUE);
    setMe((me) => ({ ...me, name: nameInputValue }));
    navigate('/lobby', { replace: true });
  };

  return (
    <div className="relative flex flex-col items-center gap-4 w-1/2  ">
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
