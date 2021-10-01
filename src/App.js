import { useCallback, useEffect, useState } from 'react';
import Poker from './components/Poker';
import PokerList from './components/PokerList';
import Seat from './components/Seat';
import SeatList from './components/SeatList';
import Room from './pages/Room';
import Home from './pages/Home';
import { SetLocationContext } from './utils/use-set-location';

// const players = [
//   {
//     seat: 1,
//     name: '1',
//     online: true,
//     is_creator: true,
//   },
//   {
//     seat: 2,
//     name: '2',
//     online: true,
//     is_creator: false,
//   },
//   {
//     seat: 3,
//     name: '3',
//     online: true,
//     is_creator: false,
//   },
//   null,
// ];

const App = () => {
  const [location, setLocation] = useState(document.location.pathname);
  //   (_, location) => {
  //   window.history.pushState(null, null, location);
  //   return document.location.pathname;
  // }, document.location.pathname);

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

  // return (
  //   <div>
  //     {/*<SeatList players={players} />*/}
  //     {/*<Seat seat={2} online onClick={() => console.log(12)}/>*/}
  //     {/*<Seat seat={1} name={'玩家1'} online={false} style={{ margin: 20 }} isCreator  onClick={() => console.log(122)}/>*/}
  //     {/*<Seat seat={3}  online style={{ margin: 20 }} onClick={() => console.log(123)}/>*/}
  //     {/*<PokerList ids={Array(54).fill(0).map((_, i) => 1 + i)} />*/}
  //   </div>
  // );
};

export default App;
