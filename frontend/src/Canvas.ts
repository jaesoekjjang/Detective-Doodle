export default class Canvas {
  private canvas: HTMLCanvasElement;
  private _ctx: CanvasRenderingContext2D;

  private _originPos =[0, 0];
  public width = 540; 
  public height = 540;
  
  constructor(){
    const canvas = <HTMLCanvasElement>document.createElement('CANVAS')
    canvas.setAttribute('id', 'canvas');
    this.canvas = canvas;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    // canvas 객체가 바로 렌더되지 않기 때문에 그냥 초기화 하면 _originPos가 모두 0으로 설정됨.
    requestAnimationFrame(()=>{
      this._originPos = [canvas.offsetLeft, canvas.offsetTop];
    })

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