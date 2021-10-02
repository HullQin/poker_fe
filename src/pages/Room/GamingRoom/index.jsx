import { useRef } from 'react';
import { sendData } from '../../../utils/websocket';
import SeatList from '../../../components/SeatList';
import PokerList from '../../../components/PokerList';
import './style.css';
import Poker from '../../../components/Poker';

const GamingRoom = (props) => {
  const { room, game, seat, classNames, ...otherProps } = props;
  const isPlayer = !!seat;
  const isCreator = isPlayer && room.players[seat].is_creator;
  const selectedCards = useRef([]);

  return (
    <div {...otherProps}>
      <h1>
        房间状态：{game.state === 1 ? '抢地主' : '出牌'}
      </h1>
      <br/>
      {game.state === 2 && (
        <div style={{ display: 'flex', justifyContent: 'center', transform: 'scale(0.5)', marginTop: -33 }}>
          {game.revealed.map((id) => <Poker key={id} id={id}/>)}
        </div>
      )}
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
          <button
            onClick={() => {
              sendData('user.call.landlord');
            }}
          >
            抢地主
          </button>
        </div>
      )}
      {isPlayer && game.state === 2 && (
        <div>
          <button
            disabled={game.last[seat].length === 0}
            onClick={() => {
              sendData('user.withdraw.card');
            }}
          >
            收回刚出的牌
          </button>
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
          <div style={{ height: 50, marginLeft: 24 }}>
            <button
              style={{ fontSize: 24 }}
              disabled={game.state !== 2}
              onClick={() => {
                sendData('user.drop.card', { cards: selectedCards.current });
              }}
            >
              出牌
            </button>
          </div>
          <PokerList
            ids={game.my}
            onChange={(selected) => {
              selectedCards.current = selected;
            }}
          />
        </div>
      )}
    </div>
  );
};

export default GamingRoom;
