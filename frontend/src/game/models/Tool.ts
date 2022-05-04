import Point from './Point';

export default abstract class Tool {
  protected ctx: CanvasRenderingContext2D;
  protected lastPoint: Point;
  protected _lineWidth: number = 1;

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
  }

  public onMouseDown(x: number, y: number): void {
    this.lastPoint = { x, y };
  }

  public abstract onMouseMove(x: number, y: number): void;

  set lineWidth(width: number) {
    this._lineWidth = width;
  }

  get lineWidth() {
    return this._lineWidth;
  }
}
