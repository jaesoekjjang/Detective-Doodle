import Canvas from './Canvas';
import Pencil from './tools/Pencil';
import Eraser from './tools/Eraser';
import type Tool from './models/Tool';
import type { Tools } from './models/Tools';

export default class Me {
  private canvas: Canvas;
  private isDragging = false;
  private pencil: Pencil;
  private eraser: Eraser;
  private tool: Tool;

  constructor(canvas: Canvas) {
    this.canvas = canvas;
    this.pencil = new Pencil(this.canvas.ctx);
    this.eraser = new Eraser(this.canvas.ctx);
    this.tool = this.pencil;
    this.init();
  }

  private init() {
    this.canvas.element.addEventListener('mousedown', this.startUsing.bind(this));
    this.canvas.element.addEventListener('mousemove', this.useTool.bind(this));
    this.canvas.element.addEventListener('mouseup', this.stopUsing.bind(this));
    this.canvas.element.addEventListener('mouseout', this.stopUsing.bind(this));
  }

  private startUsing(e: MouseEvent) {
    this.isDragging = true;
    const { x, y } = this.canvas.relativePoint({ x: e.clientX, y: e.clientY });
    this.tool.onMouseDown(x, y);
  }

  private stopUsing() {
    this.isDragging = false;
  }

  useTool(e: MouseEvent) {
    if (!this.isDragging) return;
    const { x, y } = this.canvas.relativePoint({ x: e.clientX, y: e.clientY });
    this.tool.onMouseMove(x, y);
  }

  setTool(tool: Tools) {
    if (tool == 'pencil') this.tool = this.pencil;
    if (tool == 'eraser') this.tool = this.eraser;
  }

  set toolWidth(width: number) {
    this.tool.lineWidth = width;
  }

  get toolWidth() {
    return this.tool.lineWidth;
  }

  set pencilColor(color: string) {
    this.pencil.color = color;
  }
}
