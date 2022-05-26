import Tool from '../models/Tool';
import type { DrawData } from '../models/DrawData';

export default class Pencil extends Tool {
  onMouseDown(data: DrawData) {
    this.lastPoint = data.point;
  }

  onMouseMove(data: DrawData) {
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
