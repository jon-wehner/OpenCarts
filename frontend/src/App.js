import { Route, Switch } from 'react-router-dom';
import { useDispatch }from 'react-redux'
import { useState, useEffect } from 'react'
import * as sessionActions from './store/session'
import Navigation from "./components/Navigation";
import CartCarousel from "./components/CartCarousel"
import BookingArea from "./components/BookingArea";
import SearchResults from "./components/SearchResults";
import UserProfile from './components/UserProfile';

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      <div className="wrapper">
        <Switch>
          <Route path="/" exact>
            <BookingArea />
            <CartCarousel />
          </Route>
          <Route path="/search">
            <SearchResults />
          </Route>
          <Route path="/profile">
            <UserProfile />
          </Route>
        </Switch>
      </div>
    </>
  );
}
export default App;
