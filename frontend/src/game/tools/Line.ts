import Point from '../models/Point';
import ShapeTool from './ShapeTool';

interface drawData {
  point: Point;
  width: number;
  color: string;
}

export default class Line extends ShapeTool {
  onMouseMove(data: drawData) {
    const {
      point: { x, y },
      color,
      width: lineWidth,
    } = data;
    const { x: startX, y: startY } = this.startPoint;

    this.ctx.putImageData(this.image, 0, 0);
    this.ctx.beginPath();
    this.ctx.moveTo(this.startPoint.x, this.startPoint.y);
    this.ctx.lineWidth = lineWidth;
    this.ctx.strokeStyle = color;
    this.ctx.lineTo(x, y);
    this.ctx.stroke();
    this.ctx.closePath();
  }
}
