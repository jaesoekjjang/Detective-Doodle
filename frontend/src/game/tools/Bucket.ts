import Point from '../models/Point';
import Tool from '../models/Tool';

interface DrawData {
  point: Point;
  color: string;
}

export default class Bucket extends Tool {
  constructor(private readonly canvas: HTMLCanvasElement) {
    super(canvas.getContext('2d')!);
  }

  onMouseDown(data: DrawData) {
    this.paint(data.point, data.color);
  }

  onMouseMove(data: DrawData) {
    this.paint(data.point, data.color);
  }

  hexToRgb(hex: string) {
    hex = hex.replace('#', '');
    const rgb = [hex.slice(0, 2), hex.slice(2, 4), hex.slice(4, 6)].map((c) => parseInt(c, 16));
    return new Uint8ClampedArray(rgb);
  }

  paint(point: Point, hexFillColor: string) {
    const fillColor = this.hexToRgb(hexFillColor);
    const imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
    const targetColor = this.getPixelColor(imageData, point);
    if (!targetColor || this.isSameColor(targetColor, fillColor)) return;

    this.fill(imageData, point, targetColor, fillColor);
    this.ctx.putImageData(imageData, 0, 0);
  }

  getPixelColor(imageData: ImageData, point: Point) {
    const { x, y } = point;
    if (x < 0 || y < 0 || x > this.canvas.width || y > this.canvas.height) return;
    return imageData.data.slice(
      (x + y * this.canvas.width) * 4,
      (x + y * this.canvas.width) * 4 + 3
    );
  }

  setColor(imageData: ImageData, point: Point, fillColor: Uint8ClampedArray) {
    const { x, y } = point;
    const offset = (x + y * this.canvas.width) * 4;
    fillColor.forEach((color, index) => {
      imageData.data[offset + index] = fillColor[index];
    });
  }

  fill(
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

    const queue: [number, number][] = [];
    queue.push([point.x, point.y]);
    const visited = Array(this.canvas.width).fill(Array(this.canvas.height).fill(0));

    while (queue.length > 0) {
      const [x, y] = queue.shift()!;

      const crntColor = this.getPixelColor(imageData, { x, y });
      if (!crntColor || !this.isSameColor(crntColor, targetColor)) {
        continue;
      }

      this.setColor(imageData, { x, y }, fillColor);

      for (let [dx, dy] of direction) {
        const nextX = x + dx;
        const nextY = y + dy;
        if (
          nextX >= 0 &&
          nextY >= 0 &&
          nextX < this.canvas.width &&
          nextY < this.canvas.height &&
          !visited[nextX][nextY]
        ) {
          queue.push([nextX, nextY]);
        }
      }
    }
  }

  isSameColor(crntColor: Uint8ClampedArray, targetColor: Uint8ClampedArray) {
    return Array(3)
      .fill(0)
      .reduce((prev, crnt, idx) => prev && crntColor[idx] === targetColor[idx], true);
  }
}
