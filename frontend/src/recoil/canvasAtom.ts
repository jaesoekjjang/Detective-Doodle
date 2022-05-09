import { atom, selector } from 'recoil';

import { Tools } from '../game/models/Tools';
import { getLineWeight } from '../game/utils';

export const lineWidth = atom<number>({
  key: 'lineWidth',
  default: 50,
});

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

export const cursorRadius = selector({
  key: 'cursorRadius',
  get: ({ get }) => Math.max((get(lineWidth) * getLineWeight(get(toolTypeAtom)) * 4) / 100 / 2, 8),
});
