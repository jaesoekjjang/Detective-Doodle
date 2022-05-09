import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { useSocket } from '../hooks/useSocket';
import { myName } from '../../recoil/myInfoAtom';
import { userList as users } from '../../recoil/userAtom';

const index = () => {
  const socket = useSocket();

  const [userList, setUserList] = useRecoilState(users);

  const [name, setName] = useRecoilState(myName);
  const [nameInputValue, setNameInputValue] = useState(name);

  useEffect(() => {
    socket?.emit('join', name);
    socket?.on('existing_players', (players: { id: string; name: string }[]) => {
      setUserList(players);
    });
  }, []);

  return (
    <div className="flex flex-col ">
      <div>
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
      <Link to="/lobby">로비로 이동</Link>
    </div>
  );
};

export default index;
