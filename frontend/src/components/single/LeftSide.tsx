import React, { memo } from 'react';
import { Link } from 'react-router-dom';

const LeftSide = () => {
  return (
    <div>
      <Link to="/">나가기</Link>
    </div>
  );
};

export default memo(LeftSide);
