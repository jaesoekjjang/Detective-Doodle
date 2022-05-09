import { atom } from 'recoil';

const randomName = 'User' + String(Math.random() * 10000).slice(0, 4);
export const myName = atom<string>({
  key: 'myName',
  default: randomName,
});
