import { useEffect, useMemo } from 'react';
import Poker from '../Poker';
import { sortPokersById } from '../../utils/poker';
import './style.css';

const PokerList = (props) => {
  const { ids, height = 159, style, selected, setSelected } = props;
  const sortedIds = useMemo(() => {
    return sortPokersById([...ids]);
  }, [ids]);
  useEffect(() => {
    setSelected([]);
  }, [sortedIds.length]);
  const padding = height * 41 / 159;
  const gap = height * 48 / 159;
  return (
    <div className='poker-list' style={{ height: height + padding, ...style }}>
      {sortedIds.map((id, index) => (
        <Poker
          key={id}
          id={id}
          style={{ left: index * gap, top: selected.includes(id) ? 0 : padding, transform: `scale(${height / 159})` }}
          onClick={() => {
            setSelected((selected) => {
              const index = selected.indexOf(id);
              if (index === -1) {
                selected.push(id);
              } else {
                selected.splice(index, 1);
              }
            });
          }}
        />
      ))}
    </div>
  );
};

export default PokerList;
