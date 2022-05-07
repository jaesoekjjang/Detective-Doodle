import React from 'react';
import NewCanvasButton from './NewCanvasButton';
import Palette from './Palette';
import Tools from './Tools';

const RightSide = () => {
  return (
    <div className="flex flex-col justify-between ">
      <Tools />
      <Palette />
      <NewCanvasButton />
    </div>
  );
};

export default React.memo(RightSide);
