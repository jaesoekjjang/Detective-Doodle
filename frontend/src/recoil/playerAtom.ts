import { atom } from 'recoil';

export const playerName = atom<string>({
  key: 'playerName',
  default: '',
});
