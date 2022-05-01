import Canvas from './Canvas'
import {io, Socket} from 'socket.io-client'
import Me from './Me';

export default class Game {
  private static game: Game | null;
  private static canvas: Canvas;
  private socket: Socket;
  public me: Me;

  private constructor() {
    // this.socket = io('localhost:8000')
    this.init()
  }

  public static config({canvas}: {canvas: Canvas}){
    this.canvas = canvas;
  }

  public static getInstance() {
    if(!this.game){
      this.game = new Game();
    }
    return this.game;
  }

  private init(){
    this.me = new Me(Game.canvas)
  }

  public clear(){
    Game.canvas.clear();
  }

  public static destructoy(){
    Game.game = null;
  }
}

