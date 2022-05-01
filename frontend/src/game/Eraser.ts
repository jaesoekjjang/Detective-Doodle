export default class Eraser{
  private _width: number = 10; 
  constructor(private readonly ctx: CanvasRenderingContext2D){}

  erase(lastX: number, lastY: number, crntX: number, crntY: number){
    this.ctx.globalCompositeOperation = 'destination-out';
    this.ctx.beginPath();
    this.ctx.moveTo(lastX, lastY);
    this.ctx.lineWidth = this._width;
    this.ctx.lineTo(crntX, crntY)
    this.ctx.stroke();
    this.ctx.closePath();
    this.ctx.globalCompositeOperation = 'source-over';
  }

  set width(width: number){
    this._width = width;
    console.log(this._width)
  }
}
