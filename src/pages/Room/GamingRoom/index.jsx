import { useState } from 'react';
import { sendData } from '../../../utils/websocket';
import SeatList from '../../../components/SeatList';
import PokerList from '../../../components/PokerList';
import StaticPokerList from '../../../components/StaticPokerList';
import './style.css';

const GamingRoom = (props) => {
  const { room, game, seat, classNames, ...otherProps } = props;
  const isPlayer = !!seat;
  const isCreator = isPlayer && room.players[seat].is_creator;
  const [selectedCards, setSelectedCards] = useState([]);

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
              <div className='room-seat-role'>{game.state === 2 && game.landlord === seat ? '👲 地主' : '👨‍🌾 农民'}</div>
              <div><span className='room-seat-rest'>{game.held[seat]}</span> 张牌</div>
            </div>
            {game.state === 2 && (
              <StaticPokerList ids={game.last[seat]} overlap sort height={58} style={{ flex: '1 0 auto', marginLeft: 24 }} />
            )}
          </>
        )}
      />
      {isPlayer && (
        <div style={{ height: 30 + 88 }}>
          <div style={{ height: 30, margin: '0 24px', fontSize: 18 }}>
            {isPlayer && game.state === 1 && (
              <button className='room-operation-main' onClick={() => sendData('user.call.landlord')}>
                抢地主
              </button>
            )}
            {isPlayer && game.state === 2 && (
              <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                <button
                  className='room-operation-main'
                  disabled={selectedCards.length === 0}
                  onClick={() => sendData('user.drop.card', { cards: selectedCards })}
                >
                  出牌
                </button>
                <button
                  disabled={game.last[seat].length === 0}
                  onClick={() => sendData('user.withdraw.card')}
                >
                  收回刚出的牌
                </button>
                <button
                  className='room-operation-main'
                  disabled={selectedCards.length === 0}
                  onClick={() => sendData('user.drop.card', { cards: selectedCards })}
                >
                  出牌
                </button>
              </div>
            )}
          </div>
          <PokerList
            height={70}
            ids={game.my}
            onChange={(selected) => {
              setSelectedCards(selected);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default GamingRoom;
