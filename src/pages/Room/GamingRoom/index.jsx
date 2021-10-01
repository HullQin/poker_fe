import SeatList from '../../../components/SeatList';
import { sendData } from '../../../utils/websocket';

const GamingRoom = (props) => {
  const { room, game, seat, classNames, ...otherProps } = props;
  const isPlayer = !!seat;
  const isCreator = isPlayer && room.players[seat].is_creator;
  return (
    <div {...otherProps}>
      房间总计牌数: {game.total}
      <br/>
      {isCreator && (
        <div>
          <button
            onClick={() => {
              //
            }}
          >
            重新发牌（重新开局）
          </button>
        </div>
      )}
      {isPlayer && game.state === 1 && (
        <div>
          <button>抢地主</button>
        </div>
      )}
      {isPlayer && game.state === 2 && (
        <div>
          <button>出牌</button>
        </div>
      )}
      {isPlayer && game.state === 2 && (
        <div>
          <button>收回刚出的牌</button>
        </div>
      )}
    </div>
  );
};

export default GamingRoom;
