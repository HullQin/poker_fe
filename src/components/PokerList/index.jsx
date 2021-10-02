import { useEffect } from 'react';
import { useImmer } from 'use-immer';
import Poker from '../Poker';
import './style.css';

const PokerList = (props) => {
  const { ids, style, onChange } = props;
  const sortedIds = [...ids];
  sortedIds.sort((a, b) => pokerMap[b === 0 ? 0 : b % 54 === 0 ? 54 : b % 54] - pokerMap[a === 0 ? 0 : a % 54 === 0 ? 54 : a % 54]);
  const [selectedIds, setSelectedIds] = useImmer(Array(sortedIds.length).fill(false));
  useEffect(() => {
    onChange && onChange([]);
    setSelectedIds(Array(sortedIds.length).fill(false));
  }, [sortedIds.length]);
  return (
    <div className='poker-list' style={{ ...style }}>
      {sortedIds.map((id, index) => (
        <Poker
          key={index}
          id={id}
          style={{ position: 'absolute', left: index * 48, bottom: 0, paddingBottom: selectedIds[index] ? 41 : 0 }}
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

const pokerMap = [0, 14.2, 15.2, 3.2, 4.2, 5.2, 6.2, 7.2, 8.2, 9.2, 10.2, 11.2, 12.2, 13.2, 14.4, 15.4, 3.4, 4.4, 5.4, 6.4, 7.4, 8.4, 9.4, 10.4, 11.4, 12.4, 13.4, 14.6, 15.6, 3.6, 4.6, 5.6, 6.6, 7.6, 8.6, 9.6, 10.6, 11.6, 12.6, 13.6, 14.8, 15.8, 3.8, 4.8, 5.8, 6.8, 7.8, 8.8, 9.8, 10.8, 11.8, 12.8, 13.8, 54, 53];
// const mapPoker = (id) => {
//   if (id < 53) {
//     const c = [0.2, 0.4, 0.6, 0.8][Math.floor((id - 1) / 13)];
//     id = id % 13;
//     if (id === 2) id = 15;
//     else if (id === 1) id = 14;
//     else if (id === 0) id = 13;
//     id += c;
//   } else if (id === 53) {
//     id = 55;
//   }
//   return id;
// };

export default PokerList;
