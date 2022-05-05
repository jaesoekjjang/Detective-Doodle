import Game from './Game';
import Canvas from './Canvas';
import type { Tools } from './models/Tools';

export const WIDTH = '680px';
export const HEIGHT = '540px';

export const colors = {
  black: '#000000',
  gray: '#787878d9',
  white: '#ffffff',
  red: '#ef4444',
  pink: '#f542aad9',
  yellow: '#eab308',
  green: '#22c55e',
  blue: '#3b82f6',
  purple: '#c32de1d9',
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
