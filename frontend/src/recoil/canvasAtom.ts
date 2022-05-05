import { atom, selector } from 'recoil';
import { Tools } from '../game/models/Tools';

import { widthWeight, getLineWeight } from '../game/api';

const lineWidth = atom<number>({
  key: 'lineWidth',
  default: 50,
});

const toolType = atom<Tools>({
  key: 'toolType',
  default: 'pencil',
});

const cursorRadius = selector({
  key: 'cursorRadius',
  get: ({ get }) => Math.max((get(lineWidth) * getLineWeight(get(toolType)) * 4) / 100 / 2, 3),
});

export { lineWidth, toolType, cursorRadius };
