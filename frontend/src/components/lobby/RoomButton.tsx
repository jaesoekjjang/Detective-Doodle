import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { meAtom } from '../../recoil/playerAtom';
import { currentRoomAtom } from '../../recoil/roomAtom';
import { Player } from '../../types/player.interface';
import { Room } from '../../types/room.interface';
import { useSocket } from '../hooks/useSocket';

interface RoomButtonProps {
  room: Room;
}

const RoomButton: React.FC<RoomButtonProps> = ({ room }) => {
  const socket = useSocket();
  const navigate = useNavigate();

  const { id, name, status } = room;

  const handleClick = () => {
    navigate(`/room/${id}`);
  };

  return (
    <div onClick={handleClick} className="p-4 border-2 border-black bg-blue-300 cursor-pointer">
      {name}
    </div>
  );
};

export default RoomButton;
