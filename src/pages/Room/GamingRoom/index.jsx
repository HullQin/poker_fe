import { sendData } from '../../../utils/websocket';
import SeatList from '../../../components/SeatList';
import StaticPokerList from '../../../components/StaticPokerList';
import './style.css';
import Operation from './Operation';

const GamingRoom = (props) => {
  const { room, game, seat, classNames, ...otherProps } = props;
  const isPlayer = !!seat;
  const isCreator = isPlayer && room.players[seat].is_creator;

  return (
    <div {...otherProps}>
      {!isPlayer && <h1>您正在观战</h1>}
      {isPlayer && game.state === 1 && <h1>抢地主中</h1>}
      {game.state === 2 && (
        <StaticPokerList ids={game.revealed} height={58} />
      )}
      {isCreator && (
        <div style={{ position: 'absolute', top: 58, right: 0}}>
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
      <SeatList
        className='room-seat'
        vertical
        seat={seat}
        players={room.players}
        render={(seat) => (
          <>
            <div className='room-seat-info'>
              <div className='room-seat-role' style={game.top === seat ? { color: 'red' } : undefined}>{game.state === 2 && game.landlord === seat ? '👲 地主' : '👨‍🌾 农民'}</div>
              <div><span className='room-seat-rest' style={game.held[seat] < 3 ? { color: 'red' } : undefined}>{game.held[seat]}</span> 张牌</div>
            </div>
            {game.state === 2 && (
              <StaticPokerList ids={game.last[seat]} overlap sort height={58} style={{ flex: '1 0 auto', marginLeft: 24 }} />
            )}
          </>
        )}
      />
      {isPlayer && <Operation game={game} seat={seat} />}
    </div>
  );
};

export default GamingRoom;
