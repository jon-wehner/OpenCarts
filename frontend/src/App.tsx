import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as sessionActions from './store/session';
import Navigation from './components/Navigation';
import BookingArea from './components/BookingArea';
import SearchResults from './components/SearchResults';
import UserProfile from './components/UserProfile';
import CartProfile from './components/CartProfile';
import { getAllCarts } from './store/carts';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const restoreAndLoad = async () => {
      await dispatch(sessionActions.restoreUser());
      await dispatch(getAllCarts());
    };
    restoreAndLoad();
  }, [dispatch]);

  return (
    <>
      <Navigation />
      <div className="wrapper">
        <Routes>
          <Route path="/" element={<BookingArea />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/cart/:id" element={<CartProfile />} />
        </Routes>
      </div>
    </>
  );
}
export default App;
