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
  private socket: Socket;
  private me: Me;
  private players: OtherPlayer[] = [];

  constructor(private readonly canvas: Canvas) {
    this.socket = io('localhost:8000')
    this.init()
  }

  init(){
    this.socket.on('join', this.join.bind(this))    
    this.socket.on('newuser', (player)=>{
      this.players.push(new OtherPlayer(this.canvas, this.socket, new Profile(player.id)));
    })
    this.socket.on('draw', (data)=>{
      const player = this.players.find(player=>player.profile.id === data.id)
      player?.draw(data.x, data.y);
    })
    this.socket.on('clear', ()=>{
      this.canvas.clear();
    })

    //임시 지우개
    const clear = document.querySelector('#clear')
    clear?.addEventListener("click", ()=>{
      this.canvas.clear();
      this.socket.emit('clear');
    })
  }

  private join(data: JoinDTO){
    this.me = new Player(this.canvas, this.socket, new Profile(data.me.id))
    this.loadPlayers(data.players)
    this.loadDraws(data.draws);
  }

  private loadPlayers(players: PlayerDTO[]) {
      players.forEach(({id})=>{
        this.players.push(new OtherPlayer(this.canvas, this.socket, new Profile(id)));
      })
    }

  private loadDraws(draws: DrawDTO[]){
    draws.reduce((last, crnt)=>{
      this.canvas.draw(last.x, last.y, crnt.x, crnt.y)
      return crnt;
    }, draws[0])
  }
}

