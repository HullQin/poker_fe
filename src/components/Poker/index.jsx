import './style.css';
import cn from 'classnames';

const Poker = (props) => {
  const { id, className, ...otherProps } = props;
  if (!id) return;
  return (
    <div className={cn('poker', `poker-${id}`, className)} {...otherProps}>
    </div>
  );
};

export default Poker;
