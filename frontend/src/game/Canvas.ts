interface Pos {
  lastX: number;
  lastY: number;
  crntX: number;
  crntY: number;
}

interface Pencil {
  color: string;
  lineWidth: number;
}

export default class Canvas {
  private canvas: HTMLCanvasElement;
  private _ctx: CanvasRenderingContext2D;

  private _originPos =[0, 0];
  
  constructor(){
    this.canvas = document.querySelector("#canvas")!;
    this._originPos = [this.canvas.offsetLeft, this.canvas.offsetTop];
    this._ctx = this.canvas.getContext('2d')!;
  }

  draw({pos, pencil}: {pos: Pos; pencil: Pencil}) {
    if((!pos.lastX && !pos.lastY) || (!pos.crntX && !pos.crntY)) return;
    this._ctx.beginPath();
    this._ctx.moveTo(pos.lastX, pos.lastY);
    this._ctx.strokeStyle = pencil.color;
    this._ctx.lineWidth = pencil.lineWidth;
    this._ctx.lineTo(pos.crntX, pos.crntY)
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