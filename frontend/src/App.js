import LoginFormPage from "./components/LoginFormPage"
import { Route, Switch } from 'react-router-dom';
import { useDispatch }from 'react-redux'
import { useState, useEffect } from 'react'
import * as sessionActions from './store/session'
import SignupFormPage from "./components/SignupFormPage";
import Navigation from "./components/Navigation";
import CartCarousel from "./components/CartCarousel"

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
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
      <CartCarousel />
    </>
  );
}
export default App;
