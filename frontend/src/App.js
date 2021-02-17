import { Route, Switch } from 'react-router-dom';
import { useDispatch }from 'react-redux'
import { useState, useEffect } from 'react'
import * as sessionActions from './store/session'
import Navigation from "./components/Navigation";
import CartCarousel from "./components/CartCarousel"
import BookingArea from "./components/BookingArea";
import SearchResults from "./components/SearchResults";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <div className="wrapper">
      <Navigation isLoaded={isLoaded} />
      <Switch>
        <Route path="/" exact>
          <BookingArea />
          <CartCarousel />
        </Route>
        <Route path="/search">
          <SearchResults />
        </Route>
      </Switch>

    </div>
  );
}
export default App;
