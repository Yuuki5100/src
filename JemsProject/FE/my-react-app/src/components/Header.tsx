import { useAppDispatch } from '../hooks';
import { logout } from '../features/auth/authSlice';

const Header = () => {
  const dispatch = useAppDispatch();
  return <button onClick={() => dispatch(logout())}>ログアウト</button>;
};
