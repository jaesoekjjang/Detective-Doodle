import { Socket } from 'socket.io-client';
import Canvas from "./Canvas";
import Player from './Player';
import Profile from './Profile';

export default class OtherPlayer extends Player {
  constructor(canvas: Canvas,socket: Socket, profile: Profile){
    super(canvas, socket, profile)
  }

  draw(x: number, y: number){
    this.canvas.draw(this.xPos, this.yPos, x, y);
    this.xPos = x;
    this.yPos = y;
  };
}