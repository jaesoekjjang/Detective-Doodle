export default class Canvas {
  private canvas: HTMLCanvasElement;
  private _ctx: CanvasRenderingContext2D;

  private _originPos =[0, 0];
  
  constructor(){
    this.canvas = document.querySelector("#canvas")!;
    this._originPos = [this.canvas.offsetLeft, this.canvas.offsetTop];
    this._ctx = this.canvas.getContext('2d')!;
  }

  draw(lastX: number, lastY: number, crntX: number, crntY: number) {
    if((!lastX && !lastY) || (!crntX && !crntY)) return;
    this._ctx.beginPath();
    this._ctx.moveTo(lastX, lastY);
    this._ctx.strokeStyle = 'blue';
    this._ctx.lineTo(crntX, crntY)
    this._ctx.stroke();
    this._ctx.closePath();
  }

  clear(){
    this._ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
  }

  get element(){
    return this.canvas;
  }
  
  get ctx(){
    return this._ctx;
  }

  get originPos() {
    return this._originPos;
  }
}