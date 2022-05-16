import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { meAtom } from '../../recoil/playerAtom';
import { currentRoomAtom } from '../../recoil/roomAtom';
import { Player } from '../../types/player.interface';
import { useSocket } from '../hooks/useSocket';

interface RoomButtonProps {
  roomId: string;
  roomName: string;
}

const RoomButton: React.FC<RoomButtonProps> = ({ roomId, roomName }) => {
  const socket = useSocket();
  const navigate = useNavigate();

  const [me, setMe] = useRecoilState(meAtom);
  const setCurrentRoom = useSetRecoilState(currentRoomAtom);
  const handleClick = () => {
    socket?.emit('join_room', { roomId, player: me });
    socket?.on('room_joined', (players: Player[]) => {
      setMe((me) => ({ ...me, roomId }));
      // setCurrentRoom((room) => ({ ...room, players }));
    });
    navigate(`/room/${roomId}`);
  };

  return (
    <div onClick={handleClick} className="p-4 border-2 border-black bg-blue-300 cursor-pointer">
      {roomName}
    </div>
  );
};

export default RoomButton;
