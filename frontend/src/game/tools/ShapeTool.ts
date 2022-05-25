import Point from '../models/Point';
import Tool from '../models/Tool';

interface drawData {
  point: Point;
  width: number;
  color: string;
}

export default class ShapeTool extends Tool {
  protected startPoint: Point;
  protected image: ImageData;

  constructor(protected readonly canvas: HTMLCanvasElement) {
    super(canvas.getContext('2d')!);
  }

  onMouseDown(data: drawData) {
    this.startPoint = data.point;
    this.image = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
  }

  onMouseMove(data: drawData) {}
}
