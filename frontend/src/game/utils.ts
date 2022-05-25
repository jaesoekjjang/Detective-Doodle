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

const maxWidth = {
  pencil: 14,
  eraser: 30,
};

const cursorWeight = {
  pencil: 4,
  eraser: 2,
};

export const getMaxWidth = (toolType: 'pencil' | 'eraser') => {
  return maxWidth[toolType];
};

export const getCursorWeight = (toolType: 'pencil' | 'eraser') => {
  return cursorWeight[toolType];
};
