const pokerMap = [0, 14.2, 15.2, 3.2, 4.2, 5.2, 6.2, 7.2, 8.2, 9.2, 10.2, 11.2, 12.2, 13.2, 14.4, 15.4, 3.4, 4.4, 5.4, 6.4, 7.4, 8.4, 9.4, 10.4, 11.4, 12.4, 13.4, 14.6, 15.6, 3.6, 4.6, 5.6, 6.6, 7.6, 8.6, 9.6, 10.6, 11.6, 12.6, 13.6, 14.8, 15.8, 3.8, 4.8, 5.8, 6.8, 7.8, 8.8, 9.8, 10.8, 11.8, 12.8, 13.8, 54, 53];
const pokerNumberMap = [0, 14, 15, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 54, 53];

const mapPokerIdToCardId = (id) => {
  // 映射扑克id（可能有多幅牌）至卡片id（只有0-54）
  return (id - 1) % 54 + 1;
};

const sortPokersById = (ids) => {
  return ids.sort((a, b) => pokerMap[mapPokerIdToCardId(b)] - pokerMap[mapPokerIdToCardId(a)]);
};

const sortPokersByRule = (ids) => {
  const frequency = {};
  for (const id of ids) {
    const cardNumber = pokerNumberMap[mapPokerIdToCardId(id)];
    if (cardNumber in frequency) {
      frequency[cardNumber] += 1;
    } else {
      frequency[cardNumber] = 1;
    }
  }
  return ids.sort((a, b) => {
    a = mapPokerIdToCardId(a);
    b = mapPokerIdToCardId(b);
    const frequencyA = frequency[pokerNumberMap[a]];
    const frequencyB = frequency[pokerNumberMap[b]];
    if (frequencyA === frequencyB) {
      return pokerMap[a] - pokerMap[b];
    }
    return frequencyB - frequencyA;
  });
};

export { mapPokerIdToCardId, sortPokersById, sortPokersByRule };
