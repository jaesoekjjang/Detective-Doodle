import Point from '../models/Point';
import Tool from '../models/Tool';

interface drawData {
  point: Point;
  width: number;
  color?: string;
}

export default class Pencil extends Tool {
  onMouseDown(data: drawData) {
    this.lastPoint = data.point;
  }

  onMouseMove(data: drawData) {
    const { x, y } = data.point;
    this.ctx.strokeStyle = data.color!;
    this.ctx.lineWidth = data.width;
    this.ctx.beginPath();
    this.ctx.moveTo(this.lastPoint.x, this.lastPoint.y);
    this.ctx.lineTo(x, y);
    this.ctx.stroke();
    this.ctx.closePath();
    this.lastPoint = { x, y };
  }
}
