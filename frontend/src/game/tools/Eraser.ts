import Tool from '../models/Tool';

export default class Eraser extends Tool {
  constructor(ctx: CanvasRenderingContext2D) {
    super(ctx);
    this._lineWidth = 16;
  }

  public onMouseMove(x: number, y: number): void {
    this.ctx.globalCompositeOperation = 'destination-out';
    this.ctx.beginPath();
    this.ctx.moveTo(this.lastPoint.x, this.lastPoint.y);
    this.ctx.lineWidth = this._lineWidth;
    this.ctx.lineTo(x, y);
    this.ctx.stroke();
    this.ctx.closePath();
    this.ctx.globalCompositeOperation = 'source-over';
    this.lastPoint = { x, y };
  }

  set lineWidth(width: number) {
    this._lineWidth = width * 2;
  }
  get lineWidth(): number {
    return this._lineWidth / 2;
  }
}
