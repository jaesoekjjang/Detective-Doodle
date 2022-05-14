import Point from '../models/Point';
import Tool from '../models/Tool';

interface drawData {
  point: Point;
  width: number;
  color?: string;
}

export default class Eraser extends Tool {
  onMouseMove(ctx: CanvasRenderingContext2D, data: drawData) {
    const { x, y } = data.point;
    ctx.globalCompositeOperation = 'destination-out';
    ctx.lineWidth = data.width;
    ctx.beginPath();
    ctx.moveTo(this.lastPoint.x, this.lastPoint.y);
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.closePath();
    ctx.globalCompositeOperation = 'source-over';
    this.lastPoint = { x, y };
  }
}
