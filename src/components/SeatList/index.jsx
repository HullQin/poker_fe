import cn from 'classnames';
import './style.css';
import Seat from '../Seat';

const SeatList = (props) => {
  const { players, seat, className, render, onClickSeat, ...otherProps } = props;
  return (
    <div className={cn('seat-list', className)} {...otherProps}>
      {players.map((player, index) => {
        if (index === 0) return null;
        return (
          <div key={index}>
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
