import React from 'react';
import NewCanvasButton from './NewCanvasButton';
import Palette from './Palette';
import Tools from './Tools';

interface RightSideProps {
  width: number;
  setWidth: React.Dispatch<React.SetStateAction<number>>;
}

const RightSide: React.FC<RightSideProps> = (props) => {
  return (
    <div className="flex flex-col justify-between h-2/5">
      <Tools {...props} />
      <Palette />
      <NewCanvasButton />
    </div>
  );
};

export default RightSide;
