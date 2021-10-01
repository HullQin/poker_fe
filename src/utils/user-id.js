const userIdCookieKey = 'client_id';
const userIdLocalStorageKey = 'user.id';

const createUserId = () => Math.random().toFixed(6).substr(2) + new Date().getTime().toString().substr(0, 10);

const getUserIdCookie = () => {
  const result = new RegExp('(?:;| |^)' + userIdCookieKey + '=([^;]*)').exec(document.cookie);
  if (!result || result.length < 2) return null;
  return decodeURIComponent(result[1]);
};

const setUserIdCookie = (userId) => {
  const d = new Date();
  d.setFullYear(d.getFullYear() + 5);
  document.cookie = userIdCookieKey + '=' + userId + ';domain=.hullqin.cn;expires=' + d.toUTCString();
};

const getUserIdLocalStorage = () => {
  return window.localStorage.getItem(userIdLocalStorageKey);
};

const setUserIdLocalStorage = (userId) => {
  window.localStorage.setItem(userIdLocalStorageKey, userId);
};

const getUserId = () => {
  const cookieUserId = getUserIdCookie();
  const localStorageUserId = getUserIdLocalStorage();
  if (!cookieUserId) {
    if (!localStorageUserId) {
      const userId = createUserId();
      setUserIdLocalStorage(userId);
      setUserIdCookie(userId);
      return userId;
    } else {
      setUserIdCookie(localStorageUserId);
      return localStorageUserId;
    }
  } else {
    if (cookieUserId !== localStorageUserId) {
      setUserIdLocalStorage(cookieUserId);
    }
    return cookieUserId;
  }
};

const userId = getUserId();

export default userId;
