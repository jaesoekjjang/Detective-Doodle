import React from 'react';

import Tools from './Tools';
import Palette from './Palette';
import RedoAndUndo from './RedoAndUndo';
import ClearButton from './ClearButton';

const Side: React.FC = () => {
  return (
    <div className="relative flex flex-col justify-between ">
      <Palette />
    </div>
  );
};

export default React.memo(Side);
