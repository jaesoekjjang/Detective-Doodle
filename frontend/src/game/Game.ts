import Canvas from './Canvas';
import { io, Socket } from 'socket.io-client';
import Me from './Me';
import System from './System';

type Mode = 'single' | 'multi';

export default class Game {
  private system: System;
  private mode: Mode;
  private canvas: Canvas;
  private me: Me;

  constructor(mode: Mode, system: System, canvas: Canvas) {
    this.mode = mode;
    this.system = system;
    this.canvas = canvas;
    this.me = new Me(canvas);
  }

  startGame() {}
}
