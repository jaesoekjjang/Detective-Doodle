import { Player } from './player.interface';

export type Status = 'waiting' | 'playing';

export interface Room {
  id: string;
  name: string;
  description: string;
  players: Player[];
  status: Status;
}
