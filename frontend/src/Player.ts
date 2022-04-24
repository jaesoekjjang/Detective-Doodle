import { Socket } from 'socket.io-client';
import Canvas from "./Canvas";
import Profile from './Profile';

export default abstract class Player {
  protected readonly canvas: Canvas;
  protected readonly socket: Socket;
  public readonly profile: Profile;

  protected xPos = 0;
  protected yPos = 0;

  constructor(canvas: Canvas, socket: Socket, profile: Profile){
    this.canvas = canvas;
    this.socket = socket;
    this.profile = profile;
  }

  abstract draw(...args: any): void;
}