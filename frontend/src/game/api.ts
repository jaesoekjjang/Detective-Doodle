import Game from './Game';
import Canvas from './Canvas';
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

const widthWeight = {
  pencil: 14,
  eraser: 30,
};

export const startGame = () => {
  Game.config(new Canvas());
  Game.instance;
};

export const endGame = () => {
  Game.destructoy();
};

export const clearCanvas = () => {
  Game.canvas.clear();
};

export const setTool = (tool: Tools) => {
  Game.instance.me.tool = tool;
};

export const setToolWidth = (width: number) => {
  const lineWeight = getLineWeight(Game.instance.me.toolType);
  Game.instance.me.toolWidth = (lineWeight * width) / 100 + 1;
};

export const getToolWidth = () => {
  const lineWeight = getLineWeight(Game.instance.me.toolType);
  return ((Game.instance.me.toolWidth - 1) * 100) / lineWeight;
};

export const getLineWeight = (toolType: Tools) => {
  return widthWeight[toolType];
};

export const setPencilColor = (color: string) => {
  Game.instance.me.pencilColor = color;
};

export const undo = () => {
  Game.instance.me.undo();
};

export const redo = () => {
  Game.instance.me.redo();
};
