import LoginFormPage from "./components/LoginFormPage"
import { Route, Switch } from 'react-router-dom';

function App() {
  return (
    <Switch>
      <Route path="/login">
        <LoginFormPage />
      </Route>
    </Switch>

  );
}

export default App;
