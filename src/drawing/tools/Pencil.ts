import Tool from '../models/Tool';
import type { ToolData } from '../models/ToolData';

export default class Pencil extends Tool {
  onMouseDown(data: ToolData) {
    const { point, color, width } = data;
    this.ctx.beginPath();
    this.ctx.fillStyle = color;
    this.ctx.arc(point.x, point.y, width / 2, 0, Math.PI * 2);
    this.ctx.fill();
    this.ctx.closePath();
    this.lastPoint = point;
  }

  onMouseMove(data: ToolData) {
    const {
      point: { x, y },
      color,
      width,
    } = data;
    this.ctx.strokeStyle = color!;
    this.ctx.lineWidth = width;
    this.ctx.beginPath();
    this.ctx.moveTo(this.lastPoint.x, this.lastPoint.y);
    this.ctx.lineTo(x, y);
    this.ctx.stroke();
    this.ctx.closePath();
    this.lastPoint = { x, y };
  }
}
