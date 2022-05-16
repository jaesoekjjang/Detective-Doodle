import { meAtom } from './playerAtom';
import { atom, selector } from 'recoil';
import { Room } from '../types/room.interface';

// TODO current 바뀌면 자동으로 바뀌도록 selector.
export const roomListAtom = atom<Map<string, Room>>({
  key: 'roomList',
  default: new Map<string, Room>(),
});

export const currentRoomAtom = atom<Room>({
  key: 'currentRoom',
});
