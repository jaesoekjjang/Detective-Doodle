import Point from './models/Point';

export default class Canvas {
  private canvas: HTMLCanvasElement;
  private _ctx: CanvasRenderingContext2D;
  private _ogPoint: Point = { x: 0, y: 0 };

  constructor() {
    this.canvas = document.querySelector('#canvas')!;
    this._ctx = this.canvas.getContext('2d')!;
    this.setOgPoint();
    this.init();
  }

  private init() {
    this._ctx.lineJoin = 'round';
    this._ctx.lineCap = 'round';
    this._ctx.translate(0.5, 0.5);
    window.addEventListener('resize', this.setOgPoint.bind(this));
  }

  setOgPoint() {
    this._ogPoint = { x: this.canvas.offsetLeft, y: this.canvas.offsetTop };
  }

  clear() {
    this._ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
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
}
