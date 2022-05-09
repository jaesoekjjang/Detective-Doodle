import { atom } from 'recoil';

export const userList = atom<{ id: string; name: string }[]>({
  key: 'userList',
  default: [],
});
