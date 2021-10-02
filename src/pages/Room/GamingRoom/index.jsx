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
            {game.state === 2 && (
              <div style={{ position: 'relative' }}>
                {game.last[seat].sort((a, b) => pokerMap[b === 0 ? 0 : b % 54 === 0 ? 54 : b % 54] - pokerMap[a === 0 ? 0 : a % 54 === 0 ? 54 : a % 54]).map((id, index) => <Poker style={{ position: 'absolute', top: 30 * index, transform: 'scale(0.5)' }} key={id} id={id} />)}
              </div>
            )}
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

const pokerMap = [0, 14.2, 15.2, 3.2, 4.2, 5.2, 6.2, 7.2, 8.2, 9.2, 10.2, 11.2, 12.2, 13.2, 14.4, 15.4, 3.4, 4.4, 5.4, 6.4, 7.4, 8.4, 9.4, 10.4, 11.4, 12.4, 13.4, 14.6, 15.6, 3.6, 4.6, 5.6, 6.6, 7.6, 8.6, 9.6, 10.6, 11.6, 12.6, 13.6, 14.8, 15.8, 3.8, 4.8, 5.8, 6.8, 7.8, 8.8, 9.8, 10.8, 11.8, 12.8, 13.8, 54, 53];

export default GamingRoom;
