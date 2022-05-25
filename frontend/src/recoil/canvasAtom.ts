import { atom, selector } from 'recoil';
import { getCursorWeight, getMaxWidth } from './../game/utils';
import { Tools } from '../game/models/Tools';

export const toolTypeAtom = atom<Tools>({
  key: 'toolType',
  default: 'pencil',
});

export const pencilWidthAtom = atom({
  key: 'pencil',
  default: 8,
});

export const eraserWidthAtom = atom({
  key: 'eraser',
  default: 16,
});

export const lineWidth = selector<number>({
  key: 'lineWidth',
  get: ({ get }) => {
    const tool = get(toolTypeAtom);
    if (tool === 'pencil' || tool === 'eraser') {
      const weight = getMaxWidth(tool);
      if (tool === 'pencil') return ((get(pencilWidthAtom) - 1) * 100) / weight;
      if (tool === 'eraser') return ((get(eraserWidthAtom) - 1) * 100) / weight;
    } else return 16;
  },
  set: ({ get, set }, newValue) => {
    const tool = get(toolTypeAtom);
    if (tool === 'pencil' || tool === 'eraser') {
      const weight = getMaxWidth(tool);
      const width = (+newValue * weight) / 100 + 1;
      if (tool === 'pencil') set(pencilWidthAtom, width);
    }
  },
});

export const cursorRadius = selector({
  key: 'cursorRadius',
  get: ({ get }) => {
    const tool = get(toolTypeAtom);
    if (tool === 'pencil' || tool === 'eraser') {
      return Math.max(get(lineWidth), 16) / getCursorWeight(tool);
    } else {
      return 16;
    }
  },
});

export const colorAtom = atom<string>({
  key: 'color',
  default: '#000000',
});
