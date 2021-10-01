import { useState } from 'react';
import SeatList from '../../../components/SeatList';
import { sendData } from '../../../utils/websocket';

const WaitingRoom = (props) => {
  const { room, seat, ...otherProps } = props;
  const [disabled, setDisabled] = useState(false);
  return (
    <div {...otherProps}>
      <h1>房间号：{room.id}</h1>
      <SeatList
        seat={seat}
        players={room.players}
        onClickSeat={(seat) => {
          if (room.players[seat] === null) sendData('user.seat.change', { seat });
        }}
      />
      {room.players[seat]?.is_creator && (
        <div style={{ marginTop: 21, textAlign: 'center' }}>
          {/*<button*/}
          {/*  disabled={room.players[4] !== null || disabled}*/}
          {/*  onClick={() => {*/}
          {/*    setDisabled(true);*/}
          {/*    addHandler({*/}
          {/*      'user.change.mode.fail': (data) => {*/}
          {/*        removeHandler(['user.change.mode.fail']);*/}
          {/*      },*/}
          {/*    });*/}
          {/*    sendData('user.change.mode')*/}
          {/*  }}*/}
          {/*>*/}
          {/*  调整模式*/}
          {/*</button>*/}
          {/*<br/>*/}
          {/*<br/>*/}
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
