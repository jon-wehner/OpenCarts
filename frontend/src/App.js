import LoginFormPage from "./components/LoginFormPage"
import { Route, Switch } from 'react-router-dom';
import { useDispatch }from 'react-redux'
import { useState, useEffect } from 'react'
import * as sessionActions from './store/session'
import SignupFormPage from "./components/SignupFormPage";
import Navigation from "./components/Navigation";
import CartCarousel from "./components/CartCarousel"
import BookingArea from "./components/BookingArea";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <div className="wrapper">
      <Navigation isLoaded={isLoaded} />
      {isLoaded &&
        <Switch>
          <Route path="/login">
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
        </Switch>
        }
      <Switch>
        <Route path="/">
          <BookingArea />
          <CartCarousel />
        </Route>
      </Switch>

    </div>
  );
}
export default App;
