import Point from './models/Point';
import { Tools } from './models/Tools';
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

interface Pencil {
  point: Point;
  width: number;
  color: string;
}

export const useDraw = () => {
  let lastPoint: Point = { x: 0, y: 0 };

  const draw = (ctx: CanvasRenderingContext2D, pencil: Pencil) => {
    const { x, y } = pencil.point;
    ctx.strokeStyle = pencil.color;
    ctx.lineWidth = pencil.width;
    ctx.beginPath();
    ctx.moveTo(lastPoint.x, lastPoint.y);
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.closePath();
    lastPoint = { x, y };
  };

  return draw;
};

// export const setToolWidth = (width: number) => {
//   const lineWeight = getLineWeight(toolType);
//   Game.instance.me.toolWidth = (lineWeight * width) / 100 + 1;
// };
