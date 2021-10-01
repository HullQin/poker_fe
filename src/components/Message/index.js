import './style.css';

const messageDiv = document.createElement('div');
messageDiv.id = 'message';
document.body.appendChild(messageDiv);

let lastMessageDisappearTime = 0;

const Message = (content) => {
  const div = document.createElement('div');
  div.innerHTML = `<div>${content}</div>`;
  messageDiv.appendChild(div);
  const now = new Date().getTime();
  const timeout = Math.max(3000, lastMessageDisappearTime - now);
  lastMessageDisappearTime = now + timeout + 300;
  setTimeout(() => {
    div.style.marginTop = '-58px';
    setTimeout(() => {
      messageDiv.removeChild(div)
    }, 250);
  }, timeout);
};

export default Message;
