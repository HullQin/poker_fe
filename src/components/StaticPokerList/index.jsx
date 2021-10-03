import { useMemo } from 'react';
import cn from 'classnames';
import Poker from '../Poker';
import { sortPokersByRule } from '../../utils/poker';
import './style.css';

const StaticPokerList = (props) => {
  const { ids, sort, overlap, height = 159, onChange, className, style, ...otherProps } = props;
  const gap = (overlap ? 48 : 116) * height / 159;
  const sortedIds = useMemo(() => {
    if (sort) {
      return sortPokersByRule([...ids]);
    } else {
      return ids;
    }
  }, [ids]);

  return (
    <div className={cn('static-poker-list', className)} style={{ height, ...style }} {...otherProps}>
      {sortedIds.map((id, index) => (
        <Poker
          key={index}
          id={id}
          style={{ left: index * gap, transform: `scale(${height / 159})` }}
        />
      ))}
    </div>
  );
};

export default StaticPokerList;
