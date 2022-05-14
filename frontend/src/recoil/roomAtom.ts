import { atom } from 'recoil';
import { Room } from '../types/room.interface';

export const roomListAtom = atom<Room[]>({
  key: 'roomList',
  default: [],
});
