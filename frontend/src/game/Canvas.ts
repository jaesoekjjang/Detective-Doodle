import Point from './models/Point';

export default class Canvas {
  private canvas: HTMLCanvasElement;
  private _ctx: CanvasRenderingContext2D;
  private containerRef: React.RefObject<HTMLElement>;
  private _ogPoint: Point = { x: 0, y: 0 };
  private history: ImageData[] = [];
  private historyPointer = -1;

  constructor(containerRef: React.RefObject<HTMLElement>) {
    this.canvas = document.querySelector('#canvas')!;
    this._ctx = this.canvas.getContext('2d')!;
    this.containerRef = containerRef;
    this.setOgPoint();
    this.init();
  }

  private init() {
    this._ctx.lineJoin = 'round';
    this._ctx.lineCap = 'round';
    this._ctx.translate(0.5, 0.5);
    this.storeImage();
    window.addEventListener('resize', this.setOgPoint.bind(this));
  }

  setOgPoint() {
    this._ogPoint = {
      x: this.containerRef.current?.offsetLeft!,
      y: this.containerRef.current?.offsetTop!,
    };
    console.log(this._ogPoint);
  }

  clear() {
    this._ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.storeImage();
  }

  get element() {
    return this.canvas;
  }

  get ctx() {
    return this._ctx;
  }

  get ogPoint() {
    return this._ogPoint;
  }

  relativePoint(p: Point): Point {
    const x = p.x - this._ogPoint.x;
    const y = p.y - this._ogPoint.y;
    return { x, y };
  }

  storeImage() {
    this.history.splice(this.historyPointer + 1);
    this.history.push(this._ctx.getImageData(0, 0, this.canvas.width, this.canvas.height));
    this.historyPointer++;

    if (this.history.length <= 20) return;
    this.history.shift();
    this.historyPointer--;
  }

  undo() {
    if (this.historyPointer <= 0) return;
    this._ctx.putImageData(this.history[--this.historyPointer], 0, 0);
  }

  redo() {
    if (this.historyPointer >= this.history.length - 1 || this.historyPointer <= -1) return;
    this._ctx.putImageData(this.history[++this.historyPointer], 0, 0);
  }
}
