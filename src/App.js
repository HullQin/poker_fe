import { useCallback, useEffect, useState } from 'react';
import Room from './pages/Room';
import Home from './pages/Home';
import { SetLocationContext } from './utils/use-set-location';

const App = () => {
  const [location, setLocation] = useState(document.location.pathname);

  const pushHistory = useCallback((location) => {
    window.history.pushState(null, null, location);
    setLocation(document.location.pathname);
  }, []);

  useEffect(() => {
    window.onpopstate = (event) => {
      setLocation(event.target.location.pathname);
    };
    return () => {
      window.onpopstate = null;
    };
  }, []);

  return (
    <SetLocationContext.Provider value={pushHistory}>
      {location === '/' ? <Home/> : <Room/>}
    </SetLocationContext.Provider>
  );
};

export default App;
