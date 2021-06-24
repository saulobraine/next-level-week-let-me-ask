import copyImg from '../assets/images/copy.svg';

import '../styles/room-code.scss';
interface RoomCodeProps {
  roomCode: string;
}

export function RoomCode({ roomCode }: RoomCodeProps) {

  function copyRoomCodeToClipboard() {
    navigator.clipboard.writeText(roomCode);

    alert('Copied!');
  }

  return (
    <button className="room-code" onClick={copyRoomCodeToClipboard}>
      <div>
        <img src={copyImg} alt="Copy Room Code" />
      </div>
      <p>Sala <span>#{roomCode}</span></p>
    </button>
  );
}
