import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as sessionActions from './store/session';
import Navigation from './components/Navigation';
import BookingArea from './components/BookingArea';
import SearchResults from './components/SearchResults';
import UserProfile from './components/UserProfile';

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    const restoreAndLoad = async () => {
      await dispatch(sessionActions.restoreUser());
      setIsLoaded(true);
    };
    restoreAndLoad();
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      <div className="wrapper">
        <Routes>
          <Route path="/" element={<BookingArea />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/profile" element={<UserProfile />} />
        </Routes>
      </div>
    </>
  );
}
export default App;
