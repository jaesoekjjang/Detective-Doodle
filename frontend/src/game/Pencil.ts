export default class Pencil{
  private _color: string = 'black';
  private _lineWidth: number = 2;

  constructor(private readonly ctx: CanvasRenderingContext2D){}

  draw(lastX: number, lastY: number, crntX: number, crntY: number){
    this.ctx.beginPath();
    this.ctx.moveTo(lastX, lastY);
    this.ctx.strokeStyle = this._color;
    this.ctx.lineWidth = this._lineWidth;
    //TODO 베지어 곡선으로 그리기
    this.ctx.lineTo(crntX, crntY)
    this.ctx.stroke();
    this.ctx.closePath();
  }

  set color(color: string) {
    this._color = color;
  }

  set lineWidth(width: number){
    this._lineWidth = width;
  }

  get color() {
    return this._color;
  }

  get lineWidth(){
    return this._lineWidth;
  }
}