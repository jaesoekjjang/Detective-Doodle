import React from 'react';

import Tools from './Tools';
import Palette from './Palette';
import RedoAndUndo from './RedoAndUndo';
import NewCanvasButton from './NewCanvasButton';

import type Canvas from '../../game/Canvas';

interface RightSideProps {
  canvas: Canvas | null;
}

const RightSide: React.FC<RightSideProps> = ({ canvas }) => {
  return (
    <div className="flex flex-col justify-between ">
      <Tools />
      <Palette canvas={canvas} />
      <RedoAndUndo canvas={canvas} />
      <NewCanvasButton canvas={canvas} />
    </div>
  );
};

export default React.memo(RightSide);
