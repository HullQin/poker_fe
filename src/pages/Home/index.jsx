import { useEffect, useMemo, useState } from 'react';
import Message from '../../components/Message';
import useSetLocation from '../../utils/use-set-location';

const Home = () => {
  const [disabled, setDisabled] = useState(false);
  const setLocation = useSetLocation();

  const recentRooms = useMemo(() => {
    try {
      const rooms = JSON.parse(window.localStorage.getItem('rooms'));
      if (Array.isArray(rooms) && rooms.every(item => typeof item === 'string')) {
        return rooms;
      }
    } catch {
    }
    window.localStorage.removeItem('rooms');
    return [];
  }, []);

  useEffect(() => {
    document.getElementById('roomId').focus();
  }, []);

  const handleSubmit = () => {
    const element = document.getElementById('roomId');
    const roomId = element.value.replace(/ /g, '');
    if (!roomId) {
      Message('房间号不能为空 (空格会被忽略)');
      element.focus();
      return;
    }
    setDisabled(true);
    setLocation(`/${roomId}`);
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h1 style={{ marginTop: 0, paddingTop: 21 }}>斗地主</h1>
      <form
        onSubmit={(event) => {
          event.preventDefault();
        }}
      >
        <label htmlFor='roomId'>请输入房间号：</label>
        <br/>
        <input id='roomId' />
        <br/>
        <button style={{ marginTop: 16, fontSize: 18 }} type='submit' disabled={disabled} onClick={handleSubmit}>进入房间</button>
      </form>
      {recentRooms.length > 0 && (
        <div style={{ marginTop: 36 }}>
          最近进入过的房间：
          {recentRooms.map((roomId) => (
            <div key={roomId} style={{ margin: '6px auto', maxWidth: 330, display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ textOverflow: 'ellipsis', maxWidth: 220, overflowX: 'hidden' }}>🏠 {roomId}</span>
              <button onClick={() => setLocation(`/${roomId}`)}>点此进入</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
