import { atom } from 'recoil';
import { Player } from '../types/player.interface';

export const meAtom = atom<Player>({
  key: 'me',
  default: {
    id: '',
    name: '',
    roomId: '',
  },
});

export const playerListAtom = atom<Player[]>({
  key: 'playerList',
  default: [],
});

export const roomPlayerListAtom = atom<Player[]>({
  key: 'roomPlayerList',
  default: [],
});
