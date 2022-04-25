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

  init() {
    this._ctx.lineJoin = 'round';
    this._ctx.lineJoin = 'round';
    this._ctx.translate(0.5, 0.5);
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

  relativePos(pos: [number, number]): [number, number] {
    const x = pos[0] - this._originPos[0];
    const y = pos[1] - this._originPos[1];
    return [x, y];
  }
}