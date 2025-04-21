import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axiosClient from '../lib/axiosClient';
import { useAppSelector } from '../hooks';
import { hasRole } from '../utils/roleUtils';

const UserDetailPage: React.FC = () => {
  const { id } = useParams();
  const [user, setUser] = useState<any>(null);
  const { user: authUser } = useAppSelector((state: { auth: any; }) => state.auth);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axiosClient.get(`/users/${id}`);
        setUser(res.data);
      } catch (err) {
        console.error('ユーザー詳細の取得に失敗しました', err);
      }
    };
    fetchUser();
  }, [id]);

  if (!user) return <p>読み込み中...</p>;

  return (
    <div>
      <h2>{user.name}さんのプロフィール</h2>
      <p>メールアドレス: {user.email}</p>
      <p>登録日: {new Date(user.createdAt).toLocaleDateString()}</p>
      {hasRole(authUser?.roles, ['ADMIN']) && (
        <Link to={`/admin/users/${user.id}/roles`}>ロール編集</Link>
      )}
      {/* 他の情報もここに */}
    </div>
  );
};

export default UserDetailPage;
