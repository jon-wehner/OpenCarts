import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { restoreUser } from '../../store/session';
import { getUserFutureReservations } from '../../store/reservations';
import ProfileReservation from './ProfileReservation';

export default function UserProfile() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const futureReservations = useSelector((state) => state.reservations.userFutureReservations);
  const [timeString, setTimeString] = useState('');
  const hours = new Date().getHours();
  useEffect(() => {
    dispatch(restoreUser());
    
    switch (hours) {
      case hours < 12:
        setTimeString('Morning');
        break
      case hours < 18:
        setTimeString('Afternoon')
        break
      default:
        setTimeString('Evening');
    }

  }, [hours, dispatch]);

  useEffect(() => {
    if (user) {
      dispatch(getUserFutureReservations(user.id));
    }
  }, [dispatch, user]);

  if (!user) {
    return null;
  }
  return (
    <>
      <h2>{'Good ' + timeString + ', ' + user.username}</h2>
      <section>
        <h2>{futureReservations ? 'Your Upcoming Reservations' : 'You have no upcoming reservations'}</h2>
        {futureReservations &&
          futureReservations.map((res) => <ProfileReservation key={res.id} reservation={res} />)}
      </section>
    </>
  );
}
