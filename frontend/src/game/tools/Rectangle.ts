import Point from '../models/Point';
import ShapeTool from './ShapeTool';

import type { DrawData } from '../models/DrawData';

export default class Rectangle extends ShapeTool {
  onMouseMove(data: DrawData) {
    const {
      point: { x, y },
      color,
      width: lineWidth,
    } = data;
    const { x: startX, y: startY } = this.startPoint;

    const width = x - startX;
    const height = y - startY;

    this.ctx.putImageData(this.image, 0, 0);
    this.ctx.lineWidth = lineWidth;
    this.ctx.strokeStyle = color;
    this.ctx.strokeRect(startX, startY, width, height);
  }
}
