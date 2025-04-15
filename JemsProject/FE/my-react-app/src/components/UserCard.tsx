import React from 'react';
import { User } from '../features/user/userTypes';

type Props = {
  user: User;
};

const UserCard: React.FC<Props> = ({ user }) => (
  <div>
    <h2>{user.name}</h2>
    <p>{user.email}</p>
  </div>
);

export default UserCard;
