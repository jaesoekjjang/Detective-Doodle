import React from 'react';

const PREFIX = 'detective-doodle-';

const useLocalStorage = (key: string, value?: string): [string, (value: string) => void] => {
  const prefixedKey = PREFIX + key;
  let item = localStorage.getItem(prefixedKey) || '';

  const setItem = (value: string) => {
    localStorage.setItem(prefixedKey, value);
    item = value;
  };

  if (value) setItem(value);

  return [item, setItem];
};

export default useLocalStorage;
