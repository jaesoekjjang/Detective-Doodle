import React from 'react';
import { useRecoilState } from 'recoil';

import { setToolWidth } from '../../game/api';
import { lineWidth } from '../../recoil/canvasAtom';

const ToolWidth = () => {
  const [width, setWidth] = useRecoilState(lineWidth);

  const handleWidth: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const newWidth = +e.currentTarget.value;
    setWidth((c) => newWidth);
    setToolWidth(newWidth);
  };

  return <input className="w-40" type="range" onChange={handleWidth} value={width} />;
};

export default ToolWidth;
