import Point from './Point';

interface drawData {
  point: Point;
  width?: number;
  color?: string;
}

export default abstract class Tool {
  protected lastPoint: Point;

  constructor(protected ctx: CanvasRenderingContext2D) {}

  abstract onMouseDown(data: drawData): void;
  abstract onMouseMove(data: drawData): void;
}
