import { Socket } from 'socket.io-client';
import Canvas from "./Canvas";
import Player from './Player';
import Profile from './Profile';
import Pencil from './Pencil'

export default class Me extends Player {
  private isDrawing = false;
  private pencil: Pencil;

  constructor(canvas: Canvas,socket: Socket, profile: Profile){
    super(canvas, socket, profile);
    this.pencil = new Pencil();
    this.init();
  }

  private init(){
      this.canvas.element.addEventListener("mousedown", this.drawStart.bind(this))
      this.canvas.element.addEventListener('mousemove', this.draw.bind(this))
      this.canvas.element.addEventListener("mouseup", this.drawEnd.bind(this));
      this.canvas.element.addEventListener("mouseout", this.drawEnd.bind(this))
  }

  private drawStart(){
    this.isDrawing = true;
  }

  private drawEnd() {
    this.isDrawing = false;
    this.xPos = 0;
    this.yPos = 0;
    this.socket.emit('draw', {id: this.profile.id, x:0, y:0})
  }

  public draw(e: MouseEvent){
    if(!this.isDrawing) return
    const crntX = e.clientX-this.canvas.originPos[0];
    const crntY = e.clientY-this.canvas.originPos[1];

    const pos = {
      lastX: this.xPos,
      lastY: this.yPos,
      crntX,
      crntY,
    }

    this.canvas.draw({pos, pencil: this.pencil});
    this.socket.emit('draw', {id: this.profile.id, x: crntX, y:crntY, color: this.pencil.color, lineWidth: this.pencil.lineWidth});
    this.xPos = crntX;
    this.yPos = crntY;
  };

  public setColor(color: string){
    this.pencil.color = color;
  }

  public setWidth(width: number){
    this.pencil.lineWidth = width;
  }
}