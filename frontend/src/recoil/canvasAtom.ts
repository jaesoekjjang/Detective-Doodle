import { atom, selector } from 'recoil';

import { getCursorWeight, getMaxWidth } from './../game/utils';
import { Tools } from '../game/models/Tools';

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
    color: '',
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
    const weight = getMaxWidth(tool);
    if (tool === 'pencil') return ((get(pencilAtom).width - 1) * 100) / weight;
    else return ((get(eraserAtom).width - 1) * 100) / weight;
  },
  set: ({ get, set }, newValue) => {
    const tool = get(toolTypeAtom);
    const weight = getMaxWidth(tool);
    const width = (+newValue * weight) / 100 + 1;
    if (tool === 'pencil') set(pencilAtom, { ...get(pencilAtom), width });
    else set(eraserAtom, { ...get(pencilAtom), width });
  },
});

export const cursorRadius = selector({
  key: 'cursorRadius',
  get: ({ get }) => Math.max(get(lineWidth), 16) / getCursorWeight(get(toolTypeAtom)),
});
