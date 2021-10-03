import cn from 'classnames';
import Seat from '../Seat';
import './style.css';

const SeatList = (props) => {
  const { players, vertical, seat, className, render, onClickSeat, style, ...otherProps } = props;
  return (
    <div className={cn('seat-list', className)} style={{ flexDirection: vertical ? 'column' : undefined, ...style }} {...otherProps}>
      {players.map((player, index) => {
        if (index === 0) return null;
        return (
          <div className='seat-info' key={index} style={{ flexDirection: vertical ? undefined : 'column' }}>
            <Seat
              seat={index}
              isMe={seat === index}
              player={player}
              style={{ margin: 15 }}
              onClick={onClickSeat && (() => onClickSeat(index))}
            />
            {!!render && render(index)}
          </div>
        );
      })}
    </div>
  );
};

export default SeatList;
