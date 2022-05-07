import React from 'react';
import BackAndForth from './RedoAndUndo';
import NewCanvasButton from './NewCanvasButton';
import Palette from './Palette';
import Tools from './Tools';

const RightSide = () => {
  return (
    <div className="flex flex-col justify-between ">
      <Tools />
      <Palette />
      <BackAndForth />
      <NewCanvasButton />
    </div>
  );
};

export default React.memo(RightSide);
