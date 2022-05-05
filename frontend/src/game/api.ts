import Canvas from './Canvas';
import Game from './Game';
import type { Tools } from './models/Tools';

export const WIDTH = '540px';
export const HEIGHT = '540px';

export const colors = {
  black: '#000000',
  red: '#EF4444',
  yellow: '#eab308',
  green: '#22c55e',
  blue: '#3b82f6',
} as const;

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
