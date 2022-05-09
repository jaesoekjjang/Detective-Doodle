import { atom, selector } from 'recoil';

import { Tools } from '../game/models/Tools';
import { getLineWeight } from '../game/utils';

export const toolTypeAtom = atom<Tools>({
  key: 'toolType',
  default: 'pencil',
});

export const pencilAtom = atom({
  key: 'pencil',
  default: {
    width: 8,
    color: '#000000',
  },
});

export const eraserAtom = atom({
  key: 'eraser',
  default: {
    width: 16,
  },
});

export const colorAtom = selector<string>({
  key: 'colorAtom',
  get: ({ get }) => get(pencilAtom).color,
  set: ({ get, set }, color) => set(pencilAtom, { ...get(pencilAtom), color: color as string }),
});

export const lineWidth = selector<number>({
  key: 'lineWidth',
  get: ({ get }) => {
    const tool = get(toolTypeAtom);
    const weight = getLineWeight(tool);
    if (tool === 'pencil') return ((get(pencilAtom).width - 1) * 100) / weight;
    else return ((get(eraserAtom).width - 1) * 100) / weight;
  },
  set: ({ get, set }, newValue) => {
    const tool = get(toolTypeAtom);
    const weight = getLineWeight(tool);
    const width = (+newValue * weight) / 100 + 1;
    if (tool === 'pencil') set(pencilAtom, { ...get(pencilAtom), width });
    else set(eraserAtom, { ...get(pencilAtom), width });
  },
});

export const cursorRadius = selector({
  key: 'cursorRadius',
  get: ({ get }) => Math.max((get(lineWidth) * getLineWeight(get(toolTypeAtom)) * 4) / 100 / 2, 8),
});
