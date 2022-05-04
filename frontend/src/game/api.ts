import Canvas from './Canvas';
import Game from './Game';
import type { Tools } from './models/Tools';

export const WIDTH = '540px';
export const HEIGHT = '540px';

export const colors = {
  red: 'rgb(239 68 68)',
  yellow: 'rgb(234 179 8)',
  green: 'rgb(34 197 94)',
  blue: 'rgb(59 130 246)',
} as const;

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
  Game.instance.me.setTool(tool);
};

export const setToolWidth = (width: number) => {
  Game.instance.me.toolWidth = (4.5 * width) / 100 + 0.5;
};

export const getToolWidth = () => {
  return ((Game.instance.me.toolWidth - 0.5) * 100) / 4.5;
};

export const setPencilColor = (color: string) => {
  Game.instance.me.pencilColor = color;
};
