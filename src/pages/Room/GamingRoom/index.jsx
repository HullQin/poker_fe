import { sendData } from '../../../utils/websocket';
import './style.css';
import SeatList from '../../../components/SeatList';

const GamingRoom = (props) => {
  const { room, game, seat, classNames, ...otherProps } = props;
  const isPlayer = !!seat;
  const isCreator = isPlayer && room.players[seat].is_creator;
  return (
    <div {...otherProps}>
      <h1>
        房间状态：{game.state === 1 ? '抢地主' : '出牌'}
      </h1>
      <br/>
      底牌是：{JSON.stringify(game.revealed)}
      {isCreator && (
        <div style={{ position: 'absolute', top: 0, right: 0}}>
          <button
            onClick={() => {
              if (window.confirm('当前对局记录将清空，确定要重新开局？')) {
                sendData('user.reset.game');
              }
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
      <SeatList
        className='room-seat'
        seat={seat}
        players={room.players}
        render={(seat) => (
          <div className='room-seat-info'>
            <div className='room-seat-role'>{game.state === 2 && game.landlord === seat ? '👲 地主' : '👨‍🌾 农民'}</div>
            <div><span className='room-seat-rest'>{game.held[seat]}</span> 张牌</div>
          </div>
        )}
      />
      {isPlayer && (
        <div className='room-private-poker'>

        </div>
      )}
    </div>
  );
};

export default GamingRoom;
