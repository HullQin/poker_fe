import userId from './user-id';
import Message from '../components/Message';

let _ws = null;

const _handler = {};

const initHandler = () => {
  for (const key in _handler) {
    delete _handler[key];
  }
  _handler['msg.message'] = (data) => {
    Message(data.content);
  };
};

const addHandler = (handler) => {
  for (const key in handler) {
    _handler[key] = handler[key];
  }
};

const removeHandler = (handler) => {
  if (Array.isArray(handler)) {
    for (const key of handler) {
      delete _handler[key];
    }
  } else if (typeof handler === 'string') {
    delete _handler[handler];
  } else {
    for (const key in handler) {
      delete _handler[key];
    }
  }
};

const clearHandler = (handler) => {
  initHandler();
};

const showRefresh = (content) => {
  const mask = document.createElement('div');
  mask.style.position = 'fixed';
  mask.style.top = '0';
  mask.style.left = '0';
  mask.style.right = '0';
  mask.style.bottom = '0';
  mask.style.backgroundColor = 'rgba(0, 0, 0, 0.45)';
  document.body.appendChild(mask);
  const div = document.createElement('div');
  div.style.position = 'absolute';
  div.style.top = '20%';
  div.style.left = '0';
  div.style.right = '0';
  div.style.padding = '24px';
  div.style.textAlign = 'center';
  div.style.backgroundColor = '#eee';
  const h1 = document.createElement('h1');
  h1.innerText = content;
  div.appendChild(h1);
  const button = document.createElement('button');
  button.innerText = '连接已断开，点击这里刷新页面';
  button.style.fontSize = '24px';
  button.onclick = (ev) => window.location.reload();
  div.appendChild(button);
  document.body.appendChild(div);
};

const connect = (roomId) => {
  disconnect();
  const debug = ['127.0.0.1', 'localhost'].includes(window.location.hostname);
  // 根据uri中对roomId做负载均衡
  _ws = new WebSocket(debug ? `ws://127.0.0.1:8000/${roomId}` : `ws${document.location.protocol === 'https:' ? 's' : ''}://${window.location.host}/${roomId}`);
  _ws.onopen = () => {
    sendData('user.init', {
      user_id: userId,
      room_id: roomId,
    })
  };
  _ws.onclose = (event => {
    if (event.code !== 1000) {
      if (event.code === 3200) {
        showRefresh('您已在新的浏览器窗口中进入该房间，本页面连接中断！');
      } else if(event.code === 3001) {
        showRefresh('您被踢出房间，请刷新页面重新进入！');
      } else {
        showRefresh('网络问题，连接已断开！请刷新页面！');
      }
    }
  });
  _ws.onerror = (event) => {
    disconnect();
    Message('出现异常，连接已断开！请刷新页面！');
  };
  _ws.onmessage = (event => {
    let data;
    try {
      data = JSON.parse(event.data);
    } catch {
      return;
    }
    const { type } = data;
    if (_handler[type]) {
      _handler[type](data);
    }
  });
};

let requestId = 0;

const sendData = (type, data, callback=null) => {
  if (!_ws) return;
  if (callback !== null) {
    const key = `response.${requestId}`;
    addHandler({
      [key]: (data) => {
        removeHandler(key);
        if (data.content) Message(data.content);
        if (typeof callback === 'function') callback(data);
      },
    });
  }
  _ws.send(JSON.stringify({
    ...data,
    type,
    _id: requestId++,
  }));
};

const disconnect = () => {
  if (!_ws) return;
  _ws.close();
  _ws = null;
};

export { addHandler, removeHandler, clearHandler, connect, sendData, disconnect };
