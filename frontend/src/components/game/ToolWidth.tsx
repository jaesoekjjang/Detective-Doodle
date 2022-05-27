import React from 'react';
import { useContext } from 'react';

import { useRecoilState } from 'recoil';
import { lineWidth } from '../../recoil/canvasAtom';
import { DrawDataContext } from './DrawDataProvider';

const ToolWidth = () => {
  // const [width, setWidth] = useRecoilState(lineWidth);
  const { drawData, setDrawData } = useContext(DrawDataContext);

  const handleWidth: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const newWidth = +e.currentTarget.value;
    // setWidth(newWidth);
    setDrawData((drawData) => ({ ...drawData, width: newWidth }));
  };

  return <input className="w-40" type="range" onChange={handleWidth} value={drawData.width} />;
};

export default ToolWidth;
