import React from 'react';

import { useRecoilState } from 'recoil';
import { lineWidth } from '../../recoil/canvasAtom';

const ToolWidth = () => {
  const [width, setWidth] = useRecoilState(lineWidth);

  const handleWidth: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const newWidth = +e.currentTarget.value;
    setWidth(newWidth);
  };

  return <input className="w-40" type="range" onChange={handleWidth} value={width} />;
};

export default ToolWidth;
