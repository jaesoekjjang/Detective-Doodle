import Point from './Point';
import { ToolData } from './ToolData';

export default abstract class Tool {
  protected lastPoint: Point;

  constructor(protected ctx: CanvasRenderingContext2D) {}

  abstract onMouseDown(data: ToolData): void;
  abstract onMouseMove(data: ToolData): void;
}
