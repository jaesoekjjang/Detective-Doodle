import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Lobby = () => {
  const [name, setName] = useState('');

  return (
    <div className="flex flex-col p-8 gap-8 w-96 h-96 border-2 border-black">
      <input
        type="text"
        onChange={(e) => setName(e.currentTarget.value)}
        placeholder="이름을 입력하세요"
        name="name"
        value={name}
        className="lobby-button outline-none"
      />
      <div className="lobby-button">참여하기</div>
      <div className="lobby-button">방 만들기</div>
      <Link to="/single" className="lobby-button">
        혼자 놀기
      </Link>
    </div>
  );
};

export default Lobby;
