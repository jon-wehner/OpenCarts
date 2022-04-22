import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { restoreUser } from '../../store/session';
import { getUserReservations } from '../../store/reservations';
import ProfileReservation from './ProfileReservation';
import PreviousReservation from './PreviousReservation';
import { RootState } from '../../store';
import { ExistingReservation } from '../../interfaces';

export default function UserProfile() {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.session.user);
  const futureReservations = useSelector((state: RootState) => state.reservations.userFutureReservations);
  const previousReservations = useSelector((state: RootState) => state.reservations.userPreviousReservations);
  const [timeString, setTimeString] = useState('');
  const hours: number = new Date().getHours();
  useEffect(() => {
    dispatch(restoreUser());
    if (hours < 12) {
      setTimeString('Morning');
    } else if (hours > 12 && hours < 18) {
      setTimeString('Afternoon');
    } else {
      setTimeString('Evening');
    }
  }, [hours, dispatch]);

  useEffect(() => {
    if (user) {
      dispatch(getUserReservations(user.id));
    }
  }, [dispatch, user]);

  if (!user) {
    return null;
  }
  return (
    <>
      <h2>{`Good ${timeString}, ${user.username}`}</h2>
      <section>
        <h2>{futureReservations && futureReservations.length ? 'Your Upcoming Reservations' : 'You have no upcoming reservations'}</h2>
        {futureReservations
          && futureReservations.map((res: ExistingReservation) => <ProfileReservation key={res.id} reservation={res} />)}
      </section>
      <section>
        <h2>{previousReservations ? 'Past Reservations' : ''}</h2>
        {previousReservations
          && previousReservations.map((res: ExistingReservation) => <PreviousReservation key={res.id} reservation={res} />)}
      </section>
    </>
  );
}
