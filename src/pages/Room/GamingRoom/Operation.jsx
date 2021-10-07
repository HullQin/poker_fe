import { useState } from 'react';
import PokerList from '../../../components/PokerList';
import { sendData } from '../../../utils/websocket';

const Operation = (props) => {
  const { game, seat } = props;
  const [selectedCards, setSelectedCards] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const handleClick = (handler) => () => {
    setDisabled(true);
    handler();
    setTimeout(() => setDisabled(false), 300);
  };
  return (
    <div style={{ height: 30 + 88 }}>
      <div style={{ height: 30, margin: '0 24px', fontSize: 18 }}>
        {game.state === 1 && (
          <button className='room-operation-main' onClick={handleClick(() => sendData('user.call.landlord'))}>
            抢地主
          </button>
        )}
        {game.state === 2 && (
          <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            <button
              className='room-operation-main'
              disabled={disabled || selectedCards.length === 0}
              onClick={handleClick(() => sendData('user.drop.card', { cards: selectedCards }))}
            >
              出牌
            </button>
            <button
              disabled={disabled}
              onClick={handleClick(() => sendData('user.drop.card', { cards: [] }))}
            >
              不出
            </button>
            <button
              disabled={disabled || game.last[seat].length === 0}
              onClick={handleClick(() => sendData('user.withdraw.card'))}
            >
              收回刚出的牌
            </button>
            <button
              className='room-operation-main'
              disabled={disabled || selectedCards.length === 0}
              onClick={handleClick(() => sendData('user.drop.card', { cards: selectedCards }))}
            >
              出牌
            </button>
          </div>
        )}
      </div>
      <PokerList
        height={70}
        ids={game.my}
        onChange={setSelectedCards}
      />
    </div>
  );
};

export default Operation;
