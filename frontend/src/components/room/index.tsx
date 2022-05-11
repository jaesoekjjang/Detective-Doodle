import React from 'react';
import { useParams } from 'react-router-dom';

const index = () => {
  const id = useParams().id;
  return <div>{id}</div>;
};

export default index;
