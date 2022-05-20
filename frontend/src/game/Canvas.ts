import { optimizeAnimation } from '../utils';
import Point from './models/Point';
import Tool from './models/Tool';
import { Tools } from './models/Tools';
import Eraser from './tools/Eraser';
import Pencil from './tools/Pencil';

export default class Canvas {
  private containerRef: React.RefObject<HTMLElement>;
  private canvas: HTMLCanvasElement;
  private _ctx: CanvasRenderingContext2D;
  private _ogPoint: Point = { x: 0, y: 0 };
  private pencil = new Pencil();
  private eraser = new Eraser();
  private _tool: Tool = this.pencil;
  private history: ImageData[] = [];
  private historyPointer = -1;

  constructor(containerRef: React.RefObject<HTMLElement>) {
    this.canvas = document.createElement('canvas');
    containerRef.current?.appendChild(this.canvas);
    this.containerRef = containerRef;
    this._ctx = this.canvas.getContext('2d')!;
    const onResize = optimizeAnimation(this.reSize.bind(this));
    window.addEventListener('resize', onResize);
    this.init();
  }

  private init() {
    this.setSize();
    this.setOgPoint();
    this._ctx.lineJoin = 'round';
    this._ctx.lineCap = 'round';
    this._ctx.fillStyle = 'white';
    this._ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this._ctx.translate(0.5, 0.5);
    this.storeImage();
  }

  reSize() {
    const tempImg = this._ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
    this.init();
    this._ctx.putImageData(tempImg, 0, 0);
  }

  setSize() {
    this.canvas.width = this.containerRef.current?.offsetWidth!;
    this.canvas.height = this.containerRef.current?.offsetHeight!;
  }

  setOgPoint() {
    this._ogPoint = {
      x: this.containerRef.current?.offsetLeft!,
      y: this.containerRef.current?.offsetTop!,
    };
  }

  relativePoint(p: Point): Point {
    const x = p.x - this._ogPoint.x;
    const y = p.y - this._ogPoint.y;
    return { x, y };
  }

  onMouseDown(point: Point) {
    this._tool.onMouseDown(point);
  }

  onMouseMove(data: any) {
    const { toolData, point } = data;
    this._tool.onMouseMove(this.ctx, { point, ...toolData });
  }

  clear() {
    this._ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.storeImage();
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

  get element() {
    return this.canvas;
  }

  get ctx() {
    return this._ctx;
  }

  get ogPoint() {
    return this._ogPoint;
  }

  get image() {
    return this.history[this.historyPointer];
  }

  set tool(tool: Tools) {
    if (tool === 'pencil') this._tool = this.pencil;
    if (tool === 'eraser') this._tool = this.eraser;
  }

  hexToRgb(hex: string) {
    hex = hex.replace('#', '');
    var bigint = parseInt(hex, 16);
    var r = (bigint >> 16) & 255;
    var g = (bigint >> 8) & 255;
    var b = bigint & 255;
    return new Uint8ClampedArray([r, g, b]);
  }

  paint(point: Point, hexFillColor: string) {
    const fillColor = this.hexToRgb(hexFillColor);
    const targetColor = this.getPixelColor(
      this._ctx.getImageData(0, 0, this.canvas.width, this.canvas.height),
      point
    );
    if (!targetColor || this.isSameColor(targetColor, fillColor)) return;

    const imageData = this._ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
    this.fill(imageData, point, targetColor, fillColor);
    this._ctx.putImageData(imageData, 0, 0);
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
    const visited = Array(this.canvas.height).fill(Array(this.canvas.width).fill(0));

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
        if (!visited[nextX][nextY]) {
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
