import { useEffect, useState } from 'react';
import { useImmer } from 'use-immer';
import Message from '../../components/Message';
import { addHandler, connect, disconnect } from '../../utils/websocket';
import WaitingRoom from './WaitingRoom';
import GamingRoom from './GamingRoom';

const Room = () => {
  // room_id 不可变；只能先退出房间再进入新房间
  const [room, setRoom] = useImmer(() => ({
    id: window.location.pathname.substr(1),
    creator: null,
    players: [null, null, null, null],
    state: -1,
  }));
  const [seat, setSeat] = useState(null);
  const [game, setGame] = useImmer(() => ({
    state: -1,
    held: [0, 0, 0, 0],
    used: [],
    last: [],
    my: [],
    revealed: [],
    total: 0,
    landlord: null,
  }));

  console.log(room);

  const setRoomPlayer = (seat, user) => {
    setRoom((room) => {
      room.players[seat] = user;
    });
  };

  const setRoomCreator = (seat) => {
    setRoom((room) => {
      room.creator = seat;
      if (seat === null) return;
      room.players[seat].is_creator = true;
    });
  };

  const setPlayerOnline = (seat, online) => {
    setRoom((room) => {
      room.players[seat].online = online;
    });
  };

  const setRoomState = (state) => {
    setRoom((room) => {
      room.state = state;
    });
  };

  useEffect(() => {
    addHandler({
      'room.init': (data) => {
        Message(`欢迎来到房间${data.room.id}`);
        if (data.seat) setSeat(data.seat);
        setRoom(data.room);
        if (data.game) setGame(data.game);
      },
      'room.user.seat': (data) => {
        if (!data.old_seat) {
          Message(`你成功加入，作为玩家${data.user.seat}`);
          setSeat(data.user.seat);
          setRoomPlayer(data.user.seat, data.user);
          if (data.user.is_creator) setRoomCreator(data.user.seat);
          return;
        }
        Message(`玩家${data.old_seat}换到了位置${data.user.seat}`);
        if (data.is_me) setSeat(data.user.seat);
        setRoomPlayer(data.old_seat, null);
        setRoomPlayer(data.user.seat, data.user);
        if (data.user.is_creator) setRoomCreator(data.user.seat);
      },
      'room.user.join': (data) => {
        setRoomPlayer(data.user.seat, data.user);
        if (data.creator) {
          Message(`玩家${data.user.seat}进来了，成为了房主`);
          setRoomCreator(data.user.seat);
        } else {
          Message(`玩家${data.user.seat}进来了`);
        }
      },
      'room.user.quit': (data) => {
        Message(`玩家${data.seat}退出了`);
        setRoomPlayer(data.seat, null);
      },
      'room.creator.quit': (data) => {
        if (data.new_creator_seat) {
          Message(`玩家${data.seat}退出了，玩家${data.new_creator_seat}成为房主`);
          setRoomCreator(data.new_creator_seat);
        } else {
          Message(`玩家${data.seat}退出了，房主空缺`);
          setRoomCreator(null);
        }
        setRoomPlayer(data.seat, null);
      },
      'room.user.leave': (data) => {
        Message(`玩家${data.seat}断线了`);
        setPlayerOnline(data.seat, false);
      },
      'room.user.back': (data) => {
        Message(`玩家${data.seat}回来了`);
        setPlayerOnline(data.seat, true);
      },
      'room.state.start': (data) => {
        Message('游戏开始，已发牌，请决定是否叫地主');
        setGame(data.game);
        setRoomState(1);
      },
      'game.reset': (data) => {
        Message('房主重新发牌了，请决定是否叫地主');
        setGame(data.game);
      },
      'game.landlord': (data) => {
        Message(`玩家${data.seat}抢到了地主`);
        setGame(data.game);
      },
      'game.drop.card': (data) => {
        Message(`玩家${data.seat}出牌了`);
        setGame(data.game);
      },
      'game.withdraw.card': (data) => {
        Message(`玩家${data.seat}收回了刚出的牌`);
        setGame(data.game);
      },
      'room.state.end': (data) => {
        Message('游戏结束');
        setRoomState(999);
      },
    });
    connect(room.id);
    return () => {
      disconnect();
    };
  }, []);

  if (room.state === 0) {
    return <WaitingRoom room={room} seat={seat} />;
  }
  if (room.state === 1) {
    return <GamingRoom room={room} game={game} seat={seat} />;
  }
  if (room.state === 999) {
    return '游戏结束，李晓馨输了';
  }
  return null;
};

export default Room;
