import cn from 'classnames';
import './style.css';
import Seat from '../Seat';

const SeatList = (props) => {
  const { players, seat, classNames, onClickSeat, ...otherProps } = props;
  return (
    <div className={cn('seat-list', classNames)} {...otherProps}>
      {players.map((player, index) => {
        if (index === 0) return null;
        return (
          <Seat
            key={index}
            seat={index}
            isMe={seat === index}
            player={player}
            style={{ margin: 15 }}
            onClick={onClickSeat && (() => onClickSeat(index))}
          />
        );
      })}
    </div>
  );
};

export default SeatList;
