import { atom } from 'recoil';

export const tokenAtom = atom<string>({
  key: 'token',
  default: localStorage.getItem('detective-doodle-token') || '',
});
