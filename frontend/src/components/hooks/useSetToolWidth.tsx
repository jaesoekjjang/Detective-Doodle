import React from 'react';

import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { eraserAtom, lineWidth, pencilAtom, toolTypeAtom } from '../../recoil/canvasAtom';

import { getLineWeight } from '../../game/utils';

const useSetToolWidth = (width: number) => {
  const tool = useRecoilValue(toolTypeAtom);
  const setPencil = useSetRecoilState(pencilAtom);
  const setEraser = useSetRecoilState(eraserAtom);

  if (tool === 'pencil') setPencil((pencil) => ({ ...pencil, width }));
  if (tool === 'eraser') setEraser((eraser) => ({ ...eraser, width }));
};

export default useSetToolWidth;
