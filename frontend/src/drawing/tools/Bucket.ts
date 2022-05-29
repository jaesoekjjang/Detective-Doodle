import Tool from '../models/Tool';
import Point from '../models/Point';
import { Queue } from '../../utils';
import type { ToolData } from '../models/ToolData';

export default class Bucket extends Tool {
  private visited: number[][];
  constructor(private readonly canvas: HTMLCanvasElement) {
    super(canvas.getContext('2d')!);
    this.visited = Array.from(Array(this.canvas.width), () => Array(this.canvas.height).fill(0));
  }

  onMouseDown(data: ToolData) {
    this.paint(data.point, data.color);
  }

  onMouseMove(data: ToolData) {
    this.paint(data.point, data.color);
  }

  private paint(point: Point, hexFillColor: string) {
    const fillColor = this.hexToRgb(hexFillColor);
    const imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
    const targetColor = this.getPixelColor(imageData)(point);
    if (!targetColor || this.isSameColor(targetColor, fillColor)) return;

    this.fill(imageData, point, targetColor, fillColor);
    this.ctx.putImageData(imageData, 0, 0);
    this.visited.forEach((arr) => arr.fill(0));
  }

  private hexToRgb(hex: string) {
    hex = hex.replace('#', '');
    const rgb = [hex.slice(0, 2), hex.slice(2, 4), hex.slice(4, 6)].map((c) => parseInt(c, 16));
    return new Uint8ClampedArray(rgb);
  }

  private getPixelColor(imageData: ImageData) {
    return (point: Point) => {
      const { x, y } = point;
      if (x < 0 || y < 0 || x > this.canvas.width || y > this.canvas.height) return;
      return imageData.data.slice(
        (x + y * this.canvas.width) * 4,
        (x + y * this.canvas.width) * 4 + 3
      );
    };
  }

  private setPixelColor(imageData: ImageData, fillColor: Uint8ClampedArray) {
    return (point: Point) => {
      const { x, y } = point;
      const offset = (x + y * this.canvas.width) * 4;
      fillColor.forEach((_, index) => {
        imageData.data[offset + index] = fillColor[index];
      });
    };
  }

  private isSameColor(crntColor: Uint8ClampedArray, targetColor: Uint8ClampedArray) {
    return crntColor.reduce((prev, _, idx) => prev && crntColor[idx] === targetColor[idx], true);
  }

  private fill(
    imageData: ImageData,
    point: Point,
    targetColor: Uint8ClampedArray,
    fillColor: Uint8ClampedArray
  ) {
    const direction = [
      [-1, 0],
      [1, 0],
      [0, -1],
      [0, 1],
    ];

    const queue = new Queue<Point>();
    queue.enqueue({ x: point.x, y: point.y });
    const pixelColor = this.getPixelColor(imageData);
    const setPixelColor = this.setPixelColor(imageData, fillColor);

    while (queue.length > 0) {
      const { x, y } = queue.dequeue();

      const crntColor = pixelColor({ x, y });
      if (!crntColor || !this.isSameColor(crntColor, targetColor)) {
        continue;
      }

      this.visited[x][y] = 1;
      setPixelColor({ x, y });

      for (let [dx, dy] of direction) {
        const nextX = x + dx;
        const nextY = y + dy;

        if (
          nextX >= 0 &&
          nextY >= 0 &&
          nextX < this.canvas.width &&
          nextY < this.canvas.height &&
          !this.visited[nextX][nextY]
        ) {
          queue.enqueue({ x: nextX, y: nextY });
        }
      }
    }
  }
}
