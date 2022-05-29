import Tool from '../models/Tool';
import type { ToolData } from '../models/ToolData';

export default class Eraser extends Tool {
  private color = '#ffffff';

  onMouseDown(data: ToolData): void {
    const { point, width } = data;
    this.ctx.beginPath();
    this.ctx.fillStyle = this.color;
    this.ctx.arc(point.x, point.y, width, 0, Math.PI * 2);
    this.ctx.fill();
    this.ctx.closePath();
    this.lastPoint = point;
  }

  onMouseMove(data: ToolData) {
    const {
      point: { x, y },
      width,
    } = data;
    this.ctx.strokeStyle = this.color;
    this.ctx.lineWidth = width * 2;
    this.ctx.beginPath();
    this.ctx.moveTo(this.lastPoint.x, this.lastPoint.y);
    this.ctx.lineTo(x, y);
    this.ctx.stroke();
    this.ctx.closePath();
    this.lastPoint = { x, y };
  }
}
