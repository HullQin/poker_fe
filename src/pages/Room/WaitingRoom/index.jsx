import cn from 'classnames';
import './style.css';

const WaitingRoom = (props) => {
  const { players, classNames, ...otherProps } = props;
  return (
    <div className={cn('seat-list', classNames)} {...otherProps}>
      {players.map((player, index) => {
        return (
          <Seat
            key={index}
            seat={index + 1}
            name={player?.name}
            online={player?.online}
            isCreator={player?.is_creator}
            style={{ margin: 15 }}
          />
        );
      })}
    </div>
  );
};

export default WaitingRoom;
