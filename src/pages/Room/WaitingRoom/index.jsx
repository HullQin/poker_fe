import { useState } from 'react';
import SeatList from '../../../components/SeatList';
import { sendData } from '../../../utils/websocket';

const WaitingRoom = (props) => {
  const { room, seat, ...otherProps } = props;
  const [disabled, setDisabled] = useState(false);
  const isPlayer = !!seat;
  const isCreator = isPlayer && room.players[seat]?.is_creator;

  return (
    <div {...otherProps}>
      <h1>房间号：{room.id}</h1>
      {!isPlayer && <h1>您正在观战，请等待房主开局</h1>}
      <SeatList
        seat={seat}
        players={room.players}
        onClickSeat={(seat) => {
          if (room.players[seat] === null) sendData('user.seat.change', { seat });
        }}
      />
      {isCreator && (
        <div style={{ marginTop: 21, textAlign: 'center' }}>
          <button
            disabled={!!room.players[4]}
            onClick={() => {
              sendData('user.change.mode');
            }}
          >
            调整模式
          </button>
          <br/>
          <br/>
          <button
            disabled={room.players.includes(null, 1) || disabled}
            onClick={() => {
              setDisabled(true);
              sendData(
                'user.start.game',
                {},
                (data) => !data.ok && setDisabled(false),
              );
            }}
          >
            开始游戏
          </button>
        </div>
      )}
    </div>
  );
};

export default WaitingRoom;
