import cn from 'classnames';
import './style.css';

const Seat = (props) => {
  const { isMe, player, seat, ...otherProps } = props;
  const empty = !player;
  const name = player?.name;
  const online = player?.online;
  const isCreator = player?.is_creator;
  return (
    <div {...otherProps}>
      <div className={cn('seat', { 'seat-empty': empty, 'seat-me': isMe })}>
        {empty ? '👤' : ['👸', '👨‍💻', '👩‍💻', '🤴'][seat % 4]}
        <div className='seat-badge'>
          {seat}
        </div>
        {!empty && !isMe && <div className={cn('seat-online-badge', !online && 'seat-offline-badge')} />}
        {!empty && !!isCreator && (
          <div className='seat-creator-badge'>
            🔑
          </div>
        )}
      </div>
      {!empty && (
        <div className="seat-name">
          {name}
        </div>
      )}
    </div>
  );
};

export default Seat;
