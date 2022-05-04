import Tool from '../models/Tool';

export default class Pencil extends Tool {
  private _color: string = 'black';

  onMouseMove(x: number, y: number) {
    this.ctx.beginPath();
    this.ctx.moveTo(this.lastPoint.x, this.lastPoint.y);
    this.ctx.strokeStyle = this._color;
    this.ctx.lineWidth = this._lineWidth;
    //TODO 베지어 곡선으로 변경
    this.ctx.lineTo(x, y);
    this.ctx.stroke();
    this.ctx.closePath();
    this.lastPoint = { x, y };
  }

  set color(color: string) {
    this._color = color;
  }

  get color() {
    return this._color;
  }
}
