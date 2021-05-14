import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { restoreUser } from '../../store/session';
import { getUserReservations } from '../../store/reservations';

export default function UserProfile() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(restoreUser());
    dispatch(getUserReservations(user.id));
  }, [dispatch, user.id]);
  if (!user) {
    return null;
  }
  return (
    <span>
      Hello,
      {user.username}
    </span>
  );
}
