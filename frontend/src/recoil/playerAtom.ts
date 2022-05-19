import { currentRoomAtom } from './roomAtom';
import { atom, selector } from 'recoil';
import { Player } from '../types/player.interface';

export const meAtom = atom<Player>({
  key: 'me',
  default: {
    id: '',
    name: '',
    roomId: '',
  },
});
