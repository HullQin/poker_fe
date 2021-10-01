import cn from 'classnames';
import './style.css';

const Seat = (props) => {
  const { isCreator, name, seat, online, classNames, ...otherProps } = props;
  return (
    <div className={cn('seat', classNames)} {...otherProps}>
      {name}
      <div className='seat-badge'>
        {seat}
      </div>
      <div className={cn('seat-online-badge', !online && 'seat-offline-badge')}>
      </div>
      {!!isCreator && (
        <div className='seat-creator-badge'>
          ⬆
        </div>
      )}
    </div>
  );
};

export default Seat;
