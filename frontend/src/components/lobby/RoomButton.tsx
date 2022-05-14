import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { useSocket } from '../hooks/useSocket';

interface RoomButtonProps {
  roomName: string;
}

const RoomButton: React.FC<RoomButtonProps> = ({ roomName }) => {
  const socket = useSocket();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/room/${roomName}`);
  };

  return (
    <div onClick={handleClick} className="p-4 border-2 border-black bg-blue-300 cursor-pointer">
      {roomName}
    </div>
  );
};

export default RoomButton;
