import Point from '../models/Point';
import Tool from '../models/Tool';

interface drawData {
  point: Point;
  width: number;
  color?: string;
}

export default class Rectangle extends Tool {
  private startPoint: Point;
  private image: ImageData;

  constructor(private readonly canvas: HTMLCanvasElement) {
    super(canvas.getContext('2d')!);
  }

  onMouseDown(data: drawData) {
    this.startPoint = data.point;
    this.image = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
  }

  onMouseMove(data: drawData) {
    const {
      point: { x, y },
      width: lineWidth,
    } = data;
    const { x: startX, y: startY } = this.startPoint;

    const width = x - startX;
    const height = y - startY;

    this.ctx.putImageData(this.image, 0, 0);
    this.ctx.lineWidth = lineWidth;
    this.ctx.strokeRect(startX, startY, width, height);
  }
}
