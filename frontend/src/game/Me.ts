import { Socket } from 'socket.io-client';
import Canvas from "./Canvas";
import Pencil from './Pencil'
import Eraser from './Eraser'

export default class Me {
  private canvas: Canvas;
  private isDragging = false;
  private pencil: Pencil;
  private eraser: Eraser;
  private tool : Pencil | Eraser;
  private position: [number, number] = [0,0];

  constructor(canvas: Canvas){
    this.canvas = canvas;
    this.pencil = new Pencil(this.canvas.ctx);
    this.eraser = new Eraser(this.canvas.ctx);
    this.tool = this.pencil;
    this.init();
  }

  private init(){
      this.canvas.element.addEventListener("mousedown", this.startUsing.bind(this))
      this.canvas.element.addEventListener('mousemove', this.useTool.bind(this))
      this.canvas.element.addEventListener("mouseup", this.stopUsing.bind(this));
      this.canvas.element.addEventListener("mouseout", this.stopUsing.bind(this))
  }

  private startUsing(e: MouseEvent){
    this.isDragging = true;
    this.position = this.canvas.relativePos([e.clientX, e.clientY]);
  }

  private stopUsing() {
    this.isDragging = false;
  }

  useTool(e: MouseEvent){
    if(!this.isDragging) return
    const [crntX, crntY] = this.canvas.relativePos([e.clientX, e.clientY]);
    if(this.isPencil(this.tool)){
      this.pencil.draw(this.position[0], this.position[1], crntX, crntY);
    }else{
      this.eraser.erase(this.position[0], this.position[1], crntX, crntY);
    }

    this.position = [crntX, crntY];
  };

  isPencil(tool: Pencil | Eraser): tool is Pencil {
    return tool instanceof Pencil
  }

  setTool(tool: 'pencil' | 'eraser'){
    if(tool == 'pencil') this.tool = this.pencil;
    if(tool == 'eraser') this.tool = this.eraser;
  }

  setPencilWidth(width: number){
    this.pencil.lineWidth = width;
  }

  setEraserWidth(width: number) {
    this.eraser.width = width;
  }
}