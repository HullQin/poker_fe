import './style.css';
import cn from 'classnames';

const Poker = (props) => {
  const { id, className, ...otherProps } = props;
  if (typeof id !== 'number') return;
  const imgId = id % 54;
  return (
    <div
      className={cn('poker', `poker-${imgId === 0 && id !== 0 ? 54 : imgId}`, className)}
      {...otherProps}
    />
  );
};

export default Poker;
