import React from 'react';
import { useRecoilState } from 'recoil';
import { tokenAtom } from './../../recoil/authAtom';

const useLogout = () => {
  const [token, setToken] = useRecoilState(tokenAtom);

  setToken('');
  localStorage.removeItem('detective-doodle-token');
};

export default useLogout;
