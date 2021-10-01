import { useState } from 'react';
import Message from '../../components/Message';
import useSetLocation from '../../utils/use-set-location';

const Home = () => {
  const [disabled, setDisabled] = useState(false);
  const setLocation = useSetLocation();

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
      <div>
        <label htmlFor='roomId'>请输入房间号：</label>
        <br/>
        <input id='roomId' />
      </div>
      <div style={{ marginTop: 24 }}>
        <button disabled={disabled} onClick={handleSubmit}>进入房间</button>
      </div>
    </div>
  );
};

export default Home;
