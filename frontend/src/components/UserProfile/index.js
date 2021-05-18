import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { restoreUser } from '../../store/session';
import { getUserFutureReservations } from '../../store/reservations';
import ProfileReservation from './ProfileReservation';

export default function UserProfile() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const futureReservations = useSelector((state) => state.reservations.userFutureReservations);

  useEffect(() => {
    dispatch(restoreUser());
  }, [dispatch]);

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
      <h2>
        Hello,
        <span> </span>
        {user.username}
      </h2>
      <section>
        <h2>{futureReservations ? 'Your Upcoming Reservations' : 'No Upcoming Reservations'}</h2>
        {futureReservations &&
          futureReservations.map((res) => <ProfileReservation key={res.id} reservation={res} />)}
      </section>
    </>
  );
}
