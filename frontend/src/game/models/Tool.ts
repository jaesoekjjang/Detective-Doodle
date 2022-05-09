import Point from './Point';

interface drawData {
  point: Point;
  width: number;
  color?: string;
}

export default abstract class Tool {
  protected lastPoint: Point;

  public onMouseDown(point: Point): void {
    this.lastPoint = point;
  }

  public abstract onMouseMove(ctx: CanvasRenderingContext2D, data: drawData): void;
}
