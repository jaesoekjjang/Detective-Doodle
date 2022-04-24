import Canvas from './Canvas'
import {io, Socket} from 'socket.io-client'
import Me from './Me';
import Player from './Me';
import Profile from './Profile';
import OtherPlayer from './OtherPlayer';
import PlayerDTO from '../dto/player.dto';
import DrawDTO from '../dto/draw.dto';
import JoinDTO from '../dto/join.dto';

export default class Game {
  private static game: Game;
  private static canvas: Canvas;
  private socket: Socket;
  private players: OtherPlayer[] = [];
  public me: Me;

  private constructor() {
    this.socket = io('localhost:8000')
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
    this.socket.on('join', this.join.bind(this))    
    this.socket.on('newuser', (player)=>{
      this.players.push(new OtherPlayer(Game.canvas, this.socket, new Profile(player.id)));
    })
    this.socket.on('draw', (data)=>{
      const player = this.players.find(player=>player.profile.id === data.id)
      player?.draw(data.x, data.y);
    })
    this.socket.on('clear', ()=>{
      Game.canvas.clear();
    })
  }

  private join(data: JoinDTO){
    this.me = new Player(Game.canvas, this.socket, new Profile(data.me.id))
    this.loadPlayers(data.players)
    this.loadDraws(data.draws);
  }

  private loadPlayers(players: PlayerDTO[]) {
      players.forEach(({id})=>{
        this.players.push(new OtherPlayer(Game.canvas, this.socket, new Profile(id)));
      })
    }

  private loadDraws(draws: DrawDTO[]){
    draws.reduce((last, crnt)=>{
      const pos = {
        lastX: last.x,
        lastY: last.y,
        crntX: crnt.x,
        crntY: crnt.y
      }
      const pencil = {
        color: last.color,
        lineWidth: last.lineWidth
      }

      Game.canvas.draw({pos,pencil})
      return crnt;
    }, draws[0])
  }

  public clear(){
    Game.canvas.clear();
    this.socket.emit('clear');
  }
}

