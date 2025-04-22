import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { getUser } from '../features/user/userSlice';
import UserCard from '../components/UserCard';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';

const HomePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state: { user: { data: any; }; }) => state.user.data);
  const status = useAppSelector((state: { user: { status: any; }; }) => state.user.status);

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  if (status === 'loading') return <p>Loading...</p>;
  if (status === 'failed') return <p>Failed to load user data. Please try again.</p>;
  if (!user) return <p>No user data.</p>;
  if (status === 'loading') return <Loading />;
  if (status === 'failed') return <ErrorMessage message="Failed to fetch user." />;

  return <UserCard user={user} />;
};

export default HomePage;