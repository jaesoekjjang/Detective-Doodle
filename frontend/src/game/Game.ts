import Canvas from './Canvas';
import { io, Socket } from 'socket.io-client';
import Me from './Me';

export default class Game {
  private static _instance: Game | null;
  public static canvas: Canvas;
  // private socket: Socket;
  public me: Me;

  private constructor() {
    // this.socket = io('localhost:8000')
    this.me = new Me(Game.canvas);
  }

  public static config(canvas: Canvas) {
    this.canvas = canvas;
  }

  public static get instance() {
    if (!this._instance) {
      this._instance = new Game();
    }
    return this._instance;
  }

  public static destructoy() {
    Game._instance = null;
  }
}
