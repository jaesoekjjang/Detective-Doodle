import type { Tools } from './models/Tools';

export const WIDTH = '680px';
export const HEIGHT = '540px';

export const basicColors = [
  '#000000',
  '#787878',
  '#ffffff',
  '#ef4444',
  '#f542aa',
  '#eab308',
  '#22c55e',
  '#3b82f6',
  '#c32de1',
];

export const widthWeight = {
  pencil: 14,
  eraser: 30,
};

export const getLineWeight = (toolType: Tools) => {
  return widthWeight[toolType];
};
