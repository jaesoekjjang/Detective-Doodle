import Tool from '../models/Tool';
import type { DrawData } from '../models/DrawData';

export default class Eraser extends Tool {
  private color = '#ffffff';

  onMouseDown(data: DrawData): void {
    this.lastPoint = data.point;
  }

  onMouseMove(data: DrawData) {
    const { x, y } = data.point;
    // ctx.globalCompositeOperation = 'destination-out';
    this.ctx.strokeStyle = this.color;
    this.ctx.lineWidth = data.width * 2;
    this.ctx.beginPath();
    this.ctx.moveTo(this.lastPoint.x, this.lastPoint.y);
    this.ctx.lineTo(x, y);
    this.ctx.stroke();
    this.ctx.closePath();
    // ctx.globalCompositeOperation = 'source-over';
    this.lastPoint = { x, y };
  }
}
