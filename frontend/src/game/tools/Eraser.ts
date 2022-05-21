import Point from '../models/Point';
import Tool from '../models/Tool';

interface drawData {
  point: Point;
  width: number;
  color?: string;
}

export default class Eraser extends Tool {
  private color = '#ffffff';

  onMouseDown(data: drawData): void {
    this.lastPoint = data.point;
  }

  onMouseMove(data: drawData) {
    const { x, y } = data.point;
    // ctx.globalCompositeOperation = 'destination-out';
    this.ctx.strokeStyle = this.color;
    this.ctx.lineWidth = data.width;
    this.ctx.beginPath();
    this.ctx.moveTo(this.lastPoint.x, this.lastPoint.y);
    this.ctx.lineTo(x, y);
    this.ctx.stroke();
    this.ctx.closePath();
    // ctx.globalCompositeOperation = 'source-over';
    this.lastPoint = { x, y };
  }
}
