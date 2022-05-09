import Point from '../models/Point';
import Tool from '../models/Tool';

interface drawData {
  point: Point;
  width: number;
  color?: string;
}

export default class Pencil extends Tool {
  onMouseMove(ctx: CanvasRenderingContext2D, data: drawData) {
    const { x, y } = data.point;
    ctx.strokeStyle = data.color!;
    ctx.lineWidth = data.width;
    ctx.beginPath();
    ctx.moveTo(this.lastPoint.x, this.lastPoint.y);
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.closePath();
    this.lastPoint = { x, y };
  }
}
