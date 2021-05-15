import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { restoreUser } from '../../store/session';
import { getUserReservations } from '../../store/reservations';
import ProfileReservation from './ProfileReservation';

export default function UserProfile() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const reservations = useSelector((state) => state.reservations.userReservations);

  useEffect(() => {
    dispatch(restoreUser());
  }, []);

  useEffect(() => {
    if (user) {
      dispatch(getUserReservations(user.id));
    }
  }, [user]);

  if (!user) {
    return null;
  }
  return (
    <>
      <h2>
        Hello,
        <span>{ ' ' }</span>
        {user.username}
      </h2>
      <section>
        <h2>Your Upcoming Reservations</h2>
        { reservations
        && reservations.map((reservation) => <ProfileReservation reservation={reservation} />)}
      </section>
    </>
  );
}
