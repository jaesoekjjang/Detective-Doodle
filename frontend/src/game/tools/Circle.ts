import Point from '../models/Point';
import ShapeTool from './ShapeTool';

interface drawData {
  point: Point;
  width: number;
  color: string;
}

export default class Rectangle extends ShapeTool {
  onMouseMove(data: drawData) {
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
    this.ctx.beginPath();
    this.ctx.arc(startX, startY, width / 2, 0, Math.PI * 2);
    this.ctx.stroke();
  }
}
