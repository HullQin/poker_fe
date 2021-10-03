import { useEffect, useMemo } from 'react';
import { useImmer } from 'use-immer';
import Poker from '../Poker';
import { sortPokersById } from '../../utils/poker';
import './style.css';

const PokerList = (props) => {
  const { ids, height = 159, style, onChange } = props;
  const sortedIds = useMemo(() => {
    return sortPokersById([...ids]);
  }, [ids]);
  const [selectedIds, setSelectedIds] = useImmer(Array(sortedIds.length).fill(false));
  useEffect(() => {
    onChange && onChange([]);
    setSelectedIds(Array(sortedIds.length).fill(false));
  }, [sortedIds.length]);
  const padding = height * 41 / 159;
  const gap = height * 48 / 159;
  return (
    <div className='poker-list' style={{ height: height + padding, ...style }}>
      {sortedIds.map((id, index) => (
        <Poker
          key={id}
          id={id}
          style={{ left: index * gap, top: selectedIds[index] ? 0 : padding, transform: `scale(${height / 159})` }}
          onClick={() => {
            setSelectedIds((selectedIds) => {
              selectedIds[index] = !selectedIds[index];
              const selected = sortedIds.filter((item, i) => selectedIds[i]);
              onChange && onChange(selected);
            });
          }}
        />
      ))}
    </div>
  );
};

export default PokerList;
