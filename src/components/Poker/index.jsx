import cn from 'classnames';
import { mapPokerIdToCardId } from '../../utils/poker';
import './style.css';

const Poker = (props) => {
  const { id, className, ...otherProps } = props;
  if (typeof id !== 'number') return;
  const cardId = mapPokerIdToCardId(id);
  return (
    <div
      className={cn('poker', `poker-${cardId}`, className)}
      {...otherProps}
    />
  );
};

export default Poker;
