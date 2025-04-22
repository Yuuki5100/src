import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { getUser } from '../features/user/userSlice';
import UserCard from '../components/UserCard';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';

const HomePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(state=> state.user.data);
  const status = useAppSelector(state=> state.user.status);

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  if (!user) return <p>No user data.</p>;
  if (status === 'loading') return <Loading />;
  if (status === 'failed') return <ErrorMessage message="Failed to fetch user." />;

  return <UserCard user={user} />;
};

export default HomePage;