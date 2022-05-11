import { atom } from 'recoil';

export const roomListAtom = atom<string[]>({
  key: 'roomList',
  default: [],
});
