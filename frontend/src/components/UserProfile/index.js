import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { restoreUser } from '../../store/session';

export default function UserProfile() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(restoreUser());
  }, [dispatch]);
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
