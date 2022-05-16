import React from 'react';

import Tools from './Tools';
import Palette from './Palette';
import RedoAndUndo from './RedoAndUndo';
import NewCanvasButton from './NewCanvasButton';
import SideMask from './SideMask';

import type Canvas from '../../game/Canvas';
import type { Status } from '.';

interface SideProps {
  canvas: Canvas | null;
  status: Status;
}

const Side: React.FC<SideProps> = ({ canvas, status }) => {
  const isNotDrawing = (status: Status): status is 'drawing' => {
    return status !== 'drawing';
  };

  return (
    <div className="relative flex flex-col justify-between ">
      {isNotDrawing(status) && <SideMask />}
      <Tools />
      <Palette />
      <RedoAndUndo canvas={canvas} />
      <NewCanvasButton canvas={canvas} />
    </div>
  );
};

export default React.memo(Side);
