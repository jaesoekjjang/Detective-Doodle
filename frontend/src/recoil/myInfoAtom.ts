import { atom } from 'recoil';

export const myName = atom<string>({
  key: 'myName',
  default: '',
});
