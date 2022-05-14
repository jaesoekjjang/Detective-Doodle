import { Player } from './player.interface';

export interface Room {
  id: string;
  name: string;
  description: string;
  players: Player;
}
