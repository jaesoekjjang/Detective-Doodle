import { Socket } from 'socket.io-client';
import Canvas from "./Canvas";
import Player from './Player';
import Profile from './Profile';

export default class Me extends Player {
  private isDrawing = false;

  constructor(canvas: Canvas,socket: Socket, profile: Profile){
    super(canvas, socket, profile)
    this.init();
  }

  init(){
      this.canvas.element.addEventListener("mousedown", this.drawStart.bind(this))
      this.canvas.element.addEventListener('mousemove', this.draw.bind(this))
      this.canvas.element.addEventListener("mouseup", this.drawEnd.bind(this));
      this.canvas.element.addEventListener("mouseout", this.drawEnd.bind(this))
  }

  private drawStart(){
    this.isDrawing = true;
  }

  public draw(e: MouseEvent){
    if(!this.isDrawing) return
    const crntX = e.clientX-this.canvas.originPos[0];
    const crntY = e.clientY-this.canvas.originPos[1];

    this.canvas.draw(this.xPos, this.yPos, crntX, crntY);
    this.socket.emit('draw', {id: this.profile.id, x: crntX, y:crntY});
    this.xPos = crntX;
    this.yPos = crntY;
  };


  private drawEnd() {
    this.isDrawing = false;
    this.xPos = 0;
    this.yPos = 0;
    this.socket.emit('draw', {id: this.profile.id, x:0, y:0})
  }
}