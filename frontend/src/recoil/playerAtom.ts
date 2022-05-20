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
