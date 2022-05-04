import React from 'react';
import { Link } from 'react-router-dom';
import { endGame } from '../../game/api';

const LeftSide = () => {
  return (
    <div>
      <Link to="/">나가기</Link>
    </div>
  );
};

export default LeftSide;
