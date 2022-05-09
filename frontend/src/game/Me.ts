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
  private _tool: Tool;

  constructor(canvas: Canvas) {
    this.canvas = canvas;
    this.pencil = new Pencil(this.canvas.ctx);
    this.eraser = new Eraser(this.canvas.ctx);
    this._tool = this.pencil;
    this.init();
  }

  private init() {
    this.canvas.element.addEventListener('mousedown', this.startUsing.bind(this));
    this.canvas.element.addEventListener('mousemove', this.useTool.bind(this));
    this.canvas.element.addEventListener('mouseup', this.mouseUp.bind(this));
    this.canvas.element.addEventListener('mouseout', this.stopUsing.bind(this));
  }

  private startUsing(e: MouseEvent) {
    this.isDragging = true;
    const { x, y } = this.canvas.relativePoint({ x: e.clientX, y: e.clientY });
    this._tool.onMouseDown(x, y);
  }

  private stopUsing() {
    this.isDragging = false;
  }

  private mouseUp() {
    this.canvas.storeImage();
    this.stopUsing();
  }

  useTool(e: MouseEvent) {
    if (!this.isDragging) return;
    const { x, y } = this.canvas.relativePoint({ x: e.clientX, y: e.clientY });
    this._tool.onMouseMove(x, y);
  }

  undo() {
    this.canvas.undo();
  }

  redo() {
    this.canvas.redo();
  }

  set tool(tool: Tools) {
    if (tool == 'pencil') this._tool = this.pencil;
    if (tool == 'eraser') this._tool = this.eraser;
  }

  get toolType(): 'pencil' | 'eraser' {
    if (this._tool == this.pencil) return 'pencil';
    else return 'eraser';
  }

  set toolWidth(width: number) {
    this._tool.lineWidth = width;
  }

  get toolWidth() {
    return this._tool.lineWidth;
  }

  set pencilColor(color: string) {
    this.pencil.color = color;
  }
}
