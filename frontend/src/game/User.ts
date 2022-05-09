import { io, Socket } from 'socket.io-client';

export default class User {
  private socket = io('localhost:8000');
  private _name = '';

  constructor() {}

  set name(name: string) {
    this._name = name;
  }

  get name() {
    return this._name;
  }
}
